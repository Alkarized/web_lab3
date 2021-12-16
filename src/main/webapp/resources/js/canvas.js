var RECT_SIZE = 500
var OFFSET = RECT_SIZE/16
var LINE_LENGTHS = RECT_SIZE - 2*OFFSET //Длинна всей оси без отступа сбоку
var RADIUS_LENGTH = LINE_LENGTHS/4 //Расстояние в px половины R
var radius = "2"; // todo добавить чтение радиуса
var length = RECT_SIZE/100

var canvas = document.getElementById("graph");
//var canvasOfNewPoint = document.getElementById("new_point")

var ctx = canvas.getContext('2d');
//var ctx_new_point = canvas.getContext("2d")
const MAIN_RECT = canvas.getBoundingClientRect()

class Coordinate{
	constructor(x, y, r, isHit){
		this.x = x
		this.y = y
		this.r = r
		this.isHit = isHit
	}
}

var arrayOfCoords = []
canvas.width = RECT_SIZE;
canvas.height = RECT_SIZE;

/*canvasOfNewPoint.width = RECT_SIZE;
canvasOfNewPoint.height = RECT_SIZE;*/

ctx.lineCap = "round"
ctx.lineWidth = 1

function xFromCanvasToNoraml(coord){
	let ans = 2*radius*(coord - RECT_SIZE/2)/(LINE_LENGTHS)
	return ans;
}

function yFromCanvasToNoraml(coord){
	let ans = (-2)*radius*(coord - RECT_SIZE/2)/(LINE_LENGTHS)
	return ans
}

function xFromNormalToCanvas(coord){
	let ans = (coord*LINE_LENGTHS)/(2*radius) + RECT_SIZE/2;
	return ans
}

function yFromNormalToCanvas(coord){
	let ans = (coord*LINE_LENGTHS)/(-2*radius) + RECT_SIZE/2;
	return ans
}

//Рисуем ось Y cо стрелочкой
function drawAxisY(){
	ctx.beginPath()
	ctx.moveTo(RECT_SIZE/2, RECT_SIZE); //передвигаем перо
	ctx.lineTo(RECT_SIZE/2, 0); //рисуем линию
	ctx.lineTo(RECT_SIZE/2 - 5, 10);
	ctx.moveTo(RECT_SIZE/2, 0); 
	ctx.lineTo(RECT_SIZE/2 + 5, 10);
	ctx.stroke();
	ctx.closePath()
}

//Рисуем ось X со стрелочкой
function drawAxisX(){
	ctx.beginPath()
	ctx.moveTo(0, RECT_SIZE/2); 
	ctx.lineTo(RECT_SIZE, RECT_SIZE/2); 
	ctx.lineTo(RECT_SIZE - 10, RECT_SIZE/2 - 5)
	ctx.moveTo(RECT_SIZE, RECT_SIZE/2); 
	ctx.lineTo(RECT_SIZE - 10, RECT_SIZE/2 + 5)
	ctx.stroke()
	ctx.closePath()
}

//Рисуем квадрат
var square = function square() {
	ctx.strokeRect(RECT_SIZE/2 - RADIUS_LENGTH*2, RECT_SIZE/2 - RADIUS_LENGTH, RADIUS_LENGTH * 2, RADIUS_LENGTH)
	ctx.fillRect(RECT_SIZE/2 - RADIUS_LENGTH*2, RECT_SIZE/2 - RADIUS_LENGTH, RADIUS_LENGTH * 2, RADIUS_LENGTH)
}

//Рисуем черточку для разметки графика

//Рисуем 1/4 круга
var circle = function circle(){
	ctx.beginPath();
	ctx.arc(RECT_SIZE/2, RECT_SIZE/2, RADIUS_LENGTH*2, 0, 3*Math.PI/2, true);
	ctx.lineTo(RECT_SIZE/2, RECT_SIZE/2)
	ctx.lineTo(RECT_SIZE/2 + RADIUS_LENGTH*2, RECT_SIZE/2)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()

}

