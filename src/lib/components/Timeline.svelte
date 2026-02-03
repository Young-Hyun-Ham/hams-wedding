<!-- src/lib/components/Timeline.svelte -->
<script lang="ts">
  import type { MemoryEvent } from "$lib/data/memories";
  export let items: MemoryEvent[] = [];
</script>

<div class="timeline">
  {#each items as it (it.id)}
    <article class="item card">
      <div class="thumb">
        <img src={it.image} alt={it.title} loading="lazy" />
        <div class="grad" />
        <div class="date">{it.date}</div>
      </div>

      <div class="body">
        <div class="title">{it.title}</div>
        {#if it.subtitle}
          <div class="sub">{it.subtitle}</div>
        {/if}
      </div>
    </article>
  {/each}
</div>

<style>
  .timeline{
    display: grid;
    gap: 14px;
  }
  @media (min-width: 769px){
    .timeline{
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  }
  .item{
    overflow: hidden;
  }
  .thumb{
    position: relative;
    aspect-ratio: 16/10;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.02);
  }
  .grad{
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55));
    pointer-events: none;
  }
  .date{
    position: absolute;
    left: 14px; bottom: 12px;
    font-size: 12px;
    color: rgba(255,255,255,0.92);
    padding: 8px 10px;
    border-radius: 999px;
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.18);
    backdrop-filter: blur(8px);
  }
  .body{
    padding: 14px 16px 16px;
  }
  .title{
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .sub{
    margin-top: 6px;
    color: var(--muted);
    line-height: 1.55;
    font-size: 14px;
  }
</style>
