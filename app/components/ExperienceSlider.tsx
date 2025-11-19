"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  logo: string;
  details: {
    title: string;
    company: string;
    period: string;
    location: string;
    bullets: string[];
  };
}

const experiences: Experience[] = [
  {
    id: "codeology",
    company: "Berkeley Codeology",
    role: "Software Engineer",
    period: "Sept. 2025 – Present",
    location: "Berkeley, CA",
    logo: "/codeology-logo.png",
    details: {
      title: "Software Engineer",
      company: "Berkeley Codeology",
      period: "Sept. 2025 – Present",
      location: "Berkeley, CA",
      bullets: [
        "Shipped core features for AvoSpace (social content sharing web app), including authenticated profiles, a personalized post feed, and media upload with pagination and validation, enabling 40+ pilot users to post and interact weekly.",
        "Defined Firestore security rules, added validation and pagination to improve data integrity and feed reliability.",
        "Built reusable UI components in TypeScript and Tailwind and set up GitHub Flow for faster, organized development.",
      ],
    },
  },
  {
    id: "mdb",
    company: "Mobile Developers at Berkeley",
    role: "Software Engineer, Mobile",
    period: "Sept. 2025 – Present",
    location: "Berkeley, CA",
    logo: "/mdb-logo.png",
    details: {
      title: "Software Engineer, Mobile",
      company: "Mobile Developers at Berkeley (MDB)",
      period: "Sept. 2025 – Present",
      location: "Berkeley, CA",
      bullets: [
        "Developed full-stack mobile applications using React Native and Swift, implementing stack navigation, Supabase authentication, Stripe payment integration, and secure storage across iOS platforms.",
        "Integrated external APIs following RESTful best practices and enhanced app functionality by connecting LLM APIs for intelligent user interactions.",
        "Collaborated with a 4-person team in agile sprints to ideate, architect, and deploy a production-level mobile app; managed version control with Git, conducted code reviews, and presented to an audience of 20+ members.",
      ],
    },
  },
  {
    id: "code",
    company: "C.O.D.E. Jumpstart",
    role: "CS & Math Teacher",
    period: "June 2022 – June 2024",
    location: "San Jose, CA",
    logo: "/treehouse-logo.png",
    details: {
      title: "Computer Science and Math Teacher",
      company: "C.O.D.E. Jumpstart",
      period: "June 2022 – June 2024",
      location: "San Jose, CA",
      bullets: [
        "Taught Python, Swift, Scratch, and core math concepts to 85+ middle school and early high school students in an 8-week STEM program, creating a classroom environment where students built tangible mini-projects.",
        "Designed and delivered a project-based curriculum for daily 90-minute sessions, including interactive challenges, short coding labs, and visual explanations of logic and problem solving; adapted pacing for students at different levels.",
      ],
    },
  },
];

export default function ExperienceSlider() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Close details when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDetails(false);
        setSelectedExperience(null);
      }
    };

    if (showDetails) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDetails]);

  const handleExperienceClick = (exp: Experience) => {
    if (selectedExperience?.id === exp.id) {
      // Toggle details if clicking the same experience
      setShowDetails(!showDetails);
    } else {
      // Select new experience and show details
      setSelectedExperience(exp);
      setShowDetails(true);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? experiences.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedExperience(experiences[newIndex]);
    setShowDetails(true);
  };

  const handleNext = () => {
    const newIndex = currentIndex === experiences.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedExperience(experiences[newIndex]);
    setShowDetails(true);
  };

  // Update currentIndex when selectedExperience changes
  useEffect(() => {
    const index = experiences.findIndex(exp => exp.id === selectedExperience?.id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [selectedExperience]);

  return (
    <div className="space-y-8">
      {/* Mobile Navigation Controls */}
      <div className="flex justify-center items-center gap-4 md:hidden">
        <button
          onClick={handlePrevious}
          className="rounded-lg border border-white/30 bg-black/70 backdrop-blur-sm px-4 py-2 text-white font-semibold transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105"
          aria-label="Previous experience"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white text-sm font-medium">
          {currentIndex + 1} / {experiences.length}
        </span>
        <button
          onClick={handleNext}
          className="rounded-lg border border-white/30 bg-black/70 backdrop-blur-sm px-4 py-2 text-white font-semibold transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105"
          aria-label="Next experience"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Static Company Logos */}
      <div 
        ref={containerRef}
        className="w-full flex justify-center items-center gap-6 overflow-x-auto pb-4 scrollbar-hide"
      >
        {/* Mobile: Show only current experience */}
        <div className="md:hidden">
          <button
            onClick={() => handleExperienceClick(experiences[currentIndex])}
            className={`relative group transition-all duration-500 flex-shrink-0 ${
              selectedExperience?.id === experiences[currentIndex].id
                ? "scale-110 opacity-100 z-10"
                : "opacity-80 hover:opacity-100 hover:scale-105"
            }`}
            style={{ width: "320px", height: "320px" }}
          >
            <div className={`relative w-full h-full rounded-2xl border-2 bg-black/70 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
              selectedExperience?.id === experiences[currentIndex].id
                ? "border-white/60 shadow-2xl shadow-white/30"
                : "border-white/20 hover:border-white/40"
            }`}>
              <Image
                src={experiences[currentIndex].logo}
                alt={experiences[currentIndex].company}
                fill
                className="object-contain p-8"
                sizes="320px"
              />
            </div>
            {selectedExperience?.id === experiences[currentIndex].id && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
            )}
          </button>
        </div>

        {/* Desktop: Show all experiences */}
        <div className="hidden md:flex gap-6">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => handleExperienceClick(exp)}
              className={`relative group transition-all duration-500 flex-shrink-0 ${
                selectedExperience?.id === exp.id
                  ? "scale-110 opacity-100 z-10"
                  : "opacity-80 hover:opacity-100 hover:scale-105"
              }`}
              style={{ width: "320px", height: "320px" }}
            >
              <div className={`relative w-full h-full rounded-2xl border-2 bg-black/70 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                selectedExperience?.id === exp.id
                  ? "border-white/60 shadow-2xl shadow-white/30"
                  : "border-white/20 hover:border-white/40"
              }`}>
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  fill
                  className="object-contain p-8"
                  sizes="320px"
                />
              </div>
              {selectedExperience?.id === exp.id && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Navigation Controls */}
      <div className="hidden md:flex justify-center items-center gap-4">
        <button
          onClick={handlePrevious}
          className="rounded-lg border border-white/30 bg-black/70 backdrop-blur-sm px-4 py-2 text-white font-semibold transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105"
          aria-label="Previous experience"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white text-sm font-medium">
          {currentIndex + 1} / {experiences.length}
        </span>
        <button
          onClick={handleNext}
          className="rounded-lg border border-white/30 bg-black/70 backdrop-blur-sm px-4 py-2 text-white font-semibold transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105"
          aria-label="Next experience"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Experience Details */}
      {selectedExperience && showDetails && (
        <div 
          ref={detailsRef}
          className="max-w-3xl mx-auto rounded-2xl border border-white/20 bg-black/80 backdrop-blur-md p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-2xl"
        >
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{selectedExperience.details.title}</h3>
                <p className="text-base text-slate-200 font-medium">{selectedExperience.details.company}</p>
                <p className="text-sm text-slate-300">{selectedExperience.details.location}</p>
              </div>
              <span className="text-sm text-slate-400 font-medium whitespace-nowrap">{selectedExperience.details.period}</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-200 leading-relaxed">
              {selectedExperience.details.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2 animate-in fade-in slide-in-from-left duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                  <span className="text-white mt-1.5 font-bold">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
