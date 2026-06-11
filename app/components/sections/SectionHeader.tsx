type SectionHeaderProps = {
  num: string;
  title: string;
};

export default function SectionHeader({ num, title }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-display text-xs font-bold text-[#bbb]">{num}</span>
      <h2 className="font-display text-[26px] font-bold tracking-[-1px] text-[#111]">
        {title}
      </h2>
      <div className="h-px flex-1 self-center bg-black/10" />
    </div>
  );
}
