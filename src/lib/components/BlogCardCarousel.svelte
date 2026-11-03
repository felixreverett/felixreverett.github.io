<script lang="ts">
  import BlogCard from '$lib/components/BlogCard.svelte';
  import { blogs } from '$lib/data/blogs'; 

  export let subsetCount: number = 4;
  $: featuredBlogs = blogs.slice(0, subsetCount);

  $: carouselItems = [...featuredBlogs, ...featuredBlogs];
</script>

<section class="content-section">
  <div class="content-container">
    <h2 class="section-title">Recent Blogs</h2>
    <div class="carousel-wrapper">
      <div class="carousel-track">
        {#each carouselItems as blog, i (blog.id + '-' + i)}
          <div class="carousel-item">
            <BlogCard
              imageSrc={blog.imageSrc}
              imageAlt={blog.imageAlt}
              title={blog.title}
              description={blog.description}
              blogLink={blog.blogLink}
              readTime={blog.readTime}
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .content-section {
    margin-bottom: 3rem;
    box-sizing: border-box;
    width: 100%;
  }

  .content-container {
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    text-align: left;
    max-width: 1200px;
  }

  .section-title {
    font-size: 1.875rem;
    font-weight: 600;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--fg-color);
  }

  .carousel-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
    padding: 1rem 0;
  }

  .carousel-track {
    display: flex;
    gap: 2rem;
    width: max-content;
    animation: slide 35s linear infinite;
  }

  .carousel-track:hover {
    animation-play-state: paused;
  }

  .carousel-item {
    flex: 0 0 auto;
    width: 340px;
    display: flex;
  }

  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 1rem));
    }
  }

  @media (max-width: 767px) {
    .carousel-track {
      gap: 1.5rem;
      animation: slide-mobile 35s linear infinite;
    }
    @keyframes slide-mobile {
      0% { transform: translateX(0); }
      100% { transform: translateX(calc(-50% - 0.75rem)); }
    }
  }
</style>