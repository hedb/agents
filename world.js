


function Grid() {
	this.obj = {};
}

Grid.prototype = {

	
		get:function(x,y) {
			var id = ""+x+"_"+y;
			var ret = this.obj[id];
			ret = (_.isUndefined(ret))?null:ret;
			return ret;
		},

		put:function(x,y,entry) {
			var id = ""+x+"_"+y;
			this.obj[id] = entry;
		},

		augment:function(x,y,n) {
			var entry = this.get(x,y);
			if (_.isNumber(entry)) {
				this.put(x,y,entry + n);
			} else if(_.isNull(entry) || _.isUndefined(entry)) {
				this.put(x,y,1);
			} else {
				console.log("Trying to augment an Object : " + entry);
				debugger
			}
		},

		forEachEntry:function(func) {
			_.each(this.obj,function(obj,id) {
				var dim = id.split("_")
				func(Number(dim[0]),Number(dim[1]),obj);
			})

		}

}
		
	

function World(canvas,config) {
	
	defaultConfig = {
			AGENT_SIZE: 10,
			step : function (world) {}
	}

	config = _.extend({},defaultConfig,config);


	this.canvas = canvas;
	this.agents = {};
	this.step = function (world,n) {
		if ( _.isUndefined(world) || _.isNull(world)  ||  _.isUndefined(n) || _.isNull(n)  ) {
			console.log("Step called with no params");
			return;
		}
		for (var i = 0;i<n;i++) {
			config.step(world);
		}
	}


	
	this.grid = new Grid();

	this.cloneGrid = function() {
		var ret = new Grid();
		return ret;
	}

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

	this.forEachAgent = function(func) {
		_.each(_.clone(this.agents),function(agent) {
			func(agent);
		});
	};

	this.removeAgent = function(agent) {
		delete this.agents[agent.id];

		this.grid.put(agent.x,agent.y,null);

		this.canvas.removeChild(agent.view,true);

	};

}