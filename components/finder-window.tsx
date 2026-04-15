"use client";

import { useState, useCallback } from "react";
import { ChevronRight, ChevronDown, ExternalLink } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FileNode = {
  id: string;
  name: string;
  type: "file";
  kind: string;
  modified: string;
  url?: string;
  preview: string;
};

type FolderNode = {
  id: string;
  name: string;
  type: "folder";
  modified: string;
  children: TreeNode[];
};

type TreeNode = FileNode | FolderNode;

// ─── Data ────────────────────────────────────────────────────────────────────

const ROOT: FolderNode = {
  id: "root",
  name: "nikolas.sapa",
  type: "folder",
  modified: "Apr 15, 2026",
  children: [
    {
      id: "about",
      name: "About.md",
      type: "file",
      kind: "Markdown Document",
      modified: "Apr 15, 2026",
      preview:
        "16. Athens, Greece.\n\nSolo founder, developer, builder. I make products from zero to shipped — and take on client web work for businesses that want something that actually looks and works great.\n\nNo templates. Everything custom. Always from scratch.",
    },
    {
      id: "services",
      name: "Services",
      type: "folder",
      modified: "Apr 15, 2026",
      children: [
        {
          id: "websites",
          name: "Websites.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "Marketing sites, portfolios, and brand presences.\n\nClean, fast, SEO-optimized. Built to represent your brand well and load instantly. Fully custom — no templates.",
        },
        {
          id: "web-apps",
          name: "Web Apps.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "Full-stack web applications.\n\nFrom MVPs to production-grade apps. Next.js, React, TypeScript, Supabase. Auth, databases, APIs, payments — the whole stack. Built to scale.",
        },
        {
          id: "landing-pages",
          name: "Landing Pages.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "High-converting, design-led landing pages.\n\nBuilt to rank and to convert. Clear hierarchy, strong copy structure, fast load times. Designed to turn visitors into customers.",
        },
        {
          id: "custom-systems",
          name: "Custom Systems.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "Bespoke backend systems and automations.\n\nSupabase databases, booking systems, custom ecommerce, internal tools, API integrations. If your business has a specific workflow that off-the-shelf software can't handle — this is where I come in.",
        },
      ],
    },
    {
      id: "work",
      name: "Work",
      type: "folder",
      modified: "Apr 15, 2026",
      children: [
        {
          id: "nr40",
          name: "nr40athens.com",
          type: "file",
          kind: "URL",
          modified: "Mar 2026",
          url: "https://nr40athens.com",
          preview:
            "Tattoo studio website — Athens, Greece.\n\nClean, dark, atmospheric site for a tattoo studio. Custom design, fast load, built to rank locally.",
        },
        {
          id: "allcity",
          name: "allcity-clothing",
          type: "file",
          kind: "URL",
          modified: "Mar 2026",
          url: "https://allcity-clothing.vercel.app/",
          preview:
            "Full custom ecommerce store — clothing brand.\n\nCompletely custom-built online store. Product pages, cart, checkout, inventory — everything. No Shopify template. Built from scratch with Next.js.",
        },
        {
          id: "hustlemedia",
          name: "hustle-media",
          type: "file",
          kind: "URL",
          modified: "Feb 2026",
          url: "https://hustle-media-rouge.vercel.app/",
          preview:
            "Agency website — SMMA.\n\nSharp, conversion-focused site for a social media marketing agency. Built to attract and convert leads.",
        },
        {
          id: "tsvc",
          name: "tsvcstudio.com",
          type: "file",
          kind: "URL",
          modified: "Feb 2026",
          url: "https://www.tsvcstudio.com/",
          preview:
            "Agency website — SMMA.\n\nProfessional digital agency presence. Clean layout, strong hierarchy, optimized to build trust quickly.",
        },
        {
          id: "521",
          name: "521.is",
          type: "file",
          kind: "URL",
          modified: "Apr 2026",
          url: "https://521.is/",
          preview:
            "Course landing page — geo-free location course.\n\nLanding page for a course teaching location independence. Clear value prop, direct copy, built to convert.",
        },
        {
          id: "storm",
          name: "storm-piercing.com",
          type: "file",
          kind: "URL",
          modified: "Apr 2026",
          url: "https://storm-piercing.com/en",
          preview:
            "Custom ecommerce + booking — piercing studio.\n\nFull custom store for a piercing studio: jewelry ecom, appointment booking, product pages. Everything built from scratch.",
        },
        {
          id: "portfolio",
          name: "nikolassapa.vercel.app",
          type: "file",
          kind: "URL",
          modified: "Apr 2026",
          url: "https://nikolassapa.vercel.app",
          preview:
            "Web dev portfolio — demos, rates, and contact.\n\nFull showcase of web development work, service details, and pricing. The place to go if you want to work together.",
        },
      ],
    },
    {
      id: "stack",
      name: "Stack.md",
      type: "file",
      kind: "Markdown Document",
      modified: "Apr 15, 2026",
      preview:
        "Next.js · React · TypeScript · Tailwind CSS\nSupabase · Vercel · Figma · React Native\n\nFast, reliable, modern. I pick boring tech that ships — and then push it to its limits. Everything goes on Vercel. Everything is designed in Figma first.",
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function findNode(node: TreeNode, id: string): TreeNode | null {
  if (node.id === id) return node;
  if (node.type === "folder") {
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M1 4.5C1 3.67 1.67 3 2.5 3H6L7.5 4.5H13.5C14.33 4.5 15 5.17 15 6V12.5C15 13.33 14.33 14 13.5 14H2.5C1.67 14 1 13.33 1 12.5V4.5Z"
        fill="#7BA7E8"
        stroke="#5A8ED4"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M3 2H10L13 5V14H3V2Z" fill="#fff" stroke="#C0C0C0" strokeWidth="0.8" />
      <path d="M10 2V5H13" fill="none" stroke="#C0C0C0" strokeWidth="0.8" />
      <line x1="5" y1="7.5" x2="11" y2="7.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="9.5" x2="11" y2="9.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="11.5" x2="9" y2="11.5" stroke="#C0C0C0" strokeWidth="0.7" />
    </svg>
  );
}

// ─── Tree Item ────────────────────────────────────────────────────────────────

type TreeItemProps = {
  node: TreeNode;
  depth: number;
  selected: string;
  openFolders: Set<string>;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
};

function TreeItem({ node, depth, selected, openFolders, onSelect, onToggle }: TreeItemProps) {
  const isFolder = node.type === "folder";
  const isOpen = isFolder && openFolders.has(node.id);
  const isSelected = selected === node.id;

  return (
    <div>
      <div
        className={[
          "flex items-center gap-1 py-[3px] pr-2 rounded cursor-pointer select-none",
          isSelected
            ? "bg-[#0064D2] text-white"
            : "text-[#1d1d1f] hover:bg-black/[0.06]",
        ].join(" ")}
        style={{ paddingLeft: `${6 + depth * 14}px` }}
        onClick={() => {
          onSelect(node.id);
          if (isFolder) onToggle(node.id);
        }}
      >
        <span className="w-3 h-3 flex-none flex items-center justify-center">
          {isFolder &&
            (isOpen ? (
              <ChevronDown size={9} className={isSelected ? "text-white" : "text-[#86868b]"} />
            ) : (
              <ChevronRight size={9} className={isSelected ? "text-white" : "text-[#86868b]"} />
            ))}
        </span>
        {isFolder ? (
          <FolderIcon className="w-4 h-4 flex-none" />
        ) : (
          <FileIcon className="w-4 h-4 flex-none" />
        )}
        <span className="ml-1 text-[12px] truncate leading-none">{node.name}</span>
      </div>

      {isFolder && isOpen &&
        node.children.map((child) => (
          <TreeItem
            key={child.id}
            node={child}
            depth={depth + 1}
            selected={selected}
            openFolders={openFolders}
            onSelect={onSelect}
            onToggle={onToggle}
          />
        ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FinderWindow() {
  const [selected, setSelected] = useState<string>("root");
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(["root"]));

  const toggleFolder = useCallback((id: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelected(id);
  }, []);

  const selectedNode = findNode(ROOT, selected);
  const rightItems: TreeNode[] =
    selectedNode?.type === "folder" ? selectedNode.children : [];
  const selectedFile: FileNode | null =
    selectedNode?.type === "file" ? selectedNode : null;

  return (
    <>
      {/* Tree panel — left sidebar */}
      <div className="w-52 flex-none border-r border-[#DCDCDC] bg-[#F6F6F6] overflow-y-auto py-1.5 px-1">
        <TreeItem
          node={ROOT}
          depth={0}
          selected={selected}
          openFolders={openFolders}
          onSelect={handleSelect}
          onToggle={toggleFolder}
        />
      </div>

      {/* Content panel — right */}
      <div className="flex-1 bg-white overflow-y-auto">
        {selectedFile ? (
          <div className="p-6">
            <div className="flex items-start gap-3 mb-5 pb-4 border-b border-[#EBEBEB]">
              <FileIcon className="w-9 h-9 flex-none mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1d1d1f] truncate">
                  {selectedFile.name}
                </p>
                <p className="text-[11px] text-[#86868b] mt-0.5">
                  {selectedFile.kind} · {selectedFile.modified}
                </p>
              </div>
              {selectedFile.url && (
                <a
                  href={selectedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-[#0064D2] hover:underline flex-none"
                >
                  Open <ExternalLink size={10} />
                </a>
              )}
            </div>
            <pre className="text-[12px] text-[#3d3d3d] leading-[1.6] whitespace-pre-wrap font-sans">
              {selectedFile.preview}
            </pre>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-4 px-4 py-1.5 border-b border-[#E5E5E5] bg-[#FAFAFA] sticky top-0">
              <span className="flex-1 text-[11px] font-medium text-[#86868b] select-none">Name</span>
              <span className="w-32 text-[11px] font-medium text-[#86868b] select-none">Date Modified</span>
              <span className="w-32 text-[11px] font-medium text-[#86868b] select-none">Kind</span>
            </div>
            {rightItems.length === 0 ? (
              <p className="p-6 text-[12px] text-[#86868b]">Empty folder</p>
            ) : (
              rightItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-4 py-[5px] hover:bg-[#F0F0F0] cursor-pointer border-b border-[#F0F0F0] last:border-0"
                  onClick={() => {
                    handleSelect(item.id);
                    if (item.type === "folder") toggleFolder(item.id);
                  }}
                >
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    {item.type === "folder" ? (
                      <FolderIcon className="w-4 h-4 flex-none" />
                    ) : (
                      <FileIcon className="w-4 h-4 flex-none" />
                    )}
                    <span className="text-[12px] text-[#1d1d1f] truncate">{item.name}</span>
                    {item.type === "file" && item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#0064D2] hover:opacity-70 flex-none"
                      >
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                  <span className="w-32 text-[11px] text-[#86868b] flex-none">{item.modified}</span>
                  <span className="w-32 text-[11px] text-[#86868b] flex-none">
                    {item.type === "folder" ? "Folder" : item.kind}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
