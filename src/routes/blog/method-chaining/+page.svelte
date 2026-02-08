<svelte:head>
    <title>What Is Method Chaining? | felixreverett</title>
    <meta name="description" content="What is the method chaining style of programming and how have I managed to eek out an entire blog about it?" />
</svelte:head>

<div class="page-wrapper">
	<div class="hero-section">
		<h1>Method Chaining</h1>
		<figure class="image-wrapper">
			<img src="/images/method-chaining.jpg" alt="A pixel art of chains and dots, analogous to method chaining.">
		</figure>
	</div>

	<section class="content-section">
	<blockquote class="terminal-quote">
		<p>"Y, en aquella mañana insignificante, empezó a nevar.</p>
		<p>Una nieve otoñal tan inesperada y efímera</p>
		<p>que me hizo pensar un rato</p>
		<p>en el amor que sentía por ti."</p>
	<cite>Memorias del quinto capítulo</cite>
	</blockquote>
	<p><b>Yes, this is an entire blog on method chaining</b>.</p>
	<p>Back when I studied maths in school, I would task myself with solving multi-step equations on my calculator in a single expression. Rather than iterating one part at a time, jotting down the intermediate values on paper, I was determined to be as precise as possible. At times this self-imposed challenge required a degree of planning - perhaps even slowed me down - but there was <b>nothing as satisfying as crafting a single elegant solution to a problem</b>.</p>
	<p>Little did I know that I was one step away from functional programming.</p>
	<h2>What is Method Chaining?</h2>
	<p>When I discovered my love for code in 2023, I found myself again wanting to scratch that problem-solving itch. My first tool was C#, and I was quickly enamoured by the language’s use of <b>method chaining</b>, the practice of using dot notation to apply a series of transformations to an object to return a new result. Method chaining is one of several strategies to string together functions, and revealed to me a style of programming that I’ve never wanted to forgo.</p>
	<p>The next language I learnt, JavaScript, moved method chaining even further into the limelight. While C# has LINQ and fully supports adding together functions to transform data, JavaScript takes it to another level. There is an astounding juxtaposition between JavaScript’s notorious <i>jankiness</i> and the total intuitiveness of its method chaining syntax. Try as I might, I cannot bring myself to dislike the language.</p>
	<h2>Transformation Pipelines</h2>
	<p>Method chaining is one of the strategies to combine functions into transformation pipelines, but it is certainly not the only way. Different languages flirt with a host of different doctrines.</p>
	<p>The second way to combine transformations is sometimes known as <b>function nesting</b>, and refers to the encapsulation of functions within other functions. This is much more aligned with the style one would use on a calculator; it is also much less fun. The greatest strengths of this strategy is that each function need not require any context of the functions around it, and the functions semantically only operate on data passed in as arguments, making them pure.</p>
	<p>Some readers may be familiar with a third major strategy that also circumvents the need for context, but we’ll get to that later. For now, here’s a visualisation of how method chaining and function nesting differ.</p>
	<p><b>Scala</b>, a paradigmatically functional language, employs method chaining to pass immutable data through a series of transformations. In the below snippet, I calculate the result from an input from Advent of Code by splitting it into an array, use .map to split each array index into a subarray, cast each subitem into an int, and then call .sum to add all subitems into a single value. Finally, I sort the array and return the sum of the largest three values, producing my answer. The full solution can be found <a href="https://github.com/felixreverett/aoc/blob/main/2022/01/solution.scala">on my GitHub</a>.</p>
	<pre><code class="language-scala">{@html escapeHtml(codeSnippet1)}</code></pre>
	<p>The key strength of method chaining is its readability. There is an intuitive, chronological path between the original input and the result, and it becomes trivial to make changes to the process at any step along the way. You need only tack on a new function.</p>
	<p>There is one major downside of method chaining that I have come across: appending transformations requires that the function be a valid property of the data type it’s modifying. This is rarely a blocker in most cases, because the set of transformations we use are almost always predefined as part of the language, but it is true that custom functions must first be defined as a property of a certain type before they can be appended to a chain.</p>
	<p>On the other side of the spectrum, some languages such as Python and Go do not readily facilitate method chaining. In fact, it would seem that here there is an unlikely concordance in their design philosophies - they both push for one way and one way alone to express something, and method chaining doesn’t fit the bill. So rigid is this mindset that in Python’s case it took until 2021 - yes, thirty years - for Python to add switch-case support to their language.</p>
	<p>Python’s primary way to push data through a transformation pipeline is through its use of <b><a href="https://en.wikipedia.org/wiki/List_comprehension">list comprehensions</a></b>. These are a way to perform transformations on iterable data structures like lists, and they’re also found in functional languages including Miranda and Haskell. List comprehensions are highly versatile, but they’re also limited to only iterable datatypes, and in the example below we see Python use both function nesting and method chaining to transform data where list comprehensions aren’t possible. They may be efficient and straightforward, but list comprehensions are bound by design to only a subset of types.</p>
	<pre><code class="language-python">{@html escapeHtml(codeSnippet2)}</code></pre>
	<p>While list comprehensions are deemed the “Pythonic” way to transform iterable structures in Python, for the sake of demonstration here is how the same problem could be solved without them at all:</p>
	<pre><code class="language-python">{@html escapeHtml(codeSnippet3)}</code></pre>
	<p>Even with a concerted effort to format the code for legibility, function nesting is more mentally demanding to read than method chaining.</p>
	<h2>The Importance of Syntactic Design in Programming</h2>
	<p>As I’ve grown as a developer, so too has grown my understanding of what makes a good language. Naturally, key features like strong types, graceful error handling, and consistent variable scope all contribute greatly to the development experience, but it wasn’t until I had to forgo method chaining in Go and Python that I realised <b>the sheer importance of good syntactic design in code</b>.</p>
	<p><b>This is the crux of method chaining</b>. Your code should be as efficient to write as possible, and that doesn’t just mean typing speed, but also the ability for your codebase to be planned, refactored, and understood.</p>
	<h2>The Linguistics Of Method Chaining</h2>
	<p>I’d like to briefly highlight the adjacency between coding styles and language syntax. With a background in both linguistics and computer science, I am occasionally asked if there are any parallels between human and computer languages, and while there may be similarities in their structure (and certainly in how they are tokenised), they are separated by one fundamental difference: human language has semantics.</p>
	<p>Code must necessarily be explicit. The computer must always be able to execute instructions deterministically, but human language, in contrast, is adorned with ornaments of nuance and interpretation. I posit that <b>without semantics, Art would simply not exist</b>.</p>
	<p>Yet even though code must be explicit, that does not mean it is <i>entirely</i> free from the influence of semantics; code is a product of its creators, and its creators are beings of language.</p>
	<p>Method chaining is simply semantically more legible. It follows the order of transformations chronologically, and avoids the layering of parentheses or square brackets that other methods invoke. There is no mental preparation required to implement a solution (as with function nesting or list comprehensions) and it is straightforward to make modifications to your code. Unlike Go, whose syntax encourages intermediary variable declarations, method chaining takes only the input state and produces only the output.</p>
	<p>It closely corresponds with human language. Among the world’s languages, it is <b>typologically more common</b> to use prefixes and suffixes (which append a morpheme to one end of a root word) versus infixes and circumfixes (which insert a morpheme inside of or around another).</p>
	<p>Yet this by no means determines its correctness; while human language may exhibit certain tendencies, as long as communication is effective, the exact method of communication is ultimately irrelevant. Indeed, it could be argued that I state this case solely because method chaining most closely corresponds with the affixation style of my native English.</p>
	<h2>Piping</h2>
	<p>We’ve addressed several data transformation strategies, but there is another major approach to explore. Some functional languages like Elixir and F# use the |> pipe symbol to pass data through functional transformations while not requiring any shared context between functions. As with function nesting, all that matters is that the resultant type of one function matches the incoming type of the next.</p>
	<p>Here’s how F# would express the same code snippet shown earlier:</p>
	<pre><code class="language-fsharp">{@html escapeHtml(codeSnippet4)}</code></pre>
	<p>Like with Scala’s method chaining, piping presents a clear chronological order to the data transformations. In the case of the example above, one might notice that each function in the pipeline is prefixed by the datatype it transforms; the tradeoff of not requiring type context in the pipeline is that it may no longer be clear which version of a function to invoke. It’s ultimately up to the programmer whether this tradeoff is seen as unnecessary boilerplate, or could instead be a beneficial type identifier for each link in the chain.</p>
	<h2>Map</h2>
	<p>This blog wouldn’t be complete without an aside on the greatest chainable method of them all, <b>map()</b>.</p>
	<p>Generally speaking, the map function takes an iterable object and another function as arguments, and applies said function to each value of the object. While it wouldn’t be far-fetched to think of .map() as the functional equivalent of a loop, as perhaps the most versatile higher-order function out there it represents so much more.</p>
	<p>The prior Advent of Code code snippets underscore both the strengths and simplicity of map. The foundational use-case is to concisely split each value of an array into its own subarray, but with method chaining and especially with <b>lambda expression syntax</b> it becomes trivial to perform far more intricate computations.</p>
	<p>And map is far from the only higher-order function, too. Its two partners-in-crime, .filter() and .reduce(), can both be used to transform iterable datatypes <i>functionally</i>.</p>
	<p>But map() was the one that started it all for me. Paired with method chaining, you need only pass in the function argument for a syntactic flavour akin to ambrosia:</p>
	<pre><code class="language-scala">{@html escapeHtml(codeSnippet5)}</code></pre>
	<h2>Chaining It All Together</h2>
	<p>Congratulations, you’ve now survived an entire blog on method chaining.</p>
	<p>As I progress towards being able to articulate what I like and dislike about programming languages, I find myself increasingly impressed by the sheer linguistic diversity that the world of code has created. Let it be known that there is no objective best language, because beauty is in the eye of the programmer, but if I can instill in others the feeling of awe that this reality has instilled in me, then I consider that a job well done.</p>
	<cite class="blog-sign-off">Felix R. Everett, January 2026</cite>

	</section>
</div>

<script>
	function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

let codeSnippet1 = 
`val result = input
	.split("\\r?\\n\\r?\\n")
	.view
	.map { group =>
		group.split("\\n").flatMap(_.trim.toIntOption).sum
	}
	.toList
	.sorted(using Ordering.Int.reverse)
	.take(3)
	.sum`;


let codeSnippet2 = 
`result = sum(sorted(
    [sum(int(line) for line in group.splitlines()) 
	for group in input_data.split("\\n\\n")], 
    reverse=True
)[0:3])`;

let codeSnippet3 = 
`result = sum(
	sorted(
		map(
			lambda group: 
				sum(map(int, group.splitlines())), 
				input_data.split("\\n\\n")
		), 
		reverse=True
	)[0:3]
)`;

let codeSnippet4 = `
let result = 
    inputData.Split([|"\\n\\n"|], StringSplitOptions.None)
    |> Array.map (fun group ->
        group.Split('\\n')
        |> Array.map int
        |> Array.sum
    )
    |> Array.sortDescending
    |> Array.truncate 3
    |> Array.sum`;

let codeSnippet5 = `
val solution = input
	.split("\\r?\\n")
	.filter(_.trim.nonEmpty)
	.map { line =>
		val (left, right) = line.splitAt(line.length/2)
		val c = left.intersect(right).head
		if (c.isUpper) (c & 31) + 26 else (c & 31)
	}
	.sum
`;
</script>