<script>
	import BlogCard from "$lib/components/BlogCard.svelte";
	import {blogs} from "$lib/data/blogs.js";
</script>

<svelte:head>
	<title>Blog | felixreverett</title>
	<meta name="description" content="My Full Blog Page." />
</svelte:head>

<div class="page-wrapper">
	<div class="hero-section">
		<h1>All blogs</h1>
	</div>

	<section>
		<div class="blogs-grid">
            {#each blogs as blog (blog.id)}
            <BlogCard
                imageSrc={blog.imageSrc}
                imageAlt={blog.imageAlt}
                title={blog.title}
                description={blog.description}
                blogLink={blog.blogLink}
            />
            {/each}
        </div>
	</section>
</div>

<style>
	.blogs-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
        padding-bottom: 2rem;
        align-items: stretch;
    }
</style>