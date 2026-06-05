import { Command } from 'commander';
import { registerAsk } from './commands/ask';
import { registerDemo } from './commands/demo';
import { registerSchema } from './commands/schema';
import { version } from './core/version';

const program = new Command()
  .name('talk')
  .description('面向 Agent 语义调用的对话 CLI')
  .version(version)
  .exitOverride();

program.showHelpAfterError();

registerAsk(program);
registerDemo(program);
registerSchema(program);

try {
  await program.parseAsync(process.argv);
} catch (err: any) {
  process.exit(err.exitCode ?? 1);
}
