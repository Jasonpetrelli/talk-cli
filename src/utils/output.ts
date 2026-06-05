import pc from 'picocolors';
import type { JsonEnvelope, OutputFormat } from '../core/types';
import { version } from '../core/version';

export function parseFormat(value?: string): OutputFormat {
  return value === 'json' ? 'json' : 'text';
}

export function output<T>(command: string, data: T, format: OutputFormat): void {
  if (format === 'json') {
    const envelope: JsonEnvelope<T> = {
      ok: true,
      command,
      data,
      meta: { cli: 'talk', version },
    };
    console.log(JSON.stringify(envelope, null, 2));
    return;
  }

  if (typeof data === 'string') {
    console.log(data);
    return;
  }

  console.log(JSON.stringify(data, null, 2));
}

export function outputError(message: string, format: OutputFormat): void {
  if (format === 'json') {
    console.error(JSON.stringify({ ok: false, error: { message } }, null, 2));
    return;
  }

  console.error(pc.red(`✗ ${message}`));
}
