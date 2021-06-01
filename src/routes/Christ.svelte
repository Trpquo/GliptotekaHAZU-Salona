<script>
    import Main from "../components/Main.svelte"
    import { filterContents } from '../utils/server'


    export let content, topic, location

    let currentContent
	$: {
		currentContent = filterContents( { ...content }, [ topic, location ] )
	}

</script>

<Main content={ currentContent } />