import Link from "next/link";
import { ArrowRight, Code2, Share2, MessageSquare, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 rounded-t-[3rem] bg-[#1A1A1A] px-5 py-12 text-white dark:bg-[#0a0908] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold tracking-tight text-white">epoch</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              The structured AI & Machine Learning learning platform. Bridging theoretical math and practical code through paper-inspired reading surfaces.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Code Repository"
              >
                <Code2 className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Community Share"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Discord Discussion"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Platform</p>
              <ul className="mt-4 space-y-2.5 text-xs text-white/70">
                <li><Link href="/learn" className="hover:text-white transition-colors">Learn Hub</Link></li>
                <li><Link href="/roadmaps" className="hover:text-white transition-colors">Career Roadmaps</Link></li>
                <li><Link href="/playground" className="hover:text-white transition-colors">Interactive Playground</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resource Index</Link></li>
                <li><Link href="/research" className="hover:text-white transition-colors">Research Paper Hub</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Notes & Topics</p>
              <ul className="mt-4 space-y-2.5 text-xs text-white/70">
                <li><Link href="/subjects/machine-learning" className="hover:text-white transition-colors">ML Foundations</Link></li>
                <li><Link href="/subjects/machine-learning/simple-linear-regression" className="hover:text-white transition-colors">Linear Regression</Link></li>
                <li><Link href="/subjects/machine-learning/loss-function-and-gradient-descent" className="hover:text-white transition-colors">Gradient Descent</Link></li>
                <li><Link href="/subjects/machine-learning/ridge-and-lasso-regularization" className="hover:text-white transition-colors">Regularization</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Account</p>
              <ul className="mt-4 space-y-2.5 text-xs text-white/70">
                <li><Link href="/profile" className="hover:text-white transition-colors">User Profile</Link></li>
                <li><Link href="/learn" className="hover:text-white transition-colors">Saved Notes</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} epoch AI Platform. Built with paper-inspired design.
          </p>
          <div className="select-none font-display text-5xl font-[600] tracking-tighter text-white/15 sm:text-7xl">
            epoch
          </div>
        </div>
      </div>
    </footer>
  );
}
