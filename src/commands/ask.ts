import { Command } from 'commander';
import { askTalk } from '../services/talk';
import { parseFormat, output, outputError } from '../utils/output';
import { readStdin } from '../utils/stdin';

export function registerAsk(program: Command): void {
  program.command('ask')
    .description('发送一段对话并返回 demo 回复')
    .argument('[message...]', '对话内容；不传时可从 stdin 读取')
    .option('-s, --scenario <scenario>', 'demo 场景: default|project|qa', 'default')
    .option('--format <format>', '输出格式: text|json', 'text')
    .action(async (messageParts: string[], opts: { scenario: string; format?: string }) => {
      const format = parseFormat(opts.format);
      const message = messageParts.join(' ').trim() || await readStdin();

      if (!message) {
        outputError('请输入对话内容，或通过 stdin 传入内容', format);
        process.exitCode = 1;
        return;
      }

      const data = await askTalk({ message, scenario: opts.scenario });

      if (format === 'json') {
        output('talk.ask', data, format);
      } else {
        output('talk.ask', data.reply, format);
      }
    });
}
