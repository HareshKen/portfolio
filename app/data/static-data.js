// app/data/static-data.js
import data from '../../data.json';

// Simulate async behavior to maintain compatibility with existing components
const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get user data from static configuration
 * @param {string} username - GitHub username (used for compatibility, data comes from static config)
 */
export async function getUser(username) {
    await delay(50); // Simulate network delay
    
    return {
        login: data.githubUsername,
        name: data.displayName,
        avatar_url: data.avatarUrl,
        bio: data.bio.intro,
        email: data.email,
        location: data.location,
        blog: data.website,
        twitter_username: data.twitter?.split('/').pop(),
        public_repos: data.projects.featured.length + data.projects.other.length,
        followers: data.stats.openSourceContributions * 5, // Simulated
        following: 50, // Simulated
        created_at: "2021-09-15T10:30:00Z", // Simulated
        updated_at: new Date().toISOString()
    };
}

/**
 * Get repositories from static configuration
 * @param {string} username - GitHub username
 */
export async function getRepos(username) {
    await delay(100);
    
    const allProjects = [...data.projects.featured, ...data.projects.other];
    
    return allProjects.map(project => ({
        id: Math.random() * 1000000, // Simulated ID
        name: project.id,
        full_name: `${username}/${project.id}`,
        html_url: project.github || `https://github.com/${username}/${project.id}`,
        homepage: project.demo,
        description: project.description,
        created_at: project.created_at || "2023-01-01T00:00:00Z",
        updated_at: project.updated_at || new Date().toISOString(),
        stargazers_count: project.stats?.stars || Math.floor(Math.random() * 50),
        watchers_count: project.stats?.watchers || Math.floor(Math.random() * 20),
        forks_count: project.stats?.forks || Math.floor(Math.random() * 15),
        open_issues_count: project.stats?.issues || Math.floor(Math.random() * 10),
        language: project.technologies[0] || "JavaScript",
        languages_url: `https://api.github.com/repos/${username}/${project.id}/languages`,
        topics: project.technologies.map(tech => tech.toLowerCase().replace(/[^a-z0-9]/g, '-')),
        private: false,
        fork: false,
        archived: false,
        default_branch: "main",
        owner: {
            login: username,
            avatar_url: data.avatarUrl
        },
        // Add mock Vercel info for featured projects
        vercel: project.featured ? {
            framework: getFrameworkFromTech(project.technologies),
            nodeVersion: "18.x",
            name: project.id,
            link: project.demo,
            description: project.description
        } : null
    }));
}

/**
 * Get pinned repositories (featured projects)
 * @param {string} username - GitHub username
 */
export async function getPinnedRepos(username) {
    await delay(75);
    
    return data.projects.heroNames || data.projects.featured.slice(0, 6).map(p => p.id);
}

/**
 * Get social accounts from static configuration
 * @param {string} username - GitHub username
 */
export async function getSocialAccounts(username) {
    await delay(50);
    
    return data.socialLinks.map(social => ({
        provider: social.name.toLowerCase(),
        url: social.url
    }));
}

/**
 * Get user organizations (simulated)
 * @param {string} username - GitHub username
 */
export async function getUserOrganizations(username) {
    await delay(100);
    
    return {
        data: {
            user: {
                organizations: {
                    nodes: [
                        {
                            name: "Open Source Community",
                            websiteUrl: "https://opensource.org",
                            url: "https://github.com/opensource",
                            avatarUrl: "/images/orgs/opensource.jpg",
                            description: "Contributing to open source projects"
                        },
                        {
                            name: "Tech Innovators",
                            websiteUrl: "https://techinnovators.dev",
                            url: "https://github.com/techinnovators",
                            avatarUrl: "/images/orgs/techinnovators.jpg",
                            description: "Building the future with technology"
                        }
                    ]
                }
            }
        }
    };
}

/**
 * Get recent user activity from static configuration
 * @param {string} username - GitHub username
 */
