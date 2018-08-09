var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} /*-------TODO-------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Implement simple one-slot inventory for weapons
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Spawn weapons in a new map
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Allow user to choose to pick up a new weapon or ignore it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Add more monster families
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Change current hp/attack system into stat system (str dex con)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Implement dodge/chance to hit to combat
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Generate equipment and inventory
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Update UI - inventory screen, stat screen, enemy screen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    When leveled up, allow points to be allocated to stat increases
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    --------------------*/

console.olog = function (o) {
	console.log(JSON.parse(JSON.stringify(o)));
};

var my = {
	site: "https://iamlewis.com",
	github: "https://github.com/Lewis65",
	freecodecamp: "https://freecodecamp.com/lewis65" };


//Map gen settings
var viewSize = 7,
maxViewSize = 12,
mapSize = 15,

roomWidthMin = 7,
roomWidthMax = 10,
roomHeightMin = 7,
roomHeightMax = 10,
minRooms = 1,
maxRooms = 1,
maxAttempts = 5;

//Monster gen and scaling settings
var monsterDensity = 0.05, //Range 0-1, suggest 0.01-0.2
monsterDensityVariation = 0.5, //Range 0-1 - how much the monster/floor tile density can vary
monsterScaling = 1.1, //Based around 1 - the amount monsters scale up per lvl

godMode = true, //for testing or otherwise cheating!

baseHp = 50, //Base hp multiplies by level and varies by hpVariation
hpPerLevel = 1.17,
hpVariation = 0.2,

baseAttack = 10,
attackPerLevel = 1.13,
attackVariation = 0.05,

baseArmor = 0, //Gets added to monster armor
armorVariation = 0.2,
armorCap = 0.8, //Max damage reduction
armorForInvincibility = 1000, //The equivalent of 100% damage reduction

damageVariation = 0.4; //The amount that damage for a given hit varies from the attack stat

//Levels and scaling
var lvlRange = { easy: [-2, 1], medium: [-1, 2], boss: [0, 3] }, //Range of monsters' level scaling relative to player's
xpModifier = { easy: 0.9, medium: 1.1, boss: 1.6 }, //Modifier for xp gain based on monster tier
xpRequiredPerLevel = 1.2, //xp required for next level increase per previous level
xpVariation = 0.1, //Variation of xp received for given victory
hpToXp = 0.6; //Ratio of xp gained per hp of monster slain

//Healing item and equipment spawn variables
var healingItemDensity = 0.025, //How many healing items per open tile
healingItemRarity = 0.2; //How likely it is to spawn a rare item rather than a common item

//Healing items and their properties
var healingItems = {
	common: [
	{
		name: "a donut",
		heals: 0.1 },
	{
		name: "a slice of pizza",
		heals: 0.15 },

	{
		name: "some candy",
		heals: 0.05 },

	{
		name: "precious cake",
		heals: 0.2 }],


	rare: [
	{
		name: "a potion",
		heals: 0.4 },

	{
		name: "a super potion",
		heals: 0.8 }]




	//All items (weapons/equipment) and their iLvl-weighted potential properties
};var items = {
	slots: [],
	bonuses: []



	//All possible 'themes' of monster and their modifiers
};var monsters = [
{ name: "Spider",
	easy: [
	{
		name: "Spider Hatchling",
		hp: 0.3,
		attack: 0.4,
		armor: 0 },

	{
		name: "Young Spiderling",
		hp: 0.4,
		attack: 0.5,
		armor: 0.1 }],


	medium: [
	{
		name: "Spider Whelp",
		hp: 0.5,
		attack: 0.4,
		armor: 0.2 },

	{
		name: "Arachnid Soldier",
		hp: 0.7,
		attack: 0.4,
		armor: 0.3 }],


	boss: [
	{
		name: "Spider Matriarch",
		hp: 0.85,
		attack: 0.8,
		armor: 0.3 },

	{
		name: "Mutated Arachnoid",
		hp: 0.6,
		attack: 1.4,
		armor: 0.1 }] }];var




