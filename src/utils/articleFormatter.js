export default article=>{
    // console.log( article )
}
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