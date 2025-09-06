// app/data.js - Updated to use static data instead of GitHub API
import {
    getUser as getStaticUser,
    getRepos as getStaticRepos,
    getPinnedRepos as getStaticPinnedRepos,
    getSocialAccounts as getStaticSocialAccounts,
    getUserOrganizations as getStaticUserOrganizations,
    getRecentUserActivity as getStaticRecentUserActivity,
    getVercelProjects as getStaticVercelProjects,
    getTrafficPageViews as getStaticTrafficPageViews,
    getDependabotAlerts as getStaticDependabotAlerts,
    getCopilotPRs as getStaticCopilotPRs,
    getRepositoryPackageJson as getStaticRepositoryPackageJson,
    checkAppJsxExistence as getStaticCheckAppJsxExistence,
    getNextjsLatestRelease as getStaticNextjsLatestRelease,
    getAstroLatestRelease as getStaticAstroLatestRelease,
    getRepositoryFrameworks as getStaticRepositoryFrameworks
} from './data/static-data.js'; // Corrected path

// Re-export all functions to maintain compatibility with existing code
export const getUser = getStaticUser;
export const getRepos = getStaticRepos;
export const getPinnedRepos = getStaticPinnedRepos;
export const getSocialAccounts = getStaticSocialAccounts;
export const getUserOrganizations = getStaticUserOrganizations;
export const getRecentUserActivity = getStaticRecentUserActivity;
export const getVercelProjects = getStaticVercelProjects;
export const getTrafficPageViews = getStaticTrafficPageViews;
export const getDependabotAlerts = getStaticDependabotAlerts;
export const getCopilotPRs = getStaticCopilotPRs;
export const getRepositoryPackageJson = getStaticRepositoryPackageJson;
export const checkAppJsxExistence = getStaticCheckAppJsxExistence;
export const getNextjsLatestRelease = getStaticNextjsLatestRelease;
export const getAstroLatestRelease = getStaticAstroLatestRelease;
export const getRepositoryFrameworks = getStaticRepositoryFrameworks;

// Legacy exports for backward compatibility
export const getFrameworkLatestRelease = async (repoName, owner, cacheKey) => {
    // Simulate framework release data
    const frameworks = {
        'next.js': '14.2.0',
        'astro': '4.2.0',
        'nuxt': '3.8.0',
        'kit': '2.0.0', // SvelteKit
        'remix': '2.4.0',
        'gatsby': '5.12.0'
    };
    
    return {
        tagName: frameworks[repoName] || '1.0.0',
        updatedAt: new Date().toISOString()
    };
};

export const getNuxtLatestRelease = () => getFrameworkLatestRelease('nuxt', 'nuxt', 'nuxt');
export const getSvelteKitLatestRelease = () => getFrameworkLatestRelease('kit', 'sveltejs', 'sveltekit');
export const getRemixLatestRelease = () => getFrameworkLatestRelease('remix', 'remix-run', 'remix');
export const getGatsbyLatestRelease = () => getFrameworkLatestRelease('gatsby', 'gatsbyjs', 'gatsby');

// Helper function for framework detection (moved from original)
export function detectFrameworks(packageJson) {
    if (!packageJson) return [];

    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    const frameworks = [];

    // Framework detection rules
    const frameworkMap = {
        'next': {
            name: 'Next.js',
            type: 'nextjs',
            getLatestRelease: getNextjsLatestRelease
        },
        'astro': {
            name: 'Astro',
            type: 'astro',
            getLatestRelease: getAstroLatestRelease
        },
        'nuxt': {
            name: 'Nuxt',
            type: 'nuxt',
            getLatestRelease: getNuxtLatestRelease
        },
        '@sveltejs/kit': {
            name: 'SvelteKit',
            type: 'sveltekit',
            getLatestRelease: getSvelteKitLatestRelease
        },
        '@remix-run/react': {
            name: 'Remix',
            type: 'remix',
            getLatestRelease: getRemixLatestRelease
        },
        'gatsby': {
            name: 'Gatsby',
            type: 'gatsby',
            getLatestRelease: getGatsbyLatestRelease
        }
    };

    // Check for each framework
    for (const [dep, framework] of Object.entries(frameworkMap)) {
        if (dependencies[dep]) {
            const version = dependencies[dep].replace(/[\^~]/, '');
            frameworks.push({
                ...framework,
                version,
                dependency: dep
            });
        }
    }

    return frameworks;
}