App = function (_React$Component) {_inherits(App, _React$Component);
	function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
		props));

		_this.state = {
			combatLog: [
			"Welcome to React Roguelike.",
			"This combat log will show you events and messages as you play.",
			"Use WASD to move and fight monsters by walking into them.",
			"Good luck!"],

			player: {
				id: 0,
				x: null,
				y: null,
				name: "John",
				level: 1,
				type: "player",
				gear: {
					head: undefined,
					chest: undefined,
					legs: undefined,
					feet: undefined,
					hands: undefined,
					mainhand: undefined,
					offhand: undefined },

				inv: new Array(16),
				hp: 100,
				hpmax: 100,
				attack: baseAttack,
				armor: baseArmor,
				xp: 0,
				xpmax: 100 },

			depth: 1,
			levels: [],
			map: _this.generateBlankMap(mapSize),
			monsterCount: undefined,
			npcs: [],
			visibleMap: [[{ state: "rock" }]] };return _this;

	}

	//==========HANDLERS==========
	_createClass(App, [{ key: "handleKeyDown", value: function handleKeyDown(event) {
			if (this.state.player.hp == 0) {
				return;
			}
			var nextMap = void 0;
			if (event.key == "w") {
				nextMap = this.moveEntity(this.state.player, "n");
			} else
			if (event.key == "a") {
				nextMap = this.moveEntity(this.state.player, "w");
			} else
			if (event.key == "s") {
				nextMap = this.moveEntity(this.state.player, "s");
			} else
			if (event.key == "d") {
				nextMap = this.moveEntity(this.state.player, "e");
			}
		}


		//==========LOGIC==========
	}, { key: "combat", value: function combat(a, b) {var opportunityAttack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
			var attacker = void 0,defender = void 0;

			//Decide attack order
			if (opportunityAttack) {
				attacker = a;
				defender = b;
			} else {
				if (Math.random() > 0.5) {
					attacker = a;
					defender = b;
				} else {
					attacker = a;
					defender = b;
				}
			}

			console.log("combat(): attacker and defender", attacker, defender);
			var attackerDamage = attacker.attack;
			attackerDamage += attackerDamage * (Math.random() + Math.random() - 1) * damageVariation;
			attackerDamage *= 1 - defender.armor / armorForInvincibility;
			console.log("The attacker, " + attacker.name + ", hits the " + defender.name + " with " + attackerDamage + " points of damage.");
			attackerDamage = Math.round(attackerDamage);
			if (attackerDamage < 0) {attackerDamage = 0;}
			defender.hp -= attackerDamage;

			if (opportunityAttack) {
				this.log("As you move away from the " + attacker.name + ", you are hit for " + attackerDamage + ".");
			} else {
				this.log(attacker.name + " hits " + defender.name + " for " + attackerDamage + " damage!");
			}

			if (defender.hp > 0 && !opportunityAttack) {
				//If defender didn't die, and is not fleeing, strike back
				var defenderDamage = defender.attack;
				defenderDamage += defenderDamage * (Math.random() + Math.random() - 1) * damageVariation;
				defenderDamage *= 1 - attacker.armor / armorForInvincibility;
				console.log("The defender, " + defender.name + ", hits the " + attacker.name + " with " + defenderDamage + " points of damage.");
				defenderDamage = Math.round(defenderDamage);
				if (defenderDamage < 0) {defenderDamage = 0;}
				attacker.hp -= defenderDamage;
				this.log(defender.name + " hits " + attacker.name + " for " + defenderDamage + " damage!");

				if (attacker.hp < 0) {
					//If attacker gets negative hp
					attacker.hp = 0;
				}
			}
			if (defender.hp < 0) {
				//If defender dies
				defender.hp = 0;
			}
			var result = {};
			if (attacker.id == this.state.player.id) {
				result.player = attacker;
				result.monster = defender;
			} else if (defender.id == this.state.player.id) {
				result.player = defender;
				result.monster = attacker;
			} else {
				console.log("ERR: combat() could not find player's ID. attacker:",
				attacker,
				"defender:",
				defender);
				return;
			}

			if (godMode) {
				result.player.hp = result.player.hpmax;
			}

			//If something dies
			if (result.monster.hp == 0) {
				this.log(result.monster.name + " was slain!");
			}
			if (result.player.hp == 0) {
				this.log("You fall to your knees, gasping in agony. Mercifully, " + result.monster.name + " finishes you off.");
				this.log("You are slain.");
			}

			return result;
		} }, { key: "gainXp", value: function gainXp(

		player, monster) {
			var xp = monster.hpMax * hpToXp * xpModifier[monster.type];
			xp += xp * (Math.random() + Math.random() - 1) * xpVariation;
			xp = Math.round(xp);
			this.log("You gain " + xp + "xp.");
			player.xp += xp;
			if (player.xp >= player.xpmax) {
				player.xp = player.xp - player.xpmax;
				player.level++;
				player.hpmax = Math.round(player.hpmax * hpPerLevel);
				player.hp = player.hpmax;
				player.attack = Math.round(player.attack * attackPerLevel);
				player.xpmax = Math.round(player.xpmax * xpRequiredPerLevel);
				this.log("You have reached level " + player.level + "!");
			}
			return player;
		}

		//Generate an empty map of solid rock
	}, { key: "generateBlankMap", value: function generateBlankMap(size) {
			var map = [];
			for (var i = 0; i < size; i++) {
				var row = [];
				for (var j = 0; j < size; j++) {
					row.push({
						state: "rock",
						x: j,
						y: i });

				}
				map.push(row);
			}
			return map;
		} }, { key: "generateMap", value: function generateMap()

		{

			var player = this.state.player;
			var npcs = [];

			//generate a blank map
			var map = this.generateBlankMap(mapSize);

			//fill the blank map with rooms and walls
			map = this.generateRooms(map);

			//populate player
			var spawnPlayer = this.spawn("player", player, map, npcs);
			player = spawnPlayer.player;
			map = spawnPlayer.map;

			//populate monsters
			var spawnMonsters = this.spawnMonsters(map);
			map = spawnMonsters.map;
			npcs = npcs.concat(spawnMonsters.npcs);

			//populate items
			map = this.spawnHealingItems(map);

			//update the visible portion of the map
			var visible = this.updateVisibleMap(map, player.x, player.y);
			return {
				player: player,
				map: map,
				monsterCount: spawnMonsters.monsterCount,
				npcs: npcs,
				visibleMap: visible };

		}

		//Generate one room
	}, { key: "generateRoom", value: function generateRoom() {
			var width = this.random(roomWidthMin, roomWidthMax);
			var height = this.random(roomHeightMin, roomHeightMax);
			var room = [];
			for (var y = 0; y < height + 2; y++) {
				var row = [];
				for (var x = 0; x < width + 2; x++) {
					if (y == 0 || y == height + 1 || x == 0 || x == width + 1) {
						if (
						y == 0 && x == 0 ||
						y == 0 && x == width + 1 ||
						y == height + 1 && x == 0 ||
						y == height + 1 && x == width + 1)
						{
							//Push a corner for the wall corners
							row.push({ state: "corner" });
						} else {
							//Push a wall if it's on the edges
							row.push({ state: "wall" });
						}
					} else {
						//Else push a floor
						row.push({ state: "floor" });
					}
				}
				room.push(row);
			}
			//console.log("Generating room " + width + " wide and " + height + " high, not including walls:");
			//console.olog(room);
			return room;
		}

		//Generate all rooms
	}, { key: "generateRooms", value: function generateRooms(blankMap) {
			//randomize roomCount
			var roomCount = this.random(minRooms, maxRooms);
			var roomsPlaced = 0;
			console.log("The roomCount will be " + roomCount);

			var map = blankMap;
			console.log("Setting map to blank map...");
			this.setState({ map: map });

			//generate rooms until a room count or number of attempts reached
			//generate room, find possible placement or retry, place room, set as new map
			//for every room
			console.log("Starting room generation...");
			for (var i = 0; i < roomCount; i++) {
				//generate a new room
				var room = this.generateRoom();
				//set roomPlaced to false and try to place while it's false
				var roomPlaced = false;
				var placeAttempts = 0;
				var nextMap = map;
				while (roomPlaced == false && placeAttempts < maxAttempts) {
					//run placeroom and return bool
					//console.log("Attempting to place room... (attempt " + placeAttempts + ")")
					var placeRoom = this.placeRoom(room, i, map);
					roomPlaced = placeRoom.success;
					nextMap = placeRoom.nextMap;
					//console.olog(roomPlaced);
					placeAttempts++;
				}
				if (roomPlaced) {
					//console.log("Room placed successfully. nextMap:");
					//console.olog(nextMap);
					roomsPlaced++;
					map = nextMap;
				} else if (placeAttempts == maxAttempts) {
					//console.log("Failed to place room: Max attempts reached.");
				} else {

					} //console.log("Room was not placed.");
					//console.log("Finished iteration " + i + " of for loop in generateRooms. Here is map:");
					//console.olog(map);
			}

			console.log("generateRooms complete.");
			console.olog(map);
			console.log("Placed " + roomsPlaced + " rooms of goal of " + roomCount);
			console.log("Cleaning doors...");

			//Clean up failed doors
			var doors = this.scanMapFor("door", map);
			//console.log("Here's all the doors:", doors);
			for (var _i = 0; _i < doors.length; _i++) {
				//If a door does not connect 2+ floor tiles, revert it to a wall
				var adjacent = this.getAdjacentCells(map, doors[_i].x, doors[_i].y);
				//console.log("Here are the neighbors of the door at x:"+doors[i].x+" y:"+doors[i].y);
				//console.olog(adjacent);
				var floors = 0;
				for (var j = 0; j < adjacent.length; j++) {
					if (adjacent[j].state == "floor") {
						floors++;
					}
				}
				if (floors < 2) {
					map[doors[_i].y][doors[_i].x].state = "wall";
				}
			}

			return map;
		}

		//return the 4 adjacent cells
	}, { key: "getAdjacentCells", value: function getAdjacentCells(map, x, y) {
			var adjacent = [];
			if (y < map.length - 1) {
				var cell = map[y + 1][x];
				cell.dir = "s";
				adjacent.push(cell);
			}
			if (x < map[0].length - 1) {
				var _cell = map[y][x + 1];
				_cell.dir = "e";
				adjacent.push(_cell);
			}
			if (y > 0) {
				var _cell2 = map[y - 1][x];
				_cell2.dir = "n";
				adjacent.push(_cell2);
			}
			if (x > 0) {
				var _cell3 = map[y][x - 1];
				_cell3.dir = "w";
				adjacent.push(_cell3);
			}
			return adjacent;
		} }, { key: "goToLevel", value: function goToLevel(

		depth) {

			if (depth < 1) {
				console.log("ERR: goToLevel(): Attempted to find level for depth " + depth);
				return;
			}

			var combatLog = this.state.combatLog;
			var levels = this.state.levels;
			var nextState = void 0;
			//Store the player's current state
			var currentPlayer = this.state.player;
			//Store the current level information
			var currentLevel = {
				depth: this.state.depth,
				map: this.state.map,
				npcs: this.state.npcs,
				stairs: {
					up: {
						x: undefined,
						y: undefined },

					down: {
						x: undefined,
						y: undefined } } };



			//Pick the player off of the current level's map
			currentLevel.map[currentPlayer.y][currentPlayer.x].entity = undefined;

			if (depth > this.state.levels.length) {
				//Going to a new depth
				nextState = this.generateMap();
				console.log("Didn't find previously created level for depth " + depth + ".");
				combatLog.push("You climb down the stairs, pushing further into the depths.");
				console.log("Generated nextLevel:");
				console.olog(nextState);
				nextState.map[nextState.player.y][nextState.player.x].state = "stairsUp";
			} else {
				//Previously generated level
				nextState = this.state.levels[depth - 1];
				console.log("Retrieved level for nextState:");
				console.olog(nextState);
				console.log("Found previously created level for depth " + depth + ".");
				combatLog.push("You return to floor " + depth + ".");

				//Place the player in the next level at the appropriate staircase
				nextState.player = currentPlayer;
				console.log("stairs for nextState");
				console.olog(nextState.stairs);
				if (depth > this.state.depth) {
					//Going down to a previously visited level
					console.log("going down");
					nextState.player.y = nextState.stairs.up.y;
					nextState.player.x = nextState.stairs.up.x;
				} else if (depth < this.state.depth) {
					//Going up to a previously visited level
					console.log("going up");
					nextState.player.y = nextState.stairs.down.y;
					nextState.player.x = nextState.stairs.down.x;
				} else {
					console.log("ERR: goToLevel(): Attempted to go to same depth as current depth");
				}
				nextState.map[nextState.player.y][nextState.player.x].entity = nextState.player;
			}

			console.log("Updating visiblemap");
			console.olog(nextState);
			nextState.visibleMap = this.updateVisibleMap(nextState.map, nextState.player.x, nextState.player.y);
			nextState.levels = this.state.levels;
			nextState.depth = depth;
			nextState.monsterCount = nextState.npcs.length;

			//Save the current level along with stair info in state.levels
			console.log("currentLevel from which stairs are saved");
			console.olog(currentLevel);
			var stairsUp = this.scanMapFor("stairsUp", currentLevel.map);
			if (stairsUp) {currentLevel.stairs.up = stairsUp[0];}
			var stairsDown = this.scanMapFor("stairsDown", currentLevel.map);
			if (stairsDown) {currentLevel.stairs.down = stairsDown[0];}

			console.log("Storing currentLevel:");
			console.olog(currentLevel);

			levels[currentLevel.depth - 1] = currentLevel;
			nextState.levels = levels;

			//Update state to display nextLevel stuff
			console.log("goToLevel(): Set nextState to:");
			console.log(nextState);

			this.setState(nextState);
		} }, { key: "log", value: function log(

		message) {
			var log = this.state.combatLog;
			log.push(message);
			this.setState({ combatLog: log });
		} }, { key: "moveEntity", value: function moveEntity(

		entity) {var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var x = entity.x;
			var y = entity.y;
			var dirs = ["n", "e", "s", "w"];
			if (d !== null && dirs.indexOf(d) == -1) {
				console.log("ERR: moveEntity(): Called with invalid d:" + d);
				return;
			}

			var dir = d || dirs[this.random(0, 3)];

			var targetCoord = {
				x: x,
				y: y };

			switch (dir) {
				case "n":
					targetCoord.y--;
					break;
				case "s":
					targetCoord.y++;
					break;
				case "e":
					targetCoord.x++;
					break;
				case "w":
					targetCoord.x--;
					break;
				default:
					console.log("ERR: moveEntity(): Error in switch statement. dir:" + dir);}

			var targetCell = this.state.map[targetCoord.y][targetCoord.x];

			if (!(this.state.map[y] && this.state.map[y][x])) {
				console.log("ERR: moveEntity(): The coordinates provided to moveEntity do not exist on the map in state. y:" + y + " x:" + x);
				return;
			} else if (!this.state.map[y][x].entity) {
				console.log("ERR: moveEntity(): No entity exists at y:" + y + " x:" + x);
				return;
			}
			var entityMoving = this.state.map[y][x].entity;
			console.log("Attempting to move the entity " + entityMoving + " to x:" + targetCoord.x + " y:" + targetCoord.y + ". Target cell is:", targetCell);

			if (targetCell.state === "stairsUp") {
				console.log("Walked to stairs up at x:" + targetCoord.x + " y:" + targetCoord.y);
				this.goToLevel(this.state.depth - 1);
				return;
			}
			if (targetCell.state === "stairsDown") {
				console.log("Walked to stairs down at x:" + targetCoord.x + " y:" + targetCoord.y);
				this.goToLevel(this.state.depth + 1);
				return;
			}

			var nextMap = this.state.map;
			var player = this.state.player;
			var nextNpcs = this.state.npcs;
			var monsterCount = this.state.monsterCount;

			if (targetCell.state !== "floor" && targetCell.state !== "door") {
				//If it is a non-traversable cell
				console.log("Can't move there.");
				return;
			}
			if (targetCell.entity) {
				//If there's another entity there
				if (targetCell.entity.type == "player" || entityMoving.type == "player") {
					//and one of them is the player
					var combat = this.combat(targetCell.entity, entityMoving);

					//Then update the post-combat stats for player and monster in state
					for (var m = 0; m < nextNpcs.length; m++) {
						if (nextNpcs[m].id == combat.monster.id) {
							if (combat.monster.hp == 0) {
								//If the monster died
								combat.player = this.gainXp(combat.player, combat.monster);
								nextNpcs.splice(m, 1);
								nextMap[combat.monster.y][combat.monster.x].entity = undefined;
								monsterCount--;
								if (combat.monster.type == "boss") {
									this.log("A way down appears.");
									nextMap[combat.monster.y][combat.monster.x].state = "stairsDown";
								}
							} else {
								//If it's still alive
								nextNpcs[m] = combat.monster;
								nextMap[combat.monster.y][combat.monster.x].entity = combat.monster;
							}
							break;
						}
					}
					console.log("Combat with " + combat.monster.name + " with id " + combat.monster.id + ". combat:");
					console.log(combat);
					console.log("nextNpcs after combat()", nextNpcs);
					player = combat.player;
					console.log("And the player:", player);
				}
			} else {
				//There's no entity there
				if (entityMoving.type == "player") {
					var adjacentCells = this.getAdjacentCells(nextMap, player.x, player.y);
					for (var i = 0; i < adjacentCells.length; i++) {
						if (player.hp == 0) {
							//Break if already killed (used in multiple attacks of opportunity)
							break;
						}
						if (adjacentCells[i].entity !== undefined) {
							var opportunityAttack = this.combat(adjacentCells[i].entity, player, true);
							player = opportunityAttack.player;
						}
					}
					if (player.hp > 0) {
						//Move if they didn't die to an opportunity attack
						player.x = targetCoord.x;
						player.y = targetCoord.y;
					} else {
						return;
					}
				} else {
					var id = entityMoving.id;
					var index = nextNpcs.indexOf(entityMoving);
					nextNpcs[index].y = targetCoord.y;
					nextNpcs[index].x = targetCoord.x;
				}

				if (entityMoving.type == "player" && nextMap[targetCoord.y][targetCoord.x].item) {
					//If the player is moving to a tile with an item
					var item = nextMap[targetCoord.y][targetCoord.x].item;

					if (item.type == "healing") {
						nextMap[targetCoord.y][targetCoord.x].item = undefined;
						var healsFor = Math.round(player.hpmax * item.heals);
						console.log("The " + item.name + " heals for " + healsFor + ". player.hp:" + player.hp + "player.hpmax:" + player.hpmax);
						if (healsFor > player.hpmax - player.hp) {
							healsFor = player.hpmax - player.hp;
						}
						player.hp += healsFor;
						this.log("You pick up " + item.name + ". It heals " + healsFor + "hp.");
					}

					//PUT ELSE FOR EQUIPMENT ITEMS HERE
				}

				nextMap[targetCoord.y][targetCoord.x].entity = entityMoving;
				nextMap[y][x].entity = undefined;
			}

			var nextVisibleMap = this.updateVisibleMap(nextMap, player.x, player.y);
			this.setState({
				map: nextMap,
				player: player,
				monsterCount: monsterCount,
				npcs: nextNpcs,
				visibleMap: nextVisibleMap });


		}

		//attempt to place a room
	}, { key: "placeRoom", value: function placeRoom(r, i, map) {
			//length of first row
			//let roomWidth = room[0].length;
			//number of rows
			//let roomHeight = room.length;
			var nextMap = map;

			//Set variables for the start coords of room (top-left corner)
			//let startingX, startingY;

			var room = {
				//leftmost and rightmost value for possible floor placement, does not include walls
				minX: null,
				maxX: null,
				//topmost and bottommost value for possible floor placement, does not include walls
				minY: null,
				maxY: null,
				//coords at which the topleft corner of the room will be placed, including walls
				startingX: null,
				startingY: null,
				//width and height, including walls
				width: r[0].length,
				height: r.length,
				//number of the room
				number: i,
				//actual cells of the room
				map: r,
				//if the room is placeable
				isPlaceable: false };


			//find coords for a door and set the room coords
			if (room.number == 0) {
				//First room to be placed
				room.startingX = this.random(0, mapSize - room.width);
				room.startingY = this.random(0, mapSize - room.height);
				//console.log("Placing first room.", "Room is " + room.width + " wide and " + room.height + " high including walls:");
				//console.olog(room.map);
				//console.log("Placing at x:" + room.startingX + " y:" + room.startingY);
				room.isPlaceable = true;
			} else {
				//Non-first rooms
				//find all non-corner walls and choose a random one for a door
				var door = this.placeDoor(map);
				//console.log("Door placed: ", door)
				if (door.success) {
					nextMap[door.y][door.x].state = "door";
					//after placing a door but before adding the room on
					//find direction to go out the room through the door
					//search 4 adjacent tiles and find 1 rock - if no rock find a new door position
					var adjacent = this.getAdjacentCells(nextMap, door.x, door.y);
					var neighborCoords = [
					{ x: door.x, y: door.y - 1, dir: "n" },
					{ x: door.x - 1, y: door.y, dir: "w" },
					{ x: door.x, y: door.y + 1, dir: "s" },
					{ x: door.x + 1, y: door.y, dir: "e" }];

					//check each y and x exists in case the room is on the edge of the map
					var dir = null;
					for (var _i2 = 0; _i2 < neighborCoords.length; _i2++) {
						//if the cell is within the map
						if (
						nextMap[neighborCoords[_i2].y] !== undefined &&
						nextMap[neighborCoords[_i2].x] !== undefined)
						{
							//and if it's an empty tile
							if (nextMap[neighborCoords[_i2].y][neighborCoords[_i2].x].state == "rock") {
								//save a string to show the direction out of the room
								dir = neighborCoords[_i2].dir;
							}
						}
					}

					//check bounds of space for the room in that dir
					//console.log("Dir is: ", dir)
					if (!dir) {
						//first, if no way out of this door to empty rock tile, return fail
						//console.log("ERR: Did not find empty tile adjacent to door:", door);
						//console.log("Reverting to map:", map);
						return { success: false, nextMap: map };
					} else {
						//console.log("Setting initial min/max for x/y - this will not include walls");
						//console.log("room.height:" + room.height + " room.width:" + room.width + ", including walls");
						if (dir == "w" || dir == "e") {
							//Primary x, secondary y
							//The furthest the floor can potentially reach given room size and door connectivity.
							room.yMin = door.y - (room.height - 2) + 1; //
							room.yMax = door.y + (room.height - 2) - 1; //
							if (dir == "w") {
								room.xMin = door.x - (room.width - 2); //
								room.xMax = door.x - 1; //
							} else if (dir == "e") {
								room.xMin = door.x + 1; //
								room.xMax = door.x + (room.width - 2); //
							}
							//check primary axis
							if (room.xMin < 1 || room.xMax > mapSize - 2) {
								//console.log("ERR: No room on primary (x) axis.");
								return { success: false };
							}
						} else if (dir == "n" || dir == "s") {
							//Primary y, secondary x
							//The furthest the floor can potentially reach given room size and door connectivity.
							room.xMin = door.x - (room.width - 2) + 1; //
							room.xMax = door.x + (room.width - 2) - 1; //
							if (dir == "n") {
								room.yMin = door.y - (room.height - 2); //
								room.yMax = door.y - 1; //
							} else if (dir == "s") {
								room.yMin = door.y + 1; //
								room.yMax = door.y + (room.height - 2); //
							}
							//check primary axis
							if (room.yMin < 1 || room.yMax > mapSize - 2) {
								//console.log("ERR: No room on primary (y) axis.")
								return { success: false };
							}
						}
						//console.log("xMin:" + room.xMin + " xMax:" + room.xMax + " yMin:" + room.yMin + " yMax:" + room.yMax);

						//Check x/y min/max against constraints of map
						//Off by one to allow for wall
						if (room.xMin < 1) {
							room.xMin = 1;
						}
						if (room.xMax > mapSize - 2) {
							room.xMax = mapSize - 2;
						}
						if (room.yMin < 1) {
							room.yMin = 1;
						}
						if (room.yMax > mapSize - 2) {
							room.yMax = mapSize - 2;
						}
						//console.log("Constrained to 0/mapSize:");
						//console.log("xMin:" + room.xMin + " xMax:" + room.xMax + " yMin:" + room.yMin + " yMax:" + room.yMax);

						//Check x/y min/max against min requirements of the room
						if (room.xMax - room.xMin + 1 < room.width - 2) {
							//console.log("ERR: x range available is too small for room:")
							//console.olog(room.map);
							//console.log("room.width:"+room.width+" xMin:"+room.xMin+" xMax:"+room.xMax+", thus max size with walls:"+(room.xMax-room.xMin + 3))
							return {
								success: false };

						}
						if (room.yMax - room.yMin + 1 < room.height - 2) {
							//console.log("ERR: y range available is too small for room:")
							//console.olog(room.map);
							//console.log("roomHeight:"+room.height+" yMin:"+room.yMin+" yMax:"+room.yMax+", thus max size with walls:"+(room.yMax-room.yMin + 3))
							return {
								success: false };

						}

						//Loop through primary axis (go straight from door)
						if (dir == "w" || dir == "e") {
							var yMin = room.yMin;
							var yMax = room.yMax;
							//Find min and max values on the y axis at each x
							for (var x = room.xMin; x < room.xMax; x++) {
								if (nextMap[door.y][x].state == "floor") {
									//console.log("ERR: Found a floor tile on primary axis at x:"+x+" y:"+door.y+", must abandon room.");
									return {
										success: false };

								}
								for (var y = room.yMin; y < door.y - 1; y++) {
									if (nextMap[y][x].state == "floor") {
										yMin = y + 1;
										//console.log("Found floor tile at x:"+x+" y:"+y+", new yMin is "+yMin);
									}
								}
								for (var _y = room.yMax; _y > door.y + 1; _y--) {
									if (nextMap[_y][x].state == "floor") {
										yMax = _y - 1;
										//console.log("Found floor tile at x:"+x+" y:"+y+", new yMax is "+yMax);
									}
								}
							}
							room.yMin = yMin;
							room.yMax = yMax;
							//Choose a random startpoint on secondary axis
							var highestMin = door.y;
							if (door.y + room.height - 3 > room.yMax) {
								highestMin = room.yMax - (room.width - 2);
							}
							var rand = this.random(yMin, highestMin);
							//starting includes walls, min does not
							room.startingY = rand - 1;
							room.startingX = room.xMin - 1;
						} else if (dir == "n" || dir == "s") {
							var xMin = room.xMin;
							var xMax = room.xMax;
							//Primary y, secondary x
							for (var _y2 = room.yMin; _y2 < room.yMax; _y2++) {
								if (nextMap[_y2][door.x].state == "floor") {
									//console.log("ERR: Found a floor tile on primary axis at x:"+door.x+" y:"+y+", must abandon room.");
									return {
										success: false };

								}
								for (var _x3 = room.xMin; _x3 < door.x - 1; _x3++) {
									if (nextMap[_y2][_x3].state == "floor") {
										xMin = _x3 + 1;
										//console.log("Found floor tile at x:"+x+" y:"+y+", new xMin is "+xMin);
									}
								}
								for (var _x4 = room.xMax; _x4 > door.x + 1; _x4--) {
									if (nextMap[_y2][_x4].state == "floor") {
										xMax = _x4 - 1;
										//console.log("Found floor tile at x:"+x+" y:"+y+", new xMax is "+xMax);
									}
								}
							}
							room.xMin = xMin;
							room.xMax = xMax;
							//Choose a random startpoint on secondary axis
							var _highestMin = door.x;
							if (door.x + room.width - 3 > xMax) {
								_highestMin = xMax - (room.width - 2);
							}
							var _rand = this.random(xMin, _highestMin);
							//starting includes walls, min does not
							room.startingX = _rand - 1;
							room.startingY = room.yMin - 1;
						}

						//Re-check all tiles for room placement
						//console.log("Will check tiles x:"+room.startingX+"-"+(room.startingX+(room.width-1))+
						//						" y:"+room.startingY+"-"+(room.startingY+(room.height-1)));
						room.isPlaceable = true;
						for (var _y3 = room.startingY; _y3 < room.startingY + (room.height - 1); _y3++) {
							for (var _x5 = room.startingX; _x5 < room.startingX + (room.width - 1); _x5++) {
								//console.log("Checking cell x:"+x+" y:"+y);
								if (
								typeof nextMap[_y3] == "undefined" ||
								typeof nextMap[_y3][_x5] == "undefined")
								{
									//console.log("ERR: Undefined cell in tile check! x:"+x+" y:"+y)
									room.isPlaceable = false;
								} else {
									if (nextMap[_y3][_x5].state == "floor") {
										room.isPlaceable = false;
										//console.log("ERR: Found floor in proposed roomspace at x"+x+" y"+y+".")
									}
								}
							}
						}
						//console.log("Check complete. room.isPlaceable is " + room.isPlaceable);
					}
				} else {
					//what to do if door could not be placed
					//console.log("ERR: Could not place door. (placeDoor returned success:false)")
					return {
						success: false };

				}
			}

			//Replace empty tiles with room tiles
			if (room.isPlaceable) {
				for (var _y4 = 0; _y4 < room.height; _y4++) {
					for (var _x6 = 0; _x6 < room.width; _x6++) {
						var mapX = room.startingX + _x6;
						var mapY = room.startingY + _y4;
						if (
						typeof nextMap[mapY] == "undefined" ||
						typeof nextMap[mapY][mapX] == "undefined")
						{
							console.log(
							"ERR: Undefined cell in replacement block at x:" + (
							room.startingX + _x6) +
							" y:" + (
							room.startingY + _y4));

							return { success: false };
						}
						if (nextMap[mapY][mapX].state !== "rock") {
							//console.log("Skipping "+nextMap[mapY][mapX].state+" at x:"+mapX+" y:"+mapY+".");
							continue;
						}
						var cell = room.map[_y4][_x6];
						cell.roomNumber = room.number;
						nextMap[mapY][mapX] = cell;
						//console.log("Placing " + JSON.stringify(cell) + " at x:" + (mapX) + " y:" + (mapY) +".");
					}
				}
				console.log("Room " + room.number + " placed! nextMap:");
				console.olog(nextMap);
				return { success: true, nextMap: nextMap };
			} else {
				console.log(
				"ERR: room.isPlaceable is " + room.isPlaceable + ". Room not placed.");

				return { success: false };
			}
		} }, { key: "placeDoor", value: function placeDoor(

		map) {
			//an array of coord pairs {x:int, y:int} of all non-corner walls in map
			var doorPlaced = false;
			var walls = this.scanMapFor("wall", map);
			//console.log("Found walls at:", walls, typeof walls);
			if ((typeof walls === "undefined" ? "undefined" : _typeof(walls)) !== "object" || walls.length < 1) {
				//error handling
				console.log("ERR: Did not find walls to place door.");
				return { success: false };
			}
			//if walls are found
			var n = this.random(0, walls.length - 1);
			var x = walls[n].x;
			var y = walls[n].y;
			//console.log("Placing door at y"+y+" x"+x+".");
			var nextMap = map;
			return {
				x: x,
				y: y,
				success: true };

		}

		//return a random int between min and max (inclusive)
	}, { key: "random", value: function random(min, max) {
			return Math.floor((max - min + 1) * Math.random()) + min;
		}

		//apply a monster's modifiers and build their stats
	}, { key: "randomizeMonster", value: function randomizeMonster(monster, tier) {
			//Using Object.assign will prevent passing a reference to the $monster object,
			//instead simply assigning $randomized the same property values.
			var randomized = {};
			Object.assign(randomized, monster);

			randomized.level = this.random(lvlRange[tier][0], lvlRange[tier][1]) + this.state.player.level;
			if (randomized.level < 1) {
				randomized.level = 1;
			}

			var hp = monster.hp * baseHp;
			hp += hp * (Math.random() * hpVariation * (randomized.level * monsterScaling));
			if (hp < 1) {hp = 1;}
			randomized.hp = Math.round(hp);
			randomized.hpMax = randomized.hp;

			var attack = monster.attack * baseAttack;
			attack += attack * (Math.random() * attackVariation * (randomized.level * monsterScaling));
			if (attack < 1) {attack = 1;}
			randomized.attack = Math.round(attack);

			var armor = monster.armor + baseArmor;
			var randomArmor = Math.random() + Math.random() - 1;
			armor += randomArmor * armorVariation * armor;
			randomized.armor = Math.round(armor * armorForInvincibility);

			return randomized;
		}

		//Scan a 2d array map for cells with a state and return a list of coords
	}, { key: "scanMapFor", value: function scanMapFor(state, map) {
			var coords = [];
			//console.log("Scanning this map for " + state + ":", map);
			for (var y = 0; y < map.length; y++) {
				for (var x = 0; x < map[y].length; x++) {
					if (map[y][x].state == state) {
						coords.push({ x: x, y: y });
					}
				}
			}
			//console.log("Found " + coords.length + " results.");
			return coords;
		}

		//Spawn a single entity
	}, { key: "spawn", value: function spawn(type, entity, map, npcs) {var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

			var nextMap = map;
			var nextNpcs = npcs;
			var coord = {
				x: x,
				y: y };


			if (y && x && map[y][x].state == "floor" && !map[y][x][type]) {
				//if passed coords
				entity.x = x;
				entity.y = y;
				nextMap[y][x][type] = entity;
				if (type == "entity") {
					nextNpcs.push(entity);
				}
			} else {

				if (y && x) {
					console.log("Passed coords to spawn() but tile was not a floor tile or entity exists there. x:" + x + " y:" + y);
					return;
				}
				var openTiles = this.scanMapFor("floor", map);
				var random = void 0;

				var attempts = 0;
				var noMoreTilesAvailable = false;

				var isNextToPlayer = false;
				do {
					random = this.random(1, openTiles.length) - 1;
					coord = openTiles[random];

					if (coord == undefined) {
						console.log("ERR: Found no more open floor tiles.");
						noMoreTilesAvailable = true;
						break;
					}

					//If there's a player, and spawning a monster, do not spawn it adjacent to player
					isNextToPlayer = false;
					if (type == "monster" && this.state.player.x) {
						//console.log("Testing if next to player...");
						//console.olog(this.state.player);
						var player = this.state.player;
						if (coord.x == player.x || coord.y == player.y) {
							if (coord.x == player.x + 1 || coord.x == player.x - 1) {
								console.log("Skipped spawn location because it was next to the player.", coord);
								isNextToPlayer = true;
							} else if (coord.y == player.y + 1 || coord.y == player.y - 1) {
								console.log("Skipped spawn location because it was next to the player.", coord);
								isNextToPlayer = true;
							}
						}
					}
					openTiles.splice(random, 1);
					attempts++;
				} while ((map[coord.y][coord.x].entity || isNextToPlayer) && attempts < 20);

				if (attempts == 20 || noMoreTilesAvailable) {
					console.log(
					"ERR: Max attempts reached or no more open tiles. Cannot spawn this:", entity);

					return {
						map: nextMap,
						error: true };

				}
				entity.y = coord.y;
				entity.x = coord.x;
				var category = type;
				if (type == "player" || type == "monster") {
					//Categorize player and monsters as entities
					category = "entity";
				}
				nextMap[coord.y][coord.x][category] = entity;
			}

			console.log("Spawning " + type + " '" + entity.name + "' at x:" + coord.x + " y:" + coord.y);

			if (type == "player") {
				var _player = this.state.player;
				_player.x = coord.x;
				_player.y = coord.y;
				//To be passed to generateMap()
				return {
					player: _player,
					map: nextMap };

			} else if (type == "monster") {
				//If it's a non-player entity (monster)
				nextNpcs.push(entity);
				return {
					map: nextMap,
					npcs: nextNpcs };

			} else if (type == "item") {
				nextMap[coord.y][coord.x].item = entity;
				return {
					map: nextMap };

			}
			console.log("ERR: spawn() called with unhandled type: " + type);
			return;
		} }, { key: "spawnHealingItems", value: function spawnHealingItems(

		map) {
			var nextMap = map;
			var numberToSpawn = this.scanMapFor("floor", nextMap).length * healingItemDensity;
			var items = [];
			for (var i = 0; i < numberToSpawn; i++) {
				var item = void 0;
				if (Math.random() < healingItemRarity) {
					item = healingItems.rare[this.random(1, healingItems.rare.length) - 1];
				} else {
					item = healingItems.common[this.random(1, healingItems.common.length) - 1];
				}
				item.type = "healing";
				items.push(item);
			}
			console.log("Spawning these healing items:", items);
			for (var _i3 = 0; _i3 < items.length - 1; _i3++) {
				nextMap = this.spawn("item", items[_i3], nextMap, this.state.npcs).map;
			}
			console.log("Finished spawning healing items. nextMap:");
			console.log(nextMap);
			return nextMap;
		} }, { key: "spawnMonsters", value: function spawnMonsters(

		map) {
			var monsterFamily = monsters[this.random(0, monsters.length - 1)];
			console.log("Selected " + monsterFamily.name + " family of monsters.");
			var floorTiles = this.scanMapFor("floor", map);
			var monsterCount = floorTiles.length * monsterDensity;
			var monsterVariance = Math.random() * 2 * monsterDensityVariation;
			monsterCount += monsterCount * monsterVariance;
			monsterCount = Math.floor(monsterCount);
			console.log("Will spawn " + monsterCount + " monsters. monsterDensity:" + monsterDensity + " monsterDensityVariation:" + monsterDensityVariation + " floorTiles.length:" + floorTiles.length);

			//Make an array of random monsters to place
			var monstersToPlace = [];
			var e = Math.floor(monsterCount / 2);
			var m = monsterCount - e - 1;
			var id = 1;
			for (var i = 0; i < e; i++) {
				var monster = monsterFamily.easy[this.random(0, monsterFamily.easy.length - 1)];
				var _randomized = this.randomizeMonster(monster, "easy");
				_randomized.type = "easy";
				_randomized.id = id;
				id++;
				monstersToPlace.push(_randomized);
			}
			for (var _i4 = 0; _i4 < m; _i4++) {
				var _monster = monsterFamily.medium[this.random(0, monsterFamily.medium.length - 1)];
				var _randomized2 = this.randomizeMonster(_monster, "medium");
				_randomized2.type = "medium";
				_randomized2.id = id;
				id++;
				monstersToPlace.push(_randomized2);
			}
			var boss = monsterFamily.boss[this.random(0, monsterFamily.boss.length - 1)];
			var randomized = this.randomizeMonster(boss, "boss");
			randomized.type = "boss";
			randomized.id = id;
			monstersToPlace.push(randomized);
			console.log("Here are the monstersToPlace:", monstersToPlace);

			//Then place them in the map
			var nextMap = map;
			var nextNpcs = [];
			var monstersSuccessfullySpawned = 0;
			for (var j = 0; j < monstersToPlace.length; j++) {
				var spawn = this.spawn("monster", monstersToPlace[j], nextMap, nextNpcs);
				if (spawn.error) {
					console.log("ERR: spawnMonsters(): Received error from spawn(). monsterDensity is probably too high (" + monsterDensity + "). Discontinuing spawning.");
					break;
				}
				nextMap = spawn.map;
				nextNpcs = spawn.npcs;
				monstersSuccessfullySpawned = j + 1;
			}
			console.log("Map with monsters:", nextMap);
			console.log("spawnMonsters(): nextNpcs:", nextNpcs);
			return {
				npcs: nextNpcs,
				map: nextMap,
				monsterCount: monstersSuccessfullySpawned };

		} }, { key: "updateVisibleMap", value: function updateVisibleMap(

		map, x, y) {

			var visible = [];
			var radius = viewSize;
			var radiusMax = maxViewSize;
			var padding = radiusMax - radius;

			var xMin = x - radius;
			var xMax = x + radius + 1;
			var xBound = map[0].length - 1;
			var yMin = y - radius;
			var yMax = y + radius + 1;
			var yBound = map.length - 1;

			//set all currently visible tiles to not visible
			for (var row = 0; row < map.length - 1; row++) {
				for (var cell = 0; cell < map[0].length - 1; cell++) {
					map[row][cell].visible = false;
				}
			}

			//put new set of tiles into the visible map array
			for (var _row = yMin; _row < yMax; _row++) {
				var newRow = [];
				for (var _cell4 = xMin; _cell4 < xMax; _cell4++) {
					var newCell = void 0;
					//if out of map bounds, add empty (rock) tiles
					if (_cell4 < 0 || _cell4 > xBound || _row < 0 || _row > yBound) {
						newCell = {
							state: "rock",
							x: _cell4,
							y: _row };

						//console.log("adding nonexistent cell to visible x:" + cell + " y:" + row);
					} else {
						newCell = map[_row][_cell4];
						//console.log(
						//	"adding map cell " +
						//		JSON.stringify(map[row][cell]) +
						//		" to visible x:" +
						//		cell +
						//		" y:" +
						//		row
						//);
					}

					//set as visible according to a circular radius
					var sq = Math.pow(_cell4 - x, 2) + Math.pow(_row - y, 2) + 1;
					console.log("r**2: " + Math.pow(radius, 2) + " sq:" + sq + " cell:" + _cell4 + " row:" + _row);
					if (Math.pow(radius, 2) >= sq) {
						newCell.visible = true;
					} else {
						newCell.visible = false;
					}
					newRow.push(newCell);
				}
				visible.push(newRow);
			}
			return visible;
		}


		//-----LIFECYCLE-----
	}, { key: "componentWillMount", value: function componentWillMount()
		{
			this.setState(this.generateMap());
			document.addEventListener("keydown", this.handleKeyDown.bind(this));
		} }, { key: "render", value: function render()

		{
			return (
				React.createElement("div", { id: "wrapper" },
					React.createElement(Game, { map: this.state.visibleMap, player: this.state.player, log: this.state.combatLog, depth: this.state.depth, monsterCount: this.state.monsterCount }),
					React.createElement(Footer, { title: "React Roguelike" })));


		} }]);return App;}(React.Component);var