//Рисуем треугольник
var triangle = function triangle(){
	ctx.beginPath()
	ctx.moveTo(RECT_SIZE/2, RECT_SIZE/2)
	ctx.lineTo(RECT_SIZE/2 - RADIUS_LENGTH*2, RECT_SIZE/2)
	ctx.lineTo(RECT_SIZE/2, RECT_SIZE/2 + RADIUS_LENGTH)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}

//Рисуем черточку разметки по x
function paintLineLenghtX(x, y, line_length){
	ctx.beginPath()
	let backWidth = ctx.lineWidth
	ctx.lineWidth = 1
	ctx.moveTo(x, y - line_length)
	ctx.lineTo(x, y + line_length)
	ctx.stroke();
	ctx.lineWidth = backWidth
	ctx.closePath()

}
//Рисуем черточку разметки по y
function paintLineLenghtY(x, y, line_length){
	ctx.beginPath()
	let backWidth = ctx.lineWidth
	ctx.lineWidth = 1
	ctx.moveTo(x - line_length, y )
	ctx.lineTo(x + line_length, y)
	ctx.stroke();
	ctx.lineWidth = backWidth
	ctx.closePath()

}
//Рисуем слова разметки 
function paintNumber(number, x, y, fillColor) {
	let backColor = ctx.fillStyle
	ctx.fillStyle = fillColor

	ctx.textAlign = "center";
	ctx.font = "15px Comic Sans MS"
	ctx.fillText(parseFloat(number).toFixed(1), x, y)

	ctx.fillStyle = backColor
}
//Рисуем всю разметку
function paintAllLines(fillStyle) {
	let NUMBER_OFFSET = RECT_SIZE/80
	//По x рисуем
	for(let i = 0; i < 5; i++){
		if (i===2){
			paintNumber((i-2)*radius/2, OFFSET + i*RADIUS_LENGTH + 2*NUMBER_OFFSET , RECT_SIZE/2 - NUMBER_OFFSET, fillStyle)
		}
		else {
			paintLineLenghtX(OFFSET + i*RADIUS_LENGTH, RECT_SIZE/2, length)
			paintLineLenghtY(RECT_SIZE/2 , OFFSET + i*RADIUS_LENGTH, length)
			paintNumber((i-2)*radius/2, OFFSET + i*RADIUS_LENGTH, RECT_SIZE/2 - NUMBER_OFFSET, fillStyle)
			paintNumber((2-i)*radius/2, RECT_SIZE/2 + 2*NUMBER_OFFSET , OFFSET + i*RADIUS_LENGTH, fillStyle)
		}
	}
}

//Рисуем Линии по x = ...
function paintXCoordinateLine(){
	for (let i = -5; i <= 3; i++){
		if (radius >= i){
			paintLineLenghtX(RECT_SIZE/2 + 2*RADIUS_LENGTH/radius*i, RECT_SIZE/2, RECT_SIZE/2)
		}
	}
}

function drawCoord(coordinate, context){
	context.beginPath()
	let colorBack = context.fillStyle
	let strokeBack = context.strokeStyle;
	context.strokeStyle = "black";
	if (coordinate.isHit == "true"){
		context.fillStyle = "green"
	} else {
		context.fillStyle = "red"
	}
	context.arc(xFromNormalToCanvas(coordinate.x), yFromNormalToCanvas(coordinate.y), RECT_SIZE/100, 0, 2*Math.PI)
	context.fill()
	context.stroke()
	context.strokeStyle = strokeBack
	context.fillStyle = colorBack;
	context.closePath()
}

