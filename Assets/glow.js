#pragma strict

var speed:float = 0.1f;

function Update () {
transform.eulerAngles += new Vector3(0,speed,0);

}