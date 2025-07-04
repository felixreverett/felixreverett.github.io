<svelte:head>
    <title>wildfawn | felixreverett.com</title>
    <meta name="description" content="About the wildfawn SEO web crawler." />
</svelte:head>

<div class="page-wrapper">
	<div class="hero-section">
		<h1>Wildfawn SEO Web Crawler</h1>
		<div class="image-placeholder">IMAGE</div>
	</div>

	<section class="content-section">
		<h2>What is wildfawn?</h2>
		<p>Wildfawn (stylised “wildfawn”) is an open-source, lightweight SEO web crawler designed to efficiently collect and analyse a website’s core technical metrics. Built with ease-of-use in mind, the application is structured into <b>wildfawn Cloud</b>, an executable which can be configured to automatically schedule and export site crawls, and <b>fawnbot</b>, the standalone crawler and package responsible for all import, crawl, and export processes.</p>
		<p>When I first learnt about web crawlers in 2023 through my work in search engine optimisation, I was intrigued to know what was going on behind the scenes, more specifically, why a theoretically straightforward process could sometimes take hours to complete. Although I was keen to learn more, it wasn’t until I’d stumbled across the beautiful Golang, a language practically born for web interfacing, that I sensed a great opportunity to hit two fawns with one stone and learn Go and web crawling together.</p>
		<p>Thanks in no small part to my time spent on Advent of Code, whose subtle lessons on Data Structures and Algorithms introduced me to a suite of techniques that you’ll find in this project, I was able to cook up a simple prototype one Friday evening, and the rest is history!</p>
		<p>No fawns were hurt in the development of this project.</p>

		
		<h2>Features of wildfawn</h2>
		<p>The core workflow of the crawler is simple:</p>
		<ol>
			<li>Given a single URL, parse its HTML to extract all URLs of the same site.</li>
			<li>Push discovered URLs onto a queue. Avoid recursion, just in case™. Learnt that one in Advent of Code.</li>
			<li>Track which URLs are already crawled. Don’t crawl twice.</li>
		</ol>
		<p>
			Beyond that, I’ve steadily added features and data collection processes to the crawler, including:
		</p>

		<h3>crawler.go</h3>
		<p>Perhaps the most crucial component of fawnbot, crawler.go handles the queuing and sending of all HTTP requests to the target site, and the parsing of returned HTML and status codes. The entry point is the external method <b>GoWild()</b>, which takes a crawl config containing the root URL, and a program config containing general program instructions.</p>
		<p>First, GoWild() resolves the www. preference of the root URL, to which all enqueued URLs will be adjusted as necessary. Most websites today automatically redirect their URLs to one format or the other, but in testing this added a lot of bloat to redirects in the export, obfuscating real issues.</p>
		<p>Next up, the function fetches the website’s robots.txt file and parses it into a struct. Go’s lack of classes finally brought me face-to-face with this data type, although in earnest there isn’t much reason for why I hadn’t explored them sooner. Perhaps that’s the fallacy of OOP.</p>
		<p>Reading robots.txt is a critical step towards enabling several of the more advanced SEO metrics collectable in a site crawl, and warranted its own collection of relevant functions in <b>robotsManager.go</b>.</p>
		<p>The following step is to crawl the site itself, deferring to the internal function crawl(), which uses a queue and a makeshift set to crawl all discovered URLs and ignore already-crawled pages entirely. If robots.txt is respected at this stage (configured by the user) <b>fawnbot</b> will not crawl any disallowed URLs.</p>

		<div class="image-placeholder">IMAGE</div>

		<p>To the veteran web scraper, perhaps it is obvious that a queue is the most suitable data structure for this challenge, but for those less inclined I would like to briefly touch on this decision. Recursion is a powerful addition to the developer’s toolkit, and yet I generally make a conscious decision to avoid it in my work. Beyond the clear risk of exceeding the maximum call stack, my many hours <a href="/portfolio/aoc">solving Advent of Code puzzles</a> has taught me that recursion struggles with scalability, is inherently complex, and unless you’re very careful with passing data through methods, it is highly prone to human error.</p>
		<p>In wildfawn specifically, there are further reasons why an alternative solution makes sense. By employing a queue, I can traverse the target site breadth-first, tracking the crawl-depth of pages (as long as no http requests are refused). Using Go’s equivalent of a set, I can dynamically ensure no URL is fetched or crawled twice, eliminating all program overhead.</p>
		
		<div class="image-placeholder">IMAGE</div>

		<p>The <b>crawl()</b> function fetches and parses all HTML, then returns to GoWild() a list of URLObject structs containing SEO-relevant metrics for every URL found in the crawl. A receiver function runPostCrawl() is called on the list to populate any metrics not collectable until after the crawl, before the data is sent back to wherever GoWild() was called from.</p>
		<h3>Robots</h3>
	</section>
</div>

<style>
    .image-placeholder {
		max-width: 800px;
		height: auto;
		width: 100%;
		aspect-ratio: 2 / 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f0f0f0;
	}
</style>