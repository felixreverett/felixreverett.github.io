<svelte:head>
    <title>Sprite Batching in Graphics Programming | felixreverett</title>
    <meta name="description" content="Why is sprite batching used in graphics programming and game development? And what can it teach us about writing good code?" />
</svelte:head>

<div class="page-wrapper">
	<div class="hero-section">
		<h1>Why We Use Sprite Batching in Graphics Programming</h1>
		<figure class="image-wrapper">
			<img src="/images/sprite-batching-l.jpg" alt="A pixel art of warehouse boxes as an analogy to sprite batching.">
		</figure>
	</div>

	<section class="content-section">
		<p>There might be nothing more formative for learning to code than <b>game development</b>.</p>
		<p>Whether it's through building healthy practices driven by the need to write performant functions, or it’s via learning the principals of object-oriented programming to design intricate class hierarchies, game development is a crash course in it all.</p>
		<p>Today I’m covering the process of adding <b>sprite batching</b> to the rendering pipeline of my game engine, how we use it to optimise performance in graphics programming, and what it can teach us about design principles applicable across the wider coding world.</p>
		<h2>What’s Happened So Far in Isola?</h2>
		<p>This is my first devlog for Isola, so while I slowly work on backdating the various milestones of this project, let me set the scene for where we are at this point in time.</p>
		<p>Currently, Isola has <b>procedural world generation</b>, supports the <b>loading and saving of chunks and entities</b>, and has a <b>dynamic UI</b> and a <b>working inventory</b> with items. There is not currently much content (I’m calling it an engine for a reason) and there’s a primary focus on implementing functionality over feature. In terms of rendering, several parts of the game are drawable, including the tiles of the world, and anything inheriting the Entity and UI base classes. All drawable components of the game manage their own GPU draw calls, with repeated code used to set the vertices and buffers sent to the GPU.</p>
		<h2>How Does Sprite Batching Work?</h2>
		<p>The primary purpose of sprite batching is to optimise performance, and there are two factors integral to understanding it.</p>
		<p>The first factor is <b>conceptualising the architecture of the GPU</b> itself. While the CPU and GPU are both powerhouses in their own rights, transmitting data between them will always cause delay. The more state changes required per frame, the more time it’ll take to fully process everything, and finding ways to minimise these bottlenecks is a cornerstone of graphics programming. Sprite batching, which groups a high number of small data transmissions into a significantly lower number of large ones, is one such solution.</p>
		<p>The CPU and GPU are engineered for two different types of processing: serial and parallel. Where the CPU excels in processing many large calculations one at a time, the GPU can handle many smaller calculations simultaneously, using its thousands of cores to work in parallel. It’s perfect for the matrix multiplication processes that transform vertex data (world space) into pixels on the screen (screen space).</p>
		<p>The second factor is the <b>texture unit</b>. When a GPU draws a texture onto the screen, it must sample that texture from one of its active texture units. Most modern GPUs can only bind 16 or 32 active texture units at a time, and changing these active bindings is operationally expensive, so rendering thousands of individual textures per frame creates significant overhead. Fortunately, since each texture can be very large, the solution is to instead include many individual textures together in a <b>texture atlas</b>, and provide the shader program with the specific UV coordinates on that atlas to get the required texture. This is known as <b>sampling</b>.</p>
		<p>By combining the data for a large number of sprites into a single larger buffer, we can render them all with a single draw call, dramatically reducing CPU overhead and leading to significant performance gains. This is the power of sprite batching.</p>

		<h2>Adding Batching to Isola</h2>
		<p>Batching can be implemented across any drawable class, but the clear candidate to try first is the world itself. Because every chunk consists of precisely 16 by 16 tiles, all that’s required for sprite batching is to add all the tile vertices to a buffer, and then send this buffered data to the GPU once it hits exactly 256 items. Chunks will always draw their 256 tiles, so we can be certain that there will never be any incomplete batches left to draw at the end of the frame. On this, programming a solution for irregular batch sizes is not difficult to implement, but we can shave off some development time by ignoring it for now.</p>
		<h3>Drawing One-By-One</h3>
		<p>At the codebase’s current state, the WorldManager class contains all the methods and data structures for drawing its world tiles.</p>
		<pre><code class="language-csharp">{@html escapeHtml(codeSnippet1)}</code></pre>

		<p>Several fields are defined explicitly in the <b>WorldManager.cs</b> class, such as the arrays <b>_vertices</b> and <b>_indices</b>, which define default tile vertex data, and the <b>VertexBuffer</b>, <b>VertexArray</b>, and <b>IndexBuffer</b> objects, which serve as boilerplate code to prepare draw instructions. A <b>TextureAtlas</b> is also included as a property, initialised to use the “Tile Atlas” texture in the <b>OnLoad()</b> method.</p>
		<p>Drawing of the tiles is the responsibility of the DrawChunks() method:</p>
		<pre><code class="language-csharp">{@html escapeHtml(codeSnippet2)}</code></pre>

		<p>For every tile of each loaded chunk, values are calculated for its position in <b>world space</b>, then separate values are calculated for each tile’s texture coordinates. This is sent to the GPU per tile by <b>GL.DrawElements()</b>.</p>
		<h3>Delegating Rendering To SpriteBatch.cs</h3>
		<p>The first step I took to change this implementation was to delegate the rendering code and OpenGL calls from <b>WorldManager.cs</b> to a new class, <b>SpriteBatch.cs</b>. All rendering fields and properties, including the texture atlas and the set of boilerplate vertex definitions, are moved across to the new object, and WorldManager.cs is given its own SpriteBatch instance. For improved consistency, the interface IDrawable is also added to WorldManager to syntactically enforce a Draw() method implementation.</p>
		<p>The <b>DrawChunks()</b> method is now a little more intuitive, but there is still only one draw call per tile, which needs to be addressed.</p>
		<pre><code class="language-csharp">{@html escapeHtml(codeSnippet3)}</code></pre>

		<h3>A Programmer’s Dozen</h3>
		<p>With the framework in place to implement batching, the next step is to make it possible to send multiple instructions in a single draw call.</p>
		<p>Firstly and foremost, the SpriteBatch’s vertex buffer needs to be able to send more than a single <b>quad</b> at a time. Because we need to specify the size and type of data being sent to the GPU, we add a set of fields - <b>MaxQuads</b>, <b>MaxVertices</b>, and <b>MaxIndices</b> - to predetermine the sizes of _vertices and _indices according to our needs. I arbitrarily set 256 as the maximum number of quads to send in a batch, but there’s no reason why this couldn’t be increased at a later date.</p>
		<pre><code class="language-csharp">{@html escapeHtml(codeSnippet4)}</code></pre>

		<p>Next, I add three methods, <b>StartBatch()</b>, <b>EndBatch()</b>, and <b>AddQuadToBatch(Box2, TexCoords)</b>, to make it possible to add quads to the buffer without immediately sending them to the graphics card. <b>StartBatch()</b> and <b>EndBatch()</b> are effectively ‘bookends’, which I use to reset and flush the data to the GPU in each draw call.</p>
		<pre><code class="language-csharp">{@html escapeHtml(codeSnippet5)}</code></pre>

		<p><b>AddQuadToBatch()</b>, meanwhile, is the more important of the three. The method accepts positional and texture vertex data for quads, which it adds to the current batch, <b>flushing</b> the batch when it reaches the maximum capacity.</p>
		<pre><code class="language-csharp">{@html escapeHtml(codeSnippet6)}</code></pre>

		<p>Finally, <b>WorldManager.cs</b> itself needs to be updated to use SpriteBatch’s new methods. <b>DrawChunks()</b> is changed to call <b>StartBatch()</b> and <b>EndBatch()</b> and the end of each chunk, and what were previously individual draw calls are now executions of <b>AddQuadToBatch()</b>.</p>
		<p>Et voilà. Sprite batching has been added.</p>
		<pre><code class="language-csharp">{@html escapeHtml(codeSnippet7)}</code></pre>
		<h2>The Results</h2>
		<p>With basic sprite batching implemented in Isola, can we see if it saves any time? Let’s look at the data.</p>
		<p>Before adding sprite batching, a render distance of two chunks from the player would require 6,400 draw calls per frame for the world. Raising this to ten chunks (while beyond the limits of what is visible on the screen) brings that number up to a shocking 112,000. In terms of performance, the specific test environment went from 2.5ms/frame all the way to 100ms/frame - or only 10 frames per second!</p>
		<table>
				<thead><tr>
					<th>Render distance</th>
					<th class="align-right">Chunks</th>
					<th class="align-right">Draw calls</th>
					<th class="align-right">ms/frame</th>
				</tr></thead>
				<tbody>
					<tr>
						<td>2</td>
						<td class="align-right">25</td>
						<td class="align-right">6,400</td>
						<td class="align-right">2.5</td>
					</tr>
					<tr>
						<td>5</td>
						<td class="align-right">121</td>
						<td class="align-right">30,976</td>
						<td class="align-right">12.0</td>
					</tr>
					<tr>
						<td>10</td>
						<td class="align-right">441</td>
						<td class="align-right">112,896</td>
						<td class="align-right">100.0</td>
					</tr>
				</tbody>
			</table>
		<p>Now with sprite batching added. At the lowest render distance of 2 chunks, there are now only 25 draw calls at 0.6ms/frame - a performance boost of more than 4x. Increasing the render distance to 10 chunks, there are now only 441 draw calls at 11ms/frame, a staggering 9x performance improvement!</p>
		<table>
				<thead><tr>
					<th>Render distance</th>
					<th class="align-right">Chunks</th>
					<th class="align-right">Draw calls</th>
					<th class="align-right">ms/frame</th>
				</tr></thead>
				<tbody>
					<tr>
						<td>2</td>
						<td class="align-right">25</td>
						<td class="align-right">25</td>
						<td class="align-right">0.6</td>
					</tr>
					<tr>
						<td>5</td>
						<td class="align-right">121</td>
						<td class="align-right">121</td>
						<td class="align-right">3.1</td>
					</tr>
					<tr>
						<td>10</td>
						<td class="align-right">441</td>
						<td class="align-right">441</td>
						<td class="align-right">11.0</td>
					</tr>
				</tbody>
			</table>
		<h2>The Bigger Picture</h2>
		<p>But what does this say more broadly? Sprite batching is a prime example of designing for computational efficiency, where code is optimised for time or space complexity. Even in a simple program like Isola, for which modern hardware is sufficient enough to run the game without optimisations, <b>coding with efficiency in mind</b> builds a program that is robust, scalable, and futureproof, and trains a passionate, detail-oriented, and methodical mindset.</p>
		<p>In some sense, <b>game development</b> has, since its very inception, tested the upper limits of computing. While many applications can tolerate small delays and some overhead, a game must render complete complex scenes dozens of times a second. The top titles in gaming simply cannot afford to take computational liberties; every frame counts.</p>
		<p>But finding optimisations for your codebase is not just beneficial for performance - it can help identify more theoretical improvements, too. Implementing sprite batching in Isola highlighted several unexplored inefficiencies to refine:</p>

		<h2>Future Improvements</h2>
		<p>Right now there’s still plenty more to do to improve Isola’s rendering engine.</p>
		<p>First of all, and perhaps the most obvious area of improvement, is the need to add sprite batching to the other drawable game objects, such as entities and the UI hierarchy. Unlike chunk tiles, these elements won’t fit neatly into batches of 256, and some simple checks will be needed to guarantee that no <b>drawables</b> are left behind at the end of each frame.</p>
		<p>Next, the sprite batch and texture atlas classes could be combined. As it stands, all <b>SpriteBatch</b> objects reference a <b>TextureAtlas</b>, but if all objects drawing from a texture atlas will also use a sprite batch, then the two classes could be merged. <b>TextureAtlas.cs</b> only contains four properties and could easily be refactored:</p>

		<pre><code class="language-csharp">{@html escapeHtml(codeSnippet8)}</code></pre>
		<p>Thirdly, the codebase is currently configured to create a new <b>SpriteBatch</b> instance as a property of each class that uses it. While there will only ever be a single WorldManager instance at runtime, once entities use sprite batches, this will needlessly create hundreds of instances. Instead, only one sprite batch should exist per texture atlas and should be loaded at game initialisation, and all <b>drawables</b> should be initialised with a reference to their relevant sprite batch.</p>
		<p>Lastly, while entities and the player both belong to the Entity base class, they do not use the same texture atlas, meaning their draw calls cannot be batched together. All game entities are sorted every frame by vertical screen position to simulate depth, so for entities to be batched together while still preserving “depth”, they must be moved to a single atlas. The simplest solution is to merge all entities into the same batch.</p>
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
`private readonly float[] _vertices =
{   //Vertices        //texCoords //texColors
	1.0f, 1.0f, 0.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, //top right (1,1)
	1.0f, 0.0f, 0.0f, 1.0f, 0.0f, 1.0f, 1.0f, 1.0f, //bottom right (1, 0)
	0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, 1.0f, 1.0f, //bottom left (0, 0)
	0.0f, 1.0f, 0.0f, 0.0f, 1.0f, 1.0f, 1.0f, 1.0f  //top left (0, 1)
};

private uint[] _indices =
{
	0, 1, 3, // first triangle
	1, 2, 3  // second triangle
};

private VertexBuffer _vertexBuffer;
private VertexArray _vertexArray;
private IndexBuffer _indexBuffer;
private IndexedTextureAtlas WorldTextureAtlas { get; set; }`;

