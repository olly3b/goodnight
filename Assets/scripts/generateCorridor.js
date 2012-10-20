#pragma strict

var smallCorridor : GameObject;
var mediumCorridor : GameObject;
var largeCorridor : GameObject;
var corridorEnd : GameObject;
var corridorEndDoor : GameObject;
var corridorDoorPiece : GameObject;
var corridorDoubleDoorPiece : GameObject;
var room9x9 : GameObject;
var lightTrap : GameObject;

var corridorSize : int;
var maxLights: int;

var currentPos : float;
var pos: Vector3;
var rnd: int;
	
var roomArrayLength : int;
var corridorArrayLength : int;
var lightArrayLength : int;

var lights : GameObject[];
var corridor : GameObject[];
var room : GameObject[];

function Start () { 	

	Screen.showCursor = false;

	initialize(5, 3);
		
	generateCorridorEndDoor(corridorArrayLength, false);	

	for (var i = 0; i < corridorSize; i++) {
		
		generateNewCorridorPiece(corridorArrayLength);
		
		if (i < corridorSize - 1) {
			generateNewDoorPiece(corridorArrayLength);	
		}
	}		
	
	generateCorridorEndDoor(corridorArrayLength, true);	
} 

function generateCorridorEndDoor(corridorArrayLength : int, end : boolean) {

	if (end) {
		currentPos -= 6;
	}
	
	pos = Vector3(0, 0, currentPos - 0.5);
	corridor[corridorArrayLength] = Instantiate(corridorEndDoor, pos, transform.rotation);	
	
	if (end) {
		corridor[corridorArrayLength].transform.Rotate(0, 270, 0);
	} else {		
		corridor[corridorArrayLength].transform.Rotate(0, 90, 0);
	}
	
	corridorArrayLength++;
	
	currentPos += 3;
}

function generateNewCorridorPiece(corridorArrayLength : int) {

	rnd = Random.Range(0, 3);	
	pos = Vector3(0, 0, currentPos);	
		
	switch (rnd) {
		case 0:		
			corridor[corridorArrayLength] = Instantiate(smallCorridor, pos, transform.rotation);	
			generateLight(Vector3(0, 1.4199, currentPos));					
			currentPos += 10;							
		break;
		case 1:
			currentPos += 5;
			pos = Vector3(0, 0, currentPos);
			corridor[corridorArrayLength] = Instantiate(mediumCorridor, pos, transform.rotation);
			generateLight(Vector3(0, 1.4199, currentPos));	
			currentPos += 15;
		break;
		case 2:
			currentPos += 10;
			pos = Vector3(0, 0, currentPos);
			corridor[corridorArrayLength] = Instantiate(largeCorridor, pos, transform.rotation);
			generateLight(Vector3(0, 1.4199, currentPos));	
			currentPos += 20;
		break;
	}	
	
	corridorArrayLength++;
}

function generateNewDoorPiece(corridorArrayLength : int) {

	rnd = Random.Range(0, 2);
				
	switch (rnd) {
		case 0:
			currentPos -= 4;
			pos = Vector3(0, 0, currentPos + 0.5);					
			corridor[corridorArrayLength] = Instantiate(corridorDoorPiece, pos, transform.rotation);			
			generateRoom(false);	
			currentPos += 7;														
		break;
		case 1:
			currentPos -= 4;
			pos = Vector3(0, 0, currentPos + 0.5);					
			corridor[corridorArrayLength] = Instantiate(corridorDoubleDoorPiece, pos, transform.rotation);	
					
			generateRoom(false);
			generateRoom(true);	
			currentPos += 7;					
		break;
	}
	
	generateLight(Vector3(0, 1.4199, currentPos));
	
	corridorArrayLength++;
}

function generateRoom(left : boolean) {

	if (left) {
		pos = Vector3(-6.1, 0, currentPos + 0.5);
		room[roomArrayLength] = Instantiate(room9x9, pos, transform.rotation);
		room[roomArrayLength].transform.Rotate(0, 90, 0);	
		
		generateLight(Vector3(-6.1, 1.4199, currentPos));
	} else {
		pos = Vector3(6.1, 0, currentPos + 0.5);
		room[roomArrayLength] = Instantiate(room9x9, pos, transform.rotation);
		room[roomArrayLength].transform.Rotate(0, 270, 0);
		
		generateLight(Vector3(6.1, 1.4199, currentPos));
	}
		
	roomArrayLength++;
							
	
}

function generateLight(move : Vector3) {
			
	if (lightArrayLength < maxLights) {				
		rnd = Random.Range(0, maxLights);
		
		switch (rnd) {
			case 0:
				lights[lightArrayLength] = Instantiate(lightTrap, move, transform.rotation);
				lightArrayLength++;				
			break;
		}
	}
}

function initialize(corridorSize : int, maxLights : int) {
	this.corridorSize = corridorSize;
	this.maxLights = maxLights;
	
	roomArrayLength = 0;
	corridorArrayLength = 0;
	lightArrayLength = 0;
	
	corridor = new GameObject[corridorSize]; 
	room = new GameObject[(corridorSize - 1) * 2]; 
	lights = new GameObject[maxLights];
}

function Update () {

}