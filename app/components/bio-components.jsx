import React from 'react';
import data from '../../data.json';

// Enhanced UserText component
export const UserText = async ({ promise }) => {
	const user = await promise;
	return (
		<div className="space-y-6 max-w-4xl mx-auto">
			{/* Main intro */}
			<div className="space-y-4">
				<p className="text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">
					Hi, I'm <span className="font-semibold text-zinc-900 dark:text-zinc-100">{user.name || data.displayName}</span>.
					{user.bio && <span className="ml-1">{user.bio}</span>}
				</p>

				{data.bio?.intro && (
					<p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
						{data.bio.intro}
					</p>
				)}

				{data.bio?.aboutMe && (
					<p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
						{data.bio.aboutMe}
					</p>
				)}

				{data.bio?.tagline && (
					<p className="text-base italic text-zinc-500 dark:text-zinc-500 font-medium">
						"{data.bio.tagline}"
					</p>
				)}
			</div>

			{/* Stats Section */}
			{data.stats && (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
					<div className="text-center p-4 bg-white/50 dark:bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 hover:scale-105 transition-all duration-300">
						<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
							{data.stats.projectsCompleted}+
						</div>
						<div className="text-sm text-zinc-600 dark:text-zinc-400">Projects</div>
					</div>
					<div className="text-center p-4 bg-white/50 dark:bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 hover:scale-105 transition-all duration-300">
						<div className="text-2xl font-bold text-green-600 dark:text-green-400">
							{data.stats.yearsOfExperience}+
						</div>
						<div className="text-sm text-zinc-600 dark:text-zinc-400">Years</div>
					</div>
					<div className="text-center p-4 bg-white/50 dark:bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 hover:scale-105 transition-all duration-300">
						<div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
							{data.stats.technologiesUsed}+
						</div>
						<div className="text-sm text-zinc-600 dark:text-zinc-400">Technologies</div>
					</div>
					<div className="text-center p-4 bg-white/50 dark:bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 hover:scale-105 transition-all duration-300">
						<div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
							{data.stats.openSourceContributions}+
						</div>
						<div className="text-sm text-zinc-600 dark:text-zinc-400">Contributions</div>
					</div>
				</div>
			)}

			{/* Current Focus */}
			{data.bio?.currentFocus && (
				<div className="mt-6 p-4 bg-blue-50/80 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
					<h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Currently Focusing On</h3>
					<p className="text-blue-700 dark:text-blue-400 text-sm">
						{data.bio.currentFocus}
					</p>
				</div>
			)}
		</div>
	);
};

// Skills Component
export const SkillsSection = () => {
	if (!data.skills) return null;

	const skillCategories = [
		{ name: 'Frontend', skills: data.skills.frontend, color: 'blue' },
		{ name: 'Backend', skills: data.skills.backend, color: 'green' },
		{ name: 'Tools', skills: data.skills.tools, color: 'purple' },
		{ name: 'Learning', skills: data.skills.learning, color: 'orange' }
	];

	const getColorClasses = (color) => {
		const colors = {
			blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800',
			green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800',
			purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800',
			orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800'
		};
		return colors[color] || colors.blue;
	};

	return (
		<div className="mt-12 max-w-6xl mx-auto">
			<h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 text-center">
				Skills & Technologies
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{skillCategories.map((category) => (
					category.skills && category.skills.length > 0 && (
						<div key={category.name} className="space-y-3">
							<h4 className="font-semibold text-zinc-800 dark:text-zinc-200 text-lg">
								{category.name}
							</h4>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill) => (
									<span
										key={skill}
										className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 cursor-default ${getColorClasses(category.color)}`}
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					)
				))}
			</div>
		</div>
	);
};

// Interests Component
export const InterestsSection = () => {
	if (!data.bio?.interests || data.bio.interests.length === 0) return null;

	return (
		<div className="mt-8 max-w-4xl mx-auto">
			<h4 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4 text-center">
				Interests
			</h4>
			<div className="flex flex-wrap justify-center gap-3">
				{data.bio.interests.map((interest, index) => (
					<span
						key={interest}
						className="px-4 py-2 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 cursor-default border border-zinc-300 dark:border-zinc-600"
						style={{
							animationDelay: `${index * 0.1}s`
						}}
					>
						{interest}
					</span>
				))}
			</div>
		</div>
	);
};

// Experience Component
export const ExperienceSection = () => {
	if (!data.experience || data.experience.length === 0) return null;

	return (
		<div className="mt-12 max-w-4xl mx-auto">
			<h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 text-center">
				Experience
			</h3>
			<div className="space-y-6">
				{data.experience.map((exp, index) => (
					<div
						key={index}
						className="p-6 bg-white/70 dark:bg-zinc-800/70 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
					>
						<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
							<h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
								{exp.title}
							</h4>
							<span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-3 py-1 rounded-full mt-2 md:mt-0">
								{exp.duration}
							</span>
						</div>
						<p className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-2">
							{exp.company}
						</p>
						<p className="text-zinc-600 dark:text-zinc-400 mb-4">
							{exp.description}
						</p>
						<div className="flex flex-wrap gap-2">
							{exp.technologies.map((tech) => (
								<span
									key={tech}
									className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-md border border-blue-200 dark:border-blue-800"
								>
									{tech}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};