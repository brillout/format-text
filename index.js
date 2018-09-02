module.exports = {tableFormat, titleFormat};

function tableFormat(rows, {padding=2, indent='  '}={}) {
    const columnWidths = [];

    rows.forEach(cells => {
        cells.forEach((cell, columnNumber) => {
            columnWidths[columnNumber] = (
                Math.max(
                    getStringWidth(cell),
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
            const isLastColumn = columnNumber===cells.length-1;
            const paddingRight = (
                 isLastColumn ? (
                    ''
                 ) : (
                     getBar(colWidth+padding, ' ').slice(getStringWidth(cell))
                 )
            );
            line += cell + paddingRight;
        });
        lines.push(line);
    });

    return lines.join('\n');
}

function titleFormat(title, {padding=3}={}) {
    // resolve cyclic dependency reassert => @brillout/format-text => reassert
    const assert_warning = require('reassert/warning');

    const min_bar_length = 40;
    title = ' '+title+' ';
    const titleWidth = getStringWidth(title);
    const barWidth = Math.max(min_bar_length, titleWidth+padding*2);
    const stringWidth = require('string-width');
    const leftWidth = Math.floor((barWidth - titleWidth) / 2);
    const bar = getBar(barWidth);
    const title_bar = getBar(leftWidth) + title + getBar(barWidth - leftWidth - titleWidth);
    assert_warning(getStringWidth(bar)===getStringWidth(title_bar));
    return (
        [
            bar,
            title_bar,
            bar,
        ].join('\n')
    );
}
function getStringWidth(str) {
    if( ! isNodejs() ) {
        return str.length;
    }
    const stringWidth = eval('require')('string-width');
    return stringWidth(str);
}
function isNodejs() {
    return typeof process !== "undefined" && typeof window === "undefined";
}

function getBar(barWidth, filler='*') {
    return new Array(barWidth).fill(filler).join('');
}
