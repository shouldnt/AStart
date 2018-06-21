let UNIT_SIZE = 5; // 5px;
let MAZE_AREA = {width: 40, height: 40};
let MAZE_EL = document.querySelector('.maze');
let HORIZONTAL = 'horizontal';
let VERTICAL = 'vertical';

let block_list = {};

function Block(el, {x, y}, type) {
	this.el = el;
	this.type = type;
	this.cordinate = {x,y}
}

function createBlock(x, y, type) {
	let block = document.createElement("div");
	block.className = type;
	block.style.width = UNIT_SIZE;
	block.style.height = UNIT_SIZE;
	block.style.left = x * UNIT_SIZE;
	block.style.top = y  * UNIT_SIZE;
	

	return new Block(block, {x, y}, type);
}
function Draw() {
	(Object.keys(block_list)).map(key => {
		let block = block_list[key];
		MAZE_EL.appendChild(block.el);
	})
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.count = 0;

function divide(x, y, width, height, orientation) {

	if (width <= 2 || height <= 2) 
		return;
	window.count+=1;
	window.width = width;
	window.height = height;
	let isHorizontal = orientation === HORIZONTAL;


	// where will the wall be drawn from
	let startPoint = {
		x: x + (isHorizontal ? 0 : getRandomInt(x + 1, x + width - 2)),
		y: y + (isHorizontal ? getRandomInt(y + 1, y + height - 2) : 0)
	}

	// where will the passage through the wall exist
	let spacePoint = {
		x: startPoint.x + (isHorizontal ? getRandomInt(0, width) : 0),
		y: startPoint.y + (isHorizontal ? 0 :getRandomInt(0, height))
	}

	block_list[spacePoint.x + '-' + spacePoint.y] = createBlock(spacePoint.x, spacePoint.y, 'space');

	// how long will the wall be?
	let wall_length = isHorizontal ? width : height

	for (let i = 0; i < wall_length; i++) {

		let point = {
			x: startPoint.x + (isHorizontal ? i : 0),
			y: startPoint.y + (isHorizontal ? 0 : i)
		}
		if( point.x == spacePoint.x && point.y == spacePoint.y) {
			continue;
		}

		let block = createBlock(
			point.x,
			point.y,
			'wall'
		)

		block_list[point.x + '-' + point.y] = block;
	}

	let  = [

		x, // x
		y, // y
		isHorizontal ? width : startPoint.x - x, // width
		isHorizontal ? startPoint.y - y : height // height
	]

	let box_2 = [
		isHorizontal ? x : startPoint.x + 1, // x
		isHorizontal ? startPoint.y + 1 : y, // y
		isHorizontal ? width : x + width - 1 - startPoint.x, // width
		isHorizontal ? y + width - 1 - startPoint.y : height // height
	]


	divide(...box_1, isHorizontal ? VERTICAL : HORIZONTAL);
	divide(...box_2, isHorizontal ? VERTICAL : HORIZONTAL);
}


function createMaze() {
	MAZE_EL.style.width = MAZE_AREA.width * UNIT_SIZE;
	MAZE_EL.style.height = MAZE_AREA.height * UNIT_SIZE;

	// create border top and bottom
	for(let x = 0; x < MAZE_AREA.width; x++) {

		for(let y = 0; y < MAZE_AREA.height; y++) {

			if(x > 0 && x < MAZE_AREA.width - 1 && y > 0 && y < MAZE_AREA.height - 1) {
				continue;
			} else {
				wall = createBlock(x, y, 'wall');
				block_list[x + '-' + y] = wall;
			}

		}

	};

	// create maze
	divide(1, 1, MAZE_AREA.width - 2, MAZE_AREA.height - 2, VERTICAL)

}

createMaze(MAZE_AREA);
Draw();


