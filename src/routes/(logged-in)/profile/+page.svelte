<script lang="ts">
	import type { PageProps } from './$types';

	let activeTab = $state('overview');

	let { data }: PageProps = $props();

	let user = {
		username: data.user.username,
		fullName: 'John Doe',
		bio: 'Frontend developer passionate about web technologies',
		avatar: '/images/avatar.png',
		level: 5,
		xp: 350,
		nextLevelXp: 500,
		joinDate: 'January 15, 2023',
		stats: {
			lessonsCompleted: 42,
			challengesSolved: 18,
			daysActive: 27
		}
	};
</script>

<div class="profile-container">
	<div class="profile-header">
		<div class="avatar-container">
			<img src={user.avatar} alt="User avatar" class="avatar" />
			<div class="level-badge">Lvl {user.level}</div>
		</div>

		<div class="user-info">
			<h1>{user.username}</h1>
			<h2>{user.fullName}</h2>
			<p class="bio">{user.bio}</p>

			<div class="xp-progress">
				<div class="xp-bar">
					<div class="xp-fill" style="width: {(user.xp / user.nextLevelXp) * 100}%"></div>
				</div>
				<div class="xp-text">{user.xp} / {user.nextLevelXp} XP</div>
			</div>

			<p class="join-date">Member since {user.joinDate}</p>
		</div>
	</div>

	<div class="profile-tabs">
		<button
			class="tab-btn"
			class:active={activeTab === 'overview'}
			onclick={() => (activeTab = 'overview')}
		>
			Overview
		</button>
		<button
			class="tab-btn"
			class:active={activeTab === 'achievements'}
			onclick={() => (activeTab = 'achievements')}
		>
			Achievements
		</button>
		<button
			class="tab-btn"
			class:active={activeTab === 'settings'}
			onclick={() => (activeTab = 'settings')}
		>
			Settings
		</button>
	</div>

	<div class="profile-content">
		{#if activeTab === 'overview'}
			<div class="stats-container">
				<div class="stat-card">
					<h3>Lessons</h3>
					<div class="stat-value">{user.stats.lessonsCompleted}</div>
				</div>
				<div class="stat-card">
					<h3>Challenges</h3>
					<div class="stat-value">{user.stats.challengesSolved}</div>
				</div>
				<div class="stat-card">
					<h3>Active Days</h3>
					<div class="stat-value">{user.stats.daysActive}</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.profile-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
	}

	.profile-header {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.avatar-container {
		position: relative;
	}

	.avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
	}

	.level-badge {
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: #4caf50;
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 1rem;
		font-size: 0.8rem;
		font-weight: bold;
	}

	.user-info {
		flex: 1;
	}

	.user-info h1 {
		margin: 0;
		font-size: 1.8rem;
	}

	.user-info h2 {
		margin: 0.25rem 0 1rem;
		font-size: 1.2rem;
		color: #666;
		font-weight: normal;
	}

	.bio {
		margin-bottom: 1rem;
	}

	.xp-progress {
		margin-bottom: 1rem;
	}

	.xp-bar {
		background-color: #f0f0f0;
		border-radius: 0.5rem;
		height: 0.5rem;
		overflow: hidden;
		margin-bottom: 0.25rem;
	}

	.xp-fill {
		background-color: #4caf50;
		height: 100%;
	}

	.xp-text {
		font-size: 0.8rem;
		color: #666;
	}

	.join-date {
		font-size: 0.8rem;
		color: #666;
	}

	.profile-tabs {
		display: flex;
		border-bottom: 1px solid #ddd;
		margin-bottom: 2rem;
	}

	.tab-btn {
		padding: 0.75rem 1.5rem;
		background: none;
		border: none;
		font-size: 1rem;
		cursor: pointer;
		border-bottom: 2px solid transparent;
	}

	.tab-btn.active {
		border-bottom-color: #4caf50;
		font-weight: bold;
	}

	.stats-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.stat-card {
		background-color: #f9f9f9;
		padding: 1.5rem;
		border-radius: 0.5rem;
		text-align: center;
	}

	.stat-card h3 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		font-size: 1rem;
		color: #666;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: bold;
		color: #333;
	}
</style>
