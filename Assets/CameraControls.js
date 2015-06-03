#pragma strict
var Xspeed:float;
var Yspeed:float;
var zoomSpeed:float;
var cameraDistanceMax:float = 20f;
var cameraDistanceMin:float  = 5f;
var cameraDistance:float  = 10f;
var lastXMousePos:float;
var invertCameraControl:boolean = false;
var totalAngleChange:float;
var angleDampener:float = 1f;
var LerpSmoothness:float;




function Start () {


}

function FixedUpdate () {

	if(GetComponent.<NetworkView>().isMine){ //allows the camera to be controlled by one player at a time.
	
	
	//increase pan speed if left shift key is down.
if(Input.GetKeyDown(KeyCode.LeftShift)){
	Xspeed = Xspeed * 2;
	Yspeed = Yspeed * 2;
} 

	// return it back to original speed when key is released.
if(Input.GetKeyUp(KeyCode.LeftShift)){
	Xspeed = Xspeed / 2;
	Yspeed = Yspeed / 2;
} 

// edge detection and keypress detection.
if(Input.mousePosition.x < Screen.width / 10 && Input.mousePosition.x > 0 || Input.GetKey(KeyCode.A)){
	this.transform.Translate(-Xspeed * Time.deltaTime,0,0);
}
if(Input.mousePosition.x > Screen.width - Screen.width / 10 && Input.mousePosition.x < Screen.width|| Input.GetKey(KeyCode.D)){
	this.transform.Translate(Xspeed * Time.deltaTime,0,0);
}
if(Input.mousePosition.y < Screen.height / 10 && Input.mousePosition.y > 0 || Input.GetKey(KeyCode.S)){
	this.transform.Translate(0,0,-Yspeed * Time.deltaTime);
}
if(Input.mousePosition.y > Screen.height - Screen.height / 10 && Input.mousePosition.y > Screen.height || Input.GetKey(KeyCode.W)){
	this.transform.Translate(0,0,Yspeed * Time.deltaTime);
}


// change this to ctl + mouse movement.
//if(Input.GetKey(".")){
//	this.transform.Rotate(0,-10 * Time.deltaTime,0);
//}
//if(Input.GetKey(",")){
//	this.transform.Rotate(0,10 * Time.deltaTime,0);
//}

if(Input.GetKey(KeyCode.LeftControl) || Input.GetMouseButton(2)){
	if(Input.mousePosition.x < lastXMousePos || Input.mousePosition.x > lastXMousePos){
		
		var targetAngle;
		
		totalAngleChange = Input.mousePosition.x - lastXMousePos;
		if(invertCameraControl){
		targetAngle = this.transform.eulerAngles.y + totalAngleChange /** angleDampener*/;
		} else {
		targetAngle = this.transform.eulerAngles.y - totalAngleChange /** angleDampener*/;
		}
		
		this.transform.eulerAngles.y = Mathf.Lerp(this.transform.eulerAngles.y, targetAngle, Time.deltaTime * LerpSmoothness);
	}

	
	
}


}else
    {
        SyncedMovement();
    }

}

function SyncedMovement(){

	syncTime += Time.deltaTime;
    this.transform.position = Vector3.Lerp(syncStartPosition, syncEndPosition, syncTime / syncDelay);

}

var lastSynchronizationTime:float = 0f;
var syncDelay:float = 0f;
var syncTime:float = 0f;
var syncStartPosition:Vector3 = Vector3.zero;
var syncEndPosition:Vector3 = Vector3.zero;
 

function OnSerializeNetworkView(stream:BitStream , info:NetworkMessageInfo)
{
	
    var syncPosition:Vector3 = Vector3.zero;
    
    if (stream.isWriting)
    {
        syncPosition = transform.position;
        stream.Serialize(syncPosition);
    }
    else
    {
        stream.Serialize(syncPosition);
 
        syncTime = 0f;
        syncDelay = Time.time - lastSynchronizationTime;
        lastSynchronizationTime = Time.time;
 
        syncStartPosition = transform.position;
        syncEndPosition = syncPosition;
    }
}

function LateUpdate(){

lastXMousePos = Input.mousePosition.x;
Input.mousePosition.x = Screen.width / 2;

}


function OnGUI() 
 {
 	//debug script for mouse pos.
     GUI.Box( Rect( (Screen.width / 2) - 140, 5, 280, 25 ), "Mouse Position = " + Input.mousePosition );
     GUI.Box( Rect( (Screen.width / 2) - 70, Screen.height - 30, 140, 25 ), "Mouse X = " + Input.mousePosition.x );
     GUI.Box( Rect( 5, (Screen.height / 2) - 12, 140, 25 ), "Mouse Y = " + Input.mousePosition.y );
 }