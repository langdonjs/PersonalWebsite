import Image from "next/image";
import ExperienceSlider from "./components/ExperienceSlider";
import ProjectImage from "./components/ProjectImage";
import BackgroundBanner from "./components/BackgroundBanner";
import Typewriter from "./components/Typewriter";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Berkeley Background Banner */}
      <BackgroundBanner />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-20 px-6 py-12 sm:px-8 sm:py-20">
        
        {/* HERO SECTION WITH PROFILE PHOTO */}
        <section className="relative animate-in fade-in duration-1000">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: Profile Photo */}
            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="relative group w-fit">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative rounded-2xl border border-white/20 bg-black/70 backdrop-blur-sm p-1 group-hover:border-white/30 transition-all duration-500 inline-block">
        <Image
                    src="/pfp.jpg"
                    alt="Langdon Huynh"
                    width={400}
                    height={400}
                    className="rounded-xl object-contain max-w-full h-auto"
          priority
        />
                </div>
              </div>
            </div>

            {/* Right: Name, Education, Bio and Social Links */}
            <div className="space-y-6 animate-in slide-in-from-right duration-700">
              {/* Name and Typewriter */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-white to-slate-200 bg-clip-text text-transparent drop-shadow-lg">
                    Langdon Huynh
                  </span>
          </h1>
                <Typewriter />
              </div>

              {/* Education */}
              <p className="text-xl sm:text-2xl lg:text-3xl text-white font-semibold drop-shadow-md whitespace-nowrap">
                CS + Applied Math @ UC Berkeley
              </p>
              
              {/* Introduction Text */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg leading-relaxed text-white font-medium drop-shadow-md">
                  I am an undergraduate student studying Computer Science and Applied Math. I build full-stack web applications, mobile apps, 
                  and AI-powered tools. I combine technical skills with mathematical rigor to solve 
                  complex problems.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-slate-200 font-medium drop-shadow-sm">
                  Passionate about creating impactful software, from social platforms to machine 
                  learning models. Always learning, always building.
                </p>
              </div>

              {/* Contact Me Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white drop-shadow-md">
                  Contact Me!
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/langdon-huynh-15254629a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-lg border border-white/30 bg-black/70 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/langdonjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-lg border border-white/30 bg-black/70 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                  aria-label="GitHub"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                  <span className="hidden sm:inline">GitHub</span>
                </a>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-300 font-medium">Feel free to reach out!</p>
                  <p className="text-sm text-slate-400">langdon@berkeley.edu</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="space-y-8 animate-in fade-in duration-1000 delay-300">
          <div>
            <h2 className="text-3xl font-bold text-white drop-shadow-md">Experience</h2>
            <p className="mt-2 text-slate-300 font-medium">Click on a company logo to view details</p>
          </div>
          <ExperienceSlider />
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-8 animate-in fade-in duration-1000 delay-500">
          <div>
            <h2 className="text-3xl font-bold text-white drop-shadow-md">Projects</h2>
            <p className="mt-2 text-slate-300 font-medium">Things I&apos;ve built and learned from</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Premier League ML Project */}
            <a
              href="https://nhsjs.com/2024/enhancing-football-match-predictions-through-ai-and-machine-learning-in-the-english-premier-league/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl border border-white/20 bg-black/70 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-black/80 hover:scale-105 duration-500 shadow-xl block"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <ProjectImage
                  src="/premier-league.jpg"
                  alt="Premier League ML Project"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Enhancing Football Match Predictions through Machine Learning</h3>
                  <svg className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed text-slate-200 font-medium">
                  Trained supervised models (Random Forest, MLP, Decision Tree) in Python using scikit-learn to predict Premier League match outcomes across 380 games in the 2021–22 season, reaching 61.5% accuracy versus a 33% baseline.
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Engineered match-level features including team form, recent goal differential, and live table position, then cleaned, encoded, and merged them into a training set.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-white/20 border border-white/30 px-3 py-1 text-xs text-white font-semibold">Python</span>
                  <span className="rounded-lg bg-white/20 border border-white/30 px-3 py-1 text-xs text-white font-semibold">scikit-learn</span>
                  <span className="rounded-lg bg-white/20 border border-white/30 px-3 py-1 text-xs text-white font-semibold">pandas</span>
                </div>
              </div>
            </a>

            {/* Stock Market Sentiment Analysis */}
            <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-black/70 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-black/80 hover:scale-105 duration-500 shadow-xl">
              <div className="relative h-56 w-full overflow-hidden">
                <ProjectImage
                  src="/stock-market.jpg"
                  alt="Stock Market Sentiment Analysis"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Stock Market Sentiment Analysis with NLP & Deep Learning</h3>
                <p className="text-sm leading-relaxed text-slate-200 font-medium">
                  Fine-tuned a BERT-based sentiment classifier on 10,000 finance-related tweets to label them as positive, neutral, or negative toward market direction, reaching ~85% accuracy with an F1 score of 0.83 and recall of 0.86.
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Built an NLP preprocessing pipeline (tokenization, lemmatization, stopword removal, padding, batching) and evaluated multiple checkpoints.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-white/20 border border-white/30 px-3 py-1 text-xs text-white font-semibold">PyTorch</span>
                  <span className="rounded-lg bg-white/20 border border-white/30 px-3 py-1 text-xs text-white font-semibold">Hugging Face</span>
                  <span className="rounded-lg bg-white/20 border border-white/30 px-3 py-1 text-xs text-white font-semibold">BERT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="space-y-8 animate-in fade-in duration-1000 delay-700">
          <div>
            <h2 className="text-3xl font-bold text-white drop-shadow-md">Technical Skills</h2>
            <p className="mt-2 text-slate-300 font-medium">Technologies I work with</p>
          </div>

          <div className="space-y-4">
            {/* Languages */}
            <div className="rounded-xl border border-white/20 bg-black/70 backdrop-blur-sm p-4 hover:border-white/30 transition-all duration-300 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-3">
              {["Python", "Java", "JavaScript", "TypeScript", "SQL", "Swift"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-white/15 border border-white/30 px-3 py-2 text-sm text-white font-semibold hover:bg-white/25 transition-all duration-300 hover:scale-105 shadow-sm whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="rounded-xl border border-white/20 bg-black/70 backdrop-blur-sm p-4 hover:border-white/30 transition-all duration-300 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Frameworks</h3>
              <div className="flex flex-wrap gap-3">
              {["React", "Next.js", "Node.js", "React Native"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-white/15 border border-white/30 px-3 py-2 text-sm text-white font-semibold hover:bg-white/25 transition-all duration-300 hover:scale-105 shadow-sm whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
              </div>
            </div>

            {/* ML/DS */}
            <div className="rounded-xl border border-white/20 bg-black/70 backdrop-blur-sm p-4 hover:border-white/30 transition-all duration-300 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">ML/DS</h3>
              <div className="flex flex-wrap gap-3">
              {["PyTorch", "scikit-learn", "Hugging Face", "pandas", "NumPy", "Jupyter"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-white/15 border border-white/30 px-3 py-2 text-sm text-white font-semibold hover:bg-white/25 transition-all duration-300 hover:scale-105 shadow-sm whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
              </div>
            </div>

            {/* Systems/Tools */}
            <div className="rounded-xl border border-white/20 bg-black/70 backdrop-blur-sm p-4 hover:border-white/30 transition-all duration-300 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Systems/Tools</h3>
              <div className="flex flex-wrap gap-3">
              {["Linux", "Git/GitHub", "Firebase/Auth"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-white/15 border border-white/30 px-3 py-2 text-sm text-white font-semibold hover:bg-white/25 transition-all duration-300 hover:scale-105 shadow-sm whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* INTERESTS SECTION */}
        <section id="interests" className="space-y-6 animate-in fade-in duration-1000 delay-900">
          <div>
            <h2 className="text-3xl font-bold text-white drop-shadow-md">Interests</h2>
            <p className="mt-2 text-slate-300 font-medium">What I enjoy outside of coding</p>
        </div>
          <div className="flex flex-wrap gap-4">
            {[
              { name: "Soccer", icon: "⚽" },
              { name: "Golf", icon: "⛳" },
              { name: "Poker", icon: "🃏" },
            ].map((interest) => (
              <div
                key={interest.name}
                className="flex items-center gap-2 rounded-lg border border-white/30 bg-black/70 backdrop-blur-sm px-6 py-3 text-white font-semibold"
              >
                <span className="text-2xl">{interest.icon}</span>
                <span>{interest.name}</span>
              </div>
            ))}
            <a
              href="https://youtube.com/@langdonhuynh"
            target="_blank"
            rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-lg border border-white/30 bg-black/70 backdrop-blur-sm px-6 py-3 text-white font-semibold transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            >
              <span className="text-2xl">🎬</span>
              <span>Video Editing (Check out my YouTube channel</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>)</span>
            </a>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="space-y-6 animate-in fade-in duration-1000 delay-1100">
          <div>
            <h2 className="text-3xl font-bold text-white drop-shadow-md">Education</h2>
          </div>
          <div className="rounded-xl border border-white/20 bg-black/70 backdrop-blur-sm p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">
                  B.A. in Computer Science & B.A. in Applied Mathematics (Double Major)
                </h3>
                <p className="text-slate-200 font-semibold whitespace-nowrap">University of California, Berkeley</p>
                <p className="mt-2 text-sm text-slate-300 font-medium">
                  Relevant Coursework: Data Structures, Discrete Mathematics and Probability Theory, 
                  Structure and Interpretation of Computer Programs, Linear Algebra, Multivariable Calculus
                </p>
                <p className="mt-2 text-sm text-slate-300 font-medium">
                  Activities: Berkeley Codeology, Mobile Developers of Berkeley, MPS Scholars, Berkeley SkyDeck
                </p>
              </div>
              <a
                href="https://www.berkeley.edu"
            target="_blank"
            rel="noopener noreferrer"
                className="flex-shrink-0 group transition-all hover:scale-110"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm overflow-hidden hover:border-white/40 transition-all">
                  <Image
                    src="/berkeley-logo.jpg"
                    alt="UC Berkeley"
                    fill
                    className="object-cover"
                  />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/20 pt-8">
          <p className="text-center text-sm text-slate-400 font-medium">
            © {new Date().getFullYear()} Langdon Huynh. Built with Next.js and Tailwind CSS.
          </p>
        </footer>
        </div>
      </main>
  );
}
