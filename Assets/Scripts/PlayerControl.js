@HideInInspector
var damageColor : Color = Color.red;
@HideInInspector
var defaultColor : Color;
@HideInInspector
var damageState : boolean = false;
@HideInInspector
var isActive : boolean = false;
@HideInInspector
var isAlive : boolean = true;
@HideInInspector
var playerHealth : int;

var maxSpeed : float = 100f;
var moveForce : float = 50f;
var oreBlurponium : int;
var oreBlorponium : int;
var projectile : GameObject;
var blurpText : GUIText;
var blorpText : GUIText;
var healthText : GUIText;
var debris : GameObject; 

function Start() {
	blurpText = GameObject.Find("BlurpText").guiText;
	blorpText = GameObject.Find("BlorpText").guiText;
	healthText = GameObject.Find("HealthText").guiText;
	oreBlurponium = 0;
	oreBlorponium = 0;
	playerHealth = 3;
	UpdateBlurponium();
	UpdateBlorponium();
	UpdateHealth();
}

function UpdateBlurponium(){
	blurpText.text = "" + oreBlurponium;
}

function UpdateBlorponium(){
	blorpText.text = "" + oreBlorponium;
}

function UpdateHealth(){
	healthText.text = "Health: " + playerHealth;
	if(playerHealth <= 0){
		Death();
	}
}

function FixedUpdate() {

	if(Input.GetButtonDown("Fire1")){
		Fire();
	}
	if(Input.GetButtonDown("Boost")) {
		Boost();
	}
	
	transform.renderer.material.color = defaultColor;
	
	if(damageState){
		defaultColor = damageColor;
	}else if(isActive){
		defaultColor = Color.cyan;
	}else{
		defaultColor = Color.white;
	}
	
	if(!isAlive){
		moveForce = 0;
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
	if(!damageState){
		damageState = true;
		if(playerHealth > 0){
			playerHealth--;
		}
		UpdateHealth();
		if(isActive && isAlive){
			Boost();
		}
		yield WaitForSeconds (0.7);
		damageState = false;
	}
}

function Boost() {
	if(!isActive && !damageState){
		isActive = true;
		rigidbody2D.drag = 3;
	}else if(isActive){
		isActive = false;
		rigidbody2D.drag = 7;
	}
}

function Fire() {
	if(!damageState && isAlive) {
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
		cloneProjectile.gameObject.rigidbody2D.AddForce(cloneProjectile.transform.right * 18 * 100f);
		var mousePosition : Vector3 = worldMousePosition;
		
		//Debug.DrawLine(transform.position, mousePosition, Color.grey);
		yield WaitForSeconds(5);
		Destroy(cloneProjectile);
	}
}

function Death(){
	isAlive = false;
	var randDebris = Random.Range(8, 14);
	for (amount=0; amount<randDebris; amount++){
		Debris(); 
	}
	this.gameObject.renderer.enabled = false;
	yield WaitForSeconds(4);
	Application.LoadLevel("Level");
}

function Debris() {
	var thePos : Vector3 = transform.position;
	var randSpeed = Random.Range(40f, 65f);
	var cloneDebris = Instantiate(debris, thePos, Quaternion.identity);
	cloneDebris.gameObject.name = "Debris"; 
	var x = Random.Range(-1f, 1f);
	var y = Random.Range(-1f, 1f);
	var direction = Vector2(x, y);
	cloneDebris.gameObject.rigidbody2D.AddForce(direction * 10 * randSpeed);
	yield WaitForSeconds(45);
	Destroy(cloneDebris);
}

function OnTriggerEnter2D (coll : Collider2D) {
	if(coll.gameObject.name == "Asteroid")
	{
	SetDamageState();
	}
	if(coll.gameObject.name == "Blurponium") {
		oreBlurponium = oreBlurponium + 1;
		UpdateBlurponium();
	}
	if(coll.gameObject.name == "Blorponium") {
		oreBlorponium = oreBlorponium + 1;
		UpdateBlorponium();
	}
}

function OnCollisionEnter2D (coll : Collision2D) {
	if(coll.gameObject.name == "Debris") {
		SetDamageState();
	}
}