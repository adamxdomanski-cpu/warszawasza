"use client";

import { useEffect, useRef } from "react";
import { IoeSensor } from "../lib/ioe/IoeSensor";
import {
  EMPTY_IOE_SESSION,
  type IoeClosureEvent,
  type IoeSessionAggregate,
} from "../lib/ioe/types";

type UseIoeSessionOptions = {
  enabled?: boolean;
  hoverTargetRef?: React.RefObject<HTMLElement | null>;
  diagnosticsRef?: React.RefObject<HTMLDetailsElement | null>;
};

export function useIoeSession({
  enabled = true,
  hoverTargetRef,
  diagnosticsRef,
}: UseIoeSessionOptions) {
  const sensorRef = useRef<IoeSensor | null>(null);
  const finalizedRef = useRef<IoeSessionAggregate | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const sensor = new IoeSensor();
    sensorRef.current = sensor;
    sensor.start({
      hoverTarget: hoverTargetRef?.current ?? null,
      diagnosticsPanel: diagnosticsRef?.current ?? null,
    });

    return () => {
      sensor.stop();
      sensorRef.current = null;
    };
  }, [enabled, hoverTargetRef, diagnosticsRef]);

  const finalize = (closureEvent: IoeClosureEvent): IoeSessionAggregate => {
    if (finalizedRef.current) return finalizedRef.current;

    const sensor = sensorRef.current;
    if (!sensor) {
      finalizedRef.current = { ...EMPTY_IOE_SESSION, closureEvent };
      return finalizedRef.current;
    }

    finalizedRef.current = sensor.finalize(closureEvent);
    sensorRef.current = null;
    return finalizedRef.current;
  };

  return { finalize };
}
