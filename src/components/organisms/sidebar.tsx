import { Fuel, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_NAV_SECTIONS } from './sidebar-nav-data';

interface SidebarProps {
  readonly onOpenSearch?: () => void;
}

export default function Sidebar({ onOpenSearch }: SidebarProps) {
  return (
    <aside className='sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 lg:flex'>
      {/* Brand Header */}
      <div className='flex h-16 items-center px-6 border-b border-slate-100 dark:border-slate-800/80'>
        <NavLink to='/' className='flex items-center gap-2.5'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900'>
            <Fuel size={18} />
          </div>
          <div>
            <span className='text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-100'>
              Finance<span className='text-indigo-600 dark:text-indigo-400'>&Fuel</span>
            </span>
            <p className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider'>
              Intelligence & Calc Suite
            </p>
          </div>
        </NavLink>
      </div>

      {/* Quick Search */}
      <div className='px-4 pt-4'>
        <button
          type='button'
          onClick={onOpenSearch}
          className='flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
        >
          <span className='flex items-center gap-2'>
            <Search size={14} />
            <span>Search tools or countries...</span>
          </span>
          <kbd className='rounded bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-200 dark:bg-slate-950 dark:border-slate-800'>
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className='flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-none'>
        {SIDEBAR_NAV_SECTIONS.map((section) => (
          <div key={section.label} className='space-y-1'>
            <p className='px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500'>
              {section.label}
            </p>
            <div className='space-y-0.5'>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                      }`
                    }
                  >
                    <div className='flex items-center gap-2.5 min-w-0'>
                      <Icon size={16} className='shrink-0' />
                      <span className='truncate'>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className='rounded-full bg-indigo-500/10 px-1.5 py-0.2 text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400'>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Data Source Footer */}
      <div className='border-t border-slate-100 p-3.5 dark:border-slate-800'>
        <div className='rounded-xl bg-slate-50 p-2.5 text-xs dark:bg-slate-900 space-y-1'>
          <div className='flex items-center justify-between'>
            <span className='text-[10px] font-bold text-slate-400 uppercase'>Platform Status</span>
            <span className='flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 text-[11px]'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
              Live Active
            </span>
          </div>
          <p className='text-[10px] text-slate-400 leading-tight'>
            8 Core Calculators • 175 Territories Feed
          </p>
        </div>
      </div>
    </aside>
  );
}
