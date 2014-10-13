var dist : float; 
var thisTransform : Transform;

function Start() {
	thisTransform = transform;
	var blurp : GameObject;
	/*blurp = GameObject.Find("Blurp");*/
	
	var blurpPos : Vector2;
	var thePos : Vector2;
	/*thePos = this.transform.position;
	blurpPos = blurp.transform.position;
	*/
	yield WaitForSeconds(1);
	Debug.Log(dist);
	yield WaitForSeconds(1);
	Debug.Log(dist);
	yield WaitForSeconds(1);
	Debug.Log(dist);
	yield WaitForSeconds(1);
	Debug.Log(dist);
	yield WaitForSeconds(1);
	Debug.Log(dist);
	//Destroy(gameObject);
}

function OnCollisionEnter2D(coll : Collision2D){
	if(coll.gameObject.name == "Blurp"){
		Destroy(gameObject);
	}
}

function Update () {
	/*var blurpPos : Vector2;
	var thePos : Vector2;*/
	blurp = GameObject.Find("Blurp");
	thePos = this.transform.position;
	blurpPos = blurp.transform.position;
	//Debug.Log(blurpPos);
     
	dist += (this.transform.position - blurp.transform.position).magnitude;
	if (dist < 1000) {
		var direction = blurpPos - thePos;
		var angle = Mathf.Atan2 (direction.y, direction.x) * Mathf.Rad2Deg;
		transform.rotation = Quaternion.AngleAxis (angle, Vector3.forward);
		rigidbody2D.AddForce(transform.right * 5 * 10f);
	}
	
	thisTransform.position.x = Mathf.Lerp
     (thisTransform.position.x, blurpPos.position.x, Time.deltaTime);
 
     thisTransform.position.y = Mathf.Lerp
     (thisTransform.position.y, blurpPos.position.y, Time.deltaTime);
}

/*function LateUpdate()
    {
 
     thisTransform.position.x = Mathf.Lerp
     (thisTransform.position.x, blurpPos.position.x, Time.deltaTime);
 
     thisTransform.position.y = Mathf.Lerp
     (thisTransform.position.y, blurpPos.position.y, Time.deltaTime);
 
    }*/