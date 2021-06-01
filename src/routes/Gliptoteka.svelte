<script>
    import Main from "../components/Main.svelte"
    import { filterContents } from '../utils/server'


    export let content, exhibit

    let currentContent
	$: {
		currentContent = filterContents( { ...content }, [ exhibit ] )
	}

</script>

<Main content={ currentContent } />