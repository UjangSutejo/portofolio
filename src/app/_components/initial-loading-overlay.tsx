"use client";

import { useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 900;
const COMPLETE_DELAY_MS = 500;
const FADE_MS = 320;
const INITIAL_PAUSE_MS = 600;
const PROGRESS_STAGES = [
  { target: 78, duration: 420, pause: 400 },
  { target: 99, duration: 360, pause: 700 },
  { target: 100, duration: 280, pause: 0 },
] as const;

type InitialLoadingOverlayProps = {
  onExitStart?: () => void;
  onHidden?: () => void;
};

export function InitialLoadingOverlay({
  onExitStart,
  onHidden,
}: InitialLoadingOverlayProps) {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");
  const [progress, setProgress] = useState(0);
  const readyRef = useRef(false);
  const progressRef = useRef(0);
  const exitScheduledRef = useRef(false);
  const exitingRef = useRef(false);

  useEffect(() => {
    const start = window.performance.now();
    let finishTimeout = 0;
    let completeDelayTimeout = 0;
    let fadeTimeout = 0;
    let animationFrame = 0;
    let pausedTimeout = 0;

    const startExit = () => {
      if (exitingRef.current) {
        return;
      }

      exitingRef.current = true;
      onExitStart?.();
      window.dispatchEvent(new Event("portfolio-loading-complete"));
      setPhase("fading");

      fadeTimeout = window.setTimeout(() => {
        setPhase("hidden");
        onHidden?.();
      }, FADE_MS);
    };

    const scheduleExit = () => {
      if (exitScheduledRef.current || exitingRef.current) {
        return;
      }

      exitScheduledRef.current = true;
      completeDelayTimeout = window.setTimeout(startExit, COMPLETE_DELAY_MS);
    };

    const animateTo = (target: number, duration: number) =>
      new Promise<void>((resolve) => {
        const from = progressRef.current;
        const startTime = window.performance.now();

        const step = () => {
          if (exitingRef.current) {
            resolve();
            return;
          }

          const elapsed = window.performance.now() - startTime;
          const rawProgress = Math.min(elapsed / duration, 1);
          const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
          const next = Math.round(from + (target - from) * easedProgress);

          progressRef.current = next;
          setProgress(next);

          if (rawProgress < 1) {
            animationFrame = window.requestAnimationFrame(step);
            return;
          }

          resolve();
        };

        animationFrame = window.requestAnimationFrame(step);
      });

    const runSequence = async () => {
      await new Promise((resolve) => {
        pausedTimeout = window.setTimeout(resolve, INITIAL_PAUSE_MS);
      });

      for (const stage of PROGRESS_STAGES) {
        await animateTo(stage.target, stage.duration);

        if (stage.pause > 0) {
          await new Promise((resolve) => {
            pausedTimeout = window.setTimeout(resolve, stage.pause);
          });
        }
      }

      if (readyRef.current) {
        scheduleExit();
      }
    };

    const finish = () => {
      const elapsed = window.performance.now() - start;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

      readyRef.current = true;

      finishTimeout = window.setTimeout(() => {
        if (progressRef.current < 100) {
          return;
        }

        scheduleExit();
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    void runSequence();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(pausedTimeout);
      window.clearTimeout(finishTimeout);
      window.clearTimeout(completeDelayTimeout);
      window.clearTimeout(fadeTimeout);
      window.removeEventListener("load", finish);
    };
  }, [onExitStart, onHidden]);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      className={`pointer-events-auto fixed inset-0 z-[100] flex items-center justify-center bg-[#FFDBBB] text-[#1f1813] transition-opacity duration-300 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="font-display text-[2rem] font-medium leading-none tracking-[-0.04em]">
        {progress}%
      </span>
    </div>
  );
}
