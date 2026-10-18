import FrpTable from "@/components/FrpTable";

export default function Home() {
  return (
    <main className="min-h-screen p-6 sm:p-12 max-w-4xl mx-auto">
      {/* Vercel Header Badge & Title */}
      <header className="text-center my-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/15 text-xs text-neutral-600 dark:text-neutral-400 bg-black/[0.02] dark:bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Rashed FRP Tools
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black dark:text-white">
          Bypass FRP Lock.
        </h1>
        
        <p className="text-neutral-500 text-sm sm:text-base max-w-md mx-auto">
          Minimalist and fast intent launcher for Android FRP bypass shortcuts.
        </p>
      </header>

      {/* Table Component */}
      <FrpTable />

      {/* Vercel Style Minimal Footer */}
      <footer className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 text-center text-xs text-neutral-500">
        <p>Deployed on Vercel • Built with Next.js</p>
      </footer>
    </main>
  );
}
