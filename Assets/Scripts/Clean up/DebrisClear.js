
var radius = 50.0;
var power = 30.0;
var boom : GameObject;

function OnTriggerEnter2D (coll : Collider2D) {
	if(coll.gameObject.name == "Missile"){
		Destroy(coll.gameObject);
		var thePos : Vector3 = transform.position;
		var cloneBoom = Instantiate(boom, thePos, Quaternion.identity);
		// Applies an explosion force to all nearby rigidbodies
		var colliders : Collider[] = Physics.OverlapSphere (thePos, radius);

		for (var hit : Collider in colliders) {

		 //Here the colliders with tag PhysAffected will be affected by the force
		 if (!hit && hit.collider.tag=="PhysAffected")
		     continue;
		 
		 if (hit.rigidbody)
		     hit.rigidbody.AddExplosionForce(power, thePos, radius, 3.0);
    }
	}
	Destroy(this.gameObject);
}