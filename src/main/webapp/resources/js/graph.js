let width = 500
let draw = SVG().addTo("#graph").size(width, width)
let background;

function drawMainRect(width, height, strokeWidth, strokeColor) {
    return draw.rect(width, height).fill('none').stroke({ width: strokeWidth, color: strokeColor })
}

function drawXAxis(){

}

function drawAllElements() {
    background = drawMainRect(width, width, 5, "red");
}

window.onload = () => {
    drawAllElements()
}

