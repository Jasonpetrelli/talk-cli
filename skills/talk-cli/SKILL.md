---
name: talk-cli
version: 0.1.0
description: Use talk-cli to run semantic demo conversations and order list demos from other agents. Trigger when the user asks to call talk-cli, run demo conversations, query demo orders, or query future talk service answers through the CLI.
author: jeson
license: MIT
---

# Talk CLI

`talk-cli` 是一个面向 Agent 语义调用的对话 CLI。优先使用命令名 `talk-cli`。

## 安装

```bash
npm install -g @crystaldiyu/talk-cli
```

本地开发调试：

```bash
npm install
npm run build
node dist/cli.js ask "查一下项目状态" --format json
```

## Agent 调用约定

Agent 默认使用 `--format json`，便于稳定解析结果。

```bash
talk-cli ask "查一下项目状态" --scenario project --format json
talk-cli ask "查询我的订单" --format json
talk-cli order list --format json
talk-cli demo list --format json
talk-cli demo run qa --format json
talk-cli schema --format json
```

## 命令

### ask

```bash
talk-cli ask <message> [--scenario default|project|qa|order] [--format text|json]
```

发送一段自然语言对话并返回回复。当前是 demo 回复，后续服务层会接入真实接口查询。

当 message 包含“订单”或 `order` 时，会自动返回订单列表 demo，JSON 结果在 `data.ui.rows`。

### order list

```bash
talk-cli order list --format json
```

返回订单列表 demo。Agent 读取 `data.rows` 渲染列表，读取 `data.pagination` 获取分页信息。

### demo list

```bash
talk-cli demo list --format json
```

列出内置 demo 场景。

### demo run

```bash
talk-cli demo run [scenario] --format json
```

运行指定内置 demo 场景。

### schema

```bash
talk-cli schema --format json
```

输出供 Agent 读取的 CLI 语义调用说明。
