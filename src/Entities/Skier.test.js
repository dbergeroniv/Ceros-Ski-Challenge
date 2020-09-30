import "babel-polyfill";

import {Skier} from "./Skier";
import * as Constants from "../Constants";

describe('Turning after crash', () => {

	let skier = new Skier(0, 0);

	beforeEach(() => {
		skier.setState(Constants.SKIER_STATES.CRASH);
	});

	test('Stands back up when turning left', () => {
		skier.turnLeft();
		expect(skier.state).toBe(Constants.SKIER_STATES.NORMAL);
	});

	test('Stands back up when turning right', () => {
		skier.turnRight();
		expect(skier.state).toBe(Constants.SKIER_STATES.NORMAL);
	});

	test('Faces left after turning left', () => {
		skier.turnLeft();
		expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
	});

	test('Faces right after turning right', () => {
		skier.turnRight();
		expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
	});

	test('Remains crashed when turning up', () => {
		skier.turnUp()
		expect(skier.state).toBe(Constants.SKIER_STATES.CRASH);
	});

	test('Remains crashed when turning down', () => {
		skier.turnDown();
		expect(skier.state).toBe(Constants.SKIER_STATES.CRASH);
	});

});

describe('Jumping method', () => {

	let skier = new Skier(0, 0);

	test('Jumps when state is normal', () => {
		skier.stand();
		expect(skier.canJump()).toBe(true);
	});

	test('Does not jump when crashed', () => {
		skier.crash();
		expect(skier.canJump()).toBe(false);
	});

	test('Does not jump when jumping', () => {
		skier.jump();
		expect(skier.canJump()).toBe(false);
	});

});

describe('Moving method', () => {

	let skier = new Skier(0, 0);

	test('Does not move when crashed', () => {
		skier.crash();
		expect(skier.canMove()).toBe(false);
	});

	test('Does not move when dead', () => {
		skier.kill();
		expect(skier.canMove()).toBe(false);
	});

	test('Does not move when hidden', () => {
		skier.hide();
		expect(skier.canMove()).toBe(false);
	});
})

