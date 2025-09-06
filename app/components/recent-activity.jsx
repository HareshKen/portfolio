// app/components/recent-activity.jsx - Updated for static data
import data from "../../data.json";

export const RecentActivity = async ({ username }) => {
    // Use static activity data instead of API calls
    const activityData = data.recentActivity;
    
    // If we have a summary, use it directly
    if (activityData.summary) {
        return (
            <div className="text-center space-y-4">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {activityData.summary}
                </div>
                
                {/* Optional: Show detailed stats */}
                {activityData.details && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-6">
                        <div className="text-center p-3 bg-white/30 dark:bg-zinc-800/30 rounded-lg backdrop-blur-sm border border-zinc-200/30 dark:border-zinc-700/30">
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                {activityData.details.commits}
                            </div>
                            <div className="text-xs text-zinc-600 dark:text-zinc-400">Commits</div>
                        </div>
                        <div className="text-center p-3 bg-white/30 dark:bg-zinc-800/30 rounded-lg backdrop-blur-sm border border-zinc-200/30 dark:border-zinc-700/30">
                            <div className="text-xl font-bold text-green-600 dark:text-green-400">
                                {activityData.details.prsOpened}
                            </div>
                            <div className="text-xs text-zinc-600 dark:text-zinc-400">PRs Opened</div>
                        </div>
                        <div className="text-center p-3 bg-white/30 dark:bg-zinc-800/30 rounded-lg backdrop-blur-sm border border-zinc-200/30 dark:border-zinc-700/30">
                            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                {activityData.details.prsReviewed}
                            </div>
                            <div className="text-xs text-zinc-600 dark:text-zinc-400">PRs Reviewed</div>
                        </div>
                        <div className="text-center p-3 bg-white/30 dark:bg-zinc-800/30 rounded-lg backdrop-blur-sm border border-zinc-200/30 dark:border-zinc-700/30">
                            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                                {activityData.details.repositories}
                            </div>
                            <div className="text-xs text-zinc-600 dark:text-zinc-400">Repositories</div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Fallback: Generate summary from details
    if (activityData.details) {
        const { commits, prsOpened, prsReviewed, comments } = activityData.details;
        
        const activities = [];
        
        if (commits > 0) {
            activities.push(`pushed ${commits} commit${commits === 1 ? '' : 's'}`);
        }
        if (prsOpened > 0) {
            activities.push(`opened ${prsOpened} PR${prsOpened === 1 ? '' : 's'}`);
        }
        if (prsReviewed > 0) {
            activities.push(`reviewed ${prsReviewed} PR${prsReviewed === 1 ? '' : 's'}`);
        }
        if (comments > 0) {
            activities.push(`made ${comments} comment${comments === 1 ? '' : 's'}`);
        }
        
        const activitySummaryString = activities.join(', ');
        
        return (
            <div className="text-center">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {activitySummaryString && 'In last 90 days on GitHub I ' + activitySummaryString + ' in public repositories.'}
                </div>
            </div>
        );
    }

    // Default fallback
    return (
        <div className="text-center">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Actively contributing to open source projects and building innovative solutions.
            </div>
        </div>
    );
};