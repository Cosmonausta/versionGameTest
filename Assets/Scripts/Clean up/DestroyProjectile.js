var boom : GameObject;

function OnTriggerEnter2D (coll : Collider2D) {
	Destroy(gameObject);
	var thePos : Vector3 = transform.position;
	var cloneBoom = Instantiate(boom, thePos, Quaternion.identity);
	
}



