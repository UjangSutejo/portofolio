export type ProjectPreview =
  | {
      type: "placeholder";
      label: string;
      note: string;
    }
  | {
      type: "video";
      label: string;
      note: string;
      src: string;
    };

export type Project = {
  id: string;
  title: string;
  year: string;
  projectHeadline: string;
  preview: ProjectPreview;
};

export type ProfileSwitcherItem =
  | {
      id: string;
      type: "glyph";
      glyph: string;
      alt: string;
      frameTone: string;
    }
  | {
      id: string;
      type: "image";
      src: string;
      alt: string;
      frameTone: string;
    };

export const projects: Project[] = [
  {
    id: "messenger-camera",
    title: "scencepack website",
    year: "2026",
    preview: {
      type: "video",
      label: "Preview",
      note: "Scencepack website preview",
      src: "/videos/scencepack.mp4",
    },
    projectHeadline:
      "SCENCEPACK WEBSITE FOR MY CLIENT, CINEMATIC VISUAL ARCHIVE BUILT FOR FAST CREATIVE EDITORS",
  },
  {
    id: "dm-resharing",
    title: "my local barbershop",
    year: "2025",
    preview: {
      type: "video",
      label: "Preview",
      note: "Barbershop landing page preview",
      src: "/videos/barbershop.mp4",
    },
    projectHeadline:
      "MY CLIENT BARBERSHOP, SHARP COMMUNITY-FOCUSED BRAND PRESENCE CONVERTING MORE LEADS AND HELPING THE BUISNESS GROW",
  },
  {
    id: "stories-layouts",
    title: "competition build",
    year: "2025",
    preview: {
      type: "video",
      label: "Preview",
      note: "Competition build preview",
      src: "/videos/catenglish.mp4",
    },
    projectHeadline:
      "COMPETITION BUILD, TEAM-BUILT AI WEB APP CREATED FOR A COMPANY-HOSTED CHALLENGE EVENT",
  },
  {
    id: "seyit-yilmaz-v4",
    title: "daycare landing page",
    year: "2025",
    preview: {
      type: "video",
      label: "Concept",
      note: "Editorial hover state",
      src: "/videos/saadiyah.mp4",
    },
    projectHeadline:
      "DAYCARE BUSINESS LANDING PAGE, WARM CONVERSION-FOCUSED EXPERIENCE FOR MODERN FAMILIES",
  },
  {
    id: "instagram-shopping",
    title: "Coming soon",
    year: "-",
    preview: {
      type: "placeholder",
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline:
      "COMING SOON, NEW WORK WILL BE ADDED HERE SOON",
  },
  {
    id: "profile-redesign",
    title: "Coming soon",
    year: "-",
    preview: {
      type: "placeholder",
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline:
      "COMING SOON, NEW WORK WILL BE ADDED HERE SOON",
  },
  {
    id: "threads-app",
    title: "Coming soon",
    year: "-",
    preview: {
      type: "placeholder",
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline:
      "COMING SOON, NEW WORK WILL BE ADDED HERE SOON",
  },
  {
    id: "camera-effects",
    title: "Coming soon",
    year: "-",
    preview: {
      type: "placeholder",
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline:
      "COMING SOON, NEW WORK WILL BE ADDED HERE SOON",
  },
  {
    id: "messenger-kids",
    title: "Coming soon",
    year: "-",
    preview: {
      type: "placeholder",
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline:
      "COMING SOON, NEW WORK WILL BE ADDED HERE SOON",
  },
  {
    id: "identity-system",
    title: "Coming soon",
    year: "-",
    preview: {
      type: "placeholder",
      label: "Preview",
      note: "Project media pending",
    },
    projectHeadline:
      "COMING SOON, NEW WORK WILL BE ADDED HERE SOON",
  },
];

export const headerLinks = ["About", "Email", "LinkedIn", "Instagram"];

export const profileSwitcher = {
  cursorAssetPath: "/asset/question-mark-cursor.png" as string | null,
  items: [
    {
      id: "japanese-logo",
      type: "image",
      src: "/gambar/profile-japanese.jpeg",
      alt: "Japanese logo profile",
      frameTone: "#cfbe78",
    },
    {
      id: "portrait-1",
      type: "image",
      src: "/gambar/profile-1.jpeg",
      alt: "Profile portrait one",
      frameTone: "#92b88d",
    },
    {
      id: "portrait-2",
      type: "image",
      src: "/gambar/profile-2.jpeg",
      alt: "Profile portrait two",
      frameTone: "#84aac7",
    },
    {
      id: "portrait-3",
      type: "image",
      src: "/gambar/profile-3.jpeg",
      alt: "Profile portrait three",
      frameTone: "#92b88d",
    },
  ] satisfies ProfileSwitcherItem[],
};

export const portfolioIntro = {
  headlineName: "Ujang Sutejo",
  companyName: "developer",
  bio: "Focused on building thoughtful, well-crafted digital experiences that balance utility, clarity, and aesthetic pleasure. Currently working independently while continuing to grow through new projects and collaborations.",
  location: "Jakarta, Indonesia",
  footerCopyright: "© 2025 Ujang Sutejo — All rights reserved",
};
