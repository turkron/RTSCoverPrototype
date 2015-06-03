#pragma strict

function Start () {

}

function Update () {

}

static function AmISelectable(playerTeam:int, unitTeam:int):boolean{

if(playerTeam == unitTeam){
	return true;
} else {
	return false;
}

}