Footer = function (_React$Component2) {_inherits(Footer, _React$Component2);function Footer() {_classCallCheck(this, Footer);return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));}_createClass(Footer, [{ key: "render", value: function render()
		{
			return (
				React.createElement("div", { className: "footer" },
					React.createElement("div", { className: "heading" }, this.props.title),
					React.createElement("div", { className: "author" },
						React.createElement("span", null, "By ",
							React.createElement("a", { href: my.site }, "Lewis Horwood")),

						React.createElement("div", { className: "button-group" },
							React.createElement("a", { href: my.github },
								React.createElement("div", { className: "button" },
									React.createElement("span", { className: "button-chevron" }, "> "), "github")),


							React.createElement("a", { href: my.freecodecamp },
								React.createElement("div", { className: "button" },
									React.createElement("span", { className: "button-chevron" }, "> "), "freecodecamp"))))));






		} }]);return Footer;}(React.Component);var


Game = function (_React$Component3) {_inherits(Game, _React$Component3);function Game() {_classCallCheck(this, Game);return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));}_createClass(Game, [{ key: "render", value: function render()
		{
			return (
				React.createElement("div", { id: "main" },
					React.createElement(Log, { log: this.props.log }),
					React.createElement(Map, { map: this.props.map }),
					React.createElement(Info, {
						player: this.props.player,
						depth: this.props.depth,
						monsterCount: this.props.monsterCount })));



		} }]);return Game;}(React.Component);var


