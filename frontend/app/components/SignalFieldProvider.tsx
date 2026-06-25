"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { prefersReducedMotion } from "../../lib/attention";
import { signalFieldEngine } from "../../lib/signalFieldEngine";

type SignalFieldContextValue = {
  active: boolean;
  engine: typeof signalFieldEngine;
};

const SignalFieldContext = createContext<SignalFieldContextValue>({
  active: false,
  engine: signalFieldEngine,
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

  useEffect(() => {
    signalFieldEngine.setEnabled(active);
    if (!active) return;

    const onPointer = (event: PointerEvent) => {
      signalFieldEngine.setPointer(event.clientX, event.clientY);
    };

    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0] ?? event.changedTouches[0];
      if (touch) signalFieldEngine.setPointer(touch.clientX, touch.clientY);
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
    };
  }, [active]);

  const value = { active, engine: signalFieldEngine };

  return (
    <SignalFieldContext.Provider value={value}>{children}</SignalFieldContext.Provider>
  );
}
