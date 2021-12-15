var RECT_SIZE = 500
var OFFSET = RECT_SIZE/16
var LINE_LENGTHS = RECT_SIZE - 2*OFFSET //Длинна всей оси без отступа сбоку
var RADIUS_LENGTH = LINE_LENGTHS/4 //Расстояние в px половины R
var radius = "3.9"; // todo добавить чтение радиуса
var length = RECT_SIZE/100

var canvas = document.getElementById("graph");
var ctx = canvas.getContext('2d');
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

ctx.lineCap = "round"
ctx.lineWidth = 1

function xFromCanvasToNoraml(coord){
	let ans = 2*radius*(coord - RECT_SIZE/2)/(LINE_LENGTHS)
	return ans;
}

function yFromCanvasToNoraml(coord){
	let ans = Math.round((-2)*radius*(coord - RECT_SIZE/2)/(LINE_LENGTHS));
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
	ctx.closePath()
	ctx.lineWidth = backWidth
}
//Рисуем черточку разметки по y
function paintLineLenghtY(x, y, line_length){
	ctx.beginPath()
	let backWidth = ctx.lineWidth
	ctx.lineWidth = 1
	ctx.moveTo(x - line_length, y )
	ctx.lineTo(x + line_length, y)
	ctx.stroke();
	ctx.closePath()
	ctx.lineWidth = backWidth
}
//Рисуем слова разметки 
function paintNumber(number, x, y, fillColor) {
	let backColor = ctx.fillStyle
	ctx.fillStyle = fillColor

	ctx.textAlign = "center";
	ctx.font = "15px Comic Sans MS"
	ctx.fillText(number, x, y)

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

function drawCoord(coordinate){
	let colorBack = ctx.fillStyle

	if (coordinate.isHit){
		ctx.fillStyle = "green"
	} else {
		ctx.fillStyle = "red"
	}

	ctx.arc(coordinate.x, coordinate.y, RECT_SIZE/100, 0, 2*Math.PI)
	ctx.fill()

	ctx.fillStyle = colorBack;
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
		drawCoord(elem);
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
	let xCor = e.clientX - MAIN_RECT.left
	let yCor = e.clientY - MAIN_RECT.top
	let rCor = radius
	clearArea()
	draw()
})

function rChange(r){
	alert(r.value)
}
window.onload = () =>{
	draw()
}