<svelte:head>
  <title>Portfolio | felixreverett.com</title>
  <meta name="description" content="My Portfolio Page." />
</svelte:head>

<div class="page-wrapper">
  <div class="hero-section">
    <h1>Portfolio</h1>
  </div>
</div>

<div class="c-container">
    <div class="c-content">
        <h1>The Portfolio Page Is Under Construction</h1>
        <p>Please come back later :)</p>
        <div class="spinner"></div>
    </div>
</div>

<style>
    .c-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .c-content {
        padding: 2rem;
        background-color: #ffffff;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        transition: background-color 0.3s ease;
    }

    .c-content h1 {
        font-size: 2rem;
        color: #1f2937;
        margin-bottom: 1.5rem;
    }

    /* Minimal spinner */
    .spinner {
        border: 4px solid #f3f4f6;
        border-top: 4px solid #4f46e5;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Minimal Dark Mode Styles */
    :global(html[data-theme="dark"]) .c-content {
        background-color: #1f2937;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
    }

    :global(html[data-theme="dark"]) .c-content h1 {
        color: #e5e7eb;
    }

    :global(html[data-theme="dark"]) .spinner {
        border: 4px solid #374151;
        border-top: 4px solid #6366f1;
    }
</style>