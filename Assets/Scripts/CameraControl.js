var GUIBlorp : GameObject;
var GUIBlurp : GameObject;
var blorpText : GameObject;
var blurpText : GameObject;

function Start () {
	GUIBlorp.gameObject.GetComponent.<Renderer>().enabled = true;
	GUIBlurp.gameObject.GetComponent.<Renderer>().enabled = true;
}

function Update () {
	if(Input.GetKeyDown(KeyCode.LeftShift)){
		GetComponent.<Camera>().orthographicSize = 45;
		GUIBlorp.gameObject.GetComponent.<Renderer>().enabled = false;
		GUIBlurp.gameObject.GetComponent.<Renderer>().enabled = false;
		blurpText.GetComponent.<GUIText>().enabled = false;
		blorpText.GetComponent.<GUIText>().enabled = false;
	}
	if(Input.GetKeyUp(KeyCode.LeftShift)){
		GetComponent.<Camera>().orthographicSize = 17;
		GUIBlorp.gameObject.GetComponent.<Renderer>().enabled = true;
		GUIBlurp.gameObject.GetComponent.<Renderer>().enabled = true;
		blurpText.GetComponent.<GUIText>().enabled = true;
		blorpText.GetComponent.<GUIText>().enabled = true;
	}
}
