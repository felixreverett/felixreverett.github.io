<script>
	import { technologyLogos } from '../data/logos.js';

	export let imageSrc = '/path/to/default-project-image.jpg';
	export let imageAlt = 'Project image placeholder';
	export let title = 'Untitled Project';
	export let description = 'A brief description of this project.';
	export let technologies = [];
	export let projectLink = '#';
	export let showLink = false;
	export let githubLink = '#';

	$: displayedLogos = technologies
		.map(techKey => technologyLogos[techKey])
		.filter(Boolean);
</script>

<div class="project-card">
	<div class="project-image-container">
		<img src={imageSrc} alt={imageAlt} class="project-image" />
	</div>
	<h3>{title}</h3>
	<div class="technologies">
		{#each displayedLogos as techLogo (techLogo.src)}
		<img src={techLogo.src} alt={techLogo.alt} class="tech-logo" title={techLogo.alt} />
		{/each}
	</div>
	<p class="project-description">{description}</p>
	<div class="card-footer-links">
		{#if (showLink)}
			<a href={projectLink} class="details-link">View Details &rarr;</a>
		{/if}
		<a href={githubLink} target="_blank" aria-label="GitHub Repo" class="github-link"><i class="fab fa-github"></i></a>
	</div>
</div>

<style>
	/* ===== Project Card ===== */

	.project-card {
		background-color: var(--card-bg) !important;
		padding: 1.5rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--card-border) !important;
		border-left: 3px solid var(--an-color) !important;
		box-shadow: var(--card-shadow);
		transition: all var(--transition-fast);
		display: flex;
		flex-direction: column;
		max-width: 368px;
	}

	:global(html[data-theme="dark"]) .project-card {
		background-color: #1f2937; /* Intentionally same as light mode */
		border: 1px solid #038299;
		border-top: 8px solid #038299;
		transition: background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
	}

	.project-card:hover {
		box-shadow: var(--card-shadow-hover);
        border-color: var(--an-color) !important;
	}

	/* ===== Custom Card H3 ===== */

	h3 {
		color: var(--fg-color) !important;
        font-family: var(--font-mono);
        margin-top: 0.5rem;
	}

	/* ===== CARD-FOOTER ===== */

	.card-footer-links {
		border-top: 1px solid var(--divider) !important;
        margin-top: auto;
        padding-top: 1rem;
	}

	:global(html[data-theme="dark"]) .card-footer-links {
		border-top: 1px solid #038299;
	}

	.project-image-container {
		width: 100%;
		height: 10rem;
		overflow: hidden;
		border-radius: 0.375rem;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #d1d5db;
	}

	.project-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.technologies {
		display: flex;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
		align-items: center;
	}

	.tech-logo {
		height: 1.5rem;
		width: auto;
		object-fit: contain;
		transition: transform 0.2s ease;
	}

	.tech-logo:hover {
		transform: scale(1.1);
	}

	.project-description {
		color: var(--text-secondary) !important;
        font-size: 0.875rem;
	}

	.details-link {
		color: var(--an-color) !important;
		font-weight: 500;
		text-decoration: none;
		display: inline-block;
	}

	.details-link:hover {
		text-decoration: underline;
    	opacity: 0.8;
	}  

	.github-link {
		margin-left: auto;
	}
</style>