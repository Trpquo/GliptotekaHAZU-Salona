<script>
    export let path
</script>
<nav>
    [
    <a href="/">Salona</a>
    <mark>·</mark>
    <a href="/Salona">Urbs</a>
    {#if path.region}
    <mark>·</mark>
    <a href={ `/Salona/${path.region}` }>{ path.region }</a>
    {/if}
    {#if path.topic}
    <mark>&gt;</mark>
    <a href={ `/Salona/${path.region ? path.region + "/" : "" }${path.topic}` }>{ path.topic }</a>
    {/if}
    ]
</nav>
<style>
    nav { 
        margin: 0 0 1rem;
    }
    mark {
        background: transparent;
        color: var(--accent-color1);
        font-weight: 800;
    }
</style>