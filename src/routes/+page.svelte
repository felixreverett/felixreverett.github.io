<script>
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SkillsCard from '$lib/components/SkillsCard.svelte';

  const projects = [
    {
      id: 1,
      imageSrc: '/images/wildfawn-app-screenshot.webp',
      imageAlt: 'Screenshot of wildfawn',
      title: 'wildfawn SEO Crawler',
      description: 'Open-Source lightweight SEO web crawler built in Go. I\'m currently developing a frontend using Svelte and Wails.',
      technologies: ['golang', 'svelte', 'javascript', 'wails'],
      categories: ['web', 'backend', 'desktop apps', 'open-source'],
      projectLink: '/portfolio/wildfawn',
      githubLink: 'https://github.com/felixreverett/wildfawn'
    },
    {
      id: 2,
      imageSrc: '/images/isola-app-screenshot.webp',
      imageAlt: 'Screenshot of isola',
      title: 'Isola',
      description: 'An open-world exploration game built from the ground up in C# and OpenGL.',
      technologies: ['csharp', 'opengl'],
      categories: ['game development', 'graphics', 'desktop apps'],
      projectLink: '/portfolio/isola',
      githubLink: 'https://github.com/felixreverett/isola'
    },
    {
      id: 3,
      imageSrc: '/images/aoc-screenshot.webp',
      imageAlt: 'Screenshot of Advent of Code',
      title: 'Advent Of Code',
      description: 'My JavaScript and Go solutions to the popular Advent Of Code DSA puzzles.',
      technologies: ['javascript', 'golang'],
      categories: ['algorithms', 'problem-solving', 'javascript', 'golang'],
      projectLink: '/portfolio/aoc',
      githubLink: 'https://github.com/felixreverett/AdventOfCode2024'
    }
  ];
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
        <p>I’m a <b>programmer and code enthusiast</b> working an ambition to make my dream projects a reality. I primarily write in <b>Go</b>, <b>C#</b>, and <b>JavaScript</b>, and I also have experience in <b>Python</b> and <b>SQL</b>, but I am most at home with statically typed, compiled paradigms. </p>
        <p>For me, code is both a creative outlet and an opportunity to try new puzzles and challenges. I have always been fascinated by how computers work, and I am motivated more than ever by the belief that the only true way to satisfy my questions is to keep writing code.</p>
        <p> Read on and <a href="/portfolio">browse my full portfolio</a>, learn about <a href="/about">what I do beyond coding</a>, and <a href="https://linkedin.com/in/felixreverett" target="_blank">connect with me on LinkedIn</a>.</p>
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
                    <ProjectCard
                        imageSrc={project.imageSrc}
                        imageAlt={project.imageAlt}
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        projectLink={project.projectLink}
                        githubLink={project.githubLink}
                    />
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
        font-weight: 600;
        padding: 0.5rem 1.5rem;
        border-radius: 0.5rem;
        text-decoration: none;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);

        background-color: #374151;
        border: 3px solid transparent;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image:
            linear-gradient(to bottom, #374151, #374151),
            conic-gradient(from var(--bg-angle), transparent 0%, transparent 100%);

        animation: spin 2.5s infinite linear paused;
        transition: background-image 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .secondary-button:hover {
        animation-play-state: running;
        background-color: #4b5563;
        background-image:
            linear-gradient(to bottom, #4b5563, #4b5563),
            conic-gradient(
                from var(--bg-angle),
                #00869d 0%,
                #42deb9 50%,
                #00869d 100%
            );
    }

    .secondary-button-text {
        background-clip: text;
        background-image: linear-gradient(to left, #00869d, #42deb9);
        color: transparent;
        position: relative;
        z-index: 2;
    }
</style>