let codeSnippet2 =
`private void DrawChunks()
{
	foreach (Chunk loadedChunk in LoadedChunks.Values)
	{
		for (int y = 0; y < 16; y++)
		{
			for (int x = 0; x < 16; x++)
			{
				_vertices[0]  = loadedChunk.ChunkPosX * 16 + x + 1; _vertices[1]  = loadedChunk.ChunkPosY * 16 + y + 1; // top right (1, 1)
				_vertices[8]  = loadedChunk.ChunkPosX * 16 + x + 1; _vertices[9]  = loadedChunk.ChunkPosY * 16 + y;     // bottom right (1, 0)
				_vertices[16] = loadedChunk.ChunkPosX * 16 + x;     _vertices[17] = loadedChunk.ChunkPosY * 16 + y;     // bottom left (0, 0)
				_vertices[24] = loadedChunk.ChunkPosX * 16 + x;     _vertices[25] = loadedChunk.ChunkPosY * 16 + y + 1; // top left (0, 1)
				
				ChunkTile currentTile = loadedChunk.GetTile(x, y);
				TexCoords texCoords = AssetLibrary.TileList.Where(t => t.TileID == currentTile.TileID).FirstOrDefault().TexCoords;
				
				_vertices[3] = texCoords.MaxX; _vertices[4] = texCoords.MaxY;   // (1, 1)
				_vertices[11] = texCoords.MaxX; _vertices[12] = texCoords.MinY; // (1, 0)
				_vertices[19] = texCoords.MinX; _vertices[20] = texCoords.MinY; // (0, 0)
				_vertices[27] = texCoords.MinX; _vertices[28] = texCoords.MaxY; // (0, 1)

				GL.BufferSubData(BufferTarget.ArrayBuffer, 0, sizeof(float) * _vertices.Length, _vertices);
				GL.DrawElements(PrimitiveType.Triangles, _indices.Length, DrawElementsType.UnsignedInt, 0); // Used for drawing Elements
			}
		}
	}
}
`;

