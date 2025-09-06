import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";
import data from "../data.json";
import { RecentActivity } from "./components/recent-activity";
import { getUser, getSocialAccounts } from "./data";
import LoadingIndicator from "./components/loading-indicator";
import { Card } from "./components/card";
import ProjectsComponent from "./projects/projects";

// Import our new enhanced components
import { UserText, SkillsSection, InterestsSection, ExperienceSection } from "./components/bio-components";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GoMail, GoPerson } from "react-icons/go";
import { ScrollToTopButton } from "./components/ScrollToTopButton";

const navigation = [
    { name: "About", href: "#about" },   // New about section
    { name: "Skills", href: "#skills" },   // New skills section
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default async function Home(props) {
    const searchParams = await props.searchParams;
    return <LandingComponent searchParams={searchParams} />;
}

const UserIcon = async ({ promise }) => {
    const user = await promise;
    return (
        <Image
            alt="👨‍💻"
            width={100}
            height={100}
            src={user.avatar_url || data.avatarUrl}
            className="rounded-full mx-4 ring-4 ring-white/20 dark:ring-zinc-800/50 shadow-xl hover:scale-110 transition-all duration-300 flex-shrink-0"
        />
    );
};

const LandingComponent = async ({ searchParams: { customUsername } }) => {
    const username =
        customUsername || process.env.GITHUB_USERNAME || data.githubUsername;

    // Fetch GitHub profile + socials
    const userData = getUser(username);
    const socialsData = getSocialAccounts(username);
    const [user, githubSocials] = await Promise.all([userData, socialsData]);

    const promise = Promise.resolve(user);

    // Build contact info
    const email = user.email || data.email;
    const contacts = [];

    if (email) {
        contacts.push({
            icon: <GoMail size={20} />,
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
            label: "Email",
            handle: email,
            className: "sm:rotate-45 md:rotate-0 lg:rotate-45 xl:rotate-0",
        });
    }

    contacts.push({
        icon: <FaGithub size={20} />,
        href: "https://github.com/" + username,
        label: "Github",
        handle: username,
    });

    if (data.linkedin) {
        contacts.push({
            icon: <FaLinkedin size={20} />,
            href: data.linkedin,
            label: "LinkedIn",
            handle: data.linkedin.split("/").pop(),
        });
    }

    // Add additional social links from data.json

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-x-hidden bg-gradient-to-tl from-white via-zinc-50/50 to-white dark:from-black dark:via-zinc-900/50 dark:to-black transition-colors duration-500">
            {/* NAVBAR */}
            <nav className="my-16 animate-fade-in px-4">
                <ul className="flex items-center justify-center gap-4 sm:gap-6">
                    {navigation.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-base sm:text-lg duration-500 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all hover:scale-105 relative group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <span className="inline-flex items-center relative">
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </Link>
                    ))}
                </ul>
            </nav>

            {/* HERO */}
            <div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-600/0 via-zinc-600/50 to-zinc-600/0 dark:from-zinc-300/0 dark:via-zinc-300/50 dark:to-zinc-300/0" />
            
            <div className="text-center space-y-6 animate-slide-up px-4 max-w-full">
                <div className="flex items-center justify-center z-10 text-4xl hover:scale-105 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl bg-clip-text bg-gradient-to-r from-black via-zinc-700 to-black dark:from-white dark:via-zinc-300 dark:to-white p-5 transition-all max-w-full overflow-hidden">
                    <span className="truncate">{username}</span>
                    <Suspense fallback={<div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse ml-4 flex-shrink-0"></div>}>
                        <UserIcon promise={promise} />
                    </Suspense>
                </div>
            </div>
            
            <div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-600/0 via-zinc-600/50 to-zinc-600/0 dark:from-zinc-300/0 dark:via-zinc-300/50 dark:to-zinc-300/0" />

            {/* ABOUT SECTION */}
            <section id="about" className="w-full py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center animate-fade-in">
                        <h2 className="text-lg text-zinc-600 dark:text-zinc-400 transition-colors">
                            <Suspense fallback={
                                <div className="w-full min-h-96 flex items-center justify-center">
                                    <div className="loading-shimmer w-full h-32 rounded-lg"></div>
                                </div>
                            }>
                                <UserText promise={promise} />
                                <InterestsSection />
                            </Suspense>
                        </h2>
                    </div>
                </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="w-full py-20 px-6 bg-gradient-to-b from-transparent via-zinc-50/50 to-transparent dark:via-zinc-900/50">
                <div className="max-w-6xl mx-auto">
                    <Suspense fallback={
                        <div className="w-full min-h-96 flex items-center justify-center">
                            <div className="loading-shimmer w-full h-64 rounded-lg"></div>
                        </div>
                    }>
                        <SkillsSection />
                    </Suspense>
                </div>
            </section>

            {/* EXPERIENCE SECTION */}
            {data.experience && data.experience.length > 0 && (
                <section id="experience" className="w-full py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <Suspense fallback={
                            <div className="w-full min-h-96 flex items-center justify-center">
                                <div className="loading-shimmer w-full h-64 rounded-lg"></div>
                            </div>
                        }>
                            <ExperienceSection />
                        </Suspense>
                    </div>
                </section>
            )}

            {/* RECENT ACTIVITY */}
            <section className="w-full py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <Suspense fallback={
                        <div className="w-full h-32 flex items-center justify-center">
                            <div className="loading-shimmer w-full h-24 rounded-lg"></div>
                        </div>
                    }>
                        <RecentActivity username={username} />
                    </Suspense>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section
                id="projects"
                className="relative pb-16 pt-4 w-full bg-gradient-to-tl from-zinc-100/0 via-zinc-200/50 to-zinc-100/0 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0 transition-colors duration-500"
            >
                <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-12 md:pt-24 lg:pt-32">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl transition-colors animate-slide-up">
                            Projects
                        </h2>
                        <p className="mt-4 text-zinc-700 dark:text-zinc-400 transition-colors animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            {customUsername ? `${customUsername}'s projects` : data.description}
                        </p>
                    </div>
                    <Suspense fallback={<div className="text-lg text-zinc-600 dark:text-zinc-500 text-center py-12">Loading projects...</div>}>
                        <ProjectsComponent username={username} />
                    </Suspense>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section
                id="contact"
                className="w-full bg-gradient-to-tl from-zinc-100/0 via-zinc-200/50 to-zinc-100/0 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0 py-20 transition-colors duration-500"
            >
                <div className="container flex items-center justify-center px-4 mx-auto">
                    <div className="max-w-4xl w-full">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl text-center mb-16 animate-slide-up">
                            Get In Touch
                        </h2>
                        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                            {contacts.map((s, index) => (
                                <Card key={s.label} className="w-full h-full">
                                    <Link
                                        href={s.href}
                                        target="_blank"
                                        className="p-6 relative flex flex-col items-center justify-center gap-6 duration-700 group md:gap-8 md:py-12 hover-lift h-full min-h-[280px]"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <span
                                            className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                                            aria-hidden="true"
                                        />
                                        <span className="relative z-10 flex items-center justify-center w-16 h-16 text-lg duration-1000 border rounded-full text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-900 border-zinc-500 bg-zinc-100 dark:bg-zinc-900 group-hover:border-zinc-700 dark:group-hover:border-zinc-200 drop-shadow-orange transition-all hover-glow">
                                            {s.icon}
                                        </span>
                                        <div className="z-10 flex flex-col items-center text-center">
                                            <span
                                                className={`text-lg font-medium duration-150 lg:text-xl text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white font-display transition-colors text-center leading-tight break-all ${
                                                    s.className || ""
                                                }`}
                                            >
                                                {s.handle}
                                            </span>
                                            <span className="mt-3 text-sm text-center duration-1000 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                                                {s.label}
                                            </span>
                                        </div>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <ScrollToTopButton />
        </div>
    );
};