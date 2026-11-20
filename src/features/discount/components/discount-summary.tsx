import Card from '../../../components/ui/card';
import Badge from '../../../components/ui/badge';
import { formatCurrency, type calculateDiscount } from '../../../utils/helper';

interface Props {
  readonly result: ReturnType<typeof calculateDiscount> | null;
}

export default function DiscountSummary({ result }: Props) {
  if (!result) return null;

  return (
    <Card className='lg:col-span-5'>
      <div className='flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800'>
        <h3 className='text-sm font-bold text-slate-900 dark:text-slate-100'>
          Price Breakdown
        </h3>
        <Badge variant='emerald' size='sm' dot>
          Active
        </Badge>
      </div>

      <div className='space-y-3.5'>
        {/* Savings KPI Card */}
        <div className='rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/40'>
          <p className='text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300'>
            Total Savings
          </p>
          <div className='mt-1 flex items-baseline justify-between'>
            <div className='tabular-nums text-2xl font-black text-emerald-700 dark:text-emerald-400'>
              {formatCurrency(result.discountAmount)}
            </div>
            <span className='rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white'>
              Discount Applied
            </span>
          </div>
        </div>

        {/* Detailed Line Items */}
        <div className='divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white p-3.5 text-xs font-medium text-slate-600 space-y-2 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'>
          <div className='flex justify-between pt-0.5'>
            <span>Original Price</span>
            <span className='tabular-nums font-semibold text-slate-900 dark:text-slate-100'>
              {formatCurrency(result.originalAmount)}
            </span>
          </div>
          <div className='flex justify-between pt-2'>
            <span>Base (Pre-Tax)</span>
            <span className='tabular-nums font-semibold text-slate-900 dark:text-slate-100'>
              {formatCurrency(result.baseAmount)}
            </span>
          </div>
          <div className='flex justify-between pt-2 text-emerald-600 dark:text-emerald-400 font-semibold'>
            <span>Discount Deduction</span>
            <span className='tabular-nums'>-{formatCurrency(result.discountAmount)}</span>
          </div>
          <div className='flex justify-between pt-2'>
            <span>Subtotal</span>
            <span className='tabular-nums font-semibold text-slate-900 dark:text-slate-100'>
              {formatCurrency(result.subtotal)}
            </span>
          </div>
          <div className='flex justify-between pt-2'>
            <span>Sales Tax</span>
            <span className='tabular-nums font-semibold text-slate-900 dark:text-slate-100'>
              +{formatCurrency(result.taxAmount)}
            </span>
          </div>
        </div>

        {/* Total Payable Box */}
        <div className='rounded-2xl border border-slate-900 bg-slate-900 p-4 text-white shadow-sm dark:border-slate-800 dark:bg-slate-800/90'>
          <p className='text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400'>
            Total Amount Due
          </p>
          <div className='mt-1 tabular-nums text-2xl font-black text-white'>
            {formatCurrency(result.finalAmount)}
          </div>
        </div>
      </div>
    </Card>
  );
}
