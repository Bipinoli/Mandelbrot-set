const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// transform x from s1, d1 dimension to s2, d2
function map(s1, d1, x, s2, d2) {
	return s2 + ((x-s1)/(d1-s1))*(d2-s2);
}

// takes pixel as an input
function mathWork(px, py, col) 
{
	// f(c) = z^2 + c
	let oldx = px;
	let oldy = py;

	for (let i=0; i<10*col; i++) {
		let x = px*px - py*py + oldx;
		let y = 2*px*py + oldy;
		px = x;
		py = y;
	}

	if (Math.abs(px)+Math.abs(py) > 15)
		return 1;

	return map(0, 2, Math.abs(px)+Math.abs(py), 0, 1);
}


for (let x=0; x<canvas.width; x++)
	for (let y=0; y<canvas.height; y++) {

		let px = map(0, canvas.width, x, -2, 2);
		let py = map(0, canvas.height, y, -2, 2);

		let r1 = mathWork(px, py, 2)*255 | 0;
		let r2 = mathWork(px, py, 5.1)*255 | 0;
		let r3 = mathWork(px, py, 21.2)*255 | 0;

		context.fillStyle = "rgb(" + r1 + "," + r2 + "," + r3 + ")";
		context.fillRect(x,y,1,1);
	}

