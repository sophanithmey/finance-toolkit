import { Receipt } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className='flex flex-col items-center py-10'>
      <Receipt size={48} className='text-gray-400' />

      <h3 className='mt-4 text-lg font-semibold'>No expenses yet</h3>

      <p className='text-gray-500'>Add your first expense.</p>
    </div>
  );
}
