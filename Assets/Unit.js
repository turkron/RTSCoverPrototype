var selected:boolean = false;
var moveToDest:Vector3 = Vector3.zero;
var floorOffset:float = 1;
var selectedByClick:boolean = false;
var selectionGlow:GameObject = null;
var glow:GameObject = null;
var myCamera:GameObject;

function Start () {

}

function Update () {

 if (GetComponent.<NetworkView>().isMine)
    {
    
    GameObject.Find("Main Camera");
    
	if(GetComponent.<Renderer>().isVisible == true && Input.GetMouseButton(0)){
	
		if(!selectedByClick){	
			var camPos:Vector3 = myCamera.GetComponent(Camera).WorldToScreenPoint(transform.position);
			camPos.y = SelectionManager.InvertMouseY(camPos.y);
			selected = SelectionManager.selection.Contains(camPos);
		}
		
		if(selected == true && glow == null){
			glow = GameObject.Instantiate(selectionGlow);
			glow.transform.parent = transform;
			glow.transform.localPosition = new Vector3(0,-GetComponent(MeshFilter).mesh.bounds.extents.y,0);
		} else if (!selected && glow != null){
			GameObject.Destroy(glow);
			glow = null;
		}
		
	
	}
	
	if(selected && Input.GetMouseButtonUp(1)){
	
		var destination:Vector3 = SelectionManager.GetDestination(myCamera);
			if(destination != Vector3.zero){
				gameObject.GetComponent(NavMeshAgent).SetDestination(destination);	
			}
	
	}

	} else {
	
		SyncedMovement();
	}

}

function OnMouseDown (){
	selectedByClick = true;
	selected = true;
}

function OnMouseUp () {
	if(selectedByClick){
		selected = true;
		selectedByClick = false;
	}

}

function SyncedMovement(){

	syncTime += Time.deltaTime;
    GetComponent.<Rigidbody>().position = Vector3.Lerp(syncStartPosition, syncEndPosition, syncTime / syncDelay);

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
        syncPosition = GetComponent.<Rigidbody>().position;
        stream.Serialize(syncPosition);
    }
    else
    {
        stream.Serialize(syncPosition);
 
        syncTime = 0f;
        syncDelay = Time.time - lastSynchronizationTime;
        lastSynchronizationTime = Time.time;
 
        syncStartPosition = GetComponent.<Rigidbody>().position;
        syncEndPosition = syncPosition;
    }
}