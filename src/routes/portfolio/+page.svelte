<script>
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import { projects } from '$lib/data/projects.js'

    // filtering logic
    let activeFilter = 'all';

    const availableCategories = ['all'];
    projects.forEach(project => {
        project.categories.forEach(category => {
            if (!availableCategories.includes(category)) {
                availableCategories.push(category);
            }
        });
    });

    $: filteredProjects = projects.filter(project => {
        if (activeFilter === 'all') {
        return true;
        }
        return project.categories.includes(activeFilter);
    });

    function setFilter(category) {
        activeFilter = category;
    }
</script>

<svelte:head>
  <title>Portfolio | felixreverett.com</title>
  <meta name="description" content="My Full Portfolio Page." />
</svelte:head>

<div class="page-wrapper">
	<div class="hero-section">
		<h1>Portfolio</h1>
        <p>A comprehensive collection of my personal projects.</p>
	</div>

	<section class="content-section">
        <div class="filters-container">
            <h2>Filter Projects:</h2>
            <div class="filter-buttons">
            {#each availableCategories as category}
                <button
                on:click={() => setFilter(category)}
                class="filter-button"
                class:active={activeFilter === category}
                >
                {category.charAt(0).toUpperCase() + category.slice(1)} </button>
            {/each}
            </div>
        </div>

        <div class="projects-grid">
            {#each filteredProjects as project (project.id)}
            <ProjectCard
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                projectLink={project.projectLink}
                showLink={project.showLink}
                githubLink={project.githubLink}
            />
            {/each}
        </div>
    </section>
</div>

<style>
    .filters-container {
        margin-bottom: 2rem;
        text-align: center;
    }

    .filter-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
    }

    .filter-button {
        font-family: var(--font-mono);
        font-size: 0.8125rem;
        font-weight: 600;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-sm);
        cursor: pointer;
        background-color: var(--bg-surface-secondary) !important;
        border: 1px solid var(--border-color) !important;
        color: var(--text-secondary) !important;
        transition: all var(--transition-fast);
    }

    .filter-button:hover:not(.active) {
        background-color: var(--bg-surface-hover) !important;
        color: var(--fg-color) !important;
        border-color: var(--text-muted) !important;
    }

    .filter-button.active {
        background-color: var(--an-color) !important;
        color: #ffffff !important;
        border-color: var(--an-color) !important;
        box-shadow: 0 0 0 3px var(--accent-subtle);
    }

    .projects-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
        padding-bottom: 2rem;
        align-items: stretch;
    }

  :global(html[data-theme="dark"]) .filters-container h2 {
    color: #e5e7eb;
  }

  :global(html[data-theme="dark"]) .filter-button:hover:not(.active) {
    background-color: #4a5568;
    border-color: #6b7280;
  }

:global(html[data-theme="dark"]) .filter-button {
    background-color: #2d2d2d !important;
    border-color: #3a3a3a !important;
    color: #b8b8b8 !important;
}

:global(html[data-theme="dark"]) .filter-button.active {
    background-color: var(--an-color) !important;
    color: #1a1a1a !important;
}
</style>