#pragma strict
var Debris : Transform;

function Start () {
	Destroy(Debris.gameObject, 5);
}