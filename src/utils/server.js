export default async ()=> {
    console.log("Fetching contents...")
    const response = await(await fetch("/data/contents.json")).json()

    // calculate document urls in json response
    Object.keys(response).map(lang=> response[lang] = response[lang].reduce(( content, chapter )=>[ ...content, fixDocumentUrls( chapter, "", "" ) ], []))

    if ( isProduction ) window.sessionStorage.setItem('salona-contents', JSON.stringify( response ))
    return response
}



const fixDocumentUrls =(chapter, currentPath, currentUrl )=> {
    currentPath += "/" + chapter.directory
    chapter.path = currentPath
    if ( !!chapter.url ) chapter.url = currentUrl + chapter.url
    if ( !!chapter.sections ) chapter.sections.forEach( section=> fixDocumentUrls( section, currentPath, chapter.url === "/" ? "" : chapter.url ) )

    return chapter
}

export const filterContents = ( content, subs ) => {
    // console.log( subs )
    for ( let sub of subs ) {
        // console.log(`Filtriram za ${ sub }`)
        if ( !!sub && !!content ) content = content.sections.find(section=> section.url.indexOf( sub ) > 0 )
    }
    return content
}