/**
 * Kézbesítési adapterek (audit SZF-002). A címzett FIX (környezeti változó), soha nem
 * a kérésből származik. A tárgyban nincs felhasználói adat → nincs fejléc-injekció.
 *
 * Módok:
 *  - disabled: alapértelmezés; a szerver nem fogad el beküldést (503), az oldal jelzi.
 *  - dry-run:  ellenőriz, de NEM továbbít semmit (preview / helyi tesztelés).
 *  - smtp:     valódi küldés SMTP-n (nodemailer) – csak jóváhagyott tájékoztató után.
 *
 * „Elfogadva” ≠ „kézbesítve”: az smtp mód azt jelenti, hogy a levelezőszerver
 * átvette az üzenetet; a postafiókba érkezést ez nem garantálja.
 */
import { isEmail } from './validate';

export type DeliveryMode = 'disabled' | 'dry-run' | 'smtp';

export interface OutgoingMessage {
  subject: string;
  text: string;
  /** Az ügyfél e-mail címe – csak ellenőrzött formátumban */
  replyTo?: string;
}

export type DeliveryResult =
  | { accepted: true; dryRun: boolean }
  | { accepted: false; reason: 'disabled' | 'config' | 'transport' };

export interface DeliveryAdapter {
  readonly mode: DeliveryMode;
  send(msg: OutgoingMessage): Promise<DeliveryResult>;
}

export const disabledAdapter: DeliveryAdapter = {
  mode: 'disabled',
  send: () => Promise.resolve({ accepted: false, reason: 'disabled' }),
};

export const dryRunAdapter: DeliveryAdapter = {
  mode: 'dry-run',
  send: () => Promise.resolve({ accepted: true, dryRun: true }),
};

/** Teszteléshez: memóriában gyűjti az „elküldött” üzeneteket. */
export function memoryAdapter(fail = false): DeliveryAdapter & { sent: OutgoingMessage[] } {
  const sent: OutgoingMessage[] = [];
  return {
    mode: 'smtp',
    sent,
    send(msg) {
      if (fail) return Promise.resolve({ accepted: false, reason: 'transport' });
      sent.push(msg);
      return Promise.resolve({ accepted: true, dryRun: false });
    },
  };
}

export interface SmtpConfig {
  host?: string | undefined;
  port?: number | undefined;
  secure?: boolean | undefined;
  user?: string | undefined;
  pass?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
}

export function smtpConfigComplete(c: SmtpConfig): boolean {
  return Boolean(c.host && c.port && c.user && c.pass && c.from && c.to && isEmail(c.to));
}

export function smtpAdapter(config: SmtpConfig): DeliveryAdapter {
  return {
    mode: 'smtp',
    async send(msg) {
      if (!smtpConfigComplete(config)) return { accepted: false, reason: 'config' };
      try {
        const { createTransport } = await import('nodemailer');
        const transport = createTransport({
          host: config.host,
          port: config.port,
          secure: config.secure ?? config.port === 465,
          auth: { user: config.user, pass: config.pass },
          // TLS kötelező; titkosítatlan küldés nincs.
          requireTLS: true,
          connectionTimeout: 10_000,
          socketTimeout: 15_000,
        });
        const info = await transport.sendMail({
          from: config.from,
          to: config.to,
          subject: msg.subject,
          text: msg.text,
          ...(msg.replyTo && isEmail(msg.replyTo) ? { replyTo: msg.replyTo } : {}),
        });
        const accepted = info.accepted.map(String);
        return config.to && accepted.includes(config.to)
          ? { accepted: true, dryRun: false }
          : { accepted: false, reason: 'transport' };
      } catch {
        // A hiba részleteit nem naplózzuk (tartalmazhatja a címzettet / a hitelesítést).
        return { accepted: false, reason: 'transport' };
      }
    },
  };
}
