import type { ExpenseSummary } from '../../utils/helper';
import type { Friend } from './types';

export function formatExpenseSummaryText(friends: Friend[], summary: ExpenseSummary): string {
  const getName = (id: string) => friends.find((f) => f.id === id)?.name ?? 'Unknown';

  const lines = [
    '💰 Expense Split Settlement Summary',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `👥 Group: ${friends.length} members | Total Spent: $${summary.totalSpent.toFixed(2)}`,
    `🎯 Fair Share Per Person: $${summary.perPerson.toFixed(2)}`,
    '',
    '📊 Contribution Ledger:',
  ];

  friends.forEach((friend) => {
    const paid = summary.paidMap[friend.id] || 0;
    const diff = paid - summary.perPerson;
    const diffText = diff > 0.01 ? `(+ $${diff.toFixed(2)})` : diff < -0.01 ? `(- $${Math.abs(diff).toFixed(2)})` : '(Settled)';
    lines.push(`• ${friend.name}: Paid $${paid.toFixed(2)} ${diffText}`);
  });

  lines.push('', '🤝 Optimal Settlements:');
  if (summary.settlements.length === 0) {
    lines.push('🎉 Everyone is already settled up! No debts pending.');
  } else {
    summary.settlements.forEach((item) => {
      lines.push(`👉 ${getName(item.from)} owes ${getName(item.to)}: $${item.amount.toFixed(2)}`);
    });
  }

  lines.push('', '— Generated via Finance Toolkit');
  return lines.join('\n');
}

export async function generateExpenseSummaryImage(friends: Friend[], summary: ExpenseSummary): Promise<Blob> {
  const getName = (id: string) => friends.find((f) => f.id === id)?.name ?? 'Unknown';
  const width = 800;
  const padding = 40;
  const itemHeight = 36;
  const headerHeight = 175;
  const ledgerHeight = friends.length * itemHeight + 45;
  const settlementHeight = Math.max(summary.settlements.length, 1) * itemHeight + 55;
  const height = headerHeight + ledgerHeight + settlementHeight + 50;

  const canvas = document.createElement('canvas');
  canvas.width = width * 2;
  canvas.height = height * 2;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(2, 2);

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(0.5, '#1e1b4b');
  bgGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Header Title & Brand
  ctx.fillStyle = '#818cf8';
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.fillText('FINANCE TOOLKIT • EXPENSE SETTLEMENT', padding, 48);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px system-ui, sans-serif';
  ctx.fillText('Group Bill Summary', padding, 82);

  // Metric Boxes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fillRect(padding, 105, 340, 54);
  ctx.fillRect(padding + 360, 105, 360, 54);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText('TOTAL EXPENSES', padding + 16, 124);
  ctx.fillText('FAIR SHARE PER PERSON', padding + 376, 124);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText(`$${summary.totalSpent.toFixed(2)}`, padding + 16, 146);
  ctx.fillStyle = '#34d399';
  ctx.fillText(`$${summary.perPerson.toFixed(2)}`, padding + 376, 146);

  // Contribution Ledger
  let y = headerHeight + 15;
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.fillText('Contribution Ledger', padding, y);
  y += 22;

  friends.forEach((friend) => {
    const paid = summary.paidMap[friend.id] || 0;
    const diff = paid - summary.perPerson;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(padding, y - 15, width - padding * 2, 26);

    ctx.fillStyle = '#ffffff';
    ctx.font = '500 13px system-ui, sans-serif';
    ctx.fillText(friend.name, padding + 12, y + 2);

    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Paid $${paid.toFixed(2)}`, padding + 220, y + 2);

    ctx.fillStyle = diff > 0.01 ? '#34d399' : diff < -0.01 ? '#f87171' : '#cbd5e1';
    ctx.font = 'bold 13px system-ui, sans-serif';
    const status = diff > 0.01 ? `+ $${diff.toFixed(2)}` : diff < -0.01 ? `- $${Math.abs(diff).toFixed(2)}` : 'Settled';
    ctx.fillText(status, width - padding - 85, y + 2);
    y += itemHeight;
  });

  // Settlements Section
  y += 12;
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.fillText('Optimal Settlements', padding, y);
  y += 22;

  if (summary.settlements.length === 0) {
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('✓ All expenses are settled evenly.', padding, y);
  } else {
    summary.settlements.forEach((item) => {
      ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.fillRect(padding, y - 15, width - padding * 2, 28);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText(`${getName(item.from)} owes ${getName(item.to)}`, padding + 14, y + 3);

      ctx.fillStyle = '#a5b4fc';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillText(`$${item.amount.toFixed(2)}`, width - padding - 85, y + 3);
      y += itemHeight;
    });
  }

  // Footer branding
  ctx.fillStyle = '#64748b';
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText('Generated by Finance Toolkit • Track. Calculate. Grow.', padding, height - 16);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png');
  });
}
