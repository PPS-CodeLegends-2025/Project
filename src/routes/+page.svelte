<script lang="ts">
    let count = $state(0);
    let array : Array<number> = $state([]);

    function increment() {
        count += 1;
        array.push(count);
    }
</script>

<p>
    Counter: {count}
</p>

<p>
    Array: {JSON.stringify(array)}
</p>

<button onclick={increment}>
    Increment
</button>

<style>
    p {
        color: red;
    }

    button {
        background-color: blue;
        color: white;
    }
</style>
