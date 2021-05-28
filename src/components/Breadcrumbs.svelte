<script>
    export let path
</script>
<nav>
    <a href="/">Salona</a>
    <mark>·</mark>
    <a href="/Urbs">Urbs</a>
    {#if path.region}
    <mark>·</mark>
    <a href={ `/Urbs/${path.region}` }>{ path.region }</a>
        {#if path.exhibit}
        <mark>&gt;</mark>
        <a href={ `/Urbs/${path.region}/${path.exhibit}` }>{ path.exhibit }</a>
        {/if}
    {/if}
</nav>
<style>
    mark {
        background: transparent;
        color: var(--accent-color1);
        font-weight: 800;
    }
</style>