<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    const moduleId = $page.params.id;
 
    const modules = [
        {
            id: 1,
            title: 'JavaScript Fundamentals',
            description: 'Learn the core concepts of JavaScript programming',
            level: 'Beginner',
            xpReward: 500,
            progress: 0,
            lessons: 10,
            category: 'JavaScript',
            image: '/images/js-logo.png',
            content: 'This is the detailed content for JavaScript Fundamentals module.',
            sections: [
                { id: 'introduction', title: 'Introduction to JavaScript', isCompleted: false },
                { id: 'variables', title: 'Variables and Data Types', isCompleted: false },
                { id: 'functions', title: 'Working with Functions', isCompleted: false }
            ]
        },
        {
            id: 2,
            title: 'Advanced JavaScript',
            description: 'Dive deeper into JavaScript with advanced topics',
            level: 'Intermediate',
            xpReward: 800,
            progress: 25,
            lessons: 12,
            category: 'JavaScript',
            image: '/images/js-logo.png',
            content: 'This is the detailed content for Advanced JavaScript module.',
            sections: [
                { id: 'closures', title: 'Closures and Scope', isCompleted: true },
                { id: 'promises', title: 'Promises and Async/Await', isCompleted: false },
                { id: 'modules', title: 'JavaScript Modules', isCompleted: false }
            ]
        },
        {
            id: 3,
            title: 'TypeScript Basics',
            description: 'Start your journey with TypeScript',
            level: 'Beginner',
            xpReward: 600,
            progress: 0,
            lessons: 8,
            category: 'TypeScript',
            image: '/images/ts-logo.png',
            content: 'This is the detailed content for TypeScript Basics module.',
            sections: [
                { id: 'intro', title: 'Introduction to TypeScript', isCompleted: false },
                { id: 'types', title: 'Basic Types', isCompleted: false },
                { id: 'interfaces', title: 'Interfaces and Type Aliases', isCompleted: false }
            ]
        },
        {
            id: 4,
            title: 'Svelte for Beginners',
            description: 'Learn the Svelte framework from scratch',
            level: 'Beginner',
            xpReward: 600,
            progress: 75,
            lessons: 8,
            category: 'Frameworks',
            image: '/images/svelte-logo.png',
            content: 'This is the detailed content for Svelte for Beginners module.',
            sections: [
                { id: 'getting-started', title: 'Getting Started with Svelte', isCompleted: true },
                { id: 'components', title: 'Svelte Components', isCompleted: true },
                { id: 'reactivity', title: 'Reactivity in Svelte', isCompleted: false }
            ]
        }
    ];
    
    const module = modules.find(m => m.id === parseInt(moduleId));
    
    function goBack() {
        goto('/module');
    }
    
    function navigateToSection(sectionId: string) {
        goto(`/module/${moduleId}/${sectionId}`);
    }
    
    function startModule() {
        if (module && module.sections && module.sections.length > 0) {
            navigateToSection(module.sections[0].id);
        }
    }
</script>

<div class="container mx-auto p-6">
    <button class="btn btn-ghost mb-4" on:click={goBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Modules
    </button>
    
    {#if module}
        <div class="box">
            <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/3">
                    <div class="bg-slate-100 rounded-lg p-4 flex items-center justify-center h-48">
                        <img src={module.image} alt={module.title} class="h-24 object-contain" />
                    </div>
                    
                    <div class="mt-4">
                        <div class="flex justify-between items-center my-2">
                            <span class="text-sm">Level:</span>
                            <span class="badge {module.level.toLowerCase()}">{module.level}</span>
                        </div>
                        
                        <div class="flex justify-between items-center my-2">
                            <span class="text-sm">Lessons:</span>
                            <span>{module.lessons}</span>
                        </div>
                        
                        <div class="flex justify-between items-center my-2">
                            <span class="text-sm">XP Reward:</span>
                            <span>{module.xpReward} XP</span>
                        </div>
                        
                        <div class="flex justify-between items-center my-2">
                            <span class="text-sm">Category:</span>
                            <span>{module.category}</span>
                        </div>
                        
                        {#if module.progress > 0}
                            <div class="mt-4">
                                <div class="flex justify-between text-sm mb-1">
                                    <span>Progress:</span>
                                    <span>{module.progress}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: {module.progress}%"></div>
                                </div>
                            </div>
                        {:else}
                            <div class="mt-4 text-sm">Not started</div>
                        {/if}
                    </div>
                    
                    <button class="btn btn-primary w-full mt-6" on:click={startModule}>Start Module</button>
                </div>
                
                <div class="md:w-2/3">
                    <h1 class="text-3xl font-bold mb-4">{module.title}</h1>
                    <p class="mb-6">{module.description}</p>
                    
                    <div class="prose max-w-none">
                        <p>{module.content}</p>
                        <h2 class="mt-6">What You'll Learn</h2>
                        <ul>
                            <li>Key concept 1</li>
                            <li>Key concept 2</li>
                            <li>Key concept 3</li>
                            <li>And more...</li>
                        </ul>
                        
                        <h2 class="mt-6">Module Sections</h2>
                        {#if module.sections && module.sections.length > 0}
                            <div class="mt-4 space-y-3">
                                {#each module.sections as section, index}
                                    <div class="box p-4 border rounded-lg flex justify-between items-center">
                                        <div>
                                            <div class="flex items-center gap-2">
                                                <span class="bg-gray-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                                    {index + 1}
                                                </span>
                                                <h3 class="font-medium">{section.title}</h3>
                                            </div>
                                            {#if section.isCompleted}
                                                <span class="text-sm text-green-600">Completed</span>
                                            {:else}
                                                <span class="text-sm text-gray-500">Not completed</span>
                                            {/if}
                                        </div>
                                        <button 
                                            class="btn btn-sm {section.isCompleted ? 'btn-success' : 'btn-primary'}" 
                                            on:click={() => navigateToSection(section.id)}
                                        >
                                            {section.isCompleted ? 'Review' : 'Start'}
                                        </button>
                                    </div>
                                {/each}
                            </div>
                        {:else}
                            <p>No sections available for this module.</p>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <div class="box py-12 text-center">
            <h2 class="text-2xl font-bold mb-4">Module Not Found</h2>
            <p>The module you're looking for doesn't exist.</p>
            <button class="btn btn-primary mt-4" on:click={goBack}>Return to Modules</button>
        </div>
    {/if}
</div>

<style>
    .badge.beginner {
        background-color: #4ade80;
        color: #052e16;
    }
    .badge.intermediate {
        background-color: #facc15;
        color: #422006;
    }
    .badge.advanced {
        background-color: #f87171;
        color: #450a0a;
    }
</style>
