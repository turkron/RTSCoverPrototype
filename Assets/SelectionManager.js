#pragma strict
 import System.Collections.Generic;


var selectionHighlighter: Texture2D;
static var selection: Rect = new Rect(0,0,0,0);
var startClick: Vector3 = -Vector3.one;
static var moveToDestination:Vector3 = Vector3.zero;

function Start () {

}

function Update () {

CheckCamera();
CleanUp();

}

function CheckCamera(){

if(Input.GetMouseButtonDown(0)){
	startClick = Input.mousePosition;
} else if (Input.GetMouseButtonUp(0)){

	startClick = -Vector3.one;

	}
	
	if(Input.GetMouseButton(0)){
		selection = new Rect(startClick.x,InvertMouseY(startClick.y), Input.mousePosition.x - startClick.x, InvertMouseY(Input.mousePosition.y)- InvertMouseY(startClick.y));
		
	if(selection.width < 0){
		selection.x += selection.width;
		selection.width = -selection.width;
	}
	if(selection.height < 0){
		selection.y += selection.height;
		selection.height = -selection.height;
	}
	
	}
}

static function InvertMouseY(y:float){
	return Screen.height - y;
}

function CleanUp(){
	if(!Input.GetMouseButtonUp(1)){
		moveToDestination = Vector3.zero;
	}
}

static function GetDestination(mycamera:GameObject):Vector3 {
	if(moveToDestination == Vector3.zero){
		var hit:RaycastHit;
		var r:Ray = mycamera.GetComponent(Camera).ScreenPointToRay(Input.mousePosition);
			if(Physics.Raycast(r,hit)){
				while(hit.transform.gameObject.tag != "Floor"){
					if(!Physics.Raycast(hit.point + r.direction * 0.1f, r.direction, hit)){
						break;
					}
				}
			}
			
			if(hit.transform != null){
				moveToDestination = hit.point;
			}
			
	}
	return moveToDestination;
}

function OnGUI(){
	if(startClick != -Vector3.one){
	GUI.color = new Color(1,1,1,0.5);
	GUI.DrawTexture(selection,selectionHighlighter);
	}

}