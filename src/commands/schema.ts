import { Command } from 'commander';
import { parseFormat, output } from '../utils/output';

const schema = {
  commands: [
    {
      name: 'talk ask <message>',
      description: '发送自然语言对话，返回 demo 回复',
      options: ['--scenario default|project|qa|order', '--format text|json'],
      agentUsage: 'talk-cli ask "查询我的订单" --format json',
    },
    {
      name: 'talk-cli order list',
      description: '查询订单列表 demo',
      options: ['--format text|json'],
      agentUsage: 'talk-cli order list --format json',
    },
    {
      name: 'talk-cli demo list',
      description: '列出内置 demo 场景',
      options: ['--format text|json'],
      agentUsage: 'talk-cli demo list --format json',
    },
    {
      name: 'talk-cli demo run [scenario]',
      description: '运行内置 demo 场景',
      options: ['--format text|json'],
      agentUsage: 'talk-cli demo run qa --format json',
    },
  ],
};

export function registerSchema(program: Command): void {
  program.command('schema')
    .description('输出供 Agent 读取的 CLI 语义调用说明')
    .option('--format <format>', '输出格式: text|json', 'json')
    .action((opts: { format?: string }) => {
      const format = parseFormat(opts.format);
      output('talk.schema', schema, format);
    });
}
