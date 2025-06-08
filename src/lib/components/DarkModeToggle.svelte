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
        background-color: #1f2937;
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

    /* --- Dark Mode --- */
    :global(html[data-theme="dark"]) .slider-track {
        background-color: #374151;
    }

    :global(html[data-theme="dark"]) .slider-thumb {
        background-color: #06131C;
    }

    :global(html[data-theme="dark"]) .theme-slider-container input:checked + .slider-track {
        background-color: #00869d;
    }
</style>