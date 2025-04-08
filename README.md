# CodeLegends

## Gamification of Code Learning

CodeLegends is a gamified platform designed to enhance the learning experience of coding through interactive challenges and competitions. The platform allows users to engage in coding challenges, earn points, and compete with others, making the learning process more enjoyable and effective.

## Features

- **Interactive Coding Challenges**: Users can solve coding problems and receive instant feedback.
- **Achievements and Badges**: Users can earn achievements and badges for completing challenges, which can be shared on social media.
- **Instant Feedback**: Users receive immediate feedback on their solutions, helping them learn from their mistakes.
- **Challenges**: Test your skills with a variety of coding challenges.

## Technologies Used

- **Frontend**: SvelteKit, Tailwind CSS, TypeScript, Prisma Code Editor
- **Backend**: Node.js, SvelteKit, DrizzleORM, MySQL (with Docker)
- **Database**: MySQL

## Running the Project Locally

### Prerequisites

- Node.js (v20 or higher) [https://nodejs.org/](https://nodejs.org/)
- pnpm [https://pnpm.io/installation](https://pnpm.io/installation)
- Docker [https://www.docker.com/](https://www.docker.com/)

### Steps to Run the Project

1. Copy `.env.example` to `.env` and fill in the required environment variables.
   - Make sure to set the `DATABASE_URL` to point to your local MySQL database.
   - Example: `DATABASE_URL=mysql://user:password@localhost:3306/codelegends` (don't change it if you didn't change the docker-compose file)
   - Set `OPEN_AI_API_KEY` to your OpenAI API key.
2. Run `docker-compose up -d` to start the MySQL database.
3. Run `pnpm install` to install the dependencies.
4. Run `pnpm dev` to start the development server.
5. Open your browser and navigate to `http://localhost:5173` to access the application.

### Building for Production

1. Run `pnpm build` to build the application for production.
2. Run `pnpm preview` to preview the production build.
3. Open your browser and navigate to `http://localhost:4173` to access the production build.
4. To deploy, you can use any hosting service that supports Node.js applications.
5. Make sure to set the environment variables in your hosting service as well.
