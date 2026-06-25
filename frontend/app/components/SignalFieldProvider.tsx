"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { prefersReducedMotion } from "../../lib/attention";
import { signalFieldEngine } from "../../lib/signalFieldEngine";
import { structureRevealEngine } from "../../lib/structureRevealEngine";

type SignalFieldContextValue = {
  active: boolean;
  engine: typeof signalFieldEngine;
  registerStructureAnchor: (el: HTMLElement) => () => void;
};

const SignalFieldContext = createContext<SignalFieldContextValue>({
  active: false,
  engine: signalFieldEngine,
  registerStructureAnchor: () => () => {},
});

export function useSignalField() {
  return useContext(SignalFieldContext);
}

type SignalFieldProviderProps = {
  children: ReactNode;
};

export default function SignalFieldProvider({ children }: SignalFieldProviderProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(!prefersReducedMotion());
  }, []);

  const registerStructureAnchor = useCallback(
    (el: HTMLElement) => {
      if (!active) {
        el.classList.add("fira-structure-revealed");
        return () => el.classList.remove("fira-structure-revealed");
      }
      return structureRevealEngine.register(el);
    },
    [active],
  );

  useEffect(() => {
    signalFieldEngine.setEnabled(active);
    structureRevealEngine.setEnabled(active);
    if (!active) return;

    const onPointer = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      signalFieldEngine.setPointer(clientX, clientY);
      structureRevealEngine.setPointer(clientX, clientY);
    };

    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0] ?? event.changedTouches[0];
      if (!touch) return;
      signalFieldEngine.setPointer(touch.clientX, touch.clientY);
      structureRevealEngine.setPointer(touch.clientX, touch.clientY);
    };

    const onLayout = () => signalFieldEngine.markLayoutDirty();

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", onLayout, { passive: true });
    window.addEventListener("scroll", onLayout, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onLayout);
      window.removeEventListener("scroll", onLayout);
      signalFieldEngine.setEnabled(false);
      structureRevealEngine.setEnabled(false);
    };
  }, [active]);

  const value = useMemo(
    () => ({ active, engine: signalFieldEngine, registerStructureAnchor }),
    [active, registerStructureAnchor],
  );

  return (
    <SignalFieldContext.Provider value={value}>{children}</SignalFieldContext.Provider>
  );
}
