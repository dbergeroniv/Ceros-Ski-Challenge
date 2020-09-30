export const GAME_WIDTH  = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_STARTING_SPEED         = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;

export const RHINO_STARTING_SPEED         = 9;
export const RHINO_DIAGONAL_SPEED_REDUCER = 1.25;
export const RHINO_STARTING_DISTANCE      = 2500;

export const SKIER_NORMAL    = 'skierNormal';
export const SKIER_JUMP      = 'skierJump';
export const SKIER_CRASH     = 'skierCrash';
export const SKIER_DEAD      = 'skierDead';
export const SKIER_LEFT      = 'skierLeft';
export const SKIER_LEFTDOWN  = 'skierLeftDown';
export const SKIER_DOWN      = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT     = 'skierRight';
export const TREE            = 'tree';
export const TREE_CLUSTER    = 'treeCluster';
export const ROCK1           = 'rock1';
export const ROCK2           = 'rock2';
export const RAMP            = 'ramp';
export const RHINO           = 'rhino';
export const RHINO_RUN_LEFT  = 'rhinoRunLeft';
export const RHINO_RUN_RIGHT = 'rhinoRunRight';
export const RHINO_EAT       = 'rhinoEat';
export const HIDE            = 'hide';


export const ASSETS = {
	[SKIER_JUMP]     : [
		'img/skier_jump_1.png',
		'img/skier_jump_2.png',
		'img/skier_jump_3.png',
		'img/skier_jump_4.png',
		'img/skier_jump_5.png',
	],
	[RHINO_RUN_LEFT] : [
		'img/rhino_run_left_1.png',
		'img/rhino_run_left_2.png'
	],
	[RHINO_RUN_RIGHT]: [
		'img/rhino_run_right_1.png',
		'img/rhino_run_right_2.png'
	],
	[RHINO_EAT]      : [
		'img/rhino_lift_eat_1.png',
		'img/rhino_lift_eat_2.png',
		'img/rhino_lift_eat_3.png',
		'img/rhino_lift_eat_4.png',
		'img/rhino_lift_eat_5.png',
		'img/rhino_lift_eat_6.png'
	],
	[SKIER_CRASH]    : 'img/skier_crash.png',
	[SKIER_DEAD]     : 'img/skier_dead.png',
	[SKIER_LEFT]     : 'img/skier_left.png',
	[SKIER_LEFTDOWN] : 'img/skier_left_down.png',
	[SKIER_DOWN]     : 'img/skier_down.png',
	[SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
	[SKIER_RIGHT]    : 'img/skier_right.png',
	[RHINO]          : 'img/rhino_default.png',
	[TREE]           : 'img/tree_1.png',
	[TREE_CLUSTER]   : 'img/tree_cluster.png',
	[ROCK1]          : 'img/rock_1.png',
	[ROCK2]          : 'img/rock_2.png',
	[RAMP]           : 'img/jump_ramp.png',
	[HIDE]           : 'img/hide.png',
};

export const SKIER_DIRECTIONS = {
	LEFT      : 1,
	LEFT_DOWN : 2,
	DOWN      : 3,
	RIGHT_DOWN: 4,
	RIGHT     : 5
};

export const SKIER_STATES = {
	HIDE  : 'hide',
	NORMAL: 'normal',
	CRASH : 'crash',
	JUMP  : 'jump',
	DEAD  : 'dead'
};

export const SKIER_ASSET = {
	[SKIER_STATES.HIDE]          : HIDE,
	[SKIER_STATES.NORMAL]        : SKIER_NORMAL,
	[SKIER_STATES.CRASH]         : SKIER_CRASH,
	[SKIER_STATES.JUMP]          : SKIER_JUMP,
	[SKIER_STATES.DEAD]          : SKIER_DEAD,
	[SKIER_DIRECTIONS.LEFT]      : SKIER_LEFT,
	[SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
	[SKIER_DIRECTIONS.DOWN]      : SKIER_DOWN,
	[SKIER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
	[SKIER_DIRECTIONS.RIGHT]     : SKIER_RIGHT
};

export const RHINO_STATES = {
	HIDE  : 'hide',
	IDLE: 'normal',
	RUN   : 'run',
	EAT   : 'eat',
};

export const RHINO_DIRECTIONS = {
	LEFT : 1,
	RIGHT: 2
};

export const RHINO_ASSET = {
	[RHINO_STATES.HIDE]     : HIDE,
	[RHINO_STATES.IDLE]   	: RHINO,
	[RHINO_STATES.EAT]      : RHINO_EAT,
	[RHINO_DIRECTIONS.LEFT] : RHINO_RUN_LEFT,
	[RHINO_DIRECTIONS.RIGHT]: RHINO_RUN_RIGHT,

};

export const KEYS = {
	LEFT : 37,
	RIGHT: 39,
	UP   : 38,
	DOWN : 40,
	SPACE: 32
};