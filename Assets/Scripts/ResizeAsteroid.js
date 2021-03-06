﻿
var damageColor : Color = Color.red;
var defaultColor : Color = Color.white;
@HideInInspector
var damageState : boolean = false;
@HideInInspector
var randomNum = new Array();

var health : int;
var debris : GameObject;
var ore : GameObject[];

function Awake() {
	health = 4;
}

function Start() {
	var randomNum  = [6f, 6f, 6f, 6f, 12f, 12f, 12f, 12f, 
					  12f, 12f, 24f, 24f, 24f, 24f, 96f];
	var randomSize = randomNum[Random.Range(0, randomNum.length)];
	transform.localScale.x = randomSize;
	transform.localScale.y = randomSize;
	if(transform.localScale.x > 24f){
		health = 8;
	}
}

function FixedUpdate() {
	if(damageState){
		transform.GetComponent.<Renderer>().material.color = damageColor;
	}else{
		transform.GetComponent.<Renderer>().material.color = defaultColor;
	}
	if(Input.GetButtonDown("Weapon 1")) {
		Debris();
		Resize();
	}
}

function Resize() {
	var theScale : Vector3 = transform.localScale;
	
	theScale.x = theScale.x / 2;
	theScale.y = theScale.y / 2;
	transform.localScale = theScale;
	
	var randNum = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 8];
	var randOreDrop = randNum[Random.Range(0, randNum.length)];
	
	//Asteroid explode
	if(theScale.x <= 3){
		for (amount=0; amount<8; amount++){
			Debris(); 
		}
		for (amount=0; amount<randOreDrop; amount++){ 
			OreDrop();
		}
		defaultColor = Color.grey;
		gameObject.name = "Dead Asteroid";
		GetComponent.<Rigidbody2D>().drag = 0.5;
	}
}

function OnTriggerEnter2D (coll : Collider2D) {
	var theScale : Vector3 = transform.localScale;
	var amount = 0;
	
	if(coll.gameObject.name == "Projectile" || coll.gameObject.name == "Missile" 
		|| coll.gameObject.name == "StunBolt") {
		SetDamageState();
		if(coll.gameObject.name == "Projectile"){
			health--;
		}else if(coll.gameObject.name == "Missile"){
			health = 0;
		}
		//Check if asteroid is dead
		if(this.gameObject.name == "Asteroid"){
			var randDebris = Random.Range(1,3);
			for (amount=0; amount<randDebris; amount++)
				Debris(); 
		}
		if(health == 0 && theScale.x > 3){
			Resize();
			if(transform.localScale.x > 24f){
				health = 8;
			}else{
				health = 4;
			}
			for (amount=0; amount<4; amount++)
				Debris(); 
		}
	}
	if(coll.gameObject.name == "Asteroid") {
		if(theScale.x > 3){
			SetDamageState();
			Resize();
			health = 4;
			for (amount=0; amount<20; amount++)
				Debris(); 
		}
	}
	if(coll.gameObject.name == "StunBolt"){
			SetDamageState();
			yield WaitForSeconds (0.3);
			SetDamageState();
			yield WaitForSeconds (0.3);
			SetDamageState();
			yield WaitForSeconds (0.3);
			SetDamageState();
			yield WaitForSeconds (0.3);
			SetDamageState();
			yield WaitForSeconds (0.3);
			SetDamageState();
		}
}

function Debris() {
	var thePos : Vector3 = transform.position;
	var speedRange = Random.Range(40f, 65f);
	var speedArray = [speedRange, speedRange, speedRange, speedRange,
					  speedRange, speedRange, speedRange, speedRange, 120f];
	var randSpeed = speedArray[Random.Range(0, speedArray.length)];
	var cloneDebris = Instantiate(debris, thePos, Quaternion.identity);
	cloneDebris.gameObject.name = "Debris";
	var x = Random.Range(-1f, 1f);
	var y = Random.Range(-1f, 1f);
	var direction = Vector2(x, y);
	cloneDebris.gameObject.GetComponent.<Rigidbody2D>().AddForce(direction * 10 * randSpeed);
	yield WaitForSeconds(45);
	Destroy(cloneDebris);
}

function OreDrop() {
	var thePos : Vector3 = transform.position;
	var weightedRandomNum = Random.Range(0, 10);
	
	randomNum = ["Blurponium", "Blorponium"];
	var randomOre = randomNum[Random.Range(0, randomNum.length)];
	if(weightedRandomNum < 6){
		randomOre = "Blurponium";
	}else if(weightedRandomNum >= 6){
		randomOre = "Blorponium";
	}
	
	switch(randomOre){
	case "Blurponium":
	
		var cloneBlurpOre = Instantiate(ore[0], thePos, Quaternion.identity);
		cloneBlurpOre.gameObject.name = "Blurponium";
		var blurpX = Random.Range(-1f, 1f);
		var blurpY = Random.Range(-1f, 1f);
		var blurpDirection = Vector2(blurpX, blurpY);
		cloneBlurpOre.gameObject.GetComponent.<Rigidbody2D>().AddForce(blurpDirection * 7 * 30f);
		break;
	
	case "Blorponium":
	
		var cloneBlorpOre = Instantiate(ore[1], thePos, Quaternion.identity);
		cloneBlorpOre.gameObject.name = "Blorponium";
		var blorpX = Random.Range(-1f, 1f);
		var blorpY = Random.Range(-1f, 1f);
		var blorpDirection = Vector2(blorpX, blorpY);
		cloneBlorpOre.gameObject.GetComponent.<Rigidbody2D>().AddForce(blorpDirection * 7 * 30f);
		break;
	}
}

function SetDamageState() {
	damageState = true;
	yield WaitForSeconds (0.1);
	damageState = false;
}