<!-- Reusable layout component for portfolio pages -->
 <div class="blog-layout">
    <slot />
 </div>

<style>
    .blog-layout {
        max-width: 800px;
        margin: 0 auto;
        text-align: left;
        font-size: 20px;
    }
    @media (max-width: 767px) {
    .blog-layout {
        font-size: 16px;
    }
}
</style>