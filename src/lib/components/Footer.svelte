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
		background-color: rgba(31, 41, 55, 0.5);
		color: #d1d5db;
		text-align: center;
		margin-top: 3rem;
		border-top: 1px solid rgba(31, 41, 55);
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
		color: #d1d5db;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
		display: flex;
		align-items: center;
	}

	:global(html[data-theme="dark"]) .social-links a {
		color: #9ca3af;
	}

	.social-links a:hover {
		color: #ffffff;
	}

	:global(html[data-theme="dark"]) .social-links a:hover {
		filter: drop-shadow(0 0 0.8em #42deb9);
	}

	.social-links a i {
		font-size: 1.5rem;
		margin-right: 0.5rem;
		line-height: 1;
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
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		gap: 1.5rem;
	}  
</style>