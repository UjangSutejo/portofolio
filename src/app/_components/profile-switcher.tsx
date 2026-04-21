"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { ProfileSwitcherItem } from "../data/portfolio-content";

type ProfileSwitcherProps = {
  items: ProfileSwitcherItem[];
  cursorAssetPath?: string | null;
};

export function ProfileSwitcher({
  items,
  cursorAssetPath,
}: ProfileSwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ringRef = useRef<HTMLSpanElement | null>(null);
  const mediaFrameRef = useRef<HTMLSpanElement | null>(null);
  const ringTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const activeItemId = items.length > 0 ? items[activeIndex % items.length]!.id : "";

  useEffect(() => {
    if (!ringRef.current || items.length === 0) {
      return;
    }

    if (isHovered) {
      ringTimelineRef.current?.kill();

      gsap.set(ringRef.current, {
        boxShadow:
          "0 0 0 5px rgba(207, 190, 120, 0.95), 0 0 10px rgba(207, 190, 120, 0.28), 0 0 18px rgba(207, 190, 120, 0.2)",
      });

      ringTimelineRef.current = gsap
        .timeline({
          repeat: -1,
          defaults: { duration: 0.75, ease: "sine.inOut" },
        })
        .to(ringRef.current, {
          boxShadow:
            "0 0 0 5px rgba(146, 184, 141, 0.95), 0 0 10px rgba(146, 184, 141, 0.28), 0 0 18px rgba(146, 184, 141, 0.2)",
        })
        .to(ringRef.current, {
          boxShadow:
            "0 0 0 5px rgba(132, 170, 199, 0.95), 0 0 10px rgba(132, 170, 199, 0.28), 0 0 18px rgba(132, 170, 199, 0.2)",
        })
        .to(ringRef.current, {
          boxShadow:
            "0 0 0 5px rgba(207, 190, 120, 0.95), 0 0 10px rgba(207, 190, 120, 0.28), 0 0 18px rgba(207, 190, 120, 0.2)",
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
    if (!mediaFrameRef.current) {
      return;
    }

    const shouldRoundContent =
      activeItemId === "japanese-logo" ? isHovered : true;
    const mediaRadius = shouldRoundContent ? "0.75rem" : "0rem";

    gsap.to(mediaFrameRef.current, {
      borderRadius: mediaRadius,
      duration: 0.26,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [activeItemId, isHovered]);

  if (items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex % items.length]!;
  const hoverCursor = cursorAssetPath
    ? `url("${cursorAssetPath}") 24 24, help`
    : "help";

  return (
    <div className="mt-8 px-6 md:fixed md:top-12 md:left-12 md:z-20 md:mt-0 md:px-0">
      <button
        type="button"
        aria-label="Cycle profile switcher visual"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onClick={() => {
          setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
        }}
        className="group relative block h-[3.4rem] w-[3.4rem] rounded-none bg-transparent p-0 shadow-none outline-none md:h-[3.8rem] md:w-[3.8rem]"
        style={{
          cursor: isHovered ? hoverCursor : "default",
        }}
      >
        <span
          ref={ringRef}
          className={`profile-switcher-ring pointer-events-none absolute inset-0 z-20 rounded-[1rem] opacity-0 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : ""
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
