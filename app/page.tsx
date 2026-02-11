import dynamic from "next/dynamic";
import Hero from "@/components/main/hero";

const About = dynamic(() => import("@/components/main/about"));
const Projects = dynamic(() => import("@/components/main/projects"));
const TechStack = dynamic(() => import("@/components/main/tech-stack"));
const Experience = dynamic(() => import("@/components/main/experience"));
const Contact = dynamic(() => import("@/components/main/contact"));

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Experience />
      <Contact />
    </main>
  );
}
