function Update() {
	var cam : Transform = Camera.main.transform;
	var hit : RaycastHit;

	if (Physics.Raycast (cam.position, cam.forward, hit, 500)) {
		guiText.text = hit.collider.name;
	}
}