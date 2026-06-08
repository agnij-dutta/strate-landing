/**
 * Single source of truth for the whitepaper's section anchors. The
 * TableOfContents sidebar and the scroll-spy observer both read from
 * here, and every content section in the page must carry a matching
 * `id`. Keep the order identical to the document order.
 */

export type TocEntry = {
  /** DOM id of the section heading. */
  id: string;
  /** Roman/short label shown in the rail, e.g. "Abstract" or "Part III". */
  kicker: string;
  /** Full section title. */
  title: string;
};

export const TOC: TocEntry[] = [
  { id: "abstract", kicker: "Abstract", title: "Abstract" },
  { id: "part-1", kicker: "Part I", title: "The Idea, Explained From Zero" },
  { id: "part-2", kicker: "Part II", title: "The Mechanism" },
  { id: "part-3", kicker: "Part III", title: "System Architecture" },
  { id: "part-4", kicker: "Part IV", title: "Why Stellar, Why Now" },
  { id: "part-5", kicker: "Part V", title: "Worked Examples" },
  { id: "part-6", kicker: "Part VI", title: "Security, Risks, and Mitigations" },
  { id: "part-7", kicker: "Part VII", title: "The Mainnet Beta Posture" },
  { id: "part-8", kicker: "Part VIII", title: "Roadmap and Milestones" },
  { id: "part-9", kicker: "Part IX", title: "Glossary" },
  { id: "references", kicker: "References", title: "References" },
];
