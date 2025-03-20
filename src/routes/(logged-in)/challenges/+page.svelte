<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';

    export let data: PageData;

    // Mock data
    const challenges = [
        {
            id: 1,
            title: "Hello World",
            description: "Write your first JavaScript program that prints 'Hello World'.",
            difficulty: "beginner",
            category: "JavaScript",
            xpReward: 50,
            completed: true,
            timeEstimate: "5 mins"
        },
        {
            id: 2,
            title: "Variables and Data Types",
            description: "Learn how to declare variables and work with different data types in JavaScript.",
            difficulty: "beginner",
            category: "JavaScript",
            xpReward: 75,
            completed: true,
            timeEstimate: "10 mins"
        },
        {
            id: 3,
            title: "Conditional Statements",
            description: "Master if/else statements to create conditional logic in your programs.",
            difficulty: "beginner",
            category: "JavaScript",
            xpReward: 100,
            completed: false,
            timeEstimate: "15 mins"
        },
        {
            id: 4,
            title: "Loops and Iterations",
            description: "Learn how to use for loops and while loops for repeated operations.",
            difficulty: "intermediate",
            category: "JavaScript",
            xpReward: 150,
            completed: false,
            timeEstimate: "20 mins"
        },
        {
            id: 5,
            title: "Basic HTML Structure",
            description: "Create your first HTML document with proper structure and elements.",
            difficulty: "beginner",
            category: "HTML",
            xpReward: 50,
            completed: false,
            timeEstimate: "10 mins"
        },
        {
            id: 6,
            title: "CSS Styling Basics",
            description: "Learn how to apply styles to HTML elements using CSS.",
            difficulty: "beginner",
            category: "CSS",
            xpReward: 75,
            completed: false,
            timeEstimate: "15 mins"
        }
    ];

    let selectedCategory = 'all';
    let selectedDifficulty = 'all';
    let searchQuery = '';

    $: filteredChallenges = challenges.filter(challenge => {
        const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
        const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesDifficulty && matchesSearch;
    });

    $: categories = ['all', ...new Set(challenges.map(c => c.category))];
    
    $: difficulties = ['all', ...new Set(challenges.map(c => c.difficulty))];

    function startChallenge(id: number) {
        goto(`/challenges/${id}`);
    }
</script>

<svelte:head>
    <title>Coding Challenges | CodeLegends</title>
</svelte:head>

<div class="challenges-container">
    <div class="breadcrumbs">
        <a href="/">Home</a> / Challenges
    </div>
    
    <header class="challenges-header">
        <h1>Coding Challenges</h1>
        <p>Complete challenges to earn XP and level up your coding skills!</p>
    </header>

    <div class="filters">
        <div class="search-bar">
            <input 
                type="text" 
                placeholder="Search challenges..." 
                bind:value={searchQuery}
            />
        </div>

        <div class="filter-dropdowns">
            <select bind:value={selectedCategory}>
                {#each categories as category}
                    <option value={category}>{category === 'all' ? 'All Categories' : category}</option>
                {/each}
            </select>

            <select bind:value={selectedDifficulty}>
                {#each difficulties as difficulty}
                    <option value={difficulty}>{difficulty === 'all' ? 'All Difficulties' : difficulty}</option>
                {/each}
            </select>
        </div>
    </div>

    <div class="challenges-list">
        {#if filteredChallenges.length === 0}
            <div class="no-challenges">
                <p>No challenges found matching your criteria. Try adjusting your filters.</p>
            </div>
        {:else}
            {#each filteredChallenges as challenge}
                <div class="challenge-card" class:completed={challenge.completed}>
                    <div class="challenge-header">
                        <h3>{challenge.title}</h3>
                        <div class="challenge-meta">
                            <span class="category">{challenge.category}</span>
                            <span class="difficulty {challenge.difficulty}">{challenge.difficulty}</span>
                        </div>
                    </div>
                    
                    <p class="description">{challenge.description}</p>
                    
                    <div class="challenge-footer">
                        <div class="challenge-info">
                            <span class="xp-reward">{challenge.xpReward} XP</span>
                            <span class="time-estimate">{challenge.timeEstimate}</span>
                        </div>
                        
                        <button 
                            class="start-btn" 
                            on:click={() => startChallenge(challenge.id)}
                        >
                            {challenge.completed ? 'Retry' : 'Start'}
                        </button>
                    </div>
                    
                    {#if challenge.completed}
                        <div class="completed-badge">✓</div>
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .challenges-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .challenges-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .challenges-header h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
    }

    .filters {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .search-bar {
        flex: 1;
        min-width: 300px;
    }

    .search-bar input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }

    .filter-dropdowns {
        display: flex;
        gap: 1rem;
    }

    .filter-dropdowns select {
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: white;
        min-width: 150px;
    }

    .challenges-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
    }

    .challenge-card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        position: relative;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .challenge-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }

    .challenge-card.completed {
        border-left: 4px solid #4CAF50;
    }

    .completed-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #4CAF50;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    .challenge-header {
        margin-bottom: 1rem;
    }

    .challenge-header h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
    }

    .challenge-meta {
        display: flex;
        gap: 0.5rem;
    }

    .category, .difficulty {
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        background-color: #f0f0f0;
    }

    .difficulty.beginner {
        background-color: #E8F5E9;
        color: #2E7D32;
    }

    .difficulty.intermediate {
        background-color: #FFF8E1;
        color: #F57F17;
    }

    .difficulty.advanced {
        background-color: #FFEBEE;
        color: #C62828;
    }

    .description {
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.4;
    }

    .challenge-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .challenge-info {
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
    }

    .xp-reward {
        font-weight: bold;
        color: #673AB7;
    }

    .time-estimate {
        color: #757575;
    }

    .start-btn {
        background-color: #3F51B5;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .start-btn:hover {
        background-color: #303F9F;
    }

    .no-challenges {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        background-color: #f5f5f5;
        border-radius: 8px;
    }

    .breadcrumbs {
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #666;
    }
    
    .breadcrumbs a {
        color: #3F51B5;
        text-decoration: none;
    }
    
    .breadcrumbs a:hover {
        text-decoration: underline;
    }
</style>