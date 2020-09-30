export class AnimationManager {

	frame     = 0;
	delay     = 200;
	animating = false;
	loop      = false;

	constructor() {
	}

	update(frames) {
		const now = (new Date).getTime();
		if (this.animating && now > this.delay + this.last) {
			if (this.frame + 1 < frames) {
				this.last = now;
				this.frame += 1;
			} else {
				if (!this.loop) {
					this.animating = false;
					this.frame     = 0;
					this.callback();
				} else {
					this.last  = now;
					this.frame = 0;
				}
			}
		}
	}

	getFrame() {
		return this.frame;
	}

	start(delay = 200, loop = false, callback = () => {}) {
		this.last      = (new Date).getTime();
		this.frame     = 0;
		this.delay     = delay;
		this.animating = true;
		this.loop      = loop;
		this.callback  = callback;
	}

	stop() {
		this.frame     = 0;
		this.animating = false;
	}

	isAnimating() {
		return this.animating;
	}

}