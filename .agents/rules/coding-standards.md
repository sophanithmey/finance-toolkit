# Agent Guidelines & Engineering Standards

## 1. Project Overview & Tech Stack
This repository is **Finance Toolkit** (`discount-calculator`), a modern financial dashboard and suite of calculation utilities.
- **Runtime & Build:** Vite 8 + React 19 + TypeScript (ES2023, strict mode)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom gradient accents & glassmorphism
- **Routing:** React Router DOM v7 (Data Router via `createBrowserRouter`)
- **Forms & Validation:** `react-hook-form` with Yup schemas via `@hookform/resolvers/yup`
- **Server State & Networking:** TanStack React Query v5 + Axios
- **Data Export & Date Utilities:** SheetJS (`xlsx`), `date-fns`, and `lucide-react` icons

---

## 2. Project Directory Structure
All code additions must respect the feature-first architectural boundary in `src/`:

```
src/
├── assets/                  # Static assets and media files
├── components/              # Shared, reusable components across features
│   ├── dashboard/           # Dashboard-specific widgets (hero, market-card, calendar-grid)
│   ├── layout/              # Structural chrome (navbar, sidebar, mobile-bottom-nav, logo)
│   └── ui/                  # Atomic primitives (button, card, input, stat-card, tool-card)
├── features/                # Feature modules partitioned by financial domain
│   ├── discount/            # Discount & tax calculations
│   ├── emi/                 # Equated Monthly Installment calculator
│   ├── exchange-rate/       # Currency exchange rate tracking & conversion
│   ├── expense-split/       # Group expense splitting & debt settlement
│   ├── gold/                # Real-time gold market pricing
│   └── loan/                # Loan amortization schedule & Excel export
├── hooks/                   # Global cross-cutting custom hooks (e.g. use-local-storage.ts)
├── layout/                  # Route layouts (app-layout.tsx, main-layout.tsx)
├── pages/                   # Top-level routed views (e.g. dashboard-page.tsx, loan-page.tsx)
├── routes/                  # Central router configuration (index.tsx)
├── types/                   # Global shared TypeScript type declarations
└── utils/                   # Shared pure utility functions, calculations, and constants
```

---

## 3. Strict LOC Guideline (150–200 Lines Limit)
Maintain clean, modular, and single-responsibility code by strictly enforcing line limits:
- **Soft Limit:** Target **150 lines** or fewer per file for optimal readability.
- **Hard Limit:** No component, hook, or utility file may exceed **200 lines of code**.
- **Decomposition Strategy:** When a file approaches 150 lines, proactively decompose it:
  - **Form Components:** Extract sub-forms or field groups into `<feature>/components/`.
  - **Domain Types:** Move all interface and type declarations to `<feature>/types.ts`.
  - **Validation Schemas:** Isolate Yup schemas and inferred types into `<feature>/schema.ts`.
  - **Math & Algorithms:** Extract calculation logic into `<feature>/utils.ts` or `src/utils/helper.ts`.
  - **Data Fetching:** Extract API calls and TanStack Query logic into `<feature>/hooks/`.
  - **UI Shells:** Separate page orchestration from presentation components.

---

## 4. Feature Module Anatomy
Every feature directory inside `src/features/<feature-name>/` should adhere to this standard anatomy:
```
src/features/<feature-name>/
├── api.ts                   # Axios service functions and external HTTP calls
├── components/              # Domain-specific UI components (e.g., loan-form.tsx, loan-table.tsx)
├── constants.ts             # Domain constants, select options, and static configs
├── hooks/                   # Custom hooks using React Query or local state
├── schema.ts                # Yup validation schema definition & inferred form types
├── types.ts                 # TypeScript types and data models
└── utils.ts                 # Domain math (amortization, currency conversion, settlements)
```
- Only expose clean public contracts from feature folders.
- Avoid tight cross-feature couplings; share global utilities through `src/utils/` or `src/types/`.

---

## 5. Naming Conventions & Code Style
- **File & Folder Names:** Always use **kebab-case** with appropriate extensions:
  - Components: `loan-form.tsx`, `stat-card.tsx`, `calendar-grid.tsx`
  - Hooks: `use-dashboard.ts`, `use-gold-price.ts`, `use-local-storage.ts`
  - Pages: `dashboard-page.tsx`, `loan-page.tsx`, `expense-split-page.tsx`
  - Utilities: `helper.ts`, `calendar.ts`, `export-excel.ts`
