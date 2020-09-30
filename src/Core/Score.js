
export class Score {

	draw(canvas, skier) {
		canvas.ctx.font      = '20px Helvetica';
		canvas.ctx.fillStyle = '#9582CF';
		canvas.ctx.textAlign = 'left';
		canvas.ctx.fillText(Math.floor(skier.travelled), 20, 30);

		if (skier.isDead()) {
			canvas.ctx.font      = '50px Helvetica';
			canvas.ctx.fillStyle = '#B92619';
			canvas.ctx.textAlign = 'center';
			canvas.ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 50);
		}
	}
}