let codeSnippet3 =
`public class WorldManager : IDrawable
{
	// ...
	public SpriteBatch batch { get; private set; }

	public WorldManager(int seed, GameConfig config)
	{
		// ...
		batch = new SpriteBatch("Tile Atlas");
	}

	private void DrawChunks()
	{
		foreach (Chunk loadedChunk in LoadedChunks.Values)
		{
			for (int y = 0; y < 16; y++)
			{
				for (int x = 0; x < 16; x++)
				{
					Box2 rect = new Box2(loadedChunk.ChunkPosX * 16 + x, loadedChunk.ChunkPosY * 16 + y, loadedChunk.ChunkPosX * 16 + x + 1, loadedChunk.ChunkPosY * 16 + y + 1);
					
					TexCoords texCoords = AssetLibrary.TileList.Where(t => t.TileID == loadedChunk.GetTile(x, y).TileID).FirstOrDefault().TexCoords;

					batch.DrawQuad(rect, texCoords);
				}
			}
		}
	}
`;

let codeSnippet4 =
`public class SpriteBatch
{
	private const int MaxQuads = 256;
	private const int MaxVertices = MaxQuads * 4;
	private const int MaxIndices = MaxQuads * 6;

	private float[] _vertices;
	private uint[] _indices;
	private int _vertexCount;
	private int _indexCount;
	private int _quadCount;

	private float _zDepthLayer;

	private VertexBuffer _vertexBuffer;
	private VertexArray _vertexArray;
	private IndexBuffer _indexBuffer;
	private TextureAtlas _textureAtlas;

	public SpriteBatch(string textureAtlas)
	{
		// field instantiation and layouting managed here
	}
	// ...
}`;

