


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
	}

};