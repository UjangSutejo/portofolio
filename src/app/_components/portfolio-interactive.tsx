"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const HOVER_CAPABLE_QUERY = "(hover: hover) and (pointer: fine)";
const PREVIEW_OFFSET_X = 42;
const PREVIEW_SCALE_FROM = 0.96;
const ACTIVE_BUTTON_SHADOW = "0 22px 52px rgba(102, 73, 48, 0.18)";

type Project = {
  id: string;
  title: string;
  year: string;
  projectHeadline: string;
  preview: {
    type: "placeholder";
    label: string;
    note: string;
  };
};

type PortfolioInteractiveProps = {
  projects: Project[];
  headerLinks: string[];
  headlineName: string;
  companyName: string;
  bio: string;
};

export function PortfolioInteractive({
  projects,
  headerLinks,
  headlineName,
  companyName,
  bio,
}: PortfolioInteractiveProps) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);
  const [previewDirection, setPreviewDirection] = useState<"left" | "right">(
    "right",
  );
  const previewRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeProject =
    projects.find((project) => project.id === activeProjectId) ?? null;

  useEffect(() => {
    const mediaQuery = window.matchMedia(HOVER_CAPABLE_QUERY);

    const updateHoverCapability = () => {
      setSupportsHover(mediaQuery.matches);
    };

    updateHoverCapability();
    mediaQuery.addEventListener("change", updateHoverCapability);

    return () => {
      mediaQuery.removeEventListener("change", updateHoverCapability);
    };
  }, []);

  useEffect(() => {
    if (!previewRef.current || !activeProject) {
      return;
    }

    gsap.fromTo(
      previewRef.current,
      {
        autoAlpha: 0,
        x: previewDirection === "left" ? -PREVIEW_OFFSET_X : PREVIEW_OFFSET_X,
        scale: PREVIEW_SCALE_FROM,
      },
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 0.52,
        ease: "power3.out",
        clearProps: "transform",
      },
    );
  }, [activeProject, activeProjectId, previewDirection]);

  useEffect(() => {
    buttonRefs.current.forEach((button, index) => {
      if (!button) {
        return;
      }

      const isActive = projects[index]?.id === activeProjectId;

      gsap.to(button, {
        duration: isActive ? 0.28 : 0.22,
        ease: "power2.out",
        y: isActive ? -1 : 0,
        boxShadow: isActive ? ACTIVE_BUTTON_SHADOW : "0 0 0 rgba(102, 73, 48, 0)",
      });
    });
  }, [activeProjectId, projects]);

  return (
    <>
      <section className="order-2 w-full md:order-1 md:w-1/3">
        <div
          className="flex w-full flex-col gap-1 border-t border-on-surface/10 md:inline-flex md:w-fit md:border-t-0"
          onMouseLeave={() => {
            if (supportsHover) {
              setActiveProjectId(null);
            }
          }}
        >
          {projects.map((project, index) => {
            const isActive = project.id === activeProjectId;

            return (
              <button
                key={project.id}
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                type="button"
                onMouseEnter={(event) => {
                  if (supportsHover) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const midpointX = rect.left + rect.width / 2;

                    setPreviewDirection(
                      event.clientX < midpointX ? "left" : "right",
                    );

                    setActiveProjectId(project.id);
                  }
                }}
                onFocus={() => {
                  setActiveProjectId(project.id);
                }}
                onClick={() => {
                  setActiveProjectId((currentId) =>
                    currentId === project.id && !supportsHover ? null : project.id,
                  );
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setActiveProjectId(null);
                  }
                }}
                className={`inline-flex w-full cursor-pointer items-center justify-between gap-6 border-b border-on-surface/10 px-5 py-4 text-left transition-[background-color,border-radius] duration-300 md:w-fit md:justify-start md:border-b-0 ${
                  isActive
                    ? "rounded-[1.75rem] bg-white/55"
                    : "rounded-[1.75rem] bg-transparent"
                }`}
              >
                <span className="text-sm font-normal text-[#1f2120] md:text-base md:leading-none">
                  {project.title}
                </span>
                <span className="text-xs font-light tabular-nums text-secondary md:text-sm md:leading-none">
                  {project.year}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="order-1 flex w-full flex-col justify-start pt-2 md:fixed md:top-30 md:right-12 md:w-[calc(66.666667%-6rem)] md:max-w-[48rem] md:pt-0">
        {activeProject ? (
          <div className="mb-10 flex justify-center md:pointer-events-none md:fixed md:top-1/2 md:left-1/2 md:z-10 md:mb-0 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:justify-center">
            <div className="w-full max-w-[14.4rem]">
              <div
                ref={previewRef}
                className="w-full rounded-[2.15rem] bg-[#f7f4f1] p-[0.16rem] shadow-[0_34px_90px_rgba(102,73,48,0.18)]"
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-[#f7f4f1]">
                  <div className="pointer-events-none absolute top-2.5 left-1/2 z-20 h-1.5 w-10 -translate-x-1/2 rounded-full bg-[#d8d0c9]" />

                  <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-4 text-[0.56rem] font-light uppercase tracking-[0.12em] text-[#f4eee8]">
                    <span>{activeProject.year}</span>
                    <span>{activeProject.preview.label}</span>
                  </div>

                  <div className="relative h-[28rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#4f6968_0%,#88aba5_37%,#f2ece3_100%)] px-3.5 pt-8 pb-3.5 text-white">
                    <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.38),transparent_72%)]" />

                    <div className="relative mt-12 rounded-[1.05rem] bg-white px-3 py-2.5 text-[#1f2120] shadow-[0_10px_24px_rgba(23,23,23,0.08)]">
                      <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#d9d1c9]" />
                      <p className="text-center text-xs font-medium">
                        {activeProject.preview.label}
                      </p>
                    </div>

                    <div className="relative mt-3 overflow-hidden rounded-[1.05rem] bg-white/16 p-2 backdrop-blur-sm">
                      <div className="grid grid-cols-3 gap-1.5">
                        {Array.from({ length: 12 }).map((_, index) => (
                          <div
                            key={index}
                            className="aspect-square rounded-[0.52rem] bg-white/80"
                            style={{
                              opacity: 0.42 + ((index % 4) + 1) * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="relative mt-4 rounded-[1.05rem] bg-white/18 p-3.5 backdrop-blur-sm">
                      <p className="text-[0.65rem] font-light uppercase tracking-[0.12em] text-white/78">
                        {activeProject.preview.note}
                      </p>
                      <h2 className="mt-3 min-h-[4.25rem] text-[1.75rem] font-medium leading-tight">
                        {activeProject.title}
                      </h2>
                      <p className="mt-5 max-w-[9rem] text-[0.92rem] leading-relaxed text-white/80">
                        Preview slot siap. Nanti tinggal sambungkan image atau
                        video project asli.
                      </p>
                    </div>

                    <div className="absolute inset-x-0 bottom-2 flex justify-center">
                      <div className="h-1.5 w-28 rounded-full bg-black/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeProject ? (
          <div className="hidden md:pointer-events-none md:fixed md:top-1/2 md:left-[calc(50%+10.0625rem)] md:z-10 md:block md:w-[min(21rem,24vw)] md:max-w-[21rem] md:-translate-y-1/2">
            <div
              className="font-display translate-y-0 text-[2.25rem] leading-[0.92] tracking-[-0.045em] text-[#1f1813] uppercase opacity-100 blur-0 transition-all duration-300 ease-out xl:text-[3.2rem]"
            >
              {activeProject.projectHeadline}
            </div>
          </div>
        ) : null}

        <div
          className={`transition-all duration-300 ease-out ${
            activeProject
              ? "pointer-events-none translate-y-2 opacity-0 blur-[6px]"
              : "translate-y-0 opacity-100 blur-0"
          }`}
        >
          <h1 className="font-display mb-12 max-w-2xl text-2xl leading-[1.1] font-normal tracking-[-0.045em] text-[#1f1813] md:text-[3.5rem]">
            {headlineName}, human interface designer at{" "}
            <span className="font-medium text-[#664930]">{companyName}</span>
          </h1>

          <div className="flex flex-col gap-4">
            <p className="max-w-lg text-lg leading-relaxed text-secondary">
              {bio}
            </p>

            <div className="mt-4 flex flex-wrap gap-8 font-sans text-[0.6875rem] font-light uppercase tracking-[0.1em] text-secondary">
              {headerLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="transition-all hover:underline hover:opacity-80 underline-offset-4 decoration-[#664930]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
