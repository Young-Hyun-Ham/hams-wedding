<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { goto } from "$app/navigation";

  let countdown = 0;
  let timer: ReturnType<typeof setInterval> | null = null;

  function clear() {
    if (timer) clearInterval(timer);
    timer = null;
    countdown = 0;
  }

  function begin(thenRun: () => void) {
    clear();
    countdown = 3;

    timer = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clear();
        thenRun();
      }
    }, 1000);
  }

  onMount(() => {
    begin(() => goto("/7th"));
  });

  onDestroy(() => clear());
</script>


{#if countdown > 0}
  <div class="countdown-overlay" aria-live="polite">
    <div class="countdown-center">
      <div class="countdown-ready">READY</div>
      <div class="countdown-num">{countdown}</div>
      <div class="countdown-sub">곧 시작합니다</div>
    </div>
  </div>
{/if}