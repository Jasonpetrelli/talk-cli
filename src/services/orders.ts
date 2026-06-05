import type { OrderListView } from '../core/types';

export function getDemoOrderList(): OrderListView {
  const rows: OrderListView['rows'] = [
    {
      orderNo: 'ORD-20260605-1001',
      title: 'MacBook Pro 14 英寸保护套',
      status: '待付款',
      amount: '¥199.00',
      createdAt: '2026-06-05 09:12',
      action: '去付款',
    },
    {
      orderNo: 'ORD-20260604-0836',
      title: '人体工学办公椅',
      status: '待发货',
      amount: '¥899.00',
      createdAt: '2026-06-04 18:36',
      action: '查看详情',
    },
    {
      orderNo: 'ORD-20260603-2210',
      title: 'USB-C 扩展坞',
      status: '运输中',
      amount: '¥269.00',
      createdAt: '2026-06-03 22:10',
      action: '查看物流',
    },
    {
      orderNo: 'ORD-20260530-0918',
      title: '无线机械键盘',
      status: '已完成',
      amount: '¥459.00',
      createdAt: '2026-05-30 09:18',
      action: '再次购买',
    },
    {
      orderNo: 'ORD-20260528-1742',
      title: '降噪蓝牙耳机',
      status: '已取消',
      amount: '¥599.00',
      createdAt: '2026-05-28 17:42',
      action: '重新下单',
    },
  ];

  return {
    type: 'list',
    title: '我的订单',
    columns: [
      { key: 'orderNo', label: '订单号' },
      { key: 'title', label: '商品' },
      { key: 'status', label: '状态' },
      { key: 'amount', label: '金额' },
      { key: 'createdAt', label: '下单时间' },
      { key: 'action', label: '操作' },
    ],
    rows,
    pagination: {
      page: 1,
      pageSize: 10,
      total: rows.length,
    },
    emptyText: '暂无订单',
  };
}

export function renderOrderList(data: OrderListView): string {
  return [
    data.title,
    ...data.rows.map(order => `${order.orderNo} | ${order.status} | ${order.amount} | ${order.title} | ${order.action}`),
  ].join('\n');
}