CombatLog = function (_React$Component4) {_inherits(CombatLog, _React$Component4);function CombatLog() {_classCallCheck(this, CombatLog);return _possibleConstructorReturn(this, (CombatLog.__proto__ || Object.getPrototypeOf(CombatLog)).apply(this, arguments));}_createClass(CombatLog, [{ key: "render", value: function render()
		{
			var items = this.props.log.slice(-10).reverse();
			var log = items.map(function (i, index) {
				return React.createElement("li", { id: index }, i);
			});
			return (
				React.createElement("div", { id: "combatLog" },
					React.createElement("ul", null,
						log)));



		} }]);return CombatLog;}(React.Component);var


Log = function (_React$Component5) {_inherits(Log, _React$Component5);function Log() {_classCallCheck(this, Log);return _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).apply(this, arguments));}_createClass(Log, [{ key: "render", value: function render()
		{
			return (
				React.createElement("div", { className: "panel" },
					React.createElement(CombatLog, { log: this.props.log })));


		} }]);return Log;}(React.Component);var


Map = function (_React$Component6) {_inherits(Map, _React$Component6);function Map() {_classCallCheck(this, Map);return _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).apply(this, arguments));}_createClass(Map, [{ key: "render", value: function render()
		{
			return (
				React.createElement("div", { id: "center" },
					React.createElement("div", { id: "map" },
						React.createElement(Grid, { map: this.props.map }))));



		} }]);return Map;}(React.Component);var


