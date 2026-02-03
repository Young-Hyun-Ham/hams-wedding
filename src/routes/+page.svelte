<!-- src/routes/+page.ts -->
<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => {
    goto("/7th");
  });
</script>
<!-- <h1>Welcome to SvelteKit</h1> -->

