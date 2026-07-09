import type { ReactNode } from 'react';

interface Props {
  readonly title: string;
  readonly value: string;
  readonly icon: ReactNode;
}

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className='rounded-xl border bg-white p-5 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-500'>{title}</p>

          <h2 className='mt-2 text-2xl font-bold'>{value}</h2>
        </div>

        <div className='rounded-full bg-blue-100 p-3 text-blue-600'>{icon}</div>
      </div>
    </div>
  );
}
