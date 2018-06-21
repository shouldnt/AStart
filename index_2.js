let unit = 40;
let chessBoard = document.querySelector('.chessboard');
chessBoard.style.width = unit * 8;
chessBoard.style.height = unit * 8

let chessBlocks = new Array(64);

let isOdd = false;

for(let i = 0; i < chessBlocks.length; i++) {

	let x = i % 8;
	let y = Math.floor(i / 8);

	if(y % 2 === 0) {
		isOdd = false;
	} else {
		isOdd = true
	}

	let el;

	if (x % 2 == 0) {
		el = document.createElement('div');
		el.className = isOdd ? 'chessblock black' : 'chessblock';
	} else {
		el = document.createElement('div');
		el.className = isOdd ? 'chessblock' : 'chessblock black';
	}

	el.style.left = x * unit;
	el.style.top = y * unit;
	el.style.width = unit;
	el.style.height = unit;

	chessBoard.appendChild(el);

}
