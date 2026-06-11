export default function Footer() {
  return (
    <footer className="flex items-center gap-3 px-5 py-12 sm:px-9">
      <div className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent" />
      <p className="text-[10px] uppercase tracking-[1px] text-[#bbb]">
        © {new Date().getFullYear()} Langdon Huynh
      </p>
      <div className="h-px flex-1 bg-gradient-to-l from-black/10 to-transparent" />
    </footer>
  );
}
