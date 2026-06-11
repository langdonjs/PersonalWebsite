"use client";

import { useMemo, useState } from "react";
import { bookshelf, type BookEntry } from "../../data/bookshelf";

type Tab = "all" | "favorites" | BookEntry["category"];
type SortKey = "title" | "rating" | "category";

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "favorites", label: "★ Favorites" },
  { id: "technical", label: "Technical" },
  { id: "advice", label: "Advice" },
  { id: "nonfiction", label: "Nonfiction" },
  { id: "fiction", label: "Fiction" },
];

const categoryStyles: Record<BookEntry["category"], string> = {
  technical: "bg-[#111] text-[#f8f7f4]",
  advice: "bg-[#e8e4dc] text-[#555]",
  nonfiction: "bg-black/8 text-[#555]",
  fiction: "bg-white text-[#777] border border-black/15",
};

export default function Bookshelf() {
  const [tab, setTab] = useState<Tab>("all");
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortAsc, setSortAsc] = useState(false);

  const entries = useMemo(() => {
    const filtered = bookshelf.filter((entry) => {
      if (tab === "all") return true;
      if (tab === "favorites") return entry.favorite;
      return entry.category === tab;
    });
    const sorted = [...filtered].sort((a, b) => {
      const cmp =
        sortKey === "rating"
          ? a.rating - b.rating
          : a[sortKey].localeCompare(b[sortKey]);
      return sortAsc ? cmp : -cmp;
    });
    return sorted;
  }, [tab, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "title");
    }
  };

  const sortIndicator = (key: SortKey) =>
    sortKey === key ? (sortAsc ? " ↑" : " ↓") : "";

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors ${
              tab === t.id
                ? "bg-[#111] text-[#f8f7f4]"
                : "border border-black/12 text-[#777] hover:border-black/30 hover:text-[#111]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-black/15 text-[10px] uppercase tracking-[1.5px] text-[#999]">
              <th
                className="cursor-pointer select-none py-2.5 pr-4 font-semibold hover:text-[#111]"
                onClick={() => toggleSort("title")}
              >
                Title{sortIndicator("title")}
              </th>
              <th
                className="cursor-pointer select-none py-2.5 pr-4 font-semibold hover:text-[#111]"
                onClick={() => toggleSort("category")}
              >
                Category{sortIndicator("category")}
              </th>
              <th className="py-2.5 pr-4 font-semibold">Medium</th>
              <th
                className="cursor-pointer select-none py-2.5 font-semibold hover:text-[#111]"
                onClick={() => toggleSort("rating")}
              >
                Rating{sortIndicator("rating")}
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.title}
                className="border-b border-black/8 align-top transition-colors hover:bg-black/[0.025]"
              >
                <td className="max-w-[300px] py-3.5 pr-4">
                  <p className="font-display text-[13.5px] font-bold text-[#111]">
                    {entry.favorite && <span className="mr-1 text-[#bbb]">★</span>}
                    {entry.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#999]">{entry.author}</p>
                  <p className="mt-1.5 text-[11px] italic leading-[1.6] text-[#777]">
                    {entry.takeaway}
                  </p>
                </td>
                <td className="py-3.5 pr-4">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${categoryStyles[entry.category]}`}
                  >
                    {entry.category}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-[11px] text-[#777]">{entry.medium}</td>
                <td className="py-3.5 text-[12px] font-bold text-[#111]">
                  {entry.rating}
                  <span className="font-normal text-[#bbb]">/10</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[10px] uppercase tracking-[1px] text-[#bbb]">
        {entries.length} {entries.length === 1 ? "entry" : "entries"}
      </p>
    </div>
  );
}
