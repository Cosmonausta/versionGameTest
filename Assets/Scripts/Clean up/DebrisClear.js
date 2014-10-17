

function OnTriggerEnter2D (coll : Collider2D) {
	if(coll.gameObject.name == "Projectile") {
		Destroy(this.gameObject);
	}
}