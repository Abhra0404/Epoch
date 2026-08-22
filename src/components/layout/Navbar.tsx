"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  BookOpen, 
  Compass, 
  Play, 
  Library, 
  FileCode2, 
  LayoutDashboard, 
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Roadmaps", href: "/roadmaps", icon: Compass },
  { label: "Playground", href: "/playground", icon: Play },
  { label: "Resources", href: "/resources", icon: Library },
  { label: "Research", href: "/research", icon: FileCode2 },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex items-center justify-between gap-4 rounded-full border border-border/80 bg-background/85 px-4 py-2.5 backdrop-blur-md shadow-xs transition-all">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 pl-1" aria-label="Epoch home">
          <img src="/logo.svg" alt="Epoch Logo" className="h-8 w-8 rounded-lg object-contain" />
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight text-foreground">epoch</span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              AI / ML Platform
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Items */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* <Link
            href="/subjects/machine-learning"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#34302D] dark:bg-card dark:text-foreground dark:hover:bg-secondary border border-transparent dark:border-border"
          >
            ML Notes
            <ArrowRight className="h-3.5 w-3.5 text-accent" />
          </Link> */}

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground hover:text-foreground md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="mt-2 rounded-[2rem] border border-border bg-card p-4 shadow-lg md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 pt-2 border-t border-border">
              <Link
                href="/subjects/machine-learning"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-4 py-2.5 text-sm font-semibold text-white dark:bg-card dark:text-foreground w-full"
              >
                ML Notes
                <ArrowRight className="h-4 w-4 text-accent" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
