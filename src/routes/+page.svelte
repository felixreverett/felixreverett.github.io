<script>
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SkillsCard from '$lib/components/SkillsCard.svelte';
  import { projects } from '$lib/data/projects.js'

</script>

<svelte:head>
    <title>Home | felixreverett.com</title>
    <meta name="description" content="Welcome to my personal portfolio website." />
</svelte:head>

<div class="page-wrapper">
    <div class="hero-section">
        <h1>Hi, I'm Felix</h1>
    </div>

    <section class="content-section content-section-text">
        <p>I’m a <b>programmer and code enthusiast</b> with an ambition to make my dream projects a reality. I primarily write in <b>Go</b>, <b>C#</b>, and <b>JavaScript</b>, and I also have experience in <b>Python</b> and <b>SQL</b>, but I am most at home with statically typed, compiled paradigms. </p>
        <p>For me, code is both a creative outlet and an opportunity to try new puzzles and challenges. I have always been fascinated by how computers work, and I am motivated more than ever by the belief that the only true way to satisfy my questions is to keep writing code.</p>
        <p> Read on for an overview of my technical experience, <a href="/portfolio">browse my full portfolio</a>, and <a href="https://linkedin.com/in/felixreverett" target="_blank">connect with me on LinkedIn</a>.</p>
    </section>

    <section class="content-section">
        <h2 class="section-title">Technical Skills</h2>
        <div>
            <SkillsCard />
        </div>
    </section>

    <section class="content-section">
        <div class="content-container content-featured-projects">
            <h2 class="section-title">Featured Projects</h2>
            <div class="projects-grid">
                {#each projects as project (project.id)}
                    {#if (project.id < 4)}
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
                    {/if}
                {/each}
            </div>
            <div class="section-link-wrapper"><a href="/portfolio" class="secondary-button">
                <span class="secondary-button-text">
                    See Full Portfolio
                </span>
                </a>
            </div>
        </div>
    </section>
</div>

<style>
    .content-section {
        margin-bottom: 3rem;
        box-sizing: border-box;
        width: 100%;
    }

    .content-section-text {
        max-width: 800px;
        align-self: center;
        text-align: justify;
    }

    .content-container {
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        text-align: left;
    }

    .content-featured-projects {
        max-width: 1200px;
    }

    .section-link-wrapper {
        margin-top: 1.5rem;
        text-align: center;
        padding-bottom: 4rem;
    }
  
    .content-section:last-of-type .section-link-wrapper {
        padding-bottom: 4rem;
    }

    .projects-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
        padding-bottom: 2rem;
        align-items: stretch;
    }

    .secondary-button {
        font-family: var(--font-mono);
        font-weight: 600;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        display: inline-block;
        
        background-color: var(--an-color) !important; 
        color: #fff !important; 
        border: 1px solid var(--an-color);
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        transition: all var(--transition-fast);
    }

    .secondary-button:hover {
        background-color: var(--fg-color) !important;
        border-color: var(--fg-color);
        color: var(--an-color) !important;
        box-shadow: var(--card-shadow-hover);
    }

    .secondary-button-text {
        background-image: none !important;
        color: inherit !important;
    }
</style>