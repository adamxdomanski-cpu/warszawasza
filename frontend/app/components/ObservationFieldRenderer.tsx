"use client";

import { useEffect, useRef, useState } from "react";
import { fieldLayoutEngine } from "../../lib/knowledge/LayoutEngine";
import { knowledgeGraph } from "../../lib/knowledge/KnowledgeGraph";
import type { RenderGraph } from "../../lib/knowledge/types";

type ObservationFieldRendererProps = {
  active: boolean;
};

const DEFAULT_VIEWPORT = { width: 800, height: 600 };

export default function ObservationFieldRenderer({ active }: ObservationFieldRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<{ render: RenderGraph; width: number; height: number } | null>(
    null,
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const layout = () => {
      const width = el.clientWidth || DEFAULT_VIEWPORT.width;
      const height = Math.max(280, Math.min(520, width * 0.65));
      const snapshot = knowledgeGraph.buildSnapshot();
      setGraph({
        render: fieldLayoutEngine.layout(snapshot, { width, height }),
        width,
        height,
      });
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (!graph) {
    return (
      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />
    );
  }

  const nodeById = new Map(graph.render.nodes.map((n) => [n.id, n]));

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-40"
      }`}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${graph.width} ${graph.height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d={graph.render.ringPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.6}
          className="text-accent/12"
        />
        {graph.render.edges.map((edge) => {
          const from = nodeById.get(edge.from);
          const to = nodeById.get(edge.to);
          if (!from || !to) return null;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeWidth={0.4}
              className="text-accent/18"
            />
          );
        })}
        {graph.render.nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.radius}
            className={node.tier === "core" ? "fill-accent/35" : "fill-accent/15"}
          />
        ))}
      </svg>
    </div>
  );
}
