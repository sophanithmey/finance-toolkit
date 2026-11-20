import { ArrowLeftRight } from 'lucide-react';

interface Props {
  readonly onSwap: () => void;
}

export default function SwapButton({ onSwap }: Props) {
  return (
    <button
      type='button'
      onClick={onSwap}
      aria-label='Swap currencies'
      className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
    >
      <ArrowLeftRight size={16} />
    </button>
  );
}
