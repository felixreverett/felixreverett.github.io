<svelte:head>
  <title>Fine-tuning AI for Low-Resouce Languages | felixreverett</title>
  <meta name="description" content="My experience developing a fine-tuned local language translation model for Mauritian Creole." />
</svelte:head>

<div class="page-wrapper">
	<div class="hero-section">
		<h1>Fine-tuning AI for Low-Resource Languages</h1>
		<figure class="image-wrapper">
			<img src="/images/kestrel.png" alt="A pixel art of the Mauritian Flag, with a kestrel-like silhouette imposed in front of it.">
		</figure>
	</div>

	<section class="content-section">
	
    <blockquote class="terminal-quote">
      <p>“...you begin anyway and you see it through no matter what.”</p>
      <cite>To Kill A Mockingbird, Harper Lee, 1960</cite>
    </blockquote>

    <p>With the ever-advancing development of large language models, the combined knowledge of humanity is now more accessible than ever before.</p>
    <p>Yet the vast majority of world languages, the so-called <b>low-resource (LR) languages</b>, have little-to-no data available for training, placing their speakers at risk of being sidelined from the benefits of artificial intelligence.</p>
    <p>As the capstone of my postgraduate studies in computer science at UCL, I had the unique opportunity to investigate this technological inequality. With a multidisciplinary academic background in both linguistics and computer science, I found myself strategically poised to explore something that was as fascinating to me as it was valuable to others. Here, before me, was a chance to make the world just that little bit better.</p>
    <p>This blog covers my experiences developing <b>Kestrel</b>, a family of fine-tuned local language models for Mauritian Creole built on top of IBM’s Granite 4.1 decoder-only architecture. From tackling resource scarcity to grappling with days of overseeing fine-tuning on my own hardware, this thesis battled me and I won.</p>
    <p>With no prior experience in AI development, an unrivalled unfamiliarity with Mauritian Creole, and no guarantee that this model would even work under such constraints, I took the first step down a path I only wish I had discovered sooner.</p>
    <p>Short on time? Skip to the results <a href="#results">here</a>.</p>

    <h2>Introduction</h2>
    <p>To understand this project, we should first analyse the context in which these models were developed.</p>
    
    <h3>Minority and Low-Resource Languages</h3>
    <p>The world’s languages are often classified as either <b>minority</b> or <b>majority</b>, loosely defined by the proportion of speakers they have within a population in a given region or country. Catalan (as a rather personal example) is a minority language of Spain, yet it may also be considered a majority language in both the country’s autonomous region of Catalonia, as well as the neighbouring state of Andorra.</p>
    <p>The speakership of a language by no means determines the complexity of developing a bespoke language model. For AI machine translation it is far more relevant to focus on a secondary classification – that of a language’s <i>available written resources</i> – instead. Languages can be divided into the <b>high-resource (HR) languages</b>, ones for which considerable written corpora exist, and the <b>low-resource (LR) languages</b>, ones for which language data is challengingly scarce.</p>
    <p>Low resource availability and low speakership are not mutually exclusive. A language may be a linguistic minority but not low-resource (MiHR), such as with Catalan, which boasts an abundance of language material and is the language of government and education in Catalonia. Alternatively, a language may be neither a linguistic minority nor low-resource (MaHR), into which fall English, Spanish, and all major world languages. A language may be both a linguistic minority and low-resource (MiLR), as is the case with any of the Okinawan languages of the Japonic language family, which suffer from both a low digital representation (Eberhard et al. 2025), but also a low speaker population as Japanese continues to supplant the languages in day-to-day life. Finally, a language may be low-resource, but not a linguistic minority (MaLR). This is the case with Mauritian Creole.</p>
    
    <h3>Mauritian Creole Data Scarcity</h3>
    <p>Mauritian Creole (endonymically, Kreol Morisien) is the lingua franca of Mauritius, where it is spoken by over one million people. It is a predominantly oral language, with English and French assuming the role of administration and media (Eberhard et al., 2025) and Mauritian Creole being used in day-to-day life. As a consequence of the historical written and social dominance of English and French, the digital presence of Mauritian Creole is still, to this day, extremely limited.</p>
    <p>Modern transformer-based large language model architectures rely on unfathomably vast quantities of data to produce predictive models capable of outputting natural language. For the strongest world economies this is not an issue – English and Chinese both revel in a near-limitless supply of language data (granted, one might challenge how limitless ‘limitless’ truly is) – but Mauritian Creole is not as fortunate. Nearly three decades into the 21st Century and the spectre of colonialism still rears its ugly head: historical stigmatisation has suppressed the written uptake of Mauritian Creole to such an extent that the development of equivalently-powerful models is just not possible.</p>
    <p>Let us not forget that this isn’t even an issue of not having grammars and dictionaries for the language; Mauritian Creole has both. What it lacks is language-in-context, a crucial ingredient in the machine learning recipe from which machine learning can capture the patterns of language in much the same way as a child first learning to speak.</p>
    <p>Thankfully, researchers far more experienced than I have been steadily advancing on a solution.</p>
    
    <h3>Transfer Learning for LR Languages</h3>
    <p>How can you make a large language model without the language? The answer lies in <b>transfer learning</b>.</p>
    <p>Advances in fine-tuning – the process of refining an existing base model with new data to output a specialised new model – have shown that the linguistic capabilities of large language models can act as a stepping stone to develop LR language models in spite of data limitations. By capturing the underlying patterns of human grammar structures, fine-tuned models can be created for previously unseen languages with much smaller quantities of data required.</p>
    <p>From the perspective of a language learner, this does make sense. We are able to learn our second or third language far more quickly than our first, which takes years of near-constant input and immersion (and many more to build the refined vocabularies of adult speakers). Yet, also from the perspective of a language learner, this notion of transfer learning in humans reveals a major challenge for machine learning:</p>
    <p>It is far easier to learn a language with similar grammar and semantics.</p>
    <p>As English speakers, our easiest languages are those with the most similar set of features to latch on to. These are languages like Swedish, Spanish, or French – all close <i>genealogical</i> relatives – while our hardest languages tend to stray far away in terms of both features and vocabulary – think Japanese, Korean, or even Nahuatl (though I can’t claim to have ever delved into that conduit of precolombian mesoamerican history).</p>
    <p>Over my near-decade of learning Japanese and Spanish, I can say with the utmost confidence that the former’s grammar and vocabulary causes the intensity of learning both languages to be not even remotely comparable. How do you teach an English speaker, whose language is rich in relativisers, that Japanese only expresses its <i>where</i>s and <i>that</i>s not just implicitly, but ahead of the noun they modify? How can a speaker of Japanese master the articles of Spanish, so definitely indefinite and so singularly plural?</p>
    <p>This is the unsung challenge of transfer learning. Languages are not ciphers; they are an inseparable pair of morphosyntax and semantopragmatics that commands resource. Resource that Mauritian Creole does not have.</p>
    <p>In linguistics we have a term for this feature set of a language, its <b>linguistic typology</b>. We’ll get back to that <a href="#typology">later</a>, but for now let’s make peace with knowing that though transfer learning for machine translation is theoretically straightforward, an understanding of linguistics tells us otherwise.</p>
    
    <h3>Prior Mauritian Creole Language Models</h3>
    <p>Contemporary efforts have been made to fine-tune language models for Mauritian Creole. Most prominently, Dabre and Sukhoo (2022) created the open-weight KreolMorisienMT models and released their datasets publicly so that others could further their work. The dataset is still limited, and heavily reliant on biblical texts and dictionary entries over more quotidian phrases, but it established that transfer learning for Mauritian Creole was possible.</p>
    <p>The work has since been carried forward. Robinson et al. (2024) attempted to address the data limitations for Mauritian Creole and many other languages by fine-tuning a massive multilingual model on a combined dataset of 41 different Creoles. Results were mostly successful, but there was a lot of variance in quality across such a large set of languages. Rajcoomar (2025) returned to the narrower scope of developing a model specifically for Mauritian Creole, and developed a fine-tuned model under a pipeline that much more closely influenced my own (though it also involved considerable pretraining steps that I did not investigate myself). These models produced some of the strongest results.</p>
    
    <h2 id="results">Results</h2>
    <p>A total of six models (four fine-tuned, two base) were evaluated using the two leading machine translation metrics – BLEU (Papineni, 2002) and chrF++ (Popovic, 2017) – to provide a quantitative result for their improved translation quality. Figure 1 below illustrates the chrF++ results, while BLEU results can be found on the Kestrel repository on <a href="https://github.com/felixreverett/kestrel" target="_blank">GitHub</a>.</p>
    <ChrfBarChart />
    <p>There are three significant facets that stand out from these results.</p>
    
    <h3>Low-Resource Transfer Learning is Effective</h3>
    <p>Firstly, transfer learning clearly works for low-resource machine learning. Versus the zero-shot base Granite 4.1 models, the fine-tuned models improved by up to 2.85x, and all of this was achieved on a single 12 GB consumer-grade GPU.</p>
    
    <h3>Low-Resource Machine Translation Exhibits Bidirectional Asymmetry</h3>
    <p>Secondly, improvements versus the base models were notably stronger for generating translations <i>into</i> Mauritian Creole, a concept known as bidirectional asymmetry. The Kestrel models were able to acquire a significant understanding of Mauritian Creole despite being limited to a dataset of only several thousand words and phrases.</p>
    
    <h3>The English Models Outperformed the French Models</h3>
    <p>Thirdly, the English models performed better than their French counterparts. Even though Mauritian Creole is French-lexified (it has a large part of its vocabulary derived directly from French), it is possible that the English-Mauritian Creole dataset, which contains fewer one-word dictionary entries and more sample sentences, contributed to this result.</p>
    
    <h2>What would I have done differently</h2>
    <p>In the closing thoughts of my thesis, I wrote that I had initially sought to extend the Kestrel models into a distributable command-line interface. Constrained by limited time, I did – fleetingly – endeavour to create a standalone executable, but I was unable to bring it under the 2 GB limit of the Llama.cpp tooling, and it was much more important to me to focus on the proof-of-concept of my paper than to refine this final distribution step. I forfeited flashiness for furthering theory.</p>
    <p>I reason that, although the dedicated CLI would facilitate the usage of the models by third parties, ultimately what would benefit speakers the most would be to extend the research into Mauritian Creole machine translation in several key areas. It is these areas that I would focus on, were I to have had more time.</p>
    
    <h3>A Dedicated Tokeniser</h3>
    <p>Towards the end of my literature review, I became acutely aware of tokenisation and the benefits this could have on the quality of a fine-tuned translation model.</p>
    <p><b>Tokenisation</b> describes the process of breaking up an input text into segments of meaning. In linguistics, we might consider this equivalent to the domain of <b>Morphology</b> where each unit of meaning is known as a <b>morpheme</b>.</p>
    <p>While ‘tokens’ can be more-or-less the same as morphemes, they by no means correspond identically. Tokenisation focuses on identifying the n-most frequent segments of text in a given corpus, and these are often single words. Semantically-speaking, this does make sense. For a word like ‘breakfast’, it is reasonable to tokenise it into a single part, rather than divide it into its constituent parts ‘break’ and ‘fast’, whence it derives. For a word like ‘ebike’, on the other hand, it could make sense to tokenise this either as a single component, or as two: ‘e-’ is commonly prepended to words to describe an electric variation, and an ebike is still a bike.</p>
    <p>Unfortunately, I have not personally dived much into the connection between linguistic morphology and machine learning tokenisation, so I will leave this anecdote for another day. I would be interested to see if there is a relationship between tokenisation and free/bound morphemes… one for the linguists out there?</p>
    <p>Adding a dedicated tokeniser for Mauritian Creole could help the model in two ways. Firstly, there is a chance that a dedicated tokeniser could greatly improve the final translation quality. A fine-tuned model with a custom tokeniser would have a stronger understanding of Mauritian Creole words, and even a subset of just 1,000 additional tokens would already cover the majority of words used in the language (thanks to <a href="https://en.wikipedia.org/wiki/Zipf%27s_law" target="_blank">Zipf’s Law</a>).</p>
    <p>Secondly, a dedicated tokeniser could significantly lower the cost of using a model, both in terms of compute time and compute amount. A tokeniser optimised for Mauritian Creole, English, and French could produce results that are stronger and more economical.</p>
    <p>And you know what? <b>I actually went and did this</b>! I trained the Kestrel models on my own hardware, and I still have that hardware. So, following my thesis, I sat down for a week, tweaked my scripts to build and use a custom tokeniser, and supervised my GPU as it pulled twelve-hour shifts to train four new models. At some point I will share what happened.</p>
    
    <h3>Synthetic Data</h3>
    <p>Naturally, the biggest constraint with low-resource fine-tuning is the lack of usable datasets. Some prior research went around this by combining datasets from other Creole languages, but this didn’t feel like the right solution. I want to see a world where <b>someday we can build models for low-resource languages without any neighbours at all</b>, and this doesn’t step in that direction.</p>
    <p>One intriguing option was to generate synthetic data. I do not know much of this process – that’s why I didn’t investigate it – but if large language models are truly dependent on data, then this might be the only way forward.</p>
    
    <h3>Training Other Models</h3>
    <p>Had I had more time, I would also have wanted to experiment with training other models and parameter sizes. Because the experiment only measured two sizes, I couldn’t pinpoint with statistical confidence at which point performance truly plateaus or drops off. Testing sub-3B architectures could reveal whether Mauritian Creole translation could run natively even on low-end smartphones.</p>
    <p>Beyond scale, running the exact same QLoRA pipeline across alternative open-weight models, such as Llama, Qwen, or Gemma, could help isolate how much of Kestrel’s behaviour was dependent on Granite’s pre-training corpus.</p>
    
    <h3 id="typology">Machine Translation and Linguistic Typology</h3>
    <p>More than any of the above, I would love to have had the opportunity to jump much deeper into the intersection between linguistics and machine learning.</p>
    <p><b>Linguistic typology</b> is the classification of languages according to their structural and grammatical features rather than their genealogy (the languages which they are related to). Back when I studied it at university, it was the perfect medium through which to learn about how the world’s languages take different approaches to communication – approaches including everything from <a href="https://en.wikipedia.org/wiki/Morphosyntactic_alignment" target="_blank">subject alignment</a> to <a href="https://en.wikipedia.org/wiki/Prosody_(linguistics)" target="_blank">tone and suprasegmentals</a> to <a href="https://en.wikipedia.org/wiki/Reduplication" target="_blank">reduplication</a>.</p>
    <p>To me, this ties in perfectly with transfer learning. Surely fine-tuning a model to a language with a near-identical feature set to the source language would produce better results than fine-tuning for a language rich in typological outliers. The most immediate of these that springs to mind is <b>reduplication</b>, which I know to exist in Mauritian Creole, but not in English.</p>
    
    <h2>Closing Thoughts</h2>
    <figure class="image-wrapper">
			<img src="/images/mauritius-kestrel.jpg" alt="A pixellated Mauritius Kestrel.">
		</figure>

    <p>Undergoing this project was personally transformative. I had never felt too energetic about AI: the loudest voices in the industry have seldom come without an agenda; personal projects I toiled countless hours over no longer seem significant; and the joy of problem-solving through code is a thing of the past.</p>
    <p>But AI research was different. I wasn’t using AI because of the flashy label, but because it really was the best tool for the job.</p>
    <p>What’s more, this thesis brought me face-to-face with computational linguistics. I mean, can you even imagine anything more apt for someone such as myself?</p>
    <p>And I wasn’t alone. The guidance from my supervisors, professors Dean Mohamedally and Ajit Jaokar, and personal tutor professor Jens Krinke, really proved that all you need is someone cheering you on and you will find the resilience to do the rest. The merit of support must never be overlooked.</p>
    <p>Named after the Mauritius Kestrel – a bird whose wild population once dwindled down to only four individuals in the wild – the <b>Kestrel</b> models showed me what happens when computer science and linguistics work in tandem. By combining modern decoder-only architectures and optimisation strategies, I was able to develop a capable Mauritian Creole translator that can be deployed on everyday devices.</p>
    <p>Were you to have told me even five years ago that this is where I’d be today, I’d have been in disbelief.</p>
    <p>And yet, despite my doubts in this four-year journey from modern languages into computer science, I decided to begin anyway, and see it through no matter what.</p>
    
    <cite class="blog-sign-off">Felix R. Everett, MSc, October 2026</cite>
	</section>

  <section class="citations-section">
    <h2>Citations</h2>
    <p>Dabre, Raj and Aneerav Sukhoo (Nov. 2022). “KreolMorisienMT: A Dataset for Mauritian Creole Machine Translation”. In: <i>Findings of the Association for Computational Linguistics: AACL-IJCNLP 2022.</i> Ed. by Yulan He et al.</p>
    <p>Eberhard, David M., Gary F. Simons, and Charles D. Fennig, eds. (2025). <i>Ethnologue: Languages of the World.</i> 28th. Dallas, Texas: SIL International.</p>
    <p>Everett, Felix R. (2026) (Me) <i>Technical Democratisation of AI for Low-Resource Languages: Fine-Tuning LLMs for Mauritian Creole.</i> [Unpublished master’s thesis]. University College London.</p>
    <p>Rajcoomar, Yush (Nov. 2025). “KozKreolMRU WMT 2025 CreoleMT System Description: Koz Kreol: Multi-Stage Training for English–Mauritian Creole MT”. In: <i>Proceedings of the Tenth Conference on Machine Translation.</i> Ed. by Barry Haddow et al. Suzhou, China: Association for Computational Linguistics, pp. 1183– 1190. </p>
    <p><i>Mauritius kestrel image adapted from Wikicommons and used under the Creative Commons licence.</i></p>
  </section>
</div>

<script>

  import ChrfBarChart from './ChrfBarChart.svelte';

	function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
</script>