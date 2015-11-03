var AGENT_MAX_ID = 1;
function Agent(xStart,yStart) {
	this.id = AGENT_MAX_ID++;
	this.xStart = xStart ; this.yStart = yStart;
	console.log ("Agent: " + this.id);
}
