<script>
    import Main from "../components/Main.svelte"
    import { filterContents } from '../utils/server'

    export let content, topic, exhibit

    let currentContent
	$: {
		currentContent = filterContents( { ...content }, [ topic, exhibit ] )
	}

</script>

<Main content={ currentContent } />