#pragma strict

var isFlickering : boolean;
var timer : int;
var frequency : int;

var maxTimerLength : int;
var minTimerLength : int;

function Update() {

	if (isFlickering) {

		toggleLight();

		reduceTimer();

		if (hasTimerRunOut()) {

			stopFlickering();
		}

	} else {

		toggleLight(true);

		if (randomlyStartFlickering()) {

			startRandomLengthTimer();

			startFlickering();
		}
	}
		
}

function toggleLight() {
	this.light.enabled = !this.light.enabled;
}

function toggleLight(arg : boolean) {
	this.light.enabled = arg;
}

function reduceTimer() {
	timer--;
}

function hasTimerRunOut() {
	return (timer <= 0);
}

function stopFlickering() {
	isFlickering = false;
}

function randomlyStartFlickering() {
	return (Random.Range(0, frequency) == 0);
}

function startRandomLengthTimer() {
	timer = Random.Range(minTimerLength, maxTimerLength);
}

function startFlickering() {
	isFlickering = true;
}