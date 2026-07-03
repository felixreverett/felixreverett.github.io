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
        <p>I’m a <b>programmer and linguist</b> currently completing my postgraduate studies in computer science at UCL. I primarily write in <b>Scala</b>, <b>C#</b>, and <b>Go</b>, and I also have strong experience in <b>Python</b>, <b>Miranda</b>, <b>C++</b>, <b>JavaScript</b>, and <b>SQL</b>. I am most at home with statically-typed, object-oriented languages, with <a href="/blog/what-is-functional-programming" target="_blank">a growing interest in functional programming</a>.</p>
        <p>You can find code in all of these languages on my <a href="https://github.com/felixreverett" target="_blank">github page</a>, where I regularly chip away at new projects and paradigms. I also frequently <a href="/blog">write new blogposts</a>, focusing predominantly on programming language theory and software implementations.</p>
        <p>With a formal background in modern languages and linguistics, I draw from the domains of computer science and linguistics in everything I do, carrying over the lessons of both subject domains to strengthen myself as both a language learner and software developer.</p>
        <p>For me, code is both a creative outlet and an opportunity to try out new puzzles and challenges. I have always been fascinated by the inner workings of computers, and I am driven by the belief that the only way to satisfy this fascination is to keep writing code.</p>
        <p>Read on for an overview of my technical experience, <a href="/portfolio">browse my full portfolio</a>, and <a href="https://linkedin.com/in/felixreverett" target="_blank">connect with me on LinkedIn</a>.</p>
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
        text-align: left;
        font-size: 18px;
    }

    @media (max-width: 767px) {
    .content-section-text {
        font-size: 16px;
    }
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

    :global(html[data-theme="dark"]) .secondary-button {
    color: #1a1a1a !important; 
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