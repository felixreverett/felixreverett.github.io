<script>
    import { technologyLogos } from '../data/logos.js';

    export let imageSrc = '/path/to/default-project-image.jpg';
    export let imageAlt = 'Project image placeholder';
    export let title = 'Untitled Project';
    export let description = 'A brief description of this project.';
    export let technologies = [];
    export let projectLink = '#';
    export let githubLink = '#';

    console.log('ProjectCard received projectLink:', projectLink);
    console.log('ProjectCard received githubLink:', githubLink);

    $: displayedLogos = technologies
        .map(techKey => technologyLogos[techKey])
        .filter(Boolean);
</script>

<div class="card project-card">
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
    <a href={projectLink} class="details-link">View Details &rarr;</a>
    <a href={githubLink} target="_blank" aria-label="GitHub Repo"><i class="fab fa-github"></i></a>
  </div>
</div>

<style>
  .project-card {
    transition: box-shadow 0.3s ease;
  }

  .project-card:hover {
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  }

  /* ===== CARD-FOOTER ===== */

  .card-footer-links {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
      transition: border 0.3s ease;
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
    font-size: 0.875rem;
    color: #9ca3af;
    margin-bottom: 1rem;
    flex-grow: 1;
  }

  .details-link {
    color: #00869d;
    font-weight: 500;
    text-decoration: none;
    margin-top: auto;
    display: inline-block;
  }

  .details-link:hover {
    text-decoration: underline;
  }  
</style>