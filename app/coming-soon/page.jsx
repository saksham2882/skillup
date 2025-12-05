"use client";

import React from "react";
import { BarChart3, Award, FileCheck, Bot, BrainCircuit } from "lucide-react";
import { FloatingBackground, ScrollProgress } from "@/components/Animation";
import HeroSection from "@/components/coming-soon/HeroSection";
import FeatureSection from "@/components/coming-soon/FeatureSection";
import AnalyticsMockup from "@/components/coming-soon/AnalyticsMockup";
import BadgeMockup from "@/components/coming-soon/BadgeMockup";
import PersonaMockup from "@/components/coming-soon/PersonaMockup";
import CertificateMockup from "@/components/coming-soon/CertificateMockup";
import QuizMockup from "@/components/coming-soon/QuizMockup";
import JoinMockup from "@/components/coming-soon/JoinMockup";


const ComingSoon = () => {
    return (
      <div className="w-full bg-slate-950 font-sans selection:bg-cyan-500 selection:text-white">
        <ScrollProgress />
        <FloatingBackground />

        <HeroSection />

        {/* ------- Analytics ------- */}
        <FeatureSection
          title="Deep Analytics"
          desc="Track your progress with detailed insights. Understand patterns, improve retention, and strengthen weak areas using AI-powered visual analytics."
          icon={BarChart3}
          color="purple"
          align="left"
        >
          <AnalyticsMockup />
        </FeatureSection>

        {/* -------- Badges -------- */}
        <FeatureSection
          title="Skill Gamification"
          desc="Mastery should be celebrated. Earn meaningful digital badges as you learn. Boost your motivation with achievements that evolve alongside your skill level."
          icon={Award}
          color="yellow"
          align="right"
        >
          <BadgeMockup />
        </FeatureSection>

        {/* ------- Personas ------ */}
        <FeatureSection
          title="Adaptive AI Mentors"
          desc="Learning isn't one-size-fits-all. Switch between different AI personas—like the Socratic Questioner or the Technical Deep-Diver—to match your current study mood."
          icon={Bot}
          color="pink"
          align="left"
        >
          <PersonaMockup />
        </FeatureSection>

        {/* ------- Certificates -------- */}
        <FeatureSection
          title="Professional Credentials"
          desc="Earn digital certificates for every course you master. Shareable instantly on LinkedIn or your portfolio with a unique verification ID."
          icon={FileCheck}
          color="cyan"
          align="right"
        >
          <CertificateMockup />
        </FeatureSection>

        {/* ------- Quizzes ------- */}
        <FeatureSection
          title="Intelligent Quizzes"
          desc="Forget static tests. Our new quiz engine generates questions based on your weak points, ensuring you actually retain what you learn."
          icon={BrainCircuit}
          color="green"
          align="left"
        >
          <QuizMockup />
        </FeatureSection>

        {/* ------- Join ------- */}
        <JoinMockup />
      </div>
    );
}


export default ComingSoon