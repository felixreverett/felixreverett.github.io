<!-- ChrfBarChart.svelte -->
<script>
  const data = [
    { category: 'FR-KM', values: [17.00, 16.91, 34.67, 36.28] },
    { category: 'KM-FR', values: [18.78, 28.30, 34.24, 36.99] },
    { category: 'EN-KM', values: [12.62, 13.97, 35.97, 37.30] },
    { category: 'KM-EN', values: [20.52, 27.86, 42.73, 41.95] }
  ];

  const colors = ['#56B4E9', '#0072B2', '#E69F00', '#D55E00'];
  const labels = ['Granite 4.1-3B', 'Granite 4.1-8B', 'Kestrel 3B (en/fr)', 'Kestrel 8B (en/fr)'];

  const yMax = 50;
  const width = 800;
  const height = 450;
  const margin = { top: 40, right: 20, bottom: 80, left: 60 };
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const groupWidth = innerWidth / data.length;
  const barWidth = 32;
  const barGap = 4;
  const totalGroupBarWidth = (barWidth * 4) + (barGap * 3);
  const groupPadding = (groupWidth - totalGroupBarWidth) / 2;
  const yTicks = [0, 10, 20, 30, 40, 50];

  const legendWidth = 620;
  const legendX = margin.left + (innerWidth - legendWidth) / 2;
  const legendY = height - 20;

  // ================================================================
  // Animates when it enters viewport
  // ================================================================
  let visible = false; 

  function onEnterViewport(node) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        visible = true;
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    
    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }
  // ================================================================
</script>

<figure class="chart-container" use:onEnterViewport>
  <svg viewBox="0 0 {width} {height}" class="chart-svg" role="img"
    aria-label="A bar chart showing chrF++ translation scores for the Kestrel fine-tuned language models,
    separated by language and translation direction. The results are as follows, with the four values in each
    group representing the base Granite 4.1 models in 3B and 8B parameter sizes, then the Kestrel models in
    3B and 8B parameter sizes:
      1) French-to-Mauritian Creole: 17.0; 16.91; 34.67; 36.28.
      2) Mauritian Creole-to-French: 18.78; 28.30; 34.24; 36.99.
      3) English-to-Mauritian Creole: 12.62; 13.97; 35.97; 37.30.
      4) Mauritian Creole-to-English: 20.52; 27.86; 42.73; 41.95."
  >
    
    {#each yTicks as tick}
      {@const y = margin.top + innerHeight - (tick / yMax) * innerHeight}
      
      <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="var(--border-color)" stroke-dasharray="5,5" />
      <text x={margin.left - 10} y={y} text-anchor="end" alignment-baseline="middle" class="axis-label">{tick}</text>
    {/each}

    
    <text x={-(margin.top + innerHeight / 2)} y={20} transform="rotate(-90)" text-anchor="middle" class="axis-title">chrF++ Score</text>

    
    {#each data as group, i}
      {@const groupX = margin.left + i * groupWidth}
      <text x={groupX + groupWidth / 2} y={height - margin.bottom + 25} text-anchor="middle" class="axis-label">{group.category}</text>

      
      {#each group.values as val, j}
        {@const barHeight = (val / yMax) * innerHeight}
        {@const x = groupX + groupPadding + j * (barWidth + barGap)}
        {@const targetY = margin.top + innerHeight - barHeight}
        {@const startY = margin.top + innerHeight}
        
        <rect 
          {x} 
          y={visible ? targetY : startY} 
          width={barWidth} 
          height={visible ? barHeight : 0} 
          fill={colors[j]} 
          style="transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1) {i * 150 + j * 50}ms;"
        />
        
        <text 
          x={x + barWidth / 2} 
          y={visible ? targetY - 8 : startY} 
          text-anchor="middle" 
          class="bar-value"
          style="opacity: {visible ? 1 : 0}; transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1) {i * 150 + j * 50}ms;"
        >
          {val.toFixed(2)}
        </text>
      {/each}
    {/each}

    
    {#each labels as label, i}
      <rect x={legendX + i * 160} y={legendY - 10} width={12} height={12} fill={colors[i]} />
      <text x={legendX + i * 160 + 20} y={legendY} class="legend-text">{label}</text>
    {/each}
  </svg>
  
  <figcaption>Figure 1: chrF++ MT scores for all Kestrel models.</figcaption>
</figure>

<style>
  .chart-container { 
    width: 100%; 
    max-width: 800px; 
    margin: 2rem auto; 
    font-family: var(--font-sans-main); 
  }
  .chart-svg { 
    width: 100%; 
    height: auto; 
    display: block; 
  }
  .axis-label { 
    font-size: 14px; 
    fill: var(--text-secondary); 
    font-family: var(--font-mono); 
  }
  .axis-title { 
    font-size: 15px; 
    font-weight: 600; 
    fill: var(--fg-color); 
    font-family: var(--font-mono); 
  }
  .bar-value { 
    font-size: 12px; 
    fill: var(--text-secondary); 
    font-family: var(--font-mono); 
    transition: fill var(--transition-fast);
  }
  .legend-text { 
    font-size: 13px; 
    fill: var(--text-secondary); 
    font-family: var(--font-mono); 
  }
  .bar-value:hover { 
    fill: var(--an-color);
    font-weight: bold; 
    cursor: text; 
  }
  figcaption {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-family: var(--font-mono);
  }
</style>