<script>
  	const currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="footer-container">

	<div class="social-links">
		<a href="https://github.com/felixreverett/" target="_blank" aria-label="GitHub Profile">
		<i class="fab fa-github"></i> <span>GitHub</span> </a>
		<a href="https://linkedin.com/in/felixreverett/" target="_blank" aria-label="LinkedIn Profile">
		<i class="fab fa-linkedin-in"></i> <span>LinkedIn</span>
		</a>
	</div>
	<p>&copy; {currentYear} Felix R. Everett. All rights reserved.</p>
	</div>
</footer>

<style>
	footer {
		background-color: var(--bg-color) !important;
        color: var(--text-muted) !important;
        text-align: center;
        padding: 2rem 0;
        margin-top: auto;
        border-top: 1px solid var(--border-color) !important;
        font-family: var(--font-mono);
        transition: all var(--transition-fast);
	}

	footer p {
		font-size: 1rem !important;
	}

	:global(html[data-theme="dark"]) footer {
		background-color: rgba(6, 19, 21, 0.5);
		border-top: 1px solid rgba(6, 19, 21);
		color: #9ca3af;
		transition: color 0.3s ease, background-color 0.3s ease;
	}

	.footer-container {
		max-width: 100%;
		margin-left: auto;
		margin-right: auto;
		padding-left: 1.5rem; 
    	padding-right: 1.5rem;
	}

	.social-links a {
		color: var(--text-secondary) !important;
        text-decoration: none;
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        transition: color var(--transition-fast);
	}

	.social-links a:hover {
		color: var(--fg-color) !important;
	}

	.social-links a i {
		font-size: 1.5rem;
		margin-right: 0.5rem;
	}

	.social-links a span {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1;
		text-decoration: none;
	}

	.social-links a:hover span {
		text-decoration: underline;
	}

	.social-links {
		display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 1rem;
	}  

	:global(html[data-theme="dark"]) footer {
        background-color: #1a1a1a !important;
        border-top-color: var(--border-color) !important;
    }
</style>