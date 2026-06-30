"use client";

import {
  createElement,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import {
  type SignalDirection,
  triggerSignalDetection,
} from "../../lib/signalInteraction";

type SignalControlProps<T extends ElementType> = {
  as?: T;
  direction?: SignalDirection;
  className?: string;
  children: ReactNode;
  onSignal?: () => void;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function SignalControl<T extends ElementType = "button">({
  as,
  direction = "none",
  className = "",
  children,
  onSignal,
  onPointerDown,
  onClick,
  ...rest
}: SignalControlProps<T>) {
  const Component = (as ?? "button") as ElementType;
  const elRef = useRef<HTMLElement>(null);

  const detect = () => {
    requestAnimationFrame(() => {
      triggerSignalDetection(elRef.current);
      onSignal?.();
    });
  };

  return createElement(
    Component,
    {
      ...rest,
      ref: elRef,
      className:
        `signal-control max-w-full min-w-0 break-words [overflow-wrap:anywhere] ${className}`.trim(),
      "data-signal-dir": direction,
      onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
        detect();
        if (typeof onPointerDown === "function") onPointerDown(event);
      },
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        if (typeof onClick === "function") onClick(event);
      },
    },
    children,
  );
}
