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
      className='flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-white text-slate-600 shadow-xs transition-all duration-300 hover:scale-105 hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-indigo-600 active:scale-95'
    >
      <ArrowLeftRight size={18} />
    </button>
  );
}
