import { ArrowUpDown } from 'lucide-react';

interface Props {
  readonly onSwap: () => void;
}

export default function SwapButton({ onSwap }: Props) {
  return (
    <button
      type='button'
      onClick={onSwap}
      className='rounded-full bg-slate-100 p-3 transition hover:rotate-180 hover:bg-blue-100'
    >
      <ArrowUpDown size={20} />
    </button>
  );
}
