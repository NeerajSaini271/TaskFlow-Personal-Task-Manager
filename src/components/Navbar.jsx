export default function Navbar({ children }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-[#07111f]/85">
      <nav
        className="mx-auto flex min-h-16 w-[min(1180px,calc(100%-2rem))] items-center justify-between"
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          className="brand-type inline-flex items-center gap-3 font-black"
        >
          <img
            src="/taskflow-mark.svg"
            alt=""
            className="size-10 drop-shadow-[0_10px_20px_rgba(79,70,229,0.28)]"
          />
          <span>
            <span className="block text-lg leading-none">TaskFlow</span>
            <span className="mt-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Make progress visible
            </span>
          </span>
        </a>
        {children}
      </nav>
    </header>
  );
}