- **React Components:** Use **PascalCase** for functions (`LoanForm`, `CalendarGrid`, `Hero`).
- **Interfaces & Types:** Use **PascalCase** (`LoanPayment`, `ExpenseSummary`, `Friend`).
- **Functions & Variables:** Use **camelCase** with descriptive verbs (`calculateDiscount`, `generateSchedule`).
- **Constants:** Use **UPPER_SNAKE_CASE** for primitive constants (`API_URL`) and camelCase for immutable objects.

---

## 6. TypeScript & Coding Standards
- **Strict Typing:** Keep compiler happy (`strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`).
- **No `any`:** Disallow `any`. Prefer strict interfaces, unions, or `unknown` with type guards.
- **Type-Only Imports:** Use `import type { ... } from '...'` to preserve `verbatimModuleSyntax` compatibility.
- **Immutable Props:** Mark interface properties as `readonly` (e.g. `readonly onGenerate: (data: LoanFormType) => void`).
- **Component Exports:** Prefer default exports for single-component files (`export default function LoanForm() { ... }`).

---

## 7. UI & Styling Guidelines
- **Tailwind CSS v4:** Utilize Tailwind utility classes directly in `className`. Avoid inline CSS styles.
- **Glassmorphism & Theme:** Align with the established visual language:
  - Cards: `rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg backdrop-blur-sm`
  - Gradients: `bg-linear-to-r from-blue-400 to-green-400`
  - Interactive States: `transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`
- **Icons:** Use `lucide-react` for all visual iconography.
- **Empty & Loading States:** Use animated skeletons (`animate-pulse rounded-3xl bg-slate-200`) or `<EmptyStat />`.
- **Responsive Design:** Mobile-first approach (`hidden lg:flex` for desktop sidebar, `mobile-bottom-nav.tsx` for mobile).

---

## 8. Forms & Validation Standards
- Use `react-hook-form` alongside Yup and `@hookform/resolvers/yup`.
- Numbers in inputs must be registered with `{ valueAsNumber: true }`:
  ```tsx
  <Input
    label="Annual Interest (%)"
    type="number"
    step="0.01"
    {...register("annualInterest", { valueAsNumber: true })}
    error={errors.annualInterest?.message}
  />
  ```
- Always define schemas in `schema.ts` and infer form types:
  ```ts
  export type LoanFormType = yup.InferType<typeof loanSchema>;
  ```

---

## 9. State Management & API Integration
- **Server Queries:** Use `@tanstack/react-query` (`useQuery`) with descriptive query keys:
  ```ts
  export function useGoldPrice(type = "buy") {
    return useQuery({ queryKey: ["gold-price", type], queryFn: () => getGoldPrice(type) });
  }
  ```
- **Local Storage:** Use the `useLocalStorage<T>` hook for persistent client-side data (e.g. expense history).
- **Pure Helpers:** Keep math logic independent of UI components for maintainability and effortless testing.

---

## 10. Financial Math & Precision Standards
- **Currency Formatting:** Use `Intl.NumberFormat` via `formatCurrency(amount, currency, locale)` in `src/utils/helper.ts`.
- **Rounding Strategy:** Always round displayed currency values to 2 decimal places (`Number(val.toFixed(2))`).
- **Schedule Adjustments:** Ensure the final loan amortization month absorbs rounding remainders to prevent negative balances.
- **Zero Values:** Explicitly support 0% interest and 0% discount without division-by-zero errors.

---

## 11. Agent Verification Checklist
Before concluding any task or saving changes, ensure all checklist items pass:
1. **LOC Check:** Verify modified or created files stay strictly within **150–200 lines**.
2. **Type Check:** Run `npx tsc -b` and ensure 0 TypeScript errors.
3. **Lint Check:** Run `npm run lint` (`eslint .`) and ensure 0 lint errors or warnings.
4. **Router Registration:** If a new page is added, register it in `src/routes/index.tsx` and `src/components/layout/sidebar.tsx`.
5. **Clean Imports:** Ensure relative imports match neighboring conventions without orphan dead code.
