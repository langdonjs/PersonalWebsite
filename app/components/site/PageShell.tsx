import type { ReactNode } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

/**
 * Shared wrapper for every editorial page: warm paper background, centered
 * single column, top nav, and minimal footer. The game (/journey) intentionally
 * does NOT use this — it keeps its own full-screen styling.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3ecdf] text-[#413d34]">
      <div className="mx-auto flex min-h-screen max-w-[720px] flex-col px-6 py-10 sm:py-14">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
