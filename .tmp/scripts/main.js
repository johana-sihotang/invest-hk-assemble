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