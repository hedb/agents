QUnit.test( "hello world", function( assert ) {




	var canvas = oCanvas.create({ canvas: "#myCanvas", background: "#222" });
	var world = new World(canvas, 
		{
			AGENT_SIZE: 1
		} //
	);	

var conf1 = [
		new Agent(0,0),
		new Agent(1,0),
		new Agent(0,1),
		new Agent(1,1)
];

	world.addAgentsToWorld(conf1);

  	assert.ok( 1 == "1", "Passed!" );

});