


var Simulation = {

	GameOfLife_Step : function (world) {
		var altGrid = world.cloneGrid();
		world.forEachAgent(function (agent) {
			agent.forEach_8_Neighbours(function (neighbour) {
				altGrid.augment(neighbour.x,neighbour.y,1);
			});
		});

		world.forEachAgent(function (agent) {
			var neigbourCount = altGrid.get(agent.x,agent.y);
			if (neigbourCount != 2 && neigbourCount != 3) {
				world.removeAgent(agent);
			}
		});

		altGrid.forEachEntry(function (x,y,neigbourCount) {
			if (neigbourCount == 2 || neigbourCount == 3) {
				if (world.getAgent(x,y) == null) {
					world.addAgentsToWorld({x:x,y:y});
				}
			}		
		});
	}

};