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
  ui?: OrderListView;
}

export interface DemoOrder {
  orderNo: string;
  title: string;
  status: '待付款' | '待发货' | '运输中' | '已完成' | '已取消';
  amount: string;
  createdAt: string;
  action: string;
}

export interface OrderListView {
  type: 'list';
  title: string;
  columns: Array<{ key: keyof DemoOrder; label: string }>;
  rows: DemoOrder[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  emptyText: string;
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
