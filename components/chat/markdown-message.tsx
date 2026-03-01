"use client";

import React, { ReactNode } from "react";

type Props = {
  content: string;
  isDark: boolean;
  citationMap?: Record<number, { id: string; title: string; sectionId: string }>;
  onCitationClick?: (citationNumber: number) => void;
};

type InlineToken =
  | { type: "text"; value: string }
  | { type: "code"; value: string }
  | { type: "bold"; value: string }
  | { type: "italic"; value: string }
  | { type: "link"; label: string; href: string }
  | { type: "citation"; number: number };

function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let remaining = text;
  const citationGroupPattern = /\[\s*(\d+(?:\s*(?:,|;|\/|&|\band\b|\b및\b)\s*\d+)+)\s*\]/i;
  const citationSplitPattern = /\s*(?:,|;|\/|&|\band\b|\b및\b)\s*/i;

  const patterns: Array<{
    type: InlineToken["type"];
    regex: RegExp;
  }> = [
    { type: "code", regex: /`([^`]+)`/ },
    { type: "link", regex: /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/ },
    { type: "text", regex: citationGroupPattern },
    { type: "citation", regex: /\[\s*(\d+)\s*\]/ },
    { type: "bold", regex: /\*\*([^*]+)\*\*/ },
    { type: "italic", regex: /\*([^*]+)\*/ },
  ];

  while (remaining.length > 0) {
    let best:
      | {
          index: number;
          match: RegExpExecArray;
          type: InlineToken["type"];
        }
      | undefined;

    for (const pattern of patterns) {
      const match = pattern.regex.exec(remaining);
      if (!match) {
        continue;
      }
      if (!best || match.index < best.index) {
        best = { index: match.index, match, type: pattern.type };
      }
    }

    if (!best) {
      tokens.push({ type: "text", value: remaining });
      break;
    }

    if (best.index > 0) {
      tokens.push({ type: "text", value: remaining.slice(0, best.index) });
    }

    if (best.type === "link") {
      tokens.push({
        type: "link",
        label: best.match[1],
        href: best.match[2],
      });
    } else if (best.type === "text") {
      const citationNumbers = best.match[1]
        .split(citationSplitPattern)
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isInteger(value) && value > 0);

      if (citationNumbers.length > 1) {
        citationNumbers.forEach((citationNumber, citationIndex) => {
          tokens.push({
            type: "citation",
            number: citationNumber,
          });
          if (citationIndex < citationNumbers.length - 1) {
            tokens.push({ type: "text", value: "," });
          }
        });
      } else {
        tokens.push({ type: "text", value: best.match[0] });
      }
    } else if (best.type === "citation") {
      tokens.push({
        type: "citation",
        number: Number(best.match[1]),
      });
    } else {
      tokens.push({
        type: best.type as "code" | "bold" | "italic",
        value: best.match[1],
      });
    }

    remaining = remaining.slice(best.index + best.match[0].length);
  }

  return tokens;
}

function renderInline(
  text: string,
  keyPrefix: string,
  isDark: boolean,
  citationMap?: Record<number, { id: string; title: string; sectionId: string }>,
  onCitationClick?: (citationNumber: number) => void
): ReactNode[] {
  const tokens = parseInline(text);
  return tokens.map((token, index) => {
    const key = `${keyPrefix}-${index}`;
    if (token.type === "text") {
      return <React.Fragment key={key}>{token.value}</React.Fragment>;
    }
    if (token.type === "code") {
      return (
        <code
          key={key}
          className="rounded px-1 py-0.5 text-[0.9em]"
          style={{
            backgroundColor: isDark ? "hsl(0 0% 18%)" : "hsl(0 0% 88%)",
          }}
        >
          {token.value}
        </code>
      );
    }
    if (token.type === "bold") {
      return <strong key={key}>{token.value}</strong>;
    }
    if (token.type === "italic") {
      return <em key={key}>{token.value}</em>;
    }
    if (token.type === "citation") {
      const citation = citationMap?.[token.number];
      if (!citation || !onCitationClick) {
        return <React.Fragment key={key}>[{token.number}]</React.Fragment>;
      }
      return (
        <sup key={key} className="ml-[0.1em] align-super leading-none">
          <button
            type="button"
            onClick={() => onCitationClick(token.number)}
            className="inline-flex px-[0.08em] font-semibold underline underline-offset-2"
            style={{
              fontSize: "0.72em",
              color: isDark ? "hsl(76 76% 62%)" : "hsl(76 88% 24%)",
            }}
            aria-label={`Go to source [${token.number}]: ${citation.title}`}
          >
            [{token.number}]
          </button>
        </sup>
      );
    }
    return (
      <a
        key={key}
        href={token.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 break-all"
      >
        {token.label}
      </a>
    );
  });
}

function renderMarkdown(
  content: string,
  isDark: boolean,
  citationMap?: Record<number, { id: string; title: string; sectionId: string }>,
  onCitationClick?: (citationNumber: number) => void
): ReactNode[] {
  const blocks = content.split(/```/g);
  const result: ReactNode[] = [];

  blocks.forEach((block, blockIndex) => {
    const keyPrefix = `block-${blockIndex}`;
    const isCodeBlock = blockIndex % 2 === 1;

    if (isCodeBlock) {
      result.push(
        <pre
          key={keyPrefix}
          className="overflow-x-auto rounded-lg px-3 py-2 text-xs"
          style={{
            backgroundColor: isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 90%)",
          }}
        >
          <code>{block.trim()}</code>
        </pre>
      );
      return;
    }

    const lines = block.split("\n");
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trimEnd();
      if (!line.trim()) {
        i += 1;
        continue;
      }

      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length;
        const text = heading[2];
        const className =
          level <= 2 ? "text-base font-bold" : level <= 4 ? "text-sm font-bold" : "text-sm font-semibold";
        result.push(
          <p key={`${keyPrefix}-h-${i}`} className={className}>
            {renderInline(text, `${keyPrefix}-h-inline-${i}`, isDark, citationMap, onCitationClick)}
          </p>
        );
        i += 1;
        continue;
      }

      if (/^>\s+/.test(line)) {
        result.push(
          <blockquote
            key={`${keyPrefix}-q-${i}`}
            className="border-l-2 pl-3 text-xs opacity-90"
            style={{ borderColor: "#C3E41D" }}
          >
            {renderInline(
              line.replace(/^>\s+/, ""),
              `${keyPrefix}-q-inline-${i}`,
              isDark,
              citationMap,
              onCitationClick
            )}
          </blockquote>
        );
        i += 1;
        continue;
      }

      if (/^[-*]\s+/.test(line)) {
        const items: string[] = [];
        let j = i;
        while (j < lines.length && /^[-*]\s+/.test(lines[j].trim())) {
          items.push(lines[j].trim().replace(/^[-*]\s+/, ""));
          j += 1;
        }
        result.push(
          <ul key={`${keyPrefix}-ul-${i}`} className="list-disc pl-5 space-y-1">
            {items.map((item, itemIndex) => (
              <li key={`${keyPrefix}-ul-item-${i}-${itemIndex}`}>
                {renderInline(
                  item,
                  `${keyPrefix}-ul-inline-${i}-${itemIndex}`,
                  isDark,
                  citationMap,
                  onCitationClick
                )}
              </li>
            ))}
          </ul>
        );
        i = j;
        continue;
      }

      if (/^\d+\.\s+/.test(line)) {
        const items: string[] = [];
        let j = i;
        while (j < lines.length && /^\d+\.\s+/.test(lines[j].trim())) {
          items.push(lines[j].trim().replace(/^\d+\.\s+/, ""));
          j += 1;
        }
        result.push(
          <ol key={`${keyPrefix}-ol-${i}`} className="list-decimal pl-5 space-y-1">
            {items.map((item, itemIndex) => (
              <li key={`${keyPrefix}-ol-item-${i}-${itemIndex}`}>
                {renderInline(
                  item,
                  `${keyPrefix}-ol-inline-${i}-${itemIndex}`,
                  isDark,
                  citationMap,
                  onCitationClick
                )}
              </li>
            ))}
          </ol>
        );
        i = j;
        continue;
      }

      const paragraphLines = [line];
      let j = i + 1;
      while (
        j < lines.length &&
        lines[j].trim() &&
        !/^(#{1,6})\s+/.test(lines[j].trim()) &&
        !/^>\s+/.test(lines[j].trim()) &&
        !/^[-*]\s+/.test(lines[j].trim()) &&
        !/^\d+\.\s+/.test(lines[j].trim())
      ) {
        paragraphLines.push(lines[j].trim());
        j += 1;
      }

      result.push(
        <p key={`${keyPrefix}-p-${i}`} className="whitespace-pre-wrap">
          {renderInline(
            paragraphLines.join("\n"),
            `${keyPrefix}-p-inline-${i}`,
            isDark,
            citationMap,
            onCitationClick
          )}
        </p>
      );
      i = j;
    }
  });

  return result;
}

export default function MarkdownMessage({ content, isDark, citationMap, onCitationClick }: Props) {
  return <div className="space-y-2">{renderMarkdown(content, isDark, citationMap, onCitationClick)}</div>;
}
