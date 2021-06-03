<script>
    export let topic

    const convertForDisplay =str=>  `${str[0].toUpperCase()}${
        str.indexOf("-") > 0 ? 
            str.substring(1, str.indexOf("-")) + " " + str[str.indexOf("-") + 1].toUpperCase() + str.substring( str.indexOf("-") + 2, str.length )
            :
            str.substring( 1, str.length ) 
    }` // ovo još ne valja, ali baviti ću se time kada stignem

</script>
<nav>
    [
    <a href="/Salona">Salona</a>
    {#each topic as t}
    &nbsp;<mark>·</mark>&nbsp;
        <a href={ `/Salona/${ topic.slice(0, topic.indexOf(t) + 1).join("/") }` }>{ convertForDisplay( t ) }</a>
    {/each}
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