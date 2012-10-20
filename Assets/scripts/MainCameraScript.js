#pragma strict

var timer : int;
var limit : int;
var delta : float;

var footstepsWoodSounds : AudioClip[];
footstepsWoodSounds = new AudioClip[20];

function Start() {
	Screen.showCursor = false;
  	//Screen.lockCursor = true;
  
	loadSounds();
}

function Update () {

	if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.D)) {
		
		increaseTimer();
		
		if (isBobUp()) 
			bob(delta);
		
		if (isBobDown())
			bob(-delta);
	
		if (isBobFinished()) {
			resetTimer();
			playRandomFootstepsWood();			
		}
		
	} else {
	
		if (!isResetFinished()) {
			
			if (isBobUp()) {
				bob(-delta);
				decreaseTimer();
				if (isResetFinished()) {
					playRandomFootstepsWood();			
				}
				
			}
			
			if (isBobDown()) {
				bob(-delta);
				increaseTimer();
			}
			
			if (isBobFinished()) {
				resetTimer();
				playRandomFootstepsWood();					
			}
		}
	}
}

function loadSounds() {
	for (var i = 0; i < 20; i++) {
		footstepsWoodSounds[i] = Resources.Load("sounds/footsteps/wood/footstepWood" + (i + 1), AudioClip);
	}
}

function isBobbing() {
	return (timer > 0);
}

function increaseTimer() {
	timer++;	
}

function decreaseTimer() {
	timer--;	
}

function isBobDown() {
	return (timer > limit);
}

function isBobUp() {
	return (timer <= limit);
}

function bob(arg : float) {
	this.transform.position += Vector3(0, arg, 0);
}

function isBobFinished() {
	return (timer >= limit * 2);
}

function isResetFinished() {
	return (timer == 0);
}

function resetTimer() {
	timer = 0;
}

function playRandomFootstepsWood() {
	assignRandomFootstepsWoodToAudioSource();

	audio.Play();
}

function assignRandomFootstepsWoodToAudioSource() {
	audio.clip = footstepsWoodSounds[Random.Range(0, footstepsWoodSounds.length - 1)];
}