import gql from 'graphql-tag';

export const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		fullName: String
		level: Int!
		xp: Int!
		registrationDate: String!
		admin: Boolean!
		badges: [Badge!]
		modules: [ModuleProgress!]
		stats: UserStats
		score: Int
		rank: Int
	}

	type UserStats {
		lessonsCompleted: Int!
		challengesSolved: Int!
		daysActive: Int!
		lastActiveDate: String
	}

	type Badge {
		id: ID!
		name: String!
		description: String!
		icon: String!
		category: String!
		level: Int!
		hidden: Boolean!
		requirements: String
		awardedAt: String
		earnedAt: String
		viewed: Boolean
	}

	type Module {
		id: ID!
		url: String!
		title: String!
		description: String!
		level: String!
		category: String!
		xpReward: Int!
		image: String
		sections: [Section!]
	}

	type ModuleProgress {
		module: Module!
		progress: Int!
		completedSections: [Int!]!
		totalSections: Int!
	}

	type Section {
		title: String!
		url: String!
		completed: Boolean!
		order: Int
	}

	type Challenge {
		id: ID!
		title: String!
		description: String!
		difficulty: String!
		category: String!
		xp: Int!
		timeEstimate: String!
		completions: Int
		task: ChallengeTask
	}

	type ChallengeTask {
		name: String!
		description: String!
		tests: [ChallengeTest!]
	}

	type ChallengeTest {
		input: [String!]!
		expectedOutput: String!
	}

	union SearchResult = Module | Challenge | Badge

	type Query {
		user(id: ID!): User
		users: [User!]!
		modules(category: String): [Module!]!
		module(url: String!): Module
		moduleWithSections(url: String!): Module
		badges(category: String): [Badge!]!
		userBadges(userId: ID!): [Badge!]!
		leaderboard(limit: Int): [User!]!
		challenge(id: ID): Challenge
		challenges: [Challenge!]!
		search(query: String!, types: [String!]): [SearchResult!]!
	}
`;
