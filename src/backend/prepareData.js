module.exports = rows => {
    return new Promise((resolver, reject) => {
        try {
            const words = rows
                .filter(filterValidRows)
                .map(removePunctuation)
                .map(removeTags)
                .reduce(mergeRows)
                .split(' ')
                .map(word => word.toLowerCase())
                .map(word => word.replace('"', ''));

            resolver(words)
        } catch(e) {
            reject(e)
        }
    })
};

function filterValidRows(row) {
    const rowTrim = row === undefined ? '' : row.trim();
    const rowIncludes = row === undefined ? '' : row.includes('-->');
    const notNumber = !parseInt(rowTrim);
    const notEmpty = !!rowTrim;
    const notInterval = !rowIncludes;
    return notNumber && notEmpty && notInterval
}

const removePunctuation = row => row.replace(/[,?!.-]/g, '');
const removeTags = row => row.replace(/(<[^>]+)>/ig, '').trim();
const mergeRows = (fullText, row) => `${fullText} ${row}`;