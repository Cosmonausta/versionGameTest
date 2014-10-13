var asteroid : GameObject;
var minX : float = -600;
var maxX : float = 600;
var minY : float = -600;
var maxY : float = 600;
var spawnTime : float;
var spawnDelay : float = 4f;

function Start () {
	var amount = 0;
	InvokeRepeating("Spawn", spawnDelay, spawnTime);
	for (amount=0; amount<20; amount++)
		Spawn(); 
}

function Spawn () {
	spawnTime = Random.Range(6f, 10f);
	var pos : Vector3 = Vector3(Random.Range(minX, maxX), Random.Range(minY, maxY), 0.0);
	var cloneAsteroid = Instantiate(asteroid, pos, Quaternion.identity);
	cloneAsteroid.gameObject.name = "Asteroid";
}