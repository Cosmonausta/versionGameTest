var dist : float; 
var thisTransform : Transform;

function Start() {
	thisTransform = transform;
	var blurp : GameObject;
	
	var blurpPos : Vector2;
	var thePos : Vector2;
	
	yield WaitForSeconds(40);
	Destroy(gameObject);
}

function OnTriggerEnter2D(coll : Collider2D){
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
		rigidbody2D.AddForce(transform.right * 3 * 20f);
	}
}
