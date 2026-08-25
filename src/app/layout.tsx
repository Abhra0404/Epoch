import type { Metadata } from "next";
import { Montserrat, PT_Mono, Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ptMono = PT_Mono({
  variable: "--font-pt-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Epoch",
  description: "Curated learning paths through world-class resources connected by pedagogical, AI-assisted notes.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <body
          className={`${roboto.variable} ${montserrat.variable} ${ptMono.variable} paper-lines min-h-screen bg-background font-sans antialiased relative`}
        >
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
