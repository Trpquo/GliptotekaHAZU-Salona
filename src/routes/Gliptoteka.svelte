<script>
    import Main from "../components/Main.svelte"
    import { filterContents } from '../utils/server'


    export let content, topic

    let currentContent
	$: {
		currentContent = filterContents( { ...content }, topic )
	}

</script>

<Main content={ currentContent } />