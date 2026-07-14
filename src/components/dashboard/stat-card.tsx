import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
}: Props) {
  return (
    <div
      className={`group overflow-hidden rounded-3xl ${gradient} p-6 text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
    >
      <div className='flex justify-between'>
        <div>
          <p className='text-sm opacity-80'>{title}</p>

          <h2 className='mt-4 text-3xl font-bold'>{value}</h2>

          <p className='mt-2 text-sm opacity-80'>{subtitle}</p>
        </div>

        <div className='rounded-2xl bg-white/20 p-4 transition group-hover:rotate-12'>
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}
