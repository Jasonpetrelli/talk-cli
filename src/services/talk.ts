import type { TalkRequest, TalkResponse } from '../core/types';

const DEMO_REPLIES: Record<string, string> = {
  default: '这是 demo 回复：我已经收到你的问题。后续这里会接入真实接口查询，再按查询结果组织回复。',
  project: '这是 demo 回复：我会先识别项目、模块、目标动作，再调用接口获取上下文。',
  qa: '这是 demo 回复：我会先提取问题意图，再返回可直接给大模型消费的结构化答案。',
};

export async function askTalk(request: TalkRequest): Promise<TalkResponse> {
  const scenario = request.scenario && DEMO_REPLIES[request.scenario] ? request.scenario : 'default';

  return {
    message: request.message,
    reply: DEMO_REPLIES[scenario],
    scenario,
    source: 'demo',
    nextActions: [
      '接入真实查询接口',
      '按业务场景扩展 scenario',
      '为 Agent 保持 --format json 输出',
    ],
  };
}

export function listDemos(): Array<{ scenario: string; description: string }> {
  return [
    { scenario: 'default', description: '通用 demo 对话' },
    { scenario: 'project', description: '项目上下文查询 demo' },
    { scenario: 'qa', description: '问答回复 demo' },
  ];
}
