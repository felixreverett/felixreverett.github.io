<script>
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/themeStore';
	import { browser } from '$app/environment';
	import DarkModeToggle from './DarkModeToggle.svelte';

	const navLinks = [
		{ href: '/', text: 'Home' },
		//{ href: '/about', text: 'About Me' },
		{ href: '/portfolio', text: 'Portfolio' },
		{ href: '/blog', text: 'Blog'},
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
		<a href="/" class="logo">
			<span class="brand-prefix">&gt;_</span> felixreverett.com <span class="cursor-blink">|</span>
		</a>

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
		background-color: var(--bg-color) !important;
		border-bottom: 1px solid var(--border-color) !important;
		height: var(--nav-height);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
		transition: all var(--transition-fast);
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
		font-family: var(--font-mono);
		font-size: 1.25rem;
		font-weight: bold;
		color: var(--fg-color) !important;
		display: flex;
		align-items: center;
		justify-self: start;
	}

	.logo:hover {
		color: #d1d5db;
	}

	.brand-prefix {
		color: var(--an-color);
		font-weight: 400;
		margin-right: 2px;
	}

	.cursor-blink {
		color: var(--an-color);
		animation: blink 1s step-end infinite;
		font-weight: 300;
	}

	@keyframes blink {
		50% { opacity: 0; }
	}

	.desktop-nav-links {
		display: flex;
		list-style: none;
		gap: 1rem;
	}

	.desktop-nav-links li a {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary) !important;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		text-decoration: none;
	}

	.desktop-nav-links li a:hover {
		color: var(--fg-color) !important;
        background-color: var(--bg-surface-secondary);
    }

	.desktop-nav-links li a.active {
		color: var(--fg-color) !important;
        font-weight: 700;
    }

	/*This is to specifically handle dark mode shadow*/
	:global(html[data-theme="dark"]) .main-nav {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
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
		background-color: var(--bg-color) !important;
		border: 1px solid var(--border-color) !important;
		border-top: none;
		min-width: 160px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		z-index: 1001;
		list-style: none;
		padding: 0;
		margin: 0;
		top: calc(var(--nav-height) - 1px);
		right: 0px;
		transition: all var(--transition-fast);
	}

	.dropdown-content.show {
		display: block;
	}

	.dropdown-content li a {
		color: var(--text-secondary) !important;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		padding: 0.75rem 1.25rem;
		text-decoration: none;
		display: block;
		transition: all var(--transition-fast);
	}

	.dropdown-content li a:hover {
		background-color: var(--bg-surface-secondary);
    	color: var(--fg-color) !important;
	}

	.dropdown-content li a.active {
		font-weight: 700;
    	color: var(--an-color) !important;
	}

	/* Specific Dark Mode overrides for Dropdown */
	:global(html[data-theme="dark"]) .dropdown-content {
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
	}

	.dropdown-theme-toggle-item {
        display: flex;
        padding: 12px 16px;
    }

	.hamburger-menu {
		background: none;
		border: none;
		color: var(--fg-color) !important;
		font-size: 1.25rem;
		cursor: pointer;
		padding: 0.5rem;
		z-index: 1001;
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
