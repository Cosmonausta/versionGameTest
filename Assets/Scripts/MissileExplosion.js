var radius = 5.0;
var power = 10.0;
function OnTriggerEnter2D (coll : Collider2D) {
	if(coll.gameObject.name == "Debris"){
	// Applies an explosion force to all nearby rigidbodies
	var explosionPos : Vector3 = transform.position;
	var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);

	for (var hit : Collider in colliders) {

	 //Here the colliders with tag PhysAffected will be affected by the force
	 if (!hit && hit.GetComponent.<Collider>().tag=="PhysAffected")
	     continue;
	 
	 if (hit.GetComponent.<Rigidbody>())
	     hit.GetComponent.<Rigidbody>().AddExplosionForce(power, explosionPos, radius, 3.0);
    }
	}
}