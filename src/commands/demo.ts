import { Command } from 'commander';
import { askTalk, listDemos } from '../services/talk';
import { parseFormat, output } from '../utils/output';

export function registerDemo(program: Command): void {
  const demo = program.command('demo')
    .description('查看和运行内置 demo 对话');

  demo.command('list')
    .description('列出内置 demo 场景')
    .option('--format <format>', '输出格式: text|json', 'text')
    .action((opts: { format?: string }) => {
      const format = parseFormat(opts.format);
      const demos = listDemos();

      if (format === 'json') {
        output('talk.demo.list', demos, format);
      } else {
        output('talk.demo.list', demos.map(item => `${item.scenario}\t${item.description}`).join('\n'), format);
      }
    });

  demo.command('run')
    .description('运行一个 demo 场景')
    .argument('[scenario]', 'demo 场景: default|project|qa', 'default')
    .option('--format <format>', '输出格式: text|json', 'text')
    .action(async (scenario: string, opts: { format?: string }) => {
      const format = parseFormat(opts.format);
      const data = await askTalk({ message: `运行 ${scenario} demo`, scenario });

      if (format === 'json') {
        output('talk.demo.run', data, format);
      } else {
        output('talk.demo.run', data.reply, format);
      }
    });
}