function colorFillObject(fillStyle = "black", strokeStyle = "black", lineWidth = "1", object = ()=>{}) {
	let prevFillStyle = ctx.fillStyle 
	let prevStrokeStyle = ctx.strokeStyle;
	let prevLineWidth = ctx.lineWidth

	ctx.fillStyle = fillStyle // "rgba(46, 155, 242, 0.5)"
	ctx.strokeStyle = strokeStyle // "rgb(122, 245, 82)"
	ctx.lineWidth = lineWidth // "2"

	object()

	ctx.strokeStyle = prevStrokeStyle
	ctx.fillStyle = prevFillStyle;
	ctx.lineWidth = prevLineWidth
}

function drawAllCoords(){
	arrayOfCoords.forEach(elem =>{
		drawCoord(elem, ctx);
	})
}

function clearArea() {
	ctx.clearRect(0,0, RECT_SIZE, RECT_SIZE)
}

function draw() {
	colorFillObject("rgba(46, 155, 242, 0.5)", "rgb(122, 245, 82)", "2", square)
	colorFillObject("rgba(46, 155, 242, 0.5)", "rgb(122, 245, 82)", "2", triangle)
	colorFillObject("rgba(46, 155, 242, 0.5)", "rgb(122, 245, 82)", "2", circle)
	drawAxisY()
	drawAxisX()
	paintAllLines("#F23E16")
	paintXCoordinateLine()
	drawAllCoords()
}

canvas.addEventListener("mousedown", e => {
	let xCor = Math.round(xFromCanvasToNoraml(e.clientX - MAIN_RECT.left))
	let yCor = yFromCanvasToNoraml(e.clientY - MAIN_RECT.top).toFixed(3)
	let rCor = radius
	let x_table = document.querySelectorAll("input[type=radio]")
	x_table.forEach(e =>{
		if (e.id.match("x_text")){
			e.checked = false
			if (e.value == xCor){
				e.checked = true
			}
		}
	})
	document.querySelector(".form-y-input").value = yCor;
	let button = document.querySelector(".submit-button");
	button.click()
})

/*canvasOfNewPoint.addEventListener("mousemove", e =>{
	let xCor = Math.round(xFromCanvasToNoraml(e.clientX - MAIN_RECT.left))
	let yCor = yFromCanvasToNoraml(e.clientY - MAIN_RECT.top)
	let rCor = radius
	//ctx_new_point.clearRect(0,0, RECT_SIZE, RECT_SIZE)
	alert("test")
	//drawGhostCoordinate(new Coordinate(xCor, yCor, rCor, NaN))
})*/

/*
function drawGhostCoordinate(coordinate){
	drawCoord(coordinate, ctx_new_point)
}
*/

function changeR(r_node){
	if ( 1 < r_node.value && r_node.value < 4){
		radius = parseFloat(r_node.value).toFixed(1)
		clearArea()
		draw()
	} else {
		r_node.value = radius;
	}
}

function rerender(){
	let table = document.getElementById("table")
	let len = table.children[1].children.length;
	if (len > 0 && table.children[1].children[len - 1].children[0].innerText.trim().replace(',','.') !== ""){

		arrayOfCoords.push(new Coordinate(table.children[1].children[len - 1].children[0].innerText.trim(),
			parseFloat(table.children[1].children[len - 1].children[1].innerText.trim().replace(',','.')),
			parseFloat(table.children[1].children[len - 1].children[2].innerText.trim().replace(',','.')),
			table.children[1].children[len - 1].children[3].innerText.trim()))
		drawCoord(arrayOfCoords[arrayOfCoords.length - 1], ctx)
	}
}

function getAllCoordsFromTable(){
	let table = document.getElementById("table")
	let len = table.children[1].children.length;
	let trs = table.children[1].children;
	for (let i = 0; i < len; i++){
		if (trs[i].children[0].innerText.trim() !== "") {
			arrayOfCoords.push(new Coordinate(trs[i].children[0].innerText.trim(),
				parseFloat(trs[i].children[1].innerText.trim().replace(',','.')),
				parseFloat(trs[i].children[2].innerText.trim().replace(',','.')),
				trs[i].children[3].innerText.trim()))
		}
	}
}

window.onload = () =>{
	getAllCoordsFromTable()
	draw()
}