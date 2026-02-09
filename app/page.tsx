import Hero from "@/components/main/hero";
import About from "@/components/main/about";
import Projects from "@/components/main/projects";
import TechStack from "@/components/main/tech-stack";
import Experience from "@/components/main/experience";
import Contact from "@/components/main/contact";

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