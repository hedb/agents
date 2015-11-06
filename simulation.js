


var Simulation = {

	GameOfLife_Step : function (world) {
		var altGrid = world.cloneGrid();
		world.forEachAgent(function (agent) {
			agent.forEach_8_Neighbours(function (neighbour) {
				altGrid.augment(neighbour.x,neighbour.y,1);
			});
		});		
	}

};