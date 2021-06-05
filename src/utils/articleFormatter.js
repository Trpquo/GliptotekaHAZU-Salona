import { heroImage, random } from "../utils/config"
import { root } from "./config"

export default (component, article, root)=>{
    if( !!document.querySelector("#hero") ) {
        let heroUrl, backgrounds;
        if ( !!article.exhibits ) backgrounds = article.exhibits.filter(exh=> exh.background && exh.type !== "video")
        if ( !!backgrounds ? backgrounds.length === 0 : true ) {
            heroUrl = random.visual
        }
        else {
            heroUrl = root + "images/" + pickRandom( backgrounds ).file
        } 
        // console.log( heroUrl )
        heroImage.set( heroUrl )
    }
}

export const thumbnailCollector =(article)=>{
    let potentialBackgrounds, randomImage,
        contentRoot = `${ root }/hr${ article.path }/images/thumbs/`


    if (!!article.exhibits) {
        potentialBackgrounds =  article.exhibits.filter(e=>e.background && e.type === "image")
        if ( !!potentialBackgrounds.length ) {
            randomImage = pickRandom( potentialBackgrounds ).file

            if ( !!randomImage ) return contentRoot + randomImage
        }
    }
    else if ( !!article.sections ) { 
        let potentialCollector
        potentialBackgrounds = {}
            potentialCollector = article.sections.reduce((tot, curr)=>{ 
                if ( !!curr.exhibits ) {
                    tot[ curr.path ] = curr.exhibits.filter(e=>e.background && e.type === "image")
                }
                return tot
                }, {} )
            for ( let key of Object.keys( potentialCollector ) ) {
                if ( !!potentialCollector[key].length ) {
                    potentialBackgrounds[key] = potentialCollector[key]
                }
            }
            if ( !!Object.keys( potentialBackgrounds ).length ) {
                const randomKey = pickRandom( Object.keys( potentialBackgrounds ) )
                const randomSet = potentialBackgrounds[ randomKey ]
                const randomExhibit = pickRandom( randomSet )
                randomImage = `${ root }/hr${ randomKey }/images/thumbs/` + randomExhibit.file
            }
            return randomImage
    }
}

export const pickRandom =arr=> arr[ Math.floor( Math.random() * arr.length ) ]



export const potentialGrids = {
    noMap: [
        ` "h h h h a a" "t t t t a a" "s s s s s s" `,
        ` "h h t t t ." "s s t t t ." "a a a a a a" `,
        ` ". . h h h h" "a a a a a a" "s s t t t ." `,
    ],
    noExhibits: [
        `"h h h h . ." "m m m m m m"  "t t t s s s"`,
        `"h h h t t t" "m m m t t t" "s s s t t t"`,
        `"m m m m m m"  "s h h h h h" "s t t t t ." "s t t t t ." "s t t t t ." "s t t t t ."`,
        `"m m m m m m"  "h h h h h s" "t t t t . s" "t t t t . s" "t t t t . s" "t t t t . s"`,
    ],
    Urbs: [
        '"h h h h . ." "m m m m m m" "t t t t a a" "s s s s s s"',
        '"m m m m m m" "h h h h . ." "a a t t t t" "a a t t t t" "a a s s s s"',
        '"s s s s s s" "h h h t t t" "a a . t t t" "a a m m m m" "a a m m m m"',
        '"h h h h . ." "t t t a a s" "m m m a a s" "m m m a a s" ". . . . . s"',
        '"m m m m m s" ". . h h h s" "a a t t t s" "a a t t t s" ". . . . . s"',
    ],
    Sepul: [],

}

export const articleLayout = [ 
    "--article-flow: row;       --paragraph-span: span 6;      --heading-span: span 6;          --footnote-span: span 6;    --footnote-alignment: start;", 
    "--article-flow: dense;     --paragraph-span: 3 / span 4;  --heading-span: 3 / span 4;      --footnote-span: span 2;    --footnote-alignment: center;", 
    "--article-flow: dense;     --paragraph-span: span 4;      --heading-span: span 6;          --footnote-span: span 2;    --footnote-alignment: start;",  
]