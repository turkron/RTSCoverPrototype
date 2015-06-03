#pragma strict

var agent: NavMeshAgent;
var targetPoint:Vector3;
var foundDestination:boolean = false;
var player:GameObject;
var inCover:boolean = false;
var range:int = 0;

function Start () {
agent = GetComponent.<NavMeshAgent>();
player = GameObject.Find("Player");
}

function Update () {

targetPoint = player.transform.position;

if(!inCover && foundDestination == false){
// look for cover.

if(range >= 20){
	range = 0;
}	
			range += 1;
			var Colliders : Collider[];
		
			Colliders = Physics.OverlapSphere(transform.position, range, 1);
				for(var i : int = 0; i<=Colliders.length-1; i++){
					if(Colliders[i].gameObject.tag == "CoverZone"){						
						targetPoint = Colliders[i].gameObject.transform.position;
						foundDestination = true;	
				}
			}	
}

if(foundDestination == true){
	agent.SetDestination(targetPoint);
}

}

function OnTriggerEnter (B:Collider){

if(B.gameObject.tag == "CoverZone"){
	inCover = true;
	
}

}