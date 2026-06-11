import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import SectionHeader from "./components/sections/SectionHeader";
import ExperienceList from "./components/sections/ExperienceList";
import ProjectList from "./components/sections/ProjectList";
import BeyondTeaser from "./components/sections/BeyondTeaser";
import Reveal from "./components/ui/Reveal";
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
            <SectionHeader num="01" title="Work Experience" />
          </Reveal>
          <ExperienceList />
        </section>

        <section id="projects" className="relative scroll-mt-14 px-5 pt-14 sm:px-9">
          <InkSweep flip className="absolute -right-24 top-64 w-[360px] opacity-[0.08]" />
          <Reveal>
            <SectionHeader num="02" title="Projects" />
          </Reveal>
          <ProjectList />
        </section>

        <section id="beyond" className="relative scroll-mt-14 px-5 pt-14 sm:px-9">
          <Reveal>
            <SectionHeader num="03" title="Beyond the code" />
          </Reveal>
          <Reveal delay={100}>
            <BeyondTeaser />
          </Reveal>
        </section>

        <Footer />
      </main>
    </>
  );
}
