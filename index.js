module.exports = {tableFormat, titleFormat};

function tableFormat(rows, {padding=2, indent='  '}={}) {
    const columnWidths = [];

    rows.forEach(cells => {
        cells.forEach((cell, columnNumber) => {
            columnWidths[columnNumber] = (
                Math.max(
                    cell.length,
                    columnWidths[columnNumber]||0
                )
            );
        });
    });

    const lines = [];

    rows.forEach(cells => {
        let line = indent;
        cells.forEach((cell, columnNumber) => {
            const colWidth = columnWidths[columnNumber];
            const paddingRight = (
                 columnNumber===cells.length-1 ? (
                    ''
                 ) : (
                     new Array(colWidth+padding).fill(' ').join('').slice(cell.length)
                 )
            );
            line += cell + paddingRight;
        });
        lines.push(line);
    });

    return lines.join('\n');
}

function titleFormat(title) {
    const min_bar_length = 40;
    title = ' '+title+' ';
    const bar_length = Math.max(min_bar_length, title.length+6);
    const margin = Math.floor((bar_length - title.length) / 2);
    const bar = new Array(bar_length).fill('*').join('');
    const title_bar = (
        bar
        .split('')
        .map((char_, pos) => {
            const pos_in_title = pos-margin;
            if( 0 <= pos_in_title && pos_in_title < title.length ) {
                return title.split('')[pos_in_title];
            }
            return char_;
        })
        .join('')
    );
    return (
        [
            bar,
            title_bar,
            bar,
        ].join('\n')
    );
}
