<!-- src/lib/components/Lightbox.svelte -->
<script lang="ts">
  import { fade, fly } from "svelte/transition";

  export let open = false;
  export let src = "";
  export let onClose: () => void;

  function close() {
    onClose?.();
  }
</script>

{#if open}
  <div class="overlay" on:click={close} transition:fade>
    <div class="modal" on:click|stopPropagation transition:fly={{ y: 18, duration: 180 }}>
      <img class="img" src={src} alt="memory" />
      <button class="x" on:click={close} aria-label="close">✕</button>
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

    /* ✅ 안전영역 + 여백 */
    padding: calc(18px + env(safe-area-inset-top, 0px))
             calc(18px + env(safe-area-inset-right, 0px))
             calc(18px + env(safe-area-inset-bottom, 0px))
             calc(18px + env(safe-area-inset-left, 0px));

    z-index: 9999;
  }

  .modal{
    width: min(920px, 100%);

    /* ✅ 뷰포트 높이 초과 방지 */
    max-height: calc(100dvh - 36px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));

    border-radius: 22px;
    overflow: hidden; /* 이미지가 모달 밖으로 나가지 않게 */
    background: rgba(20,18,30,0.35);
    border: 1px solid rgba(255,255,255,0.16);
    box-shadow: 0 30px 90px rgba(0,0,0,0.35);
    position: relative;

    /* ✅ 내부 컨텐츠(이미지)가 넘치면 스크롤 */
    display: grid;
  }

  .img{
    /* ✅ 가로는 모달 폭에 맞추고 */
    width: 100%;
    /* ✅ 세로는 모달 높이 안에서만 */
    max-height: calc(100dvh - 36px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
    height: auto;

    /* ✅ 원본 비율 유지하면서 "안에 맞춤" */
    object-fit: contain;

    display: block;
    background: rgba(0,0,0,0.15);
  }

  .x{
    position: absolute;
    top: 10px; right: 10px;
    height: 40px; width: 40px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(0,0,0,0.28);
    color: white;
    cursor: pointer;
    backdrop-filter: blur(8px);
  }
</style>
