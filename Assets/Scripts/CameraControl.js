
function Update () {
	if(Input.GetKeyDown(KeyCode.LeftShift)){
		camera.orthographicSize = 45;
	}
	if(Input.GetKeyUp(KeyCode.LeftShift)){
		camera.orthographicSize = 17;
	}
}