Grid = function (_React$Component7) {_inherits(Grid, _React$Component7);function Grid() {_classCallCheck(this, Grid);return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));}_createClass(Grid, [{ key: "renderMap", value: function renderMap()
		{
			var map = this.props.map;
			var output = [];
			for (var y = 0; y < map.length; y++) {
				var row = map[y].map(function (cell, index) {
					var displayClass = void 0;
					if (cell.entity) {
						displayClass = cell.entity.type;
					} else if (cell.item) {
						displayClass = cell.item.type;
					} else {
						displayClass = cell.state;
					}
					return React.createElement("div", { className: "mapCell " + displayClass + " " + (cell.visible ? "visible" : "notvisible") });
				});
				output.push(
				React.createElement("div", { className: "mapRow", id: y },
					row));


			}
			console.log("Rendering map:", map);
			return output;
		} }, { key: "render", value: function render()

		{
			return React.createElement("div", { id: "grid" }, this.renderMap());
		} }]);return Grid;}(React.Component);var


Info = function (_React$Component8) {_inherits(Info, _React$Component8);function Info() {_classCallCheck(this, Info);return _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).apply(this, arguments));}_createClass(Info, [{ key: "render", value: function render()
		{
			return (
				React.createElement("div", { className: "panel" },
					React.createElement(PlayerInfo, {
						player: this.props.player,
						depth: this.props.depth,
						monsterCount: this.props.monsterCount })));



		} }]);return Info;}(React.Component);var


