#pragma strict

var timer : int;
var limit : int;
var delta : float;

var onX : boolean;
var onY : boolean;
var onZ : boolean;

function Update() {

	if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.D)) {
				
		increaseTimer();	
			
		if (isSwayingLeft()) {

			sway(-delta);
		}
		if (isSwayingRight()) {

			sway(delta);
		}
		if (isSwayFinished()) {

			resetTimer();
		}

	}
		
}

function increaseTimer() {
	timer++;	
}

function isSwayingRight() {
	return (timer > limit);
}

function isSwayingLeft() {
	return (timer <= limit);
}

function sway(arg) {
	if (onX) {

		this.transform.Rotate(arg, 0, 0);
	}
	if (onY) {

		this.transform.Rotate(0, arg, 0);
	}	
	if (onZ) {
		
		this.transform.Rotate(0, 0, arg);
	}	
}

function isSwayFinished() {
	return (timer >= limit * 2);
}

function resetTimer() {
	timer = 0;
}