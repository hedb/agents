


var Simulation = {

	GameOfLife_Step : function (world) {
		var altGrid = world.cloneGrid();
		world.forEachAgent(function (agent) {
			agent.forEach_8_Neighbours(world,function (x,y,neighbour) {
				altGrid.augment(x,y,1);
			});
		});


		world.forEachAgent(function (agent) {
			var neigbourCount = altGrid.get(agent.x,agent.y);
			if (neigbourCount != 2 && neigbourCount != 3) {
				world.removeAgent(agent);
			}
		});

		altGrid.forEachEntry(function (x,y,neigbourCount) {
			if (neigbourCount == 3) {
				if (world.getAgent(x,y) == null) {
					world.addAgentsToWorld([new Agent(x,y)]);
				}
			}		
		});
	},


	moveRandomly:function () {

		_.each(world.agents,function(agent) {
			if (agent!=null) {
					var xDiff = (Math.random()>.5) ,
						yDiff = 1- xDiff,
						sign = (Math.random()>.5) ?1:-1;

					world.moveAgent(xDiff*sign,yDiff*sign,agent);
				}
			}
		)
	},


	randStartConf:function(n,squareSize) {
		var ret = [];
		for (var i = 0; i < n; i++) {
			ret.push(new Agent(
							squareSize-Math.floor(Math.random()*squareSize*2),
							squareSize-Math.floor(Math.random()*squareSize*2)
							)
			);
		}
		return ret;
	}

};