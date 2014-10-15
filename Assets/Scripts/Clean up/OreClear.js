var dist : float; 
var thisTransform : Transform;

function Start() {
	thisTransform = transform;
	var blurp : GameObject;
	
	var blurpPos : Vector2;
	var thePos : Vector2;
	
	yield WaitForSeconds(20);
	Destroy(gameObject);
}

function OnCollisionEnter2D(coll : Collision2D){
	if(coll.gameObject.name == "Blurp"){
		Destroy(gameObject);
	}
}

function FixedUpdate() {
	blurp = GameObject.Find("Blurp");
	blurpDamageState = blurp.gameObject.GetComponent(PlayerControl);
	thePos = this.transform.position;
	blurpPos = blurp.transform.position;
     
	dist = (thePos - blurpPos).magnitude;

	if (dist < 6 && !blurpDamageState.damageState) {
		var direction = blurpPos - thePos;
		var angle = Mathf.Atan2 (direction.y, direction.x) * Mathf.Rad2Deg;
		transform.rotation = Quaternion.AngleAxis (angle, Vector3.forward);
		rigidbody2D.AddForce(transform.right * 5 * 20f);
	}

}