PlayerInfo = function (_React$Component9) {_inherits(PlayerInfo, _React$Component9);function PlayerInfo() {_classCallCheck(this, PlayerInfo);return _possibleConstructorReturn(this, (PlayerInfo.__proto__ || Object.getPrototypeOf(PlayerInfo)).apply(this, arguments));}_createClass(PlayerInfo, [{ key: "render", value: function render()
		{
			var pluralize = "s";
			if (this.props.monsterCount < 2) {pluralize = "";}
			return (
				React.createElement("div", { id: "playerInfo" },
					React.createElement("p", { className: "playerName" }, this.props.player.name),
					React.createElement("p", { className: "playerLevel" }, "Level ", this.props.player.level),
					React.createElement("p", { className: "levelInfo" }, "Floor ", this.props.depth, " -- ", this.props.monsterCount, " monster", pluralize, " left"),
					React.createElement("p", null,
						React.createElement(PlayerInfoBar, { type: "hp", player: this.props.player })),

					React.createElement("p", null,
						React.createElement(PlayerInfoBar, { type: "xp", player: this.props.player }))));



		} }]);return PlayerInfo;}(React.Component);var


PlayerInfoBar = function (_React$Component10) {_inherits(PlayerInfoBar, _React$Component10);function PlayerInfoBar() {_classCallCheck(this, PlayerInfoBar);return _possibleConstructorReturn(this, (PlayerInfoBar.__proto__ || Object.getPrototypeOf(PlayerInfoBar)).apply(this, arguments));}_createClass(PlayerInfoBar, [{ key: "render", value: function render()
		{
			var type = this.props.type;
			var remaining = void 0,max = void 0;
			if (type == "hp") {
				remaining = this.props.player.hp;
				max = this.props.player.hpmax;
			} else if (type == "xp") {
				remaining = this.props.player.xp;
				max = this.props.player.xpmax;
			}
			return (
				React.createElement("div", { className: "playerInfoBar" },
					React.createElement("div", { className: "typeName" }, type.toUpperCase(), ":"),
					React.createElement("div", { className: "bar " + this.props.type },
						React.createElement("div", { className: "infoText" },
							remaining, "/", max),

						React.createElement("div", { className: "remaining", style: { width: remaining / max * 200 } }),
						React.createElement("div", { className: "missing", style: { width: (1 - remaining / max) * 200 } }))));



		} }]);return PlayerInfoBar;}(React.Component);


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));