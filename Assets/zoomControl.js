#pragma strict
var zoomSpeed:float;
var cameraDistanceMax:float = 20f;
var cameraDistanceMin:float  = 5f;
var cameraDistance:float  = 10f;

function Start () {

}

function Update () {

if(Input.GetKey(KeyCode.Z)){
	if(cameraDistance > cameraDistanceMin)
	{
	transform.Translate(Vector3.up * 0.1 * zoomSpeed * Time.deltaTime);
	cameraDistance -= 0.1;
	} else {
	transform.Translate(Vector3.up * -0.1 * zoomSpeed * Time.deltaTime);
	cameraDistance -= -0.1;
	}
}

if(Input.GetKey(KeyCode.X)){
	if(cameraDistance < cameraDistanceMax)
	{
	transform.Translate(Vector3.up * -0.1 * zoomSpeed * Time.deltaTime);
	cameraDistance -= -0.1;
	} else {
	transform.Translate(Vector3.up * 0.1 * zoomSpeed * Time.deltaTime);
	cameraDistance -= 0.1;
	}
}


if(Input.GetAxisRaw("Mouse ScrollWheel") >= 0.1 && cameraDistance > cameraDistanceMin || Input.GetKey(KeyCode.Z)){
	print("zoom in");
	cameraDistance -= -0.1;
	transform.Translate(Vector3.up * 0.1 * zoomSpeed * Time.deltaTime);
	}

if(Input.GetAxisRaw("Mouse ScrollWheel") <= -0.1 && cameraDistance < cameraDistanceMax || Input.GetKey(KeyCode.X)){
	print("zoom out");
	cameraDistance -= 0.1;
	transform.Translate(Vector3.up * -0.1 * zoomSpeed * Time.deltaTime);
}


}