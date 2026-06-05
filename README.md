# Talk CLI

面向 Agent 语义调用的对话 CLI demo。当前版本先提供本地 demo 回复，后续可在 `src/services/talk.ts` 接入真实接口查询。

## 安装

```bash
npm install -g talk-cli
```

## 本地开发

```bash
npm install
npm run build
node dist/cli.js ask "查一下项目状态" --format json
```

## 使用

```bash
talk ask "你好" --format json
talk ask "查一下项目状态" --scenario project --format json
talk demo list --format json
talk demo run qa --format json
talk schema --format json
```

完整 Agent 调用说明见 [skills/talk-cli/SKILL.md](skills/talk-cli/SKILL.md)。
