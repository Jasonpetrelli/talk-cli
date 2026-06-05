export type OutputFormat = 'text' | 'json';

export interface TalkRequest {
  message: string;
  scenario?: string;
}

export interface TalkResponse {
  message: string;
  reply: string;
  scenario: string;
  source: 'demo';
  nextActions: string[];
}

export interface JsonEnvelope<T> {
  ok: true;
  command: string;
  data: T;
  meta: {
    cli: 'talk';
    version: string;
  };
}
