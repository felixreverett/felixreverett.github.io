<!-- Sitewide layout. Applies Head, Nav, and Footer around main content -->

<script>
  import Nav from '../lib/components/Nav.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import '../app.css';
  import { page } from '$app/stores';

  const BASE_URL = 'https://felixreverett.com';
  $: canonicalUrl = `${BASE_URL}${$page.url.pathname}`;

  let navHeight = 0;

  onMount(() => {
    const navElement = document.querySelector('nav');
    if (navElement) {
      navHeight = navElement.offsetHeight;
    }
  });
</script>

<svelte:head>
  <link rel="canonical" href={canonicalUrl} />
</svelte:head>

<div class="site-wrapper">
  <Nav />

  <main class="main-content" style="padding-top: {navHeight}px;">
    <slot />
  </main>

  <Footer />
</div>

<style>
  /* All content fits inside this. Padding included here.*/
  .site-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-left: 1em;
    padding-right: 1em;
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
