<script>
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/themeStore';
	import { browser } from '$app/environment';
	import DarkModeToggle from './DarkModeToggle.svelte';

	const navLinks = [
		{ href: '/', text: 'Home' },
		//{ href: '/about', text: 'About Me' },
		{ href: '/portfolio', text: 'Portfolio' },
		//{ href: '/blog', text: 'Blog'},
	];

	// --- Theme Logic ---
	$: isDarkMode = $theme === 'dark';

	function toggleTheme() {
		theme.toggle();
	}

	let mobileMenuOpen = false;

	function toggleDropdown() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeDropdown() {
		mobileMenuOpen = false;
	}

	$: if ($page.url.pathname) {
		mobileMenuOpen = false;
	}

	$: if (browser) {
		document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
	}

	function handleClickOutside(event) {
        if (mobileMenuOpen) {
            const clickedOnHamburgerArea = event.target.closest('.dropdown');
            const clickedOnDropdownContent = event.target.closest('.dropdown-content');
            if (!clickedOnHamburgerArea && !clickedOnDropdownContent) {
                closeDropdown();
            }
        }
    }
</script>

<svelte:window on:click={handleClickOutside} />

<nav class="main-nav">
	<div class="nav-container desktop-theme-toggle">
		<a href="/" class="logo">felixreverett.com</a>

		<ul class="desktop-nav-links">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class:active={$page.url.pathname === link.href || ($page.url.pathname.startsWith(link.href) && link.href !== '/')}
						>
						{link.text}
					</a>
				</li>
			{/each}
		</ul>

		<DarkModeToggle />
	</div>

	<div class="nav-container mobile-theme-toggle">
		<a href="/" class="logo">felixreverett.com</a>

		<div class="dropdown">
			<button
				on:click={toggleDropdown}
				class="hamburger-menu"
				aria-label="Toggle mobile navigation menu"
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-dropdown-menu">
				<i class="{mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}"></i>
			</button>
        </div>
	</div>
</nav>

<ul
	id="myDropDown"
	class="dropdown-content"
	class:show={mobileMenuOpen}
>
	{#each navLinks as link}
		<li>
			<a href={link.href}
				class:active={$page.url.pathname === link.href || ($page.url.pathname.startsWith(link.href) && link.href !== '/')}
			>
				{link.text}
			</a>
		</li>
	{/each}
	<li class="dropdown-theme-toggle-item">
		<DarkModeToggle />
	</li>
</ul>

<style>
	:root {
        --nav-height: 64px;
    }

	/* ===== Main Nav ===== */

	.main-nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		background-color: rgba(31, 41, 55, 0.5);
		color: #f9fafb;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: background-color 0.3s ease;
		backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(31, 41, 55);
		height: var(--nav-height);
	}

	:global(html[data-theme="dark"]) .main-nav {
		background-color: rgba(6, 19, 21, 0.5);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
		color: #d1d5db;
		backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(6, 19, 21);
	}

	/* ===== Container for logo | links | mode toggle ===== */

	.nav-container {
		max-width: 1280px;
		margin-left: auto;
		margin-right: auto;
		/*display: grid;*/
		/* grid-template-columns: 1fr auto 1fr; */
		/* justify-items: center; */
		/* align-items: center; */
		padding: 0 1rem;
		height: 100%;
	}

	/* ===== Desktop Theme Toggle NEW ===== */
	.desktop-theme-toggle {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		justify-items: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	/* ===== Mobile Theme Toggle New */
	.mobile-theme-toggle {
		display: none;
		width: 100%;
		height: 100%;
	}

	/* ===== Logo ===== */

	.logo {
		font-size: 1.25rem;
		font-weight: bold;
		color: #f9fafb;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
		justify-self: start;
		grid-column: 1;
	}

	:global(html[data-theme="dark"]) .logo {
		color: #d1d5db;
	}

	.logo:hover {
		color: #d1d5db;
	}

	.desktop-nav-links {
		display: flex;
		list-style: none;
		padding: 0;
		margin: 0;
		gap: 1rem;
		justify-self: center;
		grid-column: 2;
	}

	.desktop-nav-links li a {
		color: #f9fafb;
		text-decoration: none;
		padding: 0.5rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
	}

	:global(html[data-theme="dark"]) .desktop-nav-links li a {
		color: #9ca3af;
	}

	.desktop-nav-links li a:hover {
		color: #d1d5db;
	}

	:global(html[data-theme="dark"]) .desktop-nav-links li a:hover {
		color: #ffffff;
		background-color: #2d3748;
	}

	.desktop-nav-links li a.active {
		font-weight: bold;
		color: rgba(66, 222, 185, 1);
	}

	:global(html[data-theme="dark"]) .desktop-nav-links li a.active {
		color: #e5e7eb;
	}
	
	/* ===== Mobile Hamburger ===== */

	.hamburger-menu {
		background: none;
		border: none;
		color: #f9fafb;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		z-index: 1001;
		justify-self: end;
	}

    .hamburger-menu .fas.fa-times {
        transform: rotate(90deg);
    }

	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-content {
		display: none;
		position: fixed;
		background-color: rgba(31, 41, 55, 0.5);
		backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(31, 41, 55, 1);
		border-left: 1px solid rgba(31, 41, 55, 1);
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		z-index: 1001;
		list-style: none;
		padding: 0;
		margin: 0;
		top: calc(var(--nav-height) - 1px);
		right: 0px;
		transition: color 0.3s ease, background-color 0.3s ease;
	}

	:global(html[data-theme="dark"]) .dropdown-content {
		background-color: rgba(6, 19, 28, 0.5);
		border-bottom: 1px solid rgba(6, 19, 28, 1);
		border-left: 1px solid rgba(6, 19, 28, 1);
		backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
	}

	.dropdown-content.show {
		display: block;
	}

	.dropdown-content li a {
		color: #f9fafb;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		transition: background-color 0.2s ease, color 0.2s ease;
	}

	.dropdown-content li a:hover {
		background-color: #0D1B26;
	}

	.dropdown-content li a.active {
		font-weight: bold;
		color: rgba(66, 222, 185, 1);
	}

	.dropdown-theme-toggle-item {
        display: flex;
        padding: 12px 16px;
    }

	/* --- Media Queries --- */

	@media (max-width: 768px) {
		.nav-container {
			grid-template-columns: auto 1fr auto;
			justify-items: unset;
		}

		.logo {
			grid-column: 1;
			justify-self: start;
		}

		.desktop-theme-toggle {
			display: none;
		}

		.mobile-theme-toggle {
			display: grid;
			grid-template-columns: 1fr auto;
			align-items: center;
		}

		.dropdown {
			grid-column: 2;
			justify-self: end;
		}

		.hamburger-menu {
			display: block;
		}

		.desktop-nav-links {
			display: none;
		}
	}

	@media (min-width: 769px) {
		.desktop-nav-links {
			display: flex;
		}

		.desktop-theme-toggle {
			display: grid;
		}

		.mobile-theme-toggle {
			display: none;
		}

		.hamburger-menu {
			display: none;
		}

		:global(body) {
			overflow: auto !important;
		}
	}

	/* --- Dark Mode Adaptations --- */

	:global(html[data-theme="dark"]) .dropdown-content li a {
		color: #9ca3af;
	}

	:global(html[data-theme="dark"]) .dropdown-content li a:hover {
		background-color: #2d3748;
		color: #ffffff;
	}

	:global(html[data-theme="dark"]) .dropdown-content li a.active {
		font-weight: bold;
		color: #e5e7eb;
	}
</style>
