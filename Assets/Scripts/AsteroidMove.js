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
	if(rigidbody2D.velocity.x < maxSpeed){
		rigidbody2D.AddForce(direction * 10 * moveForce);
	}
	if(Mathf.Abs(rigidbody2D.velocity.x) > maxSpeed)
	// ... set the player's velocity to the maxSpeed in the x axis.
	{
	rigidbody2D.velocity = new Vector2(Mathf.Sign(rigidbody2D.velocity.x) * maxSpeed, rigidbody2D.velocity.y);
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




