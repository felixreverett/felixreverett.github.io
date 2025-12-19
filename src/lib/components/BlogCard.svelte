<script>
	export let imageSrc = '';
	export let imageAlt = '';
	export let title = '';
	export let description = '';
	export let blogLink = '';
</script>

<div class="blog-card">
	<div class="project-image-container">
		<img src={imageSrc} alt={imageAlt} class="project-image" />
	</div>
	<h3>{title}</h3>
	<p class="project-description">{description}</p>
	<div class="card-footer-links">
		<a href={blogLink} class="details-link">Read full blog &rarr;</a>
	</div>
</div>

<style>
	/* ===== Blog Card ===== */

	.blog-card {
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

	:global(html[data-theme="dark"]) .blog-card {
		background-color: #1f2937; /* Intentionally same as light mode */
		border: 1px solid var(--card-border-color);
		border-top: 8px solid var(--card-border-color);
		transition: background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
	}

	.blog-card:hover {
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
</style>