

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

	
	this.translateToViewDim = function(xIn,yIn) {
		var ret = {
			x:this.canvas.width / 2 + xIn*config.AGENT_SIZE,
			y:this.canvas.height / 2 + yIn*config.AGENT_SIZE
		}
		return ret;
	};


	this.addAgentsToWorld = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			var agent = arr[i];

			if (this.getAgent(agent.x,agent.y)==null) {
				
				// Generate View
				agent.view = canvas.display.rectangle({
					x:0, y:0,
					width: config.AGENT_SIZE,	height: config.AGENT_SIZE,
					fill: "#fff"
				}).add();

				this.moveAgentAbs(agent.x,agent.y,agent);
				this.agents[agent.id] = agent;

			} else {
				console.log("Collision")
			}

		}
		this.canvas.redraw();
	};

	this.moveAgentAbs = function(x,y,agent) {
			if (this.getAgent(x,y)==null) {
				
				this.grid.put(agent.x,agent.y,null);
				agent.x = x; agent.y = y;
				this.grid.put(agent.x,agent.y,agent);

				var dim = this.translateToViewDim(x,y);
				agent.view.x = dim.x; agent.view.y = dim.y;
				
			}
	}

	this.moveAgent = function(xD,yD,agent) {
		this.moveAgentAbs(agent.x+xD,agent.y+yD,agent)
	};

	this.removeAgent = function(agent) {
		this.agents[agent.id] = null;

		var dim = this.translateToViewDim(x,y);
		this.grid.put(agent.x,agent.y,null);

	};

}