---
name: talk-cli
version: 0.1.0
description: Use talk-cli to run semantic demo conversations from other agents. Trigger when the user asks to call talk-cli, run demo conversations, or query future talk service answers through the CLI.
author: jeson
license: MIT
---

# Talk CLI

`talk-cli` 是一个面向 Agent 语义调用的对话 CLI。命令名 `talk`。

## 安装

```bash
npm install -g talk-cli
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
talk ask "查一下项目状态" --scenario project --format json
talk demo list --format json
talk demo run qa --format json
talk schema --format json
```

## 命令

### ask

```bash
talk ask <message> [--scenario default|project|qa] [--format text|json]
```

发送一段自然语言对话并返回回复。当前是 demo 回复，后续服务层会接入真实接口查询。

### demo list

```bash
talk demo list --format json
```

列出内置 demo 场景。

### demo run

```bash
talk demo run [scenario] --format json
```

运行指定内置 demo 场景。

### schema

```bash
talk schema --format json
```

输出供 Agent 读取的 CLI 语义调用说明。
