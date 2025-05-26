<script>
  import Nav from '../lib/components/Nav.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import '../app.css';

  let navHeight = 0;

  onMount(() => {
    const navElement = document.querySelector('nav');
    if (navElement) {
      navHeight = navElement.offsetHeight;
    }
  });
</script>

<div class="site-wrapper">
  <Nav />

  <main class="main-content" style="padding-top: {navHeight}px;">
    <slot />
  </main>

  <Footer />
</div>

<style>
  .site-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex-grow: 1;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    padding-bottom: 2rem;
    padding-left: 0;
    padding-right: 0;
    box-sizing: border-box;
  }
</style>
