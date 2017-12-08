var moveForce : float = 100f;
var maxSpeed : float = 30f;
var trailObject : GameObject;


function FixedUpdate () {
	//Horizontal movement
	var horiz : float = 1;
	var vert : float = 1;
	
	var x = Random.Range(-1f, 1f);
	var y = Random.Range(-1f, 1f);
	var direction = Vector2(x, y);
	if(GetComponent.<Rigidbody2D>().velocity.x < maxSpeed){
		GetComponent.<Rigidbody2D>().AddForce(direction * 10 * moveForce);
	}
	if(Mathf.Abs(GetComponent.<Rigidbody2D>().velocity.x) > maxSpeed)
	// ... set the player's velocity to the maxSpeed in the x axis.
	{
	GetComponent.<Rigidbody2D>().velocity = new Vector2(Mathf.Sign(GetComponent.<Rigidbody2D>().velocity.x) * maxSpeed, GetComponent.<Rigidbody2D>().velocity.y);
	}
}

function Start () {
	var theScale : Vector3 = transform.localScale;
	while (true) {
		if(gameObject.name == "Asteroid"){
			yield WaitForSeconds(1);
			var cloneTrail = Instantiate(trailObject, transform.position, Quaternion.identity);
			cloneTrail.gameObject.name = "Trail";
		}else if(gameObject.name == "Dead Asteroid"){
			yield WaitForSeconds(4);
			var cloneTrailObject = Instantiate(trailObject, transform.position, Quaternion.identity);
			cloneTrailObject.gameObject.name = "Trail";
		}
	}
}

function OnTriggerEnter2D (coll : Collider2D) {
	if(coll.gameObject.name == "StunBolt"){
		GetComponent.<Rigidbody2D>().drag = 1;
		yield WaitForSeconds(3);
		GetComponent.<Rigidbody2D>().drag = 0;
	}
}
