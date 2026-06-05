# Talk CLI

[![npm version](https://img.shields.io/npm/v/@crystaldiyu/talk-cli.svg)](https://www.npmjs.com/package/@crystaldiyu/talk-cli)
[![npm downloads](https://img.shields.io/npm/dm/@crystaldiyu/talk-cli.svg)](https://www.npmjs.com/package/@crystaldiyu/talk-cli)

面向 Agent 语义调用的对话 CLI demo。当前版本先提供本地 demo 回复，后续可在 `src/services/talk.ts` 接入真实接口查询。

## 安装

```bash
npm install -g @crystaldiyu/talk-cli
```

## 本地开发

```bash
npm install
npm run build
node dist/cli.js ask "查一下项目状态" --format json
```

## 使用

```bash
talk-cli ask "你好" --format json
talk-cli ask "查一下项目状态" --scenario project --format json
talk-cli ask "查询我的订单" --format json
talk-cli order list --format json
talk-cli demo list --format json
talk-cli demo run qa --format json
talk-cli schema --format json
```

## 版本发布

npm 包地址：[npmjs.com/package/@crystaldiyu/talk-cli](https://www.npmjs.com/package/@crystaldiyu/talk-cli)

GitHub Release 和 npm 版本保持同名 tag，例如 `v0.1.1` 对应 npm 的 `@crystaldiyu/talk-cli@0.1.1`。

完整 Agent 调用说明见 [skills/talk-cli/SKILL.md](skills/talk-cli/SKILL.md)。

小白使用和大模型接入指南见 [docs/USER_GUIDE.md](docs/USER_GUIDE.md)。
