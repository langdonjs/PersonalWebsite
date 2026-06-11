import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SectionHeader from "./components/SectionHeader";
import ExperienceList from "./components/ExperienceList";
import ProjectList from "./components/ProjectList";
import Reveal from "./components/Reveal";
import InkSweep from "./components/ink/InkSweep";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative mx-auto max-w-5xl overflow-x-clip">
        <Hero />

        <section id="experience" className="relative scroll-mt-14 px-5 pt-10 sm:px-9">
          <InkSweep className="absolute -left-32 top-40 w-[520px] opacity-10" />
          <Reveal>
            <SectionHeader num="01" title="Experience" />
            <ExperienceList />
          </Reveal>
        </section>

        <section id="projects" className="relative scroll-mt-14 px-5 pt-14 sm:px-9">
          <InkSweep flip className="absolute -right-24 top-64 w-[360px] opacity-[0.08]" />
          <Reveal>
            <SectionHeader num="02" title="Projects" />
            <ProjectList />
          </Reveal>
        </section>

        <footer className="flex items-center gap-3 px-5 py-12 sm:px-9">
          <div className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent" />
          <p className="text-[10px] uppercase tracking-[1px] text-[#bbb]">
            © {new Date().getFullYear()} Langdon Huynh
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-black/10 to-transparent" />
        </footer>
      </main>
    </>
  );
}
