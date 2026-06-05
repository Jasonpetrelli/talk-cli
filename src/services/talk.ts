import type { TalkRequest, TalkResponse } from '../core/types';
import { getDemoOrderList } from './orders';

const DEMO_REPLIES: Record<string, string> = {
  default: '这是 demo 回复：我已经收到你的问题。后续这里会接入真实接口查询，再按查询结果组织回复。',
  project: '这是 demo 回复：我会先识别项目、模块、目标动作，再调用接口获取上下文。',
  qa: '这是 demo 回复：我会先提取问题意图，再返回可直接给大模型消费的结构化答案。',
  order: '这是 demo 回复：已为你查询到 5 条订单，当前返回订单列表 demo。',
};

export async function askTalk(request: TalkRequest): Promise<TalkResponse> {
  const scenario = resolveScenario(request);
  const orderList = scenario === 'order' ? getDemoOrderList() : undefined;

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
    ui: orderList,
  };
}

export function listDemos(): Array<{ scenario: string; description: string }> {
  return [
    { scenario: 'default', description: '通用 demo 对话' },
    { scenario: 'project', description: '项目上下文查询 demo' },
    { scenario: 'qa', description: '问答回复 demo' },
    { scenario: 'order', description: '订单列表 demo' },
  ];
}

function resolveScenario(request: TalkRequest): string {
  if (request.scenario && request.scenario !== 'default' && DEMO_REPLIES[request.scenario]) return request.scenario;
  if (/订单|order/i.test(request.message)) return 'order';
  return 'default';
}
