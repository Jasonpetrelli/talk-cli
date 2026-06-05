import { Command } from 'commander';
import { getDemoOrderList } from '../services/orders';
import { parseFormat, output } from '../utils/output';

export function registerOrder(program: Command): void {
  const order = program.command('order')
    .description('订单 demo');

  order.command('list')
    .description('查询订单列表 demo')
    .option('--format <format>', '输出格式: text|json', 'text')
    .action((opts: { format?: string }) => {
      const format = parseFormat(opts.format);
      const data = getDemoOrderList();

      if (format === 'json') {
        output('talk.order.list', data, format);
        return;
      }

      output('talk.order.list', renderOrderList(data), format);
    });
}

function renderOrderList(data: ReturnType<typeof getDemoOrderList>): string {
  return [
    data.title,
    ...data.rows.map(order => `${order.orderNo} | ${order.status} | ${order.amount} | ${order.title} | ${order.action}`),
  ].join('\n');
}
