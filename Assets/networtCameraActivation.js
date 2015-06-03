#pragma strict

function Start () {

if(this.transform.parent.GetComponent(NetworkView).GetComponent.<NetworkView>().isMine){
	this.GetComponent(Camera).enabled = true;
}

}

function Update () {

}