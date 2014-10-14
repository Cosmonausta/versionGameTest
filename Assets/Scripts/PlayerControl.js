@HideInInspector
var damageColor : Color = Color.red;
@HideInInspector
var damageState : boolean = false;

var maxSpeed : float = 100f;
var moveForce : float = 50f;
var oreBlurponium : int;
var oreBlorponium : int;
var projectile : GameObject;

function FixedUpdate() {

	if(Input.GetButtonDown("Fire1")){
		Fire();
	}
	if(Input.GetButtonDown("Boost")) {
		rigidbody2D.drag = 3;
	}
	if(Input.GetButtonUp("Boost")) {
		rigidbody2D.drag = 7;
	}
	
	if(damageState){
		transform.renderer.material.color = damageColor;
	}else{
		transform.renderer.material.color = Color.white;
	}
	
	//Horizontal movement
	var horiz : float = Input.GetAxis("Horizontal");
	var vert : float = Input.GetAxis("Vertical");
	
	//Horizontal movement
	if(horiz * rigidbody2D.velocity.x < maxSpeed)
	// ... add a force to the player.
	{
		rigidbody2D.AddForce(Vector2.right * horiz * moveForce);
	}
	// If the player's horizontal velocity is greater than the maxSpeed...
	if(Mathf.Abs(rigidbody2D.velocity.x) > maxSpeed)
	// ... set the player's velocity to the maxSpeed in the x axis.
	{
	rigidbody2D.velocity = new Vector2(Mathf.Sign(rigidbody2D.velocity.x) * maxSpeed, rigidbody2D.velocity.y);
	}
	
	//Vertical movement
	if(vert * rigidbody2D.velocity.y < maxSpeed)
	// ... add a force to the player.
	{
		rigidbody2D.AddForce(Vector2.up * vert * moveForce);
	}
	// If the player's horizontal velocity is greater than the maxSpeed...
	if(Mathf.Abs(rigidbody2D.velocity.y) > maxSpeed)
	// ... set the player's velocity to the maxSpeed in the x axis.
	{
	rigidbody2D.velocity = new Vector2(Mathf.Sign(rigidbody2D.velocity.y) * maxSpeed, rigidbody2D.velocity.y);
	}
	
	if(Input.GetButtonDown("Restart")) {
		Application.LoadLevel("Level");
	}
}

function SetDamageState() {
	damageState = true;
	yield WaitForSeconds (2);
	damageState = false;
}

function Fire() {
	if(!damageState) {
		var mousePos = Input.mousePosition;
		var thePos : Vector3 = transform.position;      
		//The distance from the camera to the player object
		mousePos.z = (transform.position.z - Camera.main.transform.position.z); 	
		var worldMousePosition = Camera.main.ScreenToWorldPoint (mousePos);
		var direction = worldMousePosition - transform.position;
		var angle = Mathf.Atan2 (direction.y, direction.x) * Mathf.Rad2Deg;
		var cloneProjectile = Instantiate(projectile, thePos, Quaternion.identity);
		cloneProjectile.gameObject.name = "Projectile";
		cloneProjectile.transform.rotation = Quaternion.AngleAxis (angle, Vector3.forward);
		cloneProjectile.gameObject.rigidbody2D.AddForce(cloneProjectile.transform.right * 12 * 100f);
		var mousePosition : Vector3 = worldMousePosition;
		
		Debug.DrawLine(transform.position, mousePosition, Color.grey);
		yield WaitForSeconds(5);
		Destroy(cloneProjectile);
	}
}

function OnTriggerEnter2D (coll : Collider2D) {
	if(coll.gameObject.name == "Asteroid")
	{
	SetDamageState();
	}
}

function OnCollisionEnter2D (coll : Collision2D) {
	if(coll.gameObject.name == "Debris") {
		SetDamageState();
	}
	if(coll.gameObject.name == "Blurponium") {
		oreBlurponium++;
	}
	if(coll.gameObject.name == "Blorponium") {
		oreBlorponium++;
	}
}









