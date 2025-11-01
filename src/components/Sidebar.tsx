"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export type SidebarItem = {
  href: string;
  label: string;
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

export type SidebarProps = {
  groups: SidebarGroup[];
  open?: boolean; // mobile open state
  onItemClick?: () => void; // e.g., close on mobile
};

export default function Sidebar({
  groups,
  open = false,
  onItemClick,
}: SidebarProps) {
  const pathname = usePathname();
  return (
    <nav
      id="sidebar"
      className={[
        "sidebar fixed left-0 top-16 bottom-0 w-72 bg-background border-r border-slate-200 dark:border-slate-700 overflow-y-auto py-8 transition-transform duration-300",
        open ? "translate-x-0 shadow-2xl z-40" : "-translate-x-full",
        "md:translate-x-0",
      ].join(" ")}
    >
      {groups.map((group) => (
        <div key={group.title} className="mb-8 px-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            {group.title}
          </div>
          {group.items.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onItemClick}
                className={[
                  "nav-item block py-2 px-3 text-slate-600 dark:text-slate-300 no-underline rounded-md text-sm transition-all duration-200 mb-1 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 hover:text-blue-500 hover:translate-x-0.5",
                  isActive
                    ? "bg-blue-500/12 dark:bg-blue-500/20 text-blue-500 font-semibold"
                    : "",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
