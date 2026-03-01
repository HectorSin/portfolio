import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import ChatWidget from "@/components/chat/chat-widget";
import PageViewTracker from "@/components/analytics/page-view-tracker";

export const metadata: Metadata = {
  title: "Portfolio - Jaehyun Sin",
  description: "Portfolio of Jaehyun Sin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#C3E41D] focus:text-black focus:rounded focus:font-bold"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <PageViewTracker />
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
