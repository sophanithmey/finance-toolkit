import type { ReactNode } from 'react';

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/60
        bg-white/90
        p-6
        shadow-lg
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        ${className}  
      `}
    >
      <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl' />
      <div className='absolute -bottom-12 -left-10 h-24 w-24 rounded-full bg-cyan-500/5 blur-xl' />
      {/* Top Gradient Accent */}
      <div className='absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 via-cyan-500 to-emerald-500' />

      {children}
    </div>
  );
}
