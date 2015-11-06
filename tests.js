QUnit.test( "hello world 1", function( assert ) {


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
	assert.notEqual(null,world.getAgent(0,0));
	assert.equal(null,world.getAgent(-1,0));


});

QUnit.test( "hello world 2", function( assert ) {


	var canvas = oCanvas.create({ canvas: "#myCanvas", background: "#222" });
	var world = new World(canvas, 
		{
			AGENT_SIZE: 10
		} //
	);	

var conf1 = [
		new Agent(0,0),
		new Agent(1,0),
		new Agent(0,1),
		new Agent(1,1),
		new Agent(2,2)
];

	world.addAgentsToWorld(conf1);

	assert.equal(null,world.getAgent(-1,0));
	assert.notEqual(null,world.getAgent(0,0));
	assert.notEqual(null,world.getAgent(1,1));


});