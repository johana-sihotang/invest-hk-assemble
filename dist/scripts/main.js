const handlebars=require("handlebars");handlebars.registerHelper("splitArray",(r,e)=>{if(!Array.isArray(r)||"number"!=typeof e||e<1)return console.warn("splitArray: Invalid array input",r),[];const n=r.length,t=Math.floor(n/e),a=n%e,l=Array.from({length:e},(r,e)=>e<a?t+1:t),s=[];let o=0;for(let e of l)s.push(r.slice(o,o+e)),o+=e;return s}),handlebars.registerHelper("newlineToBr",function(r){return"string"!=typeof r?r:new handlebars.SafeString(r.replace(/\n/g,"<br>"))}),handlebars.registerHelper("upperText",function(r){return"string"!=typeof r?r:(console.log("text: ",r),new handlebars.SafeString(r.toUpperCase()))});
const handlebars = require('handlebars');

//Split content
handlebars.registerHelper('splitArray', (array, columns) => {
    if (!Array.isArray(array) || typeof columns !== 'number' || columns < 1) {
        console.warn('splitArray: Invalid array input', array);
        return [];
    }
    const total = array.length;
    const baseSize = Math.floor(total / columns);
    const remainder = total % columns;

    const sizes = Array.from({ length: columns }, (_, i) => i < remainder ? baseSize + 1 : baseSize);

    const result = [];
    let start = 0;

    for (let size of sizes) {
        result.push(array.slice(start, start + size));
        start += size;
    }

    return result;
});

//change \n to tag <br>
handlebars.registerHelper('newlineToBr', function (text) {
    if (typeof text !== "string") return text;
    return new handlebars.SafeString(text.replace(/\n/g, "<br>"));
});

//Upper text
handlebars.registerHelper('upperText', function (text) {
    if (typeof text !== "string") return text;
    console.log("text: ", text);
    return new handlebars.SafeString(text.toUpperCase());
});