let codeSnippet5 =
`public void StartBatch()
{
	_quadCount = 0;
	_vertexCount = 0;
	_indexCount = 0;
}

public void EndBatch()
{
	_textureAtlas.Texture.Use();
	_vertexArray.Bind();
	_vertexBuffer.Bind();
	GL.BufferSubData(BufferTarget.ArrayBuffer, 0, _vertexCount * sizeof(float), _vertices);
	_indexBuffer.Bind();
	GL.DrawElements(PrimitiveType.Triangles, _indexCount, DrawElementsType.UnsignedInt, 0);
}
`;

let codeSnippet6 =
`public void AddQuadToBatch(Box2 rect, TexCoords texCoords)
{
	if (_quadCount >= MaxQuads)
	{
		EndBatch();
		StartBatch();
	}

	float zDepth = _zDepthLayer;

	// All 32 vertices per quad are set here

	_vertexCount += 32; // 8 floats per vertex * 4 vertices
	_indexCount += 6; // 6 indices per quad
	_quadCount++;
}
`;

let codeSnippet7 =
`private void DrawChunks()
{
	foreach (Chunk loadedChunk in LoadedChunks.Values)
	{
		batch.StartBatch();

		for (int y = 0; y < 16; y++)
		{
			for (int x = 0; x < 16; x++)
			{
				Box2 rect = new Box2(loadedChunk.ChunkPosX * 16 + x, loadedChunk.ChunkPosY * 16 + y, loadedChunk.ChunkPosX * 16 + x + 1, loadedChunk.ChunkPosY * 16 + y + 1);
				
				TexCoords texCoords = AssetLibrary.TileList.Where(t => t.TileID == loadedChunk.GetTile(x, y).TileID).FirstOrDefault().TexCoords;

				batch.AddQuadToBatch(rect, texCoords);
			}
		}

		batch.EndBatch();
	}
}
`

let codeSnippet8 =
`public class TextureAtlas
{
	public int AtlasSize { get; private set; }
	protected float Offset { get; private set; }
	protected bool UseOffset { get; private set; }
	public Texture2D Texture { get; private set; }

	public TextureAtlas(int atlasSize, string atlasName, int textureUnit, bool useOffset = false)
	{
		AtlasSize = atlasSize;
					
		Offset = 0.2f / (AtlasSize * 2);
		UseOffset = useOffset;

		Texture = ResourceManager.Instance.LoadTexture(atlasName, textureUnit);
	}
}`;
</script>