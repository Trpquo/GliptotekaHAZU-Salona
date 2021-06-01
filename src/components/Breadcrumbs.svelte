<script>
    export let path

    const convertForDisplay =str=>  `${str[0].toUpperCase()}${
        str.indexOf("-") > 0 ? 
            str.substring(1, str.indexOf("-")) + " " + str[str.indexOf("-") + 1].toUpperCase() + str.substring( str.indexOf("-") + 2, str.length )
            :
            str.substring( 1, str.length ) 
        }` // ovo još ne valja, ali baviti ću se time kada stignem
</script>
<nav>
    [
    <a href="/">Salona</a>
    <mark>·</mark>
    <a href="/Salona">Urbs</a>
    {#if path.region}
    <mark>·</mark>
    <a href={ `/Salona/${path.region}` }>{ convertForDisplay( path.region ) }</a>
    {/if}
    {#if path.topic}
    <mark>&gt;</mark>
    <a href={ `/Salona/${path.region ? path.region + "/" : "" }${path.topic}` }>{ convertForDisplay( path.topic ) }</a>
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