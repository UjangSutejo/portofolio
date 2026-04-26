import {
  headerLinks,
  portfolioIntro,
  profileSwitcher,
  projects,
} from "./data/portfolio-content";
import { PortfolioInteractive } from "./_components/portfolio-interactive";
import { ProfileSwitcher } from "./_components/profile-switcher";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFDBBB] text-[#664930]">
      <div className="pt-6 flex items-center justify-between px-6 md:pt-0 md:px-0">
        <ProfileSwitcher
          items={profileSwitcher.items}
          cursorAssetPath={profileSwitcher.cursorAssetPath}
          className="mt-0 px-0"
        />

        <div className="leading-none text-right font-sans text-[0.6875rem] font-light uppercase tracking-[0.1em] text-secondary md:pointer-events-none md:fixed md:top-12 md:right-12 md:z-10">
          {portfolioIntro.location}
        </div>
      </div>

      <main className="flex min-h-screen flex-col gap-12 px-6 pt-12 md:flex-row md:gap-0 md:px-0 md:pt-0">
        <PortfolioInteractive
          projects={projects}
          headerLinks={headerLinks}
          headlineName={portfolioIntro.headlineName}
          bio={portfolioIntro.bio}
        />
      </main>

      <footer className="mt-auto flex w-full flex-col items-center justify-between bg-transparent px-6 py-12 md:flex-row md:px-12">
        <div className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.1em] text-secondary">
          {portfolioIntro.footerCopyright}
        </div>
      </footer>
    </div>
  );
}
