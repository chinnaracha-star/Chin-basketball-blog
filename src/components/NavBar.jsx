export function NavBar() {
  return (
    <header className="px-5 py-4 sm:px-8 lg:px-16">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-lg border border-[#ddd7cd] bg-[#fdfcf9] px-4 py-3 shadow-sm">
        <a href="#" className="text-lg font-semibold tracking-tight text-[#302c29]">
          hh.
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-[#d8d2c9] bg-white px-4 py-2 text-xs font-medium text-[#4c4742] transition hover:bg-[#f3f0ea]"
          >
            Log in
          </button>
          <button
            type="button"
            className="rounded-full bg-[#262321] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#3a3530]"
          >
            Sign up
          </button>
        </div>
      </nav>
    </header>
  );
}
