<script>
    import { technologyLogos as Logos } from '../data/logos';

    const languages = ['csharp', 'javascript', 'python', 'golang'];
    const technologies = ['gcloud', 'docker', 'vscode', 'github', 'visualstudio', 'git', 'nodejs'];
    const frameworks = ['svelte', 'wails', 'opengl',];

    $: displayedLanguages = languages
        .map(techKey => Logos[techKey])
        .filter(Boolean);

    $: displayedTechnologies = technologies
        .map(techKey => Logos[techKey])
        .filter(Boolean);

    $: displayedFrameworks = frameworks
        .map(techKey => Logos[techKey])
        .filter(Boolean);
</script>

<div class="card skills-card">
  <h3 class="skill-category-title">Languages</h3>
  <div class="skills-logos-grid">
    {#each displayedLanguages as techLogo (techLogo.src)}
      <img src={techLogo.src} alt={techLogo.alt} class="skill-logo" title={techLogo.alt} />
    {/each}
  </div>
  <h3 class="skill-category-title">Technologies</h3>
  <div class="skills-logos-grid">
    {#each displayedTechnologies as techLogo (techLogo.src)}
      <img src={techLogo.src} alt={techLogo.alt} class="skill-logo" title={techLogo.alt} />
    {/each}
  </div>
  <h3 class="skill-category-title">Frameworks</h3>
  <div class="skills-logos-grid">
    {#each displayedFrameworks as techLogo (techLogo.src)}
      <img src={techLogo.src} alt={techLogo.alt} class="skill-logo" title={techLogo.alt} />
    {/each}
  </div>
</div>

<style>
    .skills-card {
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        background-color: #ffffff;
        padding-top: 0rem;
        padding-right: 1.5rem;
        padding-left: 1.5rem;
        padding-bottom: 0rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        display: flex;
        flex-direction: column;
    }

    @media (prefers-color-scheme: dark) {
        .skills-card {
            background-color: #1f2937;
        }
    }
    :global(html[data-theme="dark"]) .skills-card {
        background-color: #1f2937;
    }

    .skills-card:hover {
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
    }

    /* ===== SKILLS LOGOS GRID ===== */

    .skills-logos-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        align-items: center;
        gap: 1.5rem;
        padding-top: 0.5rem;
        padding-bottom: 1.5rem;
    }

    .skills-logos-grid:not(:last-child) {
        border-bottom: 1px solid #e5e7eb;
        transition: border-bottom 0.3s ease;
    }

    :global(html[data-theme="dark"]) .skills-logos-grid:not(:last-child) {
        border-bottom: 1px solid #038299;
        transition: border-bottom 0.3s ease;
    }

    .skill-logo {
        height: 2rem;
        width: auto;
        max-width: 100%;
        object-fit: contain;
        transition: transform 0.2s ease;
    }

    .skill-logo:hover {
        transform: scale(1.1);
    }

    .skill-category-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #e5e7eb;
    }
</style>