<script>
  let count = 0;

  function add() {
    count += 1;
  }

  function subtract() {
    count -= 1;
  }
</script>

<div class="container p-4 border-[3px] border-gray-300 rounded-xl">
    <h1>Svelte Counter</h1>
    <div class="counter">
        <button on:click={subtract}>-</button>
        <pre>{count}</pre>
        <button on:click={add}>+</button>
    </div>
</div>