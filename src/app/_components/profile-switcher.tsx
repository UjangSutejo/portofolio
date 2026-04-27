"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { ProfileSwitcherItem } from "../data/portfolio-content";

type ProfileSwitcherProps = {
  items: ProfileSwitcherItem[];
  cursorAssetPath?: string | null;
  className?: string;
};

export function ProfileSwitcher({
  items,
  cursorAssetPath,
  className,
}: ProfileSwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const ringRef = useRef<HTMLSpanElement | null>(null);
  const mediaFrameRef = useRef<HTMLSpanElement | null>(null);
  const ringTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const activeItemId = items.length > 0 ? items[activeIndex % items.length]!.id : "";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateSupport = () => {
      setSupportsHover(mediaQuery.matches);
    };

    updateSupport();
    mediaQuery.addEventListener("change", updateSupport);

    return () => {
      mediaQuery.removeEventListener("change", updateSupport);
    };
  }, []);

  useEffect(() => {
    if (!ringRef.current || items.length === 0) {
      return;
    }

    if (isHovered) {
      ringTimelineRef.current?.kill();

      gsap.set(ringRef.current, {
        boxShadow:
          "0 0 0 5px rgba(240, 207, 76, 0.92), 0 0 10px rgba(207, 190, 120, 0.28), 0 0 18px rgba(207, 190, 120, 0.2)",
      });

      ringTimelineRef.current = gsap
        .timeline({
          repeat: -1,
          defaults: { duration: 0.75, ease: "sine.inOut" },
        })
        .to(ringRef.current, {
          boxShadow:
            "0 0 0 5px rgb(111, 185, 67), 0 0 10px rgba(146, 184, 141, 0.28), 0 0 18px rgba(146, 184, 141, 0.2)",
        })
        .to(ringRef.current, {
          boxShadow:
            "0 0 0 5px rgba(77, 160, 223, 0.95), 0 0 10px rgba(132, 170, 199, 0.28), 0 0 18px rgba(132, 170, 199, 0.2)",
        })
        .to(ringRef.current, {
          boxShadow:
            "0 0 0 5px rgba(233, 202, 81, 0.95), 0 0 10px rgba(207, 190, 120, 0.28), 0 0 18px rgba(207, 190, 120, 0.2)",
        });

      return;
    }

    ringTimelineRef.current?.kill();
    ringTimelineRef.current = null;
  }, [isHovered, items.length]);

  useEffect(() => {
    return () => {
      ringTimelineRef.current?.kill();
    };
  }, [items.length]);

  useEffect(() => {
    if (supportsHover) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        buttonRef.current &&
        event.target instanceof Node &&
        buttonRef.current.contains(event.target)
      ) {
        setIsTouchActive(true);
        return;
      }

      setIsTouchActive(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [supportsHover]);

  useEffect(() => {
    if (!mediaFrameRef.current) {
      return;
    }

    const shouldRoundContent =
      activeItemId === "japanese-logo"
        ? supportsHover
          ? isHovered
          : isTouchActive
        : true;
    const mediaRadius = shouldRoundContent ? "0.75rem" : "0rem";

    gsap.to(mediaFrameRef.current, {
      borderRadius: mediaRadius,
      duration: 0.26,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [activeItemId, isHovered, isTouchActive, supportsHover]);

  if (items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex % items.length]!;
  const hoverCursor = cursorAssetPath
    ? `url("${cursorAssetPath}") 24 24, help`
    : "help";
  const isRingVisible = supportsHover ? isHovered : isTouchActive;

  return (
    <div
      className={`md:fixed md:top-12 md:left-12 md:z-20 ${className ?? ""}`}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label="Cycle profile switcher visual"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onPointerDown={() => {
          if (!supportsHover) {
            setIsTouchActive(true);
          }
        }}
        onClick={() => {
          setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
        }}
        className="group relative block h-[3rem] w-[3rem] rounded-none bg-transparent p-0 shadow-none outline-none md:h-[3.1rem] md:w-[3.1rem]"
        style={{
          cursor: isRingVisible ? hoverCursor : "default",
        }}
      >
        <span
          ref={ringRef}
          className={`profile-switcher-ring pointer-events-none absolute inset-0 z-20 rounded-[1rem] opacity-0 transition-opacity duration-300 ${
            isRingVisible ? "opacity-100" : ""
          }`}
          style={
            {
              "--profile-frame-tone": activeItem.frameTone,
            } as CSSProperties
          }
        />

        <span
          ref={mediaFrameRef}
          className="absolute inset-0 z-10 overflow-hidden bg-transparent"
        >
          <span
            key={activeItem.id}
            className="profile-switcher-stage absolute inset-0"
          >
            {activeItem.type === "glyph" ? (
              <span className="flex h-full w-full items-center justify-center bg-[#1d1d1d] font-display text-[2rem] font-medium leading-none text-white md:text-[2.2rem]">
                {activeItem.glyph}
              </span>
            ) : (
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                width={256}
                height={256}
                sizes="(max-width: 768px) 54px, 61px"
                className="h-full w-full object-cover"
              />
            )}
          </span>
        </span>
      </button>
    </div>
  );
}
