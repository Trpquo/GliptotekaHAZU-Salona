<script>
    import Menu from './Menu.svelte'

    export let tabs
</script>
<header>
    <h1>Salona</h1>
    <nav id="headerNav">
        <Menu { tabs } />
    </nav>
</header>
<style>
    header {
        height: var(--header-height);
        padding: var(--default-padding);
        background-color: var(--background-color2);
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 9;
        display: flex;
    }
    h1 {
        margin: 0;
        font-size: 5em;
        line-height: calc( var(--header-height) / 2 );
    }

    nav { 
        margin-left: 2rem;
    }
</style>