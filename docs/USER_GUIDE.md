# Talk CLI 小白使用指南

Talk CLI 是一个可以被人和大模型调用的命令行工具。当前版本先返回 demo 对话，后续会接入真实接口查询。

## 1. 安装

```bash
npm install -g @crystaldiyu/talk-cli --registry=https://registry.npmjs.org/
```

安装后先检查版本：

```bash
talk-cli --version
```

能看到类似 `0.1.1` 就表示安装成功。

> 注意：有些系统自带 `talk` 命令，会和本工具的 `talk` 命令冲突。为了稳定，文档里统一使用 `talk-cli`。

## 2. 人在终端里怎么提问

直接输入：

```bash
talk-cli ask "查一下项目状态"
```

指定 demo 场景：

```bash
talk-cli ask "查一下项目状态" --scenario project
talk-cli ask "回答一个问题" --scenario qa
talk-cli ask "查询我的订单"
```

查看有哪些 demo：

```bash
talk-cli demo list
```

运行 demo：

```bash
talk-cli demo run qa
```

查询订单列表 demo：

```bash
talk-cli order list
```

## 3. 大模型应该怎么调用

大模型不要解析普通文本，建议固定使用 JSON 输出：

```bash
talk-cli ask "查一下项目状态" --scenario project --format json
```

查询订单时建议这样调用：

```bash
talk-cli order list --format json
```

也可以直接通过自然语言触发订单场景：

```bash
talk-cli ask "查询我的订单" --format json
```

返回结构大概是：

```json
{
  "ok": true,
  "command": "talk.ask",
  "data": {
    "message": "查一下项目状态",
    "reply": "这是 demo 回复：我会先识别项目、模块、目标动作，再调用接口获取上下文。",
    "scenario": "project",
    "source": "demo",
    "nextActions": [
      "接入真实查询接口",
      "按业务场景扩展 scenario",
      "为 Agent 保持 --format json 输出"
    ]
  },
  "meta": {
    "cli": "talk",
    "version": "0.1.1"
  }
}
```

大模型只需要读取：

- `data.reply`：最终回复内容
- `data.scenario`：当前场景
- `data.ui.rows`：订单列表等页面数据
- `data.nextActions`：后续建议动作

## 4. Claude 里怎么接入

有两种方式。

### 方式一：直接让 Claude 调命令

适合最简单的使用。

你可以在 Claude 里说：

```text
请调用本机命令：
talk-cli ask "查一下项目状态" --scenario project --format json
然后读取 JSON 里的 data.reply 回复我。
```

如果 Claude 有终端权限，它会直接执行命令并读取结果。

### 方式二：安装 Skill，让 Claude 自动知道怎么用

适合长期使用。项目里已经提供 Skill 文件：

```bash
skills/talk-cli/SKILL.md
```

把这个 Skill 安装到 Claude / Codex 支持的 skills 目录后，Claude 看到和 Talk CLI 相关的问题时，就能知道应该调用：

```bash
talk-cli ask "<你的问题>" --format json
```

Skill 的作用不是替代 npm 包，而是告诉大模型：

- 什么时候应该用这个 CLI
- 应该调用哪个命令
- 输出应该用 `--format json`
- 应该读取 JSON 里的哪个字段

## 5. 其他大模型怎么接入

只要这个大模型能执行 shell 命令，就可以接入。

给它这段系统提示或工具说明：

```text
当用户需要使用 Talk CLI 查询或对话时，执行：
talk-cli ask "<用户问题>" --format json

当用户要查询订单时，优先执行：
talk-cli order list --format json

如果能判断业务场景，可以加：
--scenario project
--scenario qa
--scenario order

读取返回 JSON 的 data.reply 作为最终回答；如果返回 data.ui.rows，则按列表展示给用户。
不要解析普通文本输出，默认使用 --format json。
```

也可以让大模型先读取命令 schema：

```bash
talk-cli schema --format json
```

## 6. 常见问题

### command not found: talk-cli

说明全局 npm bin 没在 PATH 里。先确认安装：

```bash
npm list -g @crystaldiyu/talk-cli --depth=0
```

再查看全局安装路径：

```bash
npm prefix -g
```

如果 prefix 是 `/usr/local`，通常需要确认 `/usr/local/bin` 在 PATH 里：

```bash
echo $PATH
```

### 输入 talk 后出现 [No connection yet]

这是系统自带的 `talk` 命令，不是 Talk CLI。请使用：

```bash
talk-cli --version
talk-cli ask "你好"
```

### npm install 后还是旧版本

指定官方 registry 并强制在线安装：

```bash
npm install -g @crystaldiyu/talk-cli@latest --registry=https://registry.npmjs.org/ --prefer-online
```

### 想看机器可读的调用说明

```bash
talk-cli schema --format json
```

## 7. 后续接真实接口时怎么改

当前 demo 回复在：

```bash
src/services/talk.ts
```

后续接真实接口时，优先改这个文件。命令层可以保持不变，这样人和大模型的调用方式不用变。
