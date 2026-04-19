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
  const mobilePreviewRef = useRef<HTMLDivElement | null>(null);
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
    if (!mobilePreviewRef.current || !activeProject || supportsHover) {
      return;
    }

    gsap.fromTo(
      mobilePreviewRef.current,
      {
        autoAlpha: 0,
        y: 18,
        scale: 0.97,
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.32,
        ease: "power3.out",
        clearProps: "transform",
      },
    );
  }, [activeProject, supportsHover]);

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
      <section
        className={`order-2 w-full transition-all duration-300 ease-out md:order-1 md:w-1/3 ${
          activeProject && !supportsHover
            ? "pointer-events-none translate-y-2 opacity-0 blur-[6px]"
            : "translate-y-0 opacity-100 blur-0"
        }`}
      >
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
        {activeProject && !supportsHover ? (
          <div className="fixed inset-0 z-30 overflow-y-auto bg-[#ffdbbb]/72 px-6 py-8 backdrop-blur-[16px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.32),transparent_58%)]" />
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => {
                setActiveProjectId(null);
              }}
              className="absolute top-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            <div
              ref={mobilePreviewRef}
              className="relative z-10 mx-auto flex min-h-full w-full max-w-[18.75rem] flex-col justify-start pt-10"
            >
              <div className="rounded-[2.4rem] bg-[#f7f4f1] p-[0.22rem] shadow-[0_36px_90px_rgba(102,73,48,0.22)]">
                <div className="relative overflow-hidden rounded-[2.15rem] bg-[#f7f4f1]">
                  <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]" />

                  <div className="relative h-[36rem] overflow-hidden rounded-[2.15rem] bg-[linear-gradient(180deg,#9df1eb_0%,#25dbe7_100%)] px-4 pt-7 pb-4 text-[#1f2120]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.28),transparent_46%)]" />
                    <div className="absolute top-4 left-4 h-3 w-8 rounded-full bg-[#f05445]" />
                    <div className="absolute top-4 right-4 h-2.5 w-12 rounded-full bg-[#d5ece9]/80" />

                    <div className="relative mt-7 rounded-[1.35rem] bg-white/72 px-4 py-5 shadow-[0_16px_32px_rgba(20,20,20,0.08)] backdrop-blur-sm">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-black/10" />
                        <div>
                          <p className="text-sm font-medium">Seyit Yilmaz</p>
                          <p className="text-[0.62rem] text-black/45">Active 10m ago</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="w-fit rounded-2xl bg-white px-3 py-2 text-xs shadow-sm">
                          yeah
                        </div>
                        <div className="w-[11rem] rounded-2xl bg-white px-3 py-2 text-xs shadow-sm">
                          Yeah let&apos;s do that
                        </div>
                      </div>

                      <div className="mt-4 overflow-hidden rounded-[1.15rem] bg-white p-2 shadow-sm">
                        <div className="aspect-[4/5] rounded-[0.9rem] bg-[linear-gradient(160deg,#b7d3e0_0%,#eff5fb_100%)]" />
                      </div>

                      <div className="mt-4 flex justify-start">
                        <div className="h-16 w-16 rounded-[1rem] bg-white/90 shadow-sm" />
                      </div>

                      <div className="mt-4 flex justify-end">
                        <div className="rounded-2xl bg-[#6b7bff] px-3 py-2 text-xs text-white shadow-sm">
                          Oh yea, one sec!
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] bg-white/18 px-4 py-3 backdrop-blur-sm">
                      <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.12em] text-black/45">
                        <span>{activeProject.year}</span>
                        <span>{activeProject.preview.label}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-10 flex-1 rounded-full bg-white/65" />
                        <div className="h-10 w-10 rounded-full bg-white/75" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-left">
                <div className="font-display text-[2.2rem] leading-[0.92] tracking-[-0.045em] text-[#1f1813] uppercase">
                  {activeProject.projectHeadline}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeProject && supportsHover ? (
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
