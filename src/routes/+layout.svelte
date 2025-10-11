<!-- Sitewide layout. Applies Head, Nav, and Footer around main content -->

<script>
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/stores';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';

	const BASE_URL = 'https://felixreverett.com';
	$: canonicalUrl = `${BASE_URL}${$page.url.pathname}`;

	let navHeight = 0;

	onMount(async () => {
		const navElement = document.querySelector('nav');
		if (navElement) {
		navHeight = navElement.offsetHeight;
		}

		const url = new URL(window.location.href);
		const params = url.searchParams;
		/** @type {Record<string, string|null>}*/
		const utmData = {};

		[...params.keys()].forEach((key) => {
			if (key.startsWith('utm_')) {
				utmData[key] = params.get(key);
				params.delete(key);
			}
		});

		if (Object.keys(utmData).length > 0) {
			sessionStorage.setItem('utmData', JSON.stringify(utmData));
			const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
			try {
				// wait until router ready
				await tick();
				replaceState(newUrl, {});
				console.log('Captured UTMs:', utmData);
			} catch (err) {
				console.warn('Could not safely replaceState yet:', err);
				window.history.replaceState({}, document.title, newUrl);
			}
			if (window.umami && typeof window.umami.track === 'function') {
				window.umami.track('utm_capture', utmData);
			}
		} else {
			const stored = sessionStorage.getItem('utmData');
			if (stored) {
				console.log('Restored UTMs from session:', JSON.parse(stored));
			}
		}
	});

	afterNavigate(() => {
		console.log('afterNavigate triggered. Is Prism ready?', window.Prism);
		if (window.Prism) {
			window.Prism.highlightAll();
			console.log("Prism has loaded successfully");
		}
	});
</script>

<svelte:head>
  <link rel="canonical" href={canonicalUrl} />
  <link rel="stylesheet" href="/styles/prism.css" />
  <script defer src="/styles/prism.js"></script>
</svelte:head>

<div class="site-wrapper">
  <Nav />

  <main class="main-content" style="padding-top: {navHeight}px;">
    <slot />
  </main>

  <Footer />
</div>
