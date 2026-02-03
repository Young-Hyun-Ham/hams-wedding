<!-- src/lib/components/Gallery.svelte -->
<script lang="ts">
  import Lightbox from "./Lightbox.svelte";

  export let photos: string[] = [];

  let open = false;
  let active = "";

  function view(src: string) {
    active = src;
    open = true;
    document.body.style.overflow = "hidden"; // 모바일 스크롤 잠금(캡acitor에서도 유용)
  }
  function close() {
    open = false;
    document.body.style.overflow = "";
  }
</script>

<div class="grid">
  {#each photos as p, idx (p + idx)}
    <button class="ph card" on:click={() => view(p)} aria-label="open photo">
      <img src={p} alt="memory photo" loading="lazy" />
      <div class="shine" />
    </button>
  {/each}
</div>

<Lightbox open={open} src={active} onClose={close} />

<style>
  .grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  @media (min-width: 391px){
    .grid{ grid-template-columns: repeat(3, 1fr); }
  }
  @media (min-width: 769px){
    .grid{ grid-template-columns: repeat(4, 1fr); gap: 14px; }
  }
  .ph{
    padding: 0;
    overflow: hidden;
    border: none;
    cursor: pointer;
    position: relative;
  }
  img{
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    transform: scale(1.02);
    transition: transform .18s ease;
  }
  .ph:hover img{ transform: scale(1.06); }
  .shine{
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.00), rgba(255,255,255,0.18));
    opacity: .55;
    pointer-events: none;
  }
</style>
