var GUIBlorp : GameObject;
var GUIBlurp : GameObject;
var blorpText : GameObject;
var blurpText : GameObject;

function Start () {
	GUIBlorp.gameObject.renderer.enabled = true;
	GUIBlurp.gameObject.renderer.enabled = true;
}

function Update () {
	if(Input.GetKeyDown(KeyCode.LeftShift)){
		camera.orthographicSize = 45;
		GUIBlorp.gameObject.renderer.enabled = false;
		GUIBlurp.gameObject.renderer.enabled = false;
		blurpText.guiText.enabled = false;
		blorpText.guiText.enabled = false;
	}
	if(Input.GetKeyUp(KeyCode.LeftShift)){
		camera.orthographicSize = 17;
		GUIBlorp.gameObject.renderer.enabled = true;
		GUIBlurp.gameObject.renderer.enabled = true;
		blurpText.guiText.enabled = true;
		blorpText.guiText.enabled = true;
	}
}
