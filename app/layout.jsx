import "../global.css";
import LocalFont from "next/font/local";
import data from "../data.json";
import { ThemeProvider } from "next-themes";
import StarBackground from "./components/StarBackground";
import ThemeToggle from "./components/ThemeToggle";

const username = process.env.GITHUB_USERNAME || data.githubUsername;
const displayName = data.displayName || username;

/** @type {import('next').Metadata} */
export const metadata = {
  title: {
    default: [username, "'s portfolio"].join(""),
    template: "%s | " + data.displayName + "'s portfolio",
  },
  description: "GitHub portfolio for " + displayName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      sizes: "any",
      type: "image/svg+xml",
    },
  ],
};

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={calSans.variable}>
      <body
        className={`transition-colors duration-500 bg-white text-black dark:bg-black dark:text-white ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Star background applied everywhere */}
          <StarBackground />
          
          {/* Dark mode toggle fixed top-right */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}