import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Madhuka Virajith | Software Engineering Undergraduate | Full-Stack & AI/ML Development",
  description: "Portfolio of Madhuka Virajith, Software Engineering undergraduate at Cardiff Metropolitan University with hands-on experience building eight full-stack, web, AI/ML, desktop, and mobile applications. Seeking a Software Engineering internship.",
  keywords: [
    "Madhuka Virajith",
    "Software Engineering Undergraduate",
    "Full-Stack Developer",
    "AI/ML Development",
    "Java Spring Boot",
    "Python",
    "React",
    "Next.js",
    "C# .NET",
    "Cardiff Metropolitan University",
    "Colombo Sri Lanka"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
