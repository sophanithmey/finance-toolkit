import { Sparkles } from 'lucide-react';
import Card from '../../../components/ui/card';
import { formatCurrency, type calculateDiscount } from '../../../utils/helper';

interface Props {
  readonly result: ReturnType<typeof calculateDiscount> | null;
}

export default function DiscountSummary({ result }: Props) {
  if (!result) return null;

  return (
    <Card className='lg:col-span-5'>
      <div className='flex items-center justify-between border-b border-slate-100 pb-4 mb-5'>
        <h3 className='text-base font-bold text-slate-900'>Price Summary</h3>
        <span className='inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700'>
          <Sparkles size={12} /> Live Breakdown
        </span>
      </div>

      <div className='space-y-4'>
        <div className='rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 p-5'>
          <p className='text-xs font-bold uppercase tracking-wider text-emerald-700'>
            You Save
          </p>
          <div className='mt-1 flex items-baseline justify-between'>
            <h4 className='tabular-nums text-3xl font-black text-emerald-700'>
              {formatCurrency(result.discountAmount)}
            </h4>
            <span className='rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white'>
              Discount Active
            </span>
          </div>
        </div>

        <div className='divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-xs font-medium text-slate-600 space-y-2.5'>
          <div className='flex justify-between pt-1'>
            <span>Original Price</span>
            <span className='tabular-nums font-bold text-slate-900'>
              {formatCurrency(result.originalAmount)}
            </span>
          </div>
          <div className='flex justify-between pt-2.5'>
            <span>Base (Pre-Tax)</span>
            <span className='tabular-nums font-bold text-slate-900'>
              {formatCurrency(result.baseAmount)}
            </span>
          </div>
          <div className='flex justify-between pt-2.5 text-emerald-600 font-semibold'>
            <span>Discount Deduction</span>
            <span className='tabular-nums'>-{formatCurrency(result.discountAmount)}</span>
          </div>
          <div className='flex justify-between pt-2.5'>
            <span>Subtotal</span>
            <span className='tabular-nums font-bold text-slate-900'>
              {formatCurrency(result.subtotal)}
            </span>
          </div>
          <div className='flex justify-between pt-2.5'>
            <span>Tax Added</span>
            <span className='tabular-nums font-bold text-slate-900'>
              +{formatCurrency(result.taxAmount)}
            </span>
          </div>
        </div>

        <div className='rounded-2xl bg-linear-to-r from-slate-900 to-indigo-950 p-5 text-white shadow-lg'>
          <p className='text-xs font-semibold uppercase tracking-wider text-indigo-300'>
            Total Amount Payable
          </p>
          <div className='mt-1 tabular-nums text-3xl font-black text-white'>
            {formatCurrency(result.finalAmount)}
          </div>
        </div>
      </div>
    </Card>
  );
}
