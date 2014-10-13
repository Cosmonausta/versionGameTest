var trailOpacity : float = 1.0f;

function Start () {
	yield WaitForSeconds(4);
	trailOpacity = 0.8;
	yield WaitForSeconds(2);
	trailOpacity = 0.5;
	yield WaitForSeconds(2);
	trailOpacity = 0.3;
	yield WaitForSeconds(1);
	Destroy(gameObject);
}

function Update () {
	GetComponent(SpriteRenderer).color.a = trailOpacity;
}