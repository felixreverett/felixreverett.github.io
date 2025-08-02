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
        background-color: #e0e0e0;
        border: 1px solid #ccc;
        padding: 0.6rem 1.2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: 500;
        transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        color: #333;
    }

    .filter-button:hover:not(.active) {
        background-color: #d0d0d0;
        border-color: #bbb;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .filter-button.active {
        background-color: #00869d;
        color: #ffffff;
        border-color: #006b7a;
        font-weight: bold;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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

  :global(html[data-theme="dark"]) .filter-button {
    background-color: #2d3748;
    border-color: #4a5568;
    color: #e5e7eb;
  }

  :global(html[data-theme="dark"]) .filter-button:hover:not(.active) {
    background-color: #4a5568;
    border-color: #6b7280;
  }

  :global(html[data-theme="dark"]) .filter-button.active {
    background-color: #038299;
    color: #ffffff;
    border-color: #026374;
  }
</style>