"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/theme-context";
import { getPublicTotalVisits } from "@/lib/analytics/public";

// SVG Icons
const MenuIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const XIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
  as?: "p" | "h1" | "h2" | "span";
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
  as: Tag = "p",
}) => {
  const [inView, setInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <div ref={ref}>
    <Tag className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={prefersReducedMotion ? {
            display: "inline-block",
            opacity: inView ? 1 : 0,
          } : {
            display: "inline-block",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `opacity 0.5s ease-out ${i * delay}ms, transform 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
    </div>
  );
};

export default function Hero() {
  const { isDark, toggleTheme, isKorean, toggleLanguage } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignature, setShowSignature] = useState(true);
  const [totalVisits, setTotalVisits] = useState<number | null>(null);
  const lastScrollYRef = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    void (async () => {
      const total = await getPublicTotalVisits(controller.signal);
      if (typeof total === "number") {
        setTotalVisits(total);
      }
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastY = lastScrollYRef.current;

      // 스크롤이 300px 미만이면 항상 보이기
      if (currentScrollY < 300) {
        setShowSignature(true);
      }
      // 위로 스크롤하면 보이기
      else if (currentScrollY < lastY) {
        setShowSignature(true);
      }
      // 아래로 스크롤하고 300px 넘으면 숨기기
      else if (currentScrollY > lastY && currentScrollY > 300) {
        setShowSignature(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = useMemo(() => [
    { label: isKorean ? "홈" : "HOME", href: "#", highlight: true },
    { label: isKorean ? "소개" : "ABOUT", href: "#about" },
    { label: isKorean ? "프로젝트" : "PROJECTS", href: "#projects" },
    { label: isKorean ? "기술 스택" : "TECH STACK", href: "#tech-stack" },
    { label: isKorean ? "경력" : "EXPERIENCE", href: "#experience" },
    { label: isKorean ? "연락처" : "CONTACT", href: "#contact" },
  ], [isKorean]);

  const tagline = isKorean
    ? "AI 서비스 엔지니어 | AI 모델을 비즈니스 임팩트로 전환"
    : "AI Service Engineer | Transforming AI Models into Business Impact";
  const totalVisitorsLabel = isKorean ? "누적 방문자" : "Total Visitors";

  return (
    <div
      className="min-h-screen text-foreground transition-colors"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div
            className="relative transition-opacity duration-300"
            style={{
              opacity: showSignature ? 1 : 0,
              pointerEvents: showSignature ? "auto" : "none"
            }}
          >
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-black dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C3E41D] focus-visible:rounded"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XIcon className="w-8 h-8 transition-colors duration-300" />
              ) : (
                <MenuIcon className="w-8 h-8 transition-colors duration-300" />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[200px] md:w-[240px] border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
                }}
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300 hover:!text-[#C3E41D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C3E41D] focus-visible:rounded ${
                      item.highlight
                        ? "text-[#C3E41D]"
                        : isDark
                          ? "text-white"
                          : "text-neutral-900"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Signature */}
          <div
            className="text-4xl transition-opacity duration-300"
            style={{
              color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
              opacity: showSignature ? 1 : 0,
              pointerEvents: showSignature ? "auto" : "none"
            }}
          >
            SJ
          </div>

          {/* Toggles */}
          <div
            className="flex items-center gap-3 transition-opacity duration-300"
            style={{
              opacity: showSignature ? 1 : 0,
              pointerEvents: showSignature ? "auto" : "none"
            }}
          >
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center text-xs font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C3E41D]"
              style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
              aria-label="Toggle language"
            >
              <span className={`absolute transition-opacity duration-300 ${isKorean ? "opacity-100" : "opacity-30"}`} style={{ left: "0.5rem" }}>
                한
              </span>
              <span className={`absolute transition-opacity duration-300 ${!isKorean ? "opacity-100" : "opacity-30"}`} style={{ right: "0.5rem" }}>
                EN
              </span>
              <div
                className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                  transform: isKorean ? "translateX(0)" : "translateX(2rem)",
                }}
              />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C3E41D]"
              style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
              aria-label="Toggle theme"
            >
              <div
                className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                  transform: isDark ? "translateX(2rem)" : "translateX(0)",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text="SIN"
                delay={100}
                animateBy="letters"
                direction="top"
                as="h1"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="JAEHYUN"
                delay={100}
                animateBy="letters"
                direction="top"
                as="span"
                className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Profile Picture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
                <Image
                  src="/profile.jpg"
                  alt="Sin Jaehyun Profile"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline - Proper Distance Below Hero */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text={tagline}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        <div className="absolute bottom-14 md:bottom-16 left-1/2 -translate-x-1/2 px-4">
          <p className="text-xs md:text-sm text-neutral-500 tracking-wide text-center">
            {totalVisitorsLabel}: {totalVisits?.toLocaleString() ?? "-"}
          </p>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C3E41D] focus-visible:rounded"
          aria-label="Scroll down"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronDownIcon className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
        </button>
      </main>
    </div>
  );
}
