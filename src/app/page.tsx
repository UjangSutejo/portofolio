import { PortfolioInteractive } from "./_components/portfolio-interactive";

const projects = [
  {
    id: "seyit-yilmaz-v4",
    title: "Seyit Yılmaz v4",
    year: "2023",
    preview: {
      type: "placeholder" as const,
      label: "Concept",
      note: "Editorial hover state",
    },
    projectHeadline: "SEYIT YILMAZ V4, EDITORIAL PORTFOLIO SYSTEM IN MOTION",
  },
  {
    id: "dm-resharing",
    title: "DM Resharing",
    year: "2022",
    preview: {
      type: "placeholder" as const,
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline: "DM RESHARING, PRIVATE SHARING FLOWS BUILT FOR FASTER INTIMACY",
  },
  {
    id: "messenger-camera",
    title: "Messenger Camera",
    year: "2021",
    preview: {
      type: "placeholder" as const,
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline: "MESSENGER CAMERA, SOCIAL CAPTURE TOOLS FOR EXPRESSIVE EVERYDAY MOMENTS",
  },
  {
    id: "stories-layouts",
    title: "Stories Layouts",
    year: "2021",
    preview: {
      type: "placeholder" as const,
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline: "STORIES LAYOUTS, MODULAR STORY COMPOSITION FOR HIGH-SPEED CREATION",
  },
  {
    id: "instagram-shopping",
    title: "Instagram Shopping",
    year: "2020",
    preview: {
      type: "placeholder" as const,
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline: "INSTAGRAM SHOPPING, DISCOVERY SURFACES THAT TURN BROWSING INTO ACTION",
  },
  {
    id: "profile-redesign",
    title: "Profile Redesign",
    year: "2019",
    preview: {
      type: "placeholder" as const,
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline: "PROFILE REDESIGN, CLEANER IDENTITY ARCHITECTURE FOR PERSONAL PRESENCE",
  },
  {
    id: "threads-app",
    title: "Threads App",
    year: "2019",
    preview: {
      type: "placeholder" as const,
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline: "THREADS APP, CONVERSATIONAL INTERFACES SHAPED FOR PUBLIC MOMENTUM",
  },
  {
    id: "camera-effects",
    title: "Camera Effects",
    year: "2018",
    preview: {
      type: "placeholder" as const,
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline: "CAMERA EFFECTS, PLAYFUL VISUAL SYSTEMS ENGINEERED FOR SHARED DELIGHT",
  },
  {
    id: "messenger-kids",
    title: "Messenger Kids",
    year: "2017",
    preview: {
      type: "placeholder" as const,
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline: "MESSENGER KIDS, SAFER COMMUNICATION PATTERNS FOR YOUNGER AUDIENCES",
  },
  {
    id: "identity-system",
    title: "Identity System",
    year: "2016",
    preview: {
      type: "placeholder" as const,
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline: "IDENTITY SYSTEM, A CALM VISUAL FRAMEWORK FOR SCALABLE PRODUCT LANGUAGE",
  },
];

const headerLinks = ["About", "Email", "LinkedIn", "Twitter"];
const headlineName = "Ujang Sutejo";
const companyName = "Apple";
const bio =
  "Focusing on creating thoughtful, highly-crafted digital experiences that blend utility with aesthetic pleasure. Currently based in California.";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFDBBB] text-[#664930]">
      <div className="mt-8 px-6 text-right font-sans text-[0.6875rem] font-light uppercase tracking-[0.1em] text-secondary md:pointer-events-none md:fixed md:top-12 md:right-12 md:z-10 md:mt-0 md:px-0">
        Jakarta, Indonesia
      </div>

      <main className="flex min-h-screen flex-col gap-12 px-6 pt-12 md:pt-24 md:flex-row md:gap-24 md:px-12">
        <PortfolioInteractive
          projects={projects}
          headerLinks={headerLinks}
          headlineName={headlineName}
          companyName={companyName}
          bio={bio}
        />
      </main>

      <footer className="mt-auto flex w-full flex-col items-center justify-between bg-transparent px-6 py-12 md:flex-row md:px-12">
        <div className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.1em] text-secondary">
          © 2024 Seyit Yılmaz — All rights reserved
        </div>
      </footer>
    </div>
  );
}
