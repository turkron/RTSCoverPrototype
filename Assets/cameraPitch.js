#pragma strict

var lastYMousePos:float;
var invertCameraControl:boolean = false;
var totalAngleChange:float;
var angleDampener:float = 1f;
var maxPitchAngle:float = 65f;
var minPitchAngle:float = 1f;
var LerpSmoothness:float;

function Start () {

}

function Update () {

if(Input.GetKey(KeyCode.LeftControl) || Input.GetMouseButton(2)){
	if(Input.mousePosition.y < lastYMousePos || Input.mousePosition.y > lastYMousePos){
		
		var targetAngle;
		
		totalAngleChange = Input.mousePosition.y - lastYMousePos;
		if(invertCameraControl){
		if(this.transform.eulerAngles.x + totalAngleChange * angleDampener > minPitchAngle && this.transform.eulerAngles.x + totalAngleChange * angleDampener < maxPitchAngle){
		targetAngle = this.transform.eulerAngles.x + totalAngleChange * angleDampener;
		} 
		}
		if(!invertCameraControl){
		if(this.transform.eulerAngles.x - totalAngleChange * angleDampener > minPitchAngle && this.transform.eulerAngles.x - totalAngleChange * angleDampener < maxPitchAngle){
		targetAngle = this.transform.eulerAngles.x - totalAngleChange * angleDampener;
		}
		}
			this.transform.eulerAngles.x = Mathf.Lerp(this.transform.eulerAngles.x, targetAngle, LerpSmoothness * Time.deltaTime);
	}
}

}

function LateUpdate(){

lastYMousePos = Input.mousePosition.y;
Input.mousePosition.y = Screen.height / 2;

}