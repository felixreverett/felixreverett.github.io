<script>
    import { theme } from '$lib/stores/themeStore';

    $: isDarkMode = $theme === 'dark';

    function toggleTheme() {
        theme.toggle();
    }
</script>

<label class="theme-slider-container desktop-theme-toggle" aria-label="Toggle dark or light mode">
    <input
        type="checkbox"
        bind:checked={isDarkMode}
        on:change={toggleTheme}
        class="sr-only"
    />
    <span class="slider-track">
        <span class="slider-thumb"></span>
    </span>
</label>

<style>
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

    .theme-slider-container {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 32px;
        cursor: pointer;
        justify-self: end;
        grid-column: 3;
    }

    .slider-track {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--border-color);
        border-radius: 34px;
        transition: background-color var(--transition-fast);
    }

    .slider-thumb {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 4px;
        bottom: 4px;
        background-color: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .theme-slider-container input:checked + .slider-track {
        background-color: var(--an-color) !important;
    }

    .theme-slider-container input:checked + .slider-track .slider-thumb {
        transform: translateX(26px);
    }

    :global(html[data-theme="dark"]) .theme-slider-container input:checked + .slider-track {
        background-color: #0D1B26;
    }
</style>