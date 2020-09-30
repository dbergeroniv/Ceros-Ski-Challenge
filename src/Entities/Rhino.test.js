import "babel-polyfill";

import {Skier} from "./Skier";
import {Rhino} from "./Rhino";
import * as Constants from "../Constants";

describe('Rhino States', () => {

	let skier = new Skier(0,0);
	let rhino = new Rhino(0,0);

	beforeEach(() => {
		rhino.setState(Constants.RHINO_STATES.IDLE);
	});

	test('Remains idle when skier is below starting distance', () => {
		skier.y = 10;
		rhino.update(skier);
		expect(rhino.state).toBe(Constants.RHINO_STATES.IDLE);
	});


	test('Runs when skier is past starting distance', () => {
		skier.y = Constants.RHINO_STARTING_DISTANCE + 1;
		rhino.update(skier);
		expect(rhino.state).toBe(Constants.RHINO_STATES.RUN);
	});

});

describe('Run State', () => {

	let skier = new Skier(0,0);
	let rhino = new Rhino(0,0);

	beforeEach(() => {
		rhino.setState(Constants.RHINO_STATES.RUN);
	});

	test('Remains running when skier is not caught', () => {
		rhino.update(skier);
		expect(rhino.state).toBe(Constants.RHINO_STATES.RUN);
	});

	test('Eats skier when collision occurs', () => {
		rhino.collide(skier);
		expect(rhino.state).toBe(Constants.RHINO_STATES.EAT);
	});

});