export async function getRecentUserActivity(username) {
    await delay(200);
    
    const activity = data.recentActivity;
    
    // Simulate GitHub API activity structure
    const activities = [];
    
    // Add commit activities
    for (let i = 0; i < activity.details.commits; i++) {
        activities.push({
            type: 'PushEvent',
            payload: {
                size: Math.floor(Math.random() * 3) + 1,
                commits: [
                    {
                        message: "Update project features",
                        sha: Math.random().toString(36).substring(7)
                    }
                ]
            },
            created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    
    // Add PR activities
    for (let i = 0; i < activity.details.prsOpened; i++) {
        activities.push({
            type: 'PullRequestEvent',
            payload: {
                action: 'opened',
                pull_request: {
                    merged: Math.random() > 0.5,
                    title: "Feature enhancement"
                }
            },
            created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    
    // Add review activities
    for (let i = 0; i < activity.details.prsReviewed; i++) {
        activities.push({
            type: 'PullRequestReviewEvent',
            payload: {
                action: 'created',
                review: {
                    state: 'approved'
                }
            },
            created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    
    // Add comment activities
    for (let i = 0; i < activity.details.comments; i++) {
        activities.push({
            type: 'IssueCommentEvent',
            payload: {
                action: 'created',
                comment: {
                    body: "Great work on this implementation!"
                }
            },
            created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    
    return activities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

/**
 * Get Vercel projects (simulated from static data)
 */
export async function getVercelProjects() {
    await delay(150);
    
    const vercelProjects = data.projects.featured
        .filter(project => project.demo)
        .map(project => ({
            id: Math.random().toString(36).substring(7),
            name: project.id,
            framework: getFrameworkFromTech(project.technologies),
            nodeVersion: "18.x",
            link: project.demo,
            description: project.description,
            createdAt: project.created_at,
            updatedAt: project.updated_at
        }));
    
    return {
        projects: vercelProjects
    };
}

/**
 * Get traffic page views (simulated)
 * @param {string} username - GitHub username
 * @param {string} reponame - Repository name
 */
export async function getTrafficPageViews(username, reponame) {
    await delay(100);
    
    const project = [...data.projects.featured, ...data.projects.other]
        .find(p => p.id === reponame);
    
    if (!project) {
        return { sumUniques: 0, todayUniques: 0 };
    }
    
    const baseViews = project.stats?.stars || 10;
    return {
        sumUniques: baseViews * 3,
        todayUniques: Math.floor(baseViews * 0.1) + 1
    };
}

/**
 * Get Dependabot alerts (simulated)
 * @param {string} username - GitHub username
 * @param {string} reponame - Repository name
 */
export async function getDependabotAlerts(username, reponame) {
    await delay(75);
    
    // Simulate occasional security alerts
    const alertTypes = ['low', 'medium', 'high', 'critical'];
    const randomAlerts = Math.random() > 0.7 ? 1 : 0;
    
    if (randomAlerts) {
        const severity = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        return { [severity]: 1 };
    }
    
    return {};
}

/**
 * Get Copilot PRs (simulated)
 * @param {string} username - GitHub username  
 * @param {string} reponame - Repository name
 */
export async function getCopilotPRs(username, reponame) {
    await delay(50);
    
    // Simulate occasional Copilot-generated PRs
    return Math.floor(Math.random() * 3);
}

/**
 * Get repository package.json (simulated)
 * @param {string} username - GitHub username
 * @param {string} reponame - Repository name
 */
export async function getRepositoryPackageJson(username, reponame) {
    await delay(100);
    
    const project = [...data.projects.featured, ...data.projects.other]
        .find(p => p.id === reponame);
    
    if (!project) return null;
    
    // Generate mock package.json based on project technologies
    const dependencies = {};
    const devDependencies = {};
    
    project.technologies.forEach(tech => {
        const version = "^" + (Math.floor(Math.random() * 5) + 1) + "." + Math.floor(Math.random() * 10) + ".0";
        
        switch (tech.toLowerCase()) {
            case 'react':
                dependencies.react = version;
                break;
            case 'next.js':
                dependencies.next = version;
                break;
            case 'typescript':
                devDependencies.typescript = version;
                break;
            case 'tailwind css':
                devDependencies.tailwindcss = version;
                break;
            case 'node.js':
                // Node.js is runtime, not a dependency
                break;
            default:
                dependencies[tech.toLowerCase().replace(/\s+/g, '-')] = version;
        }
    });
    
    return {
        name: project.id,
        version: "1.0.0",
        description: project.description,
        dependencies,
        devDependencies,
        scripts: {
            dev: "next dev",
            build: "next build",
            start: "next start"
        }
    };
}

/**
 * Check if repository uses App Router or Pages Router (simulated)
 * @param {string} username - GitHub username
 * @param {string} reponame - Repository name
 */
export async function checkAppJsxExistence(username, reponame) {
    await delay(50);
    
    const project = [...data.projects.featured, ...data.projects.other]
        .find(p => p.id === reponame);
    
    const usesNextjs = project?.technologies.some(tech => 
        tech.toLowerCase().includes('next')
    );
    
    if (usesNextjs) {
        // Randomly assign router type for demo
        const useAppRouter = Math.random() > 0.5;
        return {
            isRouterPages: !useAppRouter,
            isRouterApp: useAppRouter
        };
    }
    
    return {
        isRouterPages: false,
        isRouterApp: false
    };
}

/**
 * Get latest release info for frameworks (simulated)
 */
export async function getNextjsLatestRelease() {
    await delay(50);
    return {
        tagName: "14.2.0",
        updatedAt: "2024-12-15T10:00:00Z"
    };
}

export async function getAstroLatestRelease() {
    await delay(50);
    return {
        tagName: "4.2.0",
        updatedAt: "2024-12-10T10:00:00Z"
    };
}

export async function getRepositoryFrameworks(username, reponame) {
    await delay(100);
    
    const packageJson = await getRepositoryPackageJson(username, reponame);
    if (!packageJson) return [];
    
    const frameworks = [];
    
    // Check for various frameworks in dependencies
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    if (deps.next) {
        frameworks.push({
            name: 'Next.js',
            type: 'nextjs',
            version: deps.next.replace('^', ''),
            latestVersion: '14.2.0',
            hasUpgrade: deps.next.replace('^', '') < '14.2.0'
        });
    }
    
    if (deps.astro) {
        frameworks.push({
            name: 'Astro',
            type: 'astro',
            version: deps.astro.replace('^', ''),
            latestVersion: '4.2.0',
            hasUpgrade: deps.astro.replace('^', '') < '4.2.0'
        });
    }
    
    return frameworks;
}

/**
 * Helper function to determine framework from technologies
 * @param {Array} technologies - Array of technology strings
 */
function getFrameworkFromTech(technologies) {
    const techLower = technologies.map(t => t.toLowerCase());
    
    if (techLower.includes('next.js')) return 'nextjs';
    if (techLower.includes('astro')) return 'astro';
    if (techLower.includes('nuxt')) return 'nuxt';
    if (techLower.includes('gatsby')) return 'gatsby';
    if (techLower.includes('remix')) return 'remix';
    if (techLower.includes('sveltekit')) return 'sveltekit';
    if (techLower.includes('react')) return 'react';
    if (techLower.includes('vue')) return 'vue';
    
    return null;
}

// Export all the functions that were previously in the original data.js
export {
    getUser,
    getRepos,
    getPinnedRepos,
    getSocialAccounts,
    getUserOrganizations,
    getRecentUserActivity,
    getVercelProjects,
    getTrafficPageViews,
    getDependabotAlerts,
    getCopilotPRs,
    getRepositoryPackageJson,
    checkAppJsxExistence,
    getNextjsLatestRelease,
    getAstroLatestRelease,
    getRepositoryFrameworks
};