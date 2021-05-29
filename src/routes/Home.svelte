<script>
    import { language } from '../utils/config'

    export let content
    let paragraphs
    $: {
        paragraphs = fetch(`/content/${$language}/${content.sections[0].url}`)
            .then(res=>res.data)
            .then(console.log)
//            .then(res=>res.body.getReader())
//            .then(reader=> new ReadableStream({
//               start(controller) {
//                    return pump();
//                    function pump() {
//                        return reader.read().then(({ done, value }) => {
//                        // When no more data needs to be consumed, close the stream
//                        if (done) {
//                            controller.close();
//                            return;
//                        }
//                        // Enqueue the next data chunk into our target stream
//                        controller.enqueue(value);
//                        return pump();
//                    })}
//                }
//        }))
//        .then(stream => new Response(stream))
//        .then(response => response.blob())
        // .then(blob => URL.createObjectURL(blob))
        // .then(url => console.log(image.src = url))
        .catch(err => console.error(err));
    }


     
</script>
{#await paragraphs then paragraph}
    <p>{ paragraph }</p>
{/await}
<h1>{ content.title }</h1>
{#each content.sections as section}
    <h1>{ section.title }</h1>
{/each}