<!-- src/lib/components/LoveEventModal.svelte -->
<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";

  export type LoveEvent = {
    title: string;
    desc: string;
    tags?: string[];
    time?: string;
  };

  export let open = false;
  export let items: LoveEvent[] = [];
  export let onClose: () => void;

  let featured: LoveEvent | null = null;

  // 스크롤 락(SSR 안전)
  let prevOverflow = "";
  let mounted = false;

  function pickOne(list: LoveEvent[]) {
    if (!list?.length) return null;
    const i = Math.floor(Math.random() * list.length);
    return list[i];
  }

  function close() {
    onClose?.();
  }

  function onKeydown(e: KeyboardEvent) {
    if (!open) return;
    if (e.key === "Escape") close();
  }

  function refreshPick() {
    featured = pickOne(items);
  }

  // ✅ open/items 변화에 따른 처리(SSR 안전하게: mounted 이후만 DOM 접근)
  $: if (mounted) {
    if (open) {
      // 스크롤 락
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // 처음 열릴 때 pick 1회
      if (!featured) featured = pickOne(items);
    } else {
      // 닫힐 때 복구
      document.body.style.overflow = prevOverflow || "";
      featured = null;
    }
  }

  onMount(() => {
    mounted = true;
    window.addEventListener("keydown", onKeydown);

    // open 상태로 마운트되는 경우 대비
    if (open) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      featured = pickOne(items);
    }

    onDestroy(() => {
      window.removeEventListener("keydown", onKeydown);
      // 혹시 열린 상태에서 언마운트되면 복구
      document.body.style.overflow = prevOverflow || "";
    });
  });
</script>

{#if open}
  <div class="overlay" on:click={close} transition:fade>
    <div class="modal card" on:click|stopPropagation transition:fly={{ y: 18, duration: 180 }}>
      <div class="head">
        <div class="h">
          <div class="t">오늘의 기념일 이벤트 추천</div>
          <div class="sub">가볍게 바로 할 수 있는 것부터, 감동 코스까지 ❤️</div>
        </div>
        <button class="x" on:click={close} aria-label="close">✕</button>
      </div>

      {#if featured}
        <div class="featured">
          <div class="ftitle">✨ Pick</div>
          <div class="fcard">
            <div class="name">{featured.title}</div>
            <div class="desc">{featured.desc}</div>
            {#if featured.tags?.length}
              <div class="tags">
                {#each featured.tags as tg (tg)}
                  <span class="tag">#{tg}</span>
                {/each}
              </div>
            {/if}
            {#if featured.time}
              <div class="time">⏱ {featured.time}</div>
            {/if}
          </div>
        </div>
      {/if}
      <!--
      <div class="list">
        <div class="ltitle">전체 아이디어</div>
        <div class="grid">
          {#each items as it (it.title)}
            <article class="item">
              <div class="name">{it.title}</div>
              <div class="desc">{it.desc}</div>
              {#if it.tags?.length}
                <div class="tags">
                  {#each it.tags as tg (tg)}
                    <span class="tag">#{tg}</span>
                  {/each}
                </div>
              {/if}
              {#if it.time}
                <div class="time">⏱ {it.time}</div>
              {/if}
            </article>
          {/each}
        </div>
      </div> 
      -->

      <div class="foot">
        <!-- 
        <button class="btn primary" on:click={refreshPick}>
          다른 추천 보기
        </button> 
        -->
        <button class="btn" on:click={close}>닫기</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay{
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    display: grid;
    place-items: center;
    padding: 16px;
    z-index: 9999;
  }
  .modal{
    width: min(920px, 100%);
    max-height: min(78vh, 720px);
    overflow: hidden;
    border-radius: 24px;
    background: var(--panel2);
    border: 1px solid var(--ring);
    box-shadow: var(--shadow);
    display: grid;
    grid-template-rows: auto auto 1fr auto;
  }

  .head{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 14px 10px;
    border-bottom: 1px solid var(--ring);
  }
  .t{
    font-weight: 950;
    letter-spacing: -0.02em;
  }
  .sub{
    margin-top: 4px;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.35;
  }
  .x{
    height: 40px; width: 40px;
    border-radius: 999px;
    border: 1px solid var(--ring);
    background: rgba(255,255,255,0.18);
    cursor: pointer;
  }
  :root[data-theme="dark"] .x{ background: rgba(255,255,255,0.06); color: var(--text); }

  .featured{
    padding: 12px 14px;
    border-bottom: 1px solid var(--ring);
  }
  .ftitle{
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .fcard{
    border-radius: 18px;
    border: 1px solid var(--ring);
    background: linear-gradient(135deg, rgba(242,198,207,0.22), rgba(216,167,177,0.10));
    padding: 12px;
  }
  .name{ font-weight: 900; letter-spacing: -0.01em; }
  .desc{ margin-top: 6px; color: var(--muted); font-size: 13px; line-height: 1.55; }
  .tags{ margin-top: 8px; display: flex; flex-wrap: wrap; gap: 6px; }
  .tag{
    font-size: 11px;
    color: var(--muted);
    border: 1px solid var(--ring);
    background: rgba(255,255,255,0.22);
    padding: 6px 8px;
    border-radius: 999px;
  }
  :root[data-theme="dark"] .tag{ background: rgba(255,255,255,0.06); }
  .time{ margin-top: 8px; font-size: 12px; color: var(--muted); }

  .list{
    padding: 12px 14px 8px;
    overflow: auto;
  }
  .ltitle{
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 10px;
  }
  .grid{
    display: grid;
    gap: 10px;
  }
  @media (min-width: 769px){
    .grid{ grid-template-columns: 1fr 1fr; }
  }
  .item{
    border-radius: 18px;
    border: 1px solid var(--ring);
    background: rgba(255,255,255,0.22);
    padding: 12px;
  }
  :root[data-theme="dark"] .item{ background: rgba(255,255,255,0.06); }

  .foot{
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    padding: 12px 14px 14px;
    border-top: 1px solid var(--ring);
  }
</style>
