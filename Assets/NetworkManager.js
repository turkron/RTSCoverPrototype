#pragma strict

var typeName:String = "UniqueGameName";
var gameName:String = "RMRoomName";
var hostList:HostData[]; 
var playerPrefab:GameObject;
var unitPrefab:GameObject;
static var cameraArray:Array = new Array();

function Start () {

}

function Update () {

print (cameraArray.length);

}


function StartServer()
{
    Network.InitializeServer(4, 25000, !Network.HavePublicAddress());
    MasterServer.RegisterHost(typeName, gameName);
    
    //Run this to run the server on a local machine;
    //MasterServer.ipAddress = “127.0.0.1″;
}

function OnServerInitialized()
{
    Debug.Log("Server Initializied");
    SpawnPlayer();
}
 
function RefreshHostList()
{
    MasterServer.RequestHostList(typeName);
}
 
function OnMasterServerEvent(msEvent:MasterServerEvent)
{
    if (msEvent == MasterServerEvent.HostListReceived)
        hostList = MasterServer.PollHostList();
}

function JoinServer(hostData:HostData)
{
    Network.Connect(hostData);
}
 
function OnConnectedToServer()
{
    Debug.Log("Server Joined");
    SpawnPlayer();
}

function SpawnPlayer()
{
   var playerCamera = Network.Instantiate(playerPrefab, new Vector3(14.98173f, 8.972565f, -14.18937f), Quaternion.identity, 0);
   var unit = Network.Instantiate(unitPrefab, new Vector3(14.98f, 0.2f, -9.23f), Quaternion.identity, 0);
   unit.gameObject.GetComponent(Unit).myCamera = playerCamera.gameObject.transform.GetChild(0).gameObject;
   cameraArray.push(playerCamera);
}

function OnGUI()
{
 if (!Network.isClient && !Network.isServer)
    {
        if (GUI.Button(new Rect(100, 100, 250, 100), "Start Server"))
            StartServer();
 
        if (GUI.Button(new Rect(100, 250, 250, 100), "Refresh Hosts"))
            RefreshHostList();
 
        if (hostList != null)
        {
        	var i:int;
            for (i = 0; i < hostList.Length; i++)
            {
                if (GUI.Button(new Rect(400, 100 + (110 * i), 300, 100), hostList[i].gameName))
                    JoinServer(hostList[i]);
            }
        }
    }
}


