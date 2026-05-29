<svelte:head>
    <title>What Is Functional Programming? | felixreverett</title>
    <meta name="description" content="What is functional programming, what is the lambda calculus, and how do they differ from other programming languages?" />
</svelte:head>

<div class="page-wrapper">
	<div class="hero-section">
		<h1>What Is Functional Programming?</h1>
		<figure class="image-wrapper">
			<img src="/images/functional-programming.jpg" alt="A stylised lambda symbol as a nod to the lambda calculus.">
		</figure>
	</div>

	<section class="content-section">

        <blockquote class="terminal-quote">
            <p>“One pervasive feature of all functional programs is recursion”</p>
            <cite>Simon Peyton Jones, 1987</cite>
        </blockquote>

        <p><b>Functional programming</b> is an enigmatic niche of the computer science world.</p>
        <p>As programmers, we’re generally content to agree that it exists, and yet, as though it were some incomprehensible phenomenon of nature, should you press for an explanation as to what this concept really means, you might only receive anecdotal replies.</p>
        <p>Most will tell you that it’s <i>“just another paradigm”</i>.</p>
        <p>A few might cite you cryptic parables concerning the <b>Lambda Calculus</b> - a little closer to the truth, but this still doesn’t explain functional programming <i>meaningfully</i>.</p>
        <p>With a plethora of established functional languages out there, there must be a reason why functional programming was born beyond the whims of paradigmatic uniqueness and <i>datofunctional</i> fluidity.</p>
        <p>So, read on as we explore what it really means for a language to be <i>functional</i>, why functional languages exist at all, and what that says about some very popular languages that may not be as functional as they claim to be.</p>
        
        <h2>A Three-Course Comprehension</h2>
        <p>I personally believed I had understood functional programming on three separate occasions, each an improvement from the last.</p>
        <p>First was when I started to code. I was just getting into the world of programming and computer science, and I was gaining an awareness of the many different programming paradigms in existence.</p>
        <p>Next was when I started my first functional language. This was a first-hand experience, but may have been more misleading than one would expect.</p>
        <p>And lastly was when I finally studied functional programming at university.</p>

        <h3>Just Another Paradigm</h3>
        <p>I’ve long felt that I would eventually learn functional programming.</p>
        <p>In the days when I moved from procedural languages to my first object-oriented language, I thought that functional languages would be a similar step forwards - that functional was to object-oriented as object-oriented was to procedural, and that each successive style built on the last.</p>
        <p>My initial assumption about the concept was that <b>functional programming was ‘Just Another Paradigm’</b>. While this belief alone is not wrong, it doesn’t offer any insight into why and how it’s played such a meaningful role in computer science history, and it certainly isn’t enough to motivate the average programmer to dig any deeper.</p>
        <p>And yet, learning that functional programming represents more than what you had previously assumed is, somewhat ironically, a necessary step in solidifying the concept in your mind.</p>
        <p>Unlike imperative languages, functional languages are considered to be <b>declarative</b>. Where “imperative languages are concerned with giving instructions to a computer”, functional programs are instead focused on “describing a solution to a problem” (Clack et al., 1995). It might not be immediately clear why <i>describing a solution</i> and <i>giving instructions</i> are different approaches, but trust me that different they are. <a href="#imperative-declarative">More on this later</a>.</p>
        <p><b>Functional languages</b> stand apart from both object-oriented and procedural languages. Their underlying implementations follow a completely different motivation, and it's this very motivation that necessitates the language features that brought about my second understanding: constants and higher-order functions.</p>
        
        <h3>Constants and Higher-order Functions</h3>
        <p>When I started learning my first functional language (Scala) in 2025, I had already solidified a basic idea that functional programs used constants, treated functions as first-class citizens (whatever <i>that</i> meant), and <i>presumably</i> used a lot of functions.</p>
        <p>By then I had already encountered several features of functional languages that had permeated into other languages like C# and JavaScript. I had seen <b>anonymous functions</b> and various implementations of <b>lambda expressions</b>, and I’d started to make frequent use of the <b>.map()</b> and <b>.reduce()</b> methods from which, in a bid to pipeline data more succinctly, I <a href="/blog/method-chaining">ended up with a fascination for method chaining</a>.</p>
        
        <figure class="code-figure">
        <pre><code class="language-scala">{@html escapeHtml(codeSnippet6)}</code></pre>
        <figcaption>Functional languages like Scala employ various functional methods like map and filter</figcaption>
        </figure>
        
        <p>But even through learning Scala I didn’t fully grasp what functional programming actually meant. Constants and higher-order functions are useful, sure, but they are not exclusive to languages like Haskell, <a href="https://github.com/felixreverett/miranda" target="_blank">Miranda</a>, and Scala. There are a myriad of non-functional languages that have these features, too.</p>
        <p>My second assumption was that functional programming was just <i>coding with lots of dedicated functions and no mutable state</i>, but this didn’t really answer <b>why</b> these languages were built this way.</p>
        <p>Even after Scala helped me learn to program without the use of variables, I still had one burning question - what could possibly be the advantage of designing a language like this? And this is what leads us to my third and current understanding of functional programming.</p>
        <p>There is a method to this madness.</p>
       
        <h3>A Child of the Church</h3>
        <p>Functional programming should not be thought of as another paradigm so much as <b>an entire mindset shift</b>. These design choices - that some would consider constraints - are very much intentional, and are very much advantageous. Functional programming is not merely another paradigm, and neither is it an amalgam of immutability and first-class functions.</p>
        <p><b>Functional programming was not made to improve data safety or let you write more efficient code</b>.</p>
        <p>No, such magnificent strengths are little more than byproducts of a much more beautiful truth:</p>
        <p><strong>Functional programming is the application of the Lambda Calculus.</strong></p>
        <p>Procedural and object-oriented codebases both define different ways to structure programs, but they ultimately adhere to the same principles: their syntax reflects a clear correspondence to individual machine instructions; and the programmer must control memory allocation manually. You may not even notice that you’re managing memory allocation, but every time you change a variable or make use of a loop, you’re doing exactly that. All languages of this nature can be thought of as implementations of Turing Machines.</p>
        <p>Yet Turing Machines are <b>not the only way to do computation</b>.</p>
        <p>In the 1930s, American mathematician Alonzo Church developed the lambda calculus, a syntax built of only three terms that was “sufficiently powerful to express all functional programs” (Peyton Jones, 1987). By extension, it could compute anything computable; it was <i>Turing Complete</i>.</p>
        <p>The core notion here is that a functional program can be represented as <b>a single, potentially enormous expression</b>, and that this expression <b>can be reduced all the way down into a final result.</b>. Those concepts of immutability and first-class functions are nothing more than a prerequisite to be able to implement the lambda calculus in code.</p>
        <p>Lambda expressions can be reduced in any of four ways, known as <i>reductions</i>. Evaluation can then proceed “by repeatedly selecting a reducible expression (or redex) and reducing it.” (Peyton Jones, 1987).</p>
        <p>The three terms of the syntax of the lambda calculus are enough to express anything you could envisage in imperative programming. In fact, <a href="https://en.wikipedia.org/wiki/Combinatory_logic" target="_blank">you don’t even need three terms to do this</a>.</p>
        <p>And so it is <b>this</b> truth, that a functional language is one whose runtime evaluates code through reducing expressions, that underpins functional programming.</p>
        
        <h2 id="imperative-declarative">On The Imperative and The Declarative</h2>
        <p>Having defined functional programming, let’s explore what we really mean when we say a language is <b>declarative</b>.</p>
        <p>First, a recap of how imperative languages handle iteration with loops. In languages like C#, <b>loops</b> are written with three components: the <b>initialised iterator</b>; the <b>condition</b>; and the <b>incrementation of the iterator</b>.</p>
        <p>For the iterator to change it has to be <b>mutable</b>. It manages how many times to repeat a section of code, and we normally take advantage of this to loop over each index of an array or other enumerable datatype. Enumerable data are stored contiguously in memory, which enables us to use an iterator to access every index of data with a single base address and an offset (the iterator).</p>
        <p>Here’s an example of imperative iteration. The following code from <a href="https://github.com/felixreverett/isola" target="_blank">Isola</a> is used to find the first free index of a player’s inventory, using the variable <code>i</code> to achieve this. Curiously, the function actually has a return signature of type bool (it’s possible for the function to not find a free index), but by making use of C#’s <code>out</code> keyword we can return an index if and only if one is available. This imperative pattern is strikingly similar to a specific algebraic data type in languages like Miranda or Haskell, commonly known as a Maybe or an Option type.</p>
        <pre><code class="language-csharp">{@html escapeHtml(codeSnippet1)}</code></pre>
        <p>We can think of the iterator as an <b>explicit helper</b>. We are manually assigning and updating the variable - <i>giving instructions</i> - to cause the computer to execute code. This is the basis of imperative programming.</p>
        <p>With functional programming, we do away entirely with the manual oversight of control flow. We have <b>no for loops, no while loops, no variables at all</b>, and memory management must be abstracted beyond our control. We actually have functional languages to thank for garbage collection.</p>
        <p>’Iteration’ is instead achieved through a delicate balance of recursion and pattern matching, where code is recursively executed over a data structure until it converges into a <b>base case</b>.</p>
        <p>The below code shows how an equivalent function might be written in Miranda:</p>
        <pre><code class="language-haskell">{@html escapeHtml(codeSnippet2)}</code></pre>
        <p>Look carefully at how we get around the constraints of immutability. Rather than update data in-situ, we use recursion to pass on the new values as arguments to the next function. We effectively update our values, but without breaking the rules of immutability that constrain us.</p>
        <p>This isn’t some arbitrary decision to make our own lives harder; immutability is necessary to faithfully implement the lambda calculus. Reductions must be <b>confluent</b> - they must produce the same result irrespective of the order in which they are evaluated - and this could not be guaranteed if variables could arbitrarily change state throughout the program's lifecycle. Immutability ensures a concept known as <b>referential transparency</b>, that any subexpression can be replaced by its evaluated reduction without altering the program’s behaviour.</p>
        <p>Thus, we can say that a functional program is <b>declarative</b>: we the programmers are not telling rocks how to run our code, but are simply <b>declaring that our code be run</b>.</p>
        
        <h2>The Properties of Functional Programs</h2>
        <p>Having cast a spotlight on what sets declarative languages apart from imperative ones, it may provide further clarity to explore the key properties that come as a result of implementing the lambda calculus.</p>
        
        <h3>Higher-Order Functions</h3>
        <p>A higher-order function is a function “that either takes another function as an argument or produces a function as a result” (Clack et al., 1985). While the concept is not exclusive to functional languages (JavaScript is a well-known adopter), in functional programming they are not just a feature, but a benefit of the lambda calculus. There is nothing in the rules of the lambda calculus that restricts what can be the argument of a function, and indeed permitting functions as the argument of functions is required in reductions. Notice the mention of a singular ‘argument’ here. <a href="#currying">This will be relevant later</a>.</p>
        <p>Through its use of type declarations, Miranda creates a fantastic visualisation of how this is all handled, where the type of a function is simply a mapping of an input X to an output Y <code>(X -> Y)</code>.</p>
        <pre><code class="language-haskell">{@html escapeHtml(codeSnippet3)}</code></pre>
        
        <h3>Recursion</h3>
        <p>Having briefly touched on how functional programming languages can avoid loops by using recursion, let’s dive slightly deeper into what this means for the paradigm.</p>
        <p>When I first learnt that functional languages depended on recursion I was somewhat sceptical; recursion is a powerful tool, but it can also be slow and susceptible to <b>stack overflows</b>. Yet in the hands of a functional language, it’s a completely different story.</p>
        <p>There are actually multiple different kinds of recursion. <b>Stack recursion</b>, the type that most programmers are familiar with, creates a new frame of data on the stack for each cycle. It is very easy to define, and very easy to follow.</p>
        <pre><code class="language-haskell">{@html escapeHtml(codeSnippet4)}</code></pre>
        <p>Stack recursion is the type of recursion susceptible to overflows. It fundamentally relies on being able to return to the previous stack frame to calculate a final result when winding back up the stack spine, and this forces us to keep those stack frames in memory. Thankfully, <b>accumulative recursion</b> comes to the rescue here. This flavour of recursive, intrinsic to methods like <b>fold</b>, uses an accumulator to pass forwards all data needed between two frames, such that the next call of the function can reuse the exact same stack frame in memory.</p>
        <pre><code class="language-haskell">{@html escapeHtml(codeSnippet5)}</code></pre>
        <p>We can see in the above Miranda code that <code>printdots</code> uses an auxiliary function in its definition to set an initial accumulator (an empty list of char), with recursive calls passing all data forwards. Optimising accumulative recursive functions is known as <a href="https://en.wikipedia.org/wiki/Tail_call" target="_blank">tail call optimisation</a>.</p>
        
        <h3>Immutability</h3>
        <p>Perhaps what functional programs are best known for (and what may be the steepest learning curve for imperative programmers) is immutability. As discussed above, functional languages must enforce immutability of their values to ensure referential transparency.</p>
        <p>Yet beyond this necessity, immutability actually brings a host of other benefits to the program lifecycle. Firstly, a whole class of runtime bugs are eliminated entirely. If a value is initialised, it will always be that value; there is no way for it to be changed. Data race conditions cannot exist because values are readonly.</p>
        <blockquote class="terminal-quote">
        <p>“As a consequence of referential transparency, subcomputations always give the same result for the same arguments. This means that the code is safer and may often be reused in similar contexts”.</p>
        <cite>Clack et al., 1985</cite>
        </blockquote>
        <p>Next, the compiler can perform compile-time optimisations like <b>constant folding</b>. Expressions like <code>x = 45 + 55</code> can simply reduce all instances of <code>x</code> with the resultant <code>100</code>, which can improve code performance at a large enough scale. In fact, evaluating mathematical expressions is analogous to one of the reductions of the lambda calculus (although handled by graph reductions in Miranda).</p>
        
        <h3 id="currying">Currying</h3>
        <p>Pure lambda functions only allow for a single input and a single output, but we often need to use more than one item of data in our functions. Although we could approach this problem by packing all our input data into a singular structure, <b>currying</b> is the general solution, enabling our “functions to be defined with multiple parameters without the need to use a tuple.” (Clack et al., 1985).</p>
        <p>In Miranda, currying is expressed syntactically by placing the argument(s) immediately after a function’s name, as in the following implementation of <code>filter</code>, which takes a predicate of type <code>(* -> bool)</code> and a polymorphic list, and returns a new polymorphic list of all values that returned true against that predicate. Anecdotally, note that my implementation constructs the list in reverse order for a slightly improved list-building efficiency (O(1) per prepend = O(n) total), and therefore must reverse the finalised list before returning it to the caller (at a cost of O(n)).</p>
        <figure class="code-figure">
        <pre><code class="language-haskell">{@html escapeHtml(codeSnippet7)}</code></pre>
        <figcaption>The actual Miranda function for filter is defined in the standard environment with a one-line list comprehension: filter f x = [a | a&lt;-x; f a].</figcaption>
        </figure>
        <p>Currying has another major utility beyond solving this restriction of the lambda calculus, and it is arguably all the more important - “its real advantage is that it provides the facility to define functions that can be partially applied” (Clack et al., 1985).</p>
        <p><b>Partial function application</b> lets our functions be invoked with fewer arguments than they need for evaluation. Instead of causing a compiler error, the function instead finds itself in a “state of waiting” where it will not execute until its remaining arguments are applied. This is an invaluable addition to the functional programmer’s toolkit, and allows us not just to build functions from other functions, but also to pull the strings on how our programs themselves evaluate.</p>
        <p>The below code snippet shows how <code>filter</code> can be extended by partially applying it with a predicate and no list.</p>
        <pre><code class="language-haskell">{@html escapeHtml(codeSnippet8)}</code></pre>
        <p>Of course, in Miranda there is no all-seeing-eye that has to check to see if the right number of arguments have been supplied to the function; partial application, like all properties of functional programs, is simply an incidence of implementing the lambda calculus in code.</p>
        
        <h2>What Counts as a ‘Functional’ Language?</h2>
        <p>The functional paradigm should now be a little less esoteric, but our definition leads us to an unsettling truth. If functional programs are implementations of the lambda calculus, then some functional languages are not so functional after all.</p>
        <p>Languages like Scala and F#, both unambiguously considered functional, do use a declarative code style, and do exhibit all the telltale signs of functional programs, and yet they still allow for mutable datatypes with their <code>var</code> and <code>mutable</code> keywords. These languages are clearly flouting the maxim of referential transparency; <b>by our definition they cannot be functional</b>.</p>
        <p>Although it is true that Scala and F# are not programmatic implementations of the lambda calculus, if they have all the rich features of actual functional languages, then is this pedantry even necessary? After all, Scala and F# are both cutting-edge languages in their own right; they have earned their seats at the functional table.</p>
        <p>There is a term - <b>pure functional languages</b> - that is sometimes used to delineate the two. This can be contrasted with the <b>impure functional languages</b>, to which Scala and F# belong, to define multi-paradigmatic languages that seek to capture the strengths of both the declarative and imperative families. A <b>programming creole</b>.</p>
        <p>This is one solution to the ambiguity of ‘functional’ languages, but is it not an injustice to reduce Miranda and Haskell to a mere subcategory of the functional nomenclature?</p>
        <p>If our goal is to make functional programming more accessible to those developers whose interest is not yet piqued by the current name, then perhaps it is the paradigm’s very name that betrays it. All languages have functions, and the permeation of the rich functional features into the imperative languages has somewhat blurred the lines.</p>
        <p>Instead, the pure functional languages should be thought of as the <b>Lambda languages</b>. With a name true to their roots, they might no longer be an enigmatic niche of the computer science world.</p>
        
        <h2>Summary</h2>
        <p>The functional paradigm is a well-known but seldom understood child of the programming dynasty, but knowing that their design is a direct reflection of their origins casts the spotlight on what they truly mean.</p>
        <p>Learning to read and write functional programs is a uniquely rewarding challenge. It compels you to consider the minutiae of every line of code. Mastering a knowledge of higher-order functions, recursion, immutability, and currying will strengthen your code in any paradigm.</p>
        <p>However, perhaps just as valuable as its ability to help you program is how functional programs pay homage to the pioneers of the lambda calculus; to our predecessors whose contributions to the code of the past have given us the code of the present.</p>
        <p>Are programs functional because they have immutable state and higher-order functions, or do they have immutable state and higher-order functions because they are functional?</p>
        <cite class="blog-sign-off">Felix R. Everett, May 2026</cite>

    </section>

    <section class="citations-section">
        <h2>Citations</h2>
        <p>Clack, C., Myers, C. and Poon, E. (1995) Programming with Miranda.</p>
        <p>Peyton Jones, S. (1987) The Implementation of Functional Programming Languages.</p>
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
`public bool GetFirstFreeIndex(out int index)
{
    index = -1;
    for (int i = 0; i < ItemStackList.Length; i++)
    {
        if (ItemStackList[i].Equals(default(ItemStack)))
        {
            index = i;
            return true;
        }
    }
    return false;
}`;

