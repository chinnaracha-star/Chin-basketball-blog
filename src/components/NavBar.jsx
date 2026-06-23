export function NavBar() {
  return (
    <header className="border-b border-[#e3ded6] px-5 py-3 sm:px-8 lg:px-16">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-0 py-0">
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
