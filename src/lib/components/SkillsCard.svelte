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
        background-color: var(--card-bg) !important;
        border: 1px solid var(--card-border) !important;
        border-left: 3px solid var(--an-color) !important;
        border-radius: var(--radius-md);
        padding: 1.5rem;
        box-shadow: var(--card-shadow);
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
    }

    .skills-card:hover {
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
    }

    /* ===== SKILLS LOGOS GRID ===== */

    .skills-logos-grid {
        padding-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        align-items: center;
        gap: 1.5rem;
    }

    .skills-logos-grid:not(:last-child) {
        border-bottom: 1px solid var(--divider) !important;
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
        color: var(--fg-color) !important;
        font-family: var(--font-mono);
        font-size: 1.2rem;
        margin-top: 1.5rem;
    }
</style>