let codeSnippet2 =
`|| assume itemStackList defined elsewhere
|| assume isEmpty defined elsewhere

resultNum ::= None | Some num

getFirstFreeIndex :: itemStackList -> resultNum
getFirstFreeIndex list
  = xgetFirstFreeIndex list 0
    where
	xgetFirstFreeIndex [] any = None
    xgetFirstFreeIndex (x : xs) index
	  = Some index, if isEmpty x
	  = xgetFirstFreeIndex xs (index+1), otherwise`;

let codeSnippet3 =
`f :: x -> y

g :: w -> (x -> y) -> z`;

let codeSnippet4 =
`fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)`;

let codeSnippet5 =
`printdots :: num -> [char]
printdots n
  = printdots_aux(n, "")
    where
    || printdots_aux :: (num, [char]) -> [char]
    printdots_aux (0, a) = a
    printdots_aux (n, a) = printdots_aux(n-1, "." ++ a)`;

let codeSnippet6 =
`val solution = input
	.split("\\r?\\n")
	.filter(_.trim.nonEmpty)
	.map { line =>
		val (left, right) = line.splitAt(line.length/2)
		val c = left.intersect(right).head
		if (c.isUpper) (c & 31) + 26 else (c & 31)
	}
	.sum`;

let codeSnippet7 = 
`filter :: (* -> bool) -> [*] -> [*]
filter cond list
  = reverse (xFilter list cond [])
    where
    xFilter cond [] result = result
    xFilter cond (x : xs) result
      = xFilter cond xs (x : result), if (cond x)
      = xFilter cond xs result, otherwise`;

let codeSnippet8 = 
`moreThanEight = filter (>8)

moreThanEight [1, 9] || Evaluates to [9]`;

</script>