var game = new Phaser.Game(800,600,Phaser.CANVAS,'gameDiv', { preload: preload, create: create, update: update, init: init});

// Game Variables
var trashMonster;
var trashArray =[];
var trash;
var bg;
var can;
//var trashGroup;
var score = 0;
var scoreText;
var i = 0;

// Preload assets
function preload() {
	
	game.load.image('bg', 'assets/bg.png');
	game.load.image('trashMonster', 'assets/trashMonster.png');
	game.load.image('trash', 'assets/trash.png');
	game.load.image('can', 'assets/can.png');
	//need to get image from player of their kid(or one of them)
}
 
// Init
function init() {
}
 
// Assets are available in create
function create() {
		
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.world.setBounds(0, 0, 800, 600);
	
	//  Set global gravity
    game.physics.arcade.gravity.y = 50;
	
	bg = game.add.sprite(0, 0, 'bg');
	
	//	Create the trashMonster
		
    
	trashMonster = game.add.sprite(100, game.world.centerY, 'trashMonster');
	tween = game.add.tween(trashMonster);
	tween.to({ x: [400, 400, 100, 100], y: [400, 500, 500, 400] }, 20000, "Linear");
	tween.start();
	
	trashMonster.scale.x = .5;
	trashMonster.scale.y = .5;
	game.physics.enable(trashMonster, Phaser.Physics.ARCADE);
	trashMonster.enableBody = true;
	trashMonster.body.moves = true;
	//trashMonster.physicsBodyType = Phaser.Physics.ARCADE;
	trashMonster.body.collideWorldBounds = true;
	trashMonster.body.allowGravity = false;
		
	// Set the anchorpoint to the middle
	trashMonster.anchor.setTo(0.5, 0.5);	
		
	can = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'can');
	game.physics.enable(can, Phaser.Physics.ARCADE);
	can.enableBody = true;
	//can.physicsBodyType = Phaser.Physics.ARCADE;
	can.body.collideWorldBounds = false;
		
	scoreText = game.add.text(10, 10, score, { font: '34px Geo', fill: '#fff' });
		
	game.time.events.repeat(Phaser.Timer.SECOND * 2, 12, createTrash, this);
	
}
// Update
function update() {
	
	can.x = game.input.mousePointer.x;
	can.y = game.input.mousePointer.y;
	//var tween = game.add.tween(trashMonster).to( { x: 500 }, 60, Phaser.Easing.Linear.None, true);
	//tween.yoyo(true, 3000);
	//need to move trashMonster and have him lob out trash that you need to click to "pick-up"
	game.physics.arcade.moveToXY(trashMonster, game.world.centerX - 250, 780);
	//game.physics.arcade.moveToXY(trashMonster, game.world.centerX, game.world.centerY);
	game.physics.arcade.overlap(trash, can, collisionHandler, null, this)
}
 
 function createTrash() {
	 trash = game.add.sprite(trashMonster.x, trashMonster.y, 'trash');
	
	//for (i; i < 12; i++)
	//{
		var rand = game.rnd.realInRange(0.1, .9);
		var rand1 = game.rnd.realInRange(.1, 1);
		var rand2 = game.rnd.realInRange(-450, 450);
		//yourGroup.create(game.world.randomX, game.world.randomY, 'sonic');
		
		if (rand2 <-250 || rand2>250)
		{
			trash.tint = 0xF60505;
		}
		if (rand2 > -50 && rand2 < 50)
		{
			trash.tint = 0x679DF9;
		}	
		game.physics.enable(trash, Phaser.Physics.ARCADE);
		trash.enableBody = true;
		trash.body.moves = true;
		trash.body.collideWorldBounds = true;
		trash.body.velocity.setTo(rand2, rand2);
		trash.body.bounce.setTo(rand1);
		trash.body.drag.set(rand);
		trash.body.allowGravity = true;
		//trashArray.push(i);
	//}
}
function collisionHandler (trash, can) {
		
			trash.kill();
			if (trash.tint == 0xF60505)
			score += 10;
			if (trash.tint == 0x679DF9)
			score += 5;
			else
			score += 2;
			scoreText.text = 'score: ' + score;
		
}

