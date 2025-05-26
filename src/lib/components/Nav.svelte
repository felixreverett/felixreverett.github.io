<script>
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/themeStore';

  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About Me' },
    { href: '/portfolio', text: 'Portfolio' },
  ];

  let currentTheme;
  theme.subscribe(value => {
    currentTheme = value;
  });

  $: isDarkMode = currentTheme === 'dark';

  function toggleTheme() {
    theme.toggle();
  }

</script>

<nav>
  <div class="nav-container">
    <a href="/" class="logo">felixreverett.com</a>
    <ul>
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

    <label class="theme-slider-container" aria-label="Toggle dark or light mode">
      <input
          type="checkbox"
          bind:checked={isDarkMode}
          on:change={toggleTheme}
          class="sr-only"
          aria-hidden="true"
          tabindex="-1"
      />
      <span class="slider-track">
          <span class="slider-thumb"></span>
      </span>
  </label>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: background-color 0.3s ease;
  }

  .nav-container {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-items: center;
    align-items: center;
    padding: 0 1rem;
  }

  .logo {
    font-size: 1.25rem;
    font-weight: bold;
    color: #f9fafb;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    justify-self: start;
  }

  .logo:hover {
    color: #d1d5db;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 1rem;
    justify-self: center;
  }

  li a {
    color: #f9fafb;
    text-decoration: none;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }

  li a:hover {
    color: #d1d5db;
  }

  li a.active {
    font-weight: bold;
    color: #00869d;
  }

  .theme-slider-container {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 32px;
        cursor: pointer;
        justify-self: end;
    }

  .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
  }

  .slider-track {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #f3f4f6;
      border-radius: 34px;
      transition: background-color 0.4s ease;
  }

  .slider-thumb {
      position: absolute;
      content: "";
      height: 24px;
      width: 24px;
      left: 4px;
      bottom: 4px;
      background-color: #06131C;
      border-radius: 50%;
      transition: transform 0.6s ease;
      box-shadow: 0 2px 2px rgba(0,0,0,0.2);
  }

  .theme-slider-container input:checked + .slider-track {
      background-color: #00869d;
  }

  .theme-slider-container input:checked + .slider-track .slider-thumb {
      transform: translateX(26px);
  }

  :global(html[data-theme="dark"]) nav {
      background-color: #06131C;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
      color: #d1d5db;
  }

  :global(html[data-theme="dark"]) .logo {
      color: #d1d5db;
  }

  :global(html[data-theme="dark"]) li a {
      color: #9ca3af;
  }

  :global(html[data-theme="dark"]) li a:hover {
      color: #ffffff;
      background-color: #2d3748;
  }

  :global(html[data-theme="dark"]) li a.active {
      color: #e5e7eb;
  }
</style>
