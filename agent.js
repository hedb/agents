

var // Globals
	AGENT_MAX_ID = 1,
	N8_diffs = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]
;
		


function Agent(x,y) {
	this.id = AGENT_MAX_ID++;
	this.x = x ; this.y = y;
	console.log ("Agent: " + this.id);
}


Agent.prototype = {
	forEach_8_Neighbours: function (world,func) {
		for (var i = 0; i < N8_diffs.length; i++) {
			var x = this.x+N8_diffs[i][0], y = this.y+N8_diffs[i][1];
			func(x,y,world.getAgent(x,y));
		}
	}
}

