var AGENT_MAX_ID = 1;
function Agent(x,y) {
	this.id = AGENT_MAX_ID++;
	this.x = x ; this.y = y;
	console.log ("Agent: " + this.id);
}
