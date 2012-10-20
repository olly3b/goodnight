#pragma strict

var isFading : boolean;
var timer : int;
var frequency : int;

var maxTimerLength : int;
var minTimerLength : int;

var rangeDelta : float;
var intensityDelta : float;

var defaultIntensity : float;
var defaultRange : float;

function Update() {

	if (isFading) {

		adjustIntensity(-intensityDelta);
		adjustRange(-rangeDelta);

		reduceTimer();

		if (hasTimerRunOut()) {

			stopFading();
		}

	} else {

		if (hasIntensityReturnedToDefault()) {

			adjustIntensity(intensityDelta);
		}
		if (hasRangeReturnedToDefault()) {

			adjustRange(rangeDelta);
		}

		if (randomlyStartFading()) {

			startRandomLengthTimer();

			startFading();

		}
	}		
}

function adjustIntensity(arg : float) {
	this.light.intensity += arg;		
}

function adjustRange(arg : float) {
	this.light.range += arg;
}

function reduceTimer() {
	timer--;
}

function hasTimerRunOut() {
	return (timer <= 0);
}

function stopFading() {
	isFading = false;
}

function hasIntensityReturnedToDefault() {
	return (this.light.intensity < defaultIntensity);
}

function hasRangeReturnedToDefault() {
	return (this.light.range < defaultRange);
}

function randomlyStartFading() {
	return (Random.Range(0, frequency) == 0);
}

function startRandomLengthTimer() {
	timer = Random.Range(minTimerLength, maxTimerLength);
}

function startFading() {
	isFading = true;
}