
function Update () {
	if(Input.GetKeyDown(KeyCode.LeftShift)){
		camera.orthographicSize = 30;
	}
	if(Input.GetKeyUp(KeyCode.LeftShift)){
		camera.orthographicSize = 15;
	}
}