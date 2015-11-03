

function World(canvas,config) {
	
	this.canvas = canvas;

	this.agents = {};
	
	this.grid = {
		columns:{},
		get:function(x,y) {
			var ret = null;
			var col = this.columns[x];
			if (col != null) {
				ret = col[y];
			}
			return ret;
		},

		put:function(x,y,agent) {
			var col = this.columns[x];
			if (col == null) {
				col = this.columns[x] = {};
			}
			col[y] = agent;

		}
	};

	this.getAgent = function(x,y) {
		return this.grid.get(x,y);
	};

	this.addAgentsToWorld = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			var agent = arr[i];
			var x = canvas.width / 2 + agent.xStart*config.AGENT_SIZE,
				y = canvas.height / 2 + agent.yStart*config.AGENT_SIZE;
			if (this.getAgent(x,y)==null) {
				agent.view = canvas.display.rectangle({
					x:0, y:0,
					width: config.AGENT_SIZE,	height: config.AGENT_SIZE,
					fill: "#fff"
				}).add();
				this.placeAgent(x,y,agent);
				this.agents[agent.id] = agent;
			} else {
				console.log("Collision")
			}
		}
	};

	this.placeAgent = function(x,y,agent) {
			if (this.getAgent(x,y)==null) {
				this.grid.put(agent.view.x,agent.view.y,null);
				agent.view.x = x; agent.view.y = y;
				this.grid.put(agent.view.x,agent.view.y,agent);
			}
	}

	this.moveAgent = function(xD,yD,agent) {
		this.placeAgent(agent.view.x+xD,agent.view.y+yD,agent)
	};

	this.removeAgent = function(agent) {
		this.agents[agent.id] = null;
		this.grid.put(agent.view.x,agent.view.y,null);
	};

}