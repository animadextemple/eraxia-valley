//-----------------------------------------------------------------------------
//  Galv's Map Travel
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_MapTravel.js
//-----------------------------------------------------------------------------
//  2017-09-18 - Version 1.2 - Separated some code for edit patches
//  2017-09-17 - Version 1.1 - Added ability to use animated location graphics
//                             Added ability to include non-location objects
//                             Fixed some mistaken code
//  2017-08-25 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MapTravel = true;

var Galv = Galv || {};        // Galv's main object
Galv.MAPT = Galv.MAPT || {};        // Galv's plugin stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.2) A new scene allowing you to fast travel by selecting locations on a map
 *
 * @author Galv - galvs-scripts.com
 *
 * @param Transfer Map Variable
 * @desc The in game variable used to store map ID player will transfer to
 * @default 1
 *
 * @param Transfer X Variable
 * @desc The in game variable used to store the x coordinate the player will transfer to
 * @default 2
 *
 * @param Transfer Y Variable
 * @desc The in game variable used to store the y coordinate the player will transfer to
 * @default 3
 *
 * @param Confirm Text
 * @desc Text displayed in the confirm window for executing the travel
 * @default Travel
 *
 * @param Cancel Text
 * @desc Text displayed in the confirm window for cancelling.
 * @default Cancel
 *
 * @param Confirm Window Width
 * @desc The width of the confirm window
 * @default 180
 *
 * @param Default Location Frames
 * @desc The width of the confirm window
 * @default 3
 *
 * @param Frame Speed
 * @desc The speed of the frame animation (smaller is faster)
 * @default 10
 *
 * @help
 *   Galv's
 * ----------------------------------------------------------------------------
 * This plugin creates a new scene the player can fast travel to a selected
 * location on a map image using mouse or keyboard.
 *
 * This plugin is not plug-and-play, users will require skills that allow them
 * to create their own map graphics and understand basic javascript (such as
 * arrays and string).
 *
 * GRAPHICS
 *
 * Graphics in this map travel scene are located in a new folder (you will
 * need to add to your project):
 * YourProject/img/maptravel/
 *
 * The map graphic can be any size you wish and controls the size you scroll
 * around in the map travel scene.
 *
 * The location graphics can be any size also, but require 3 x the location
 * image's height to hold 3 frames. Each frame shows at different times:
 * Top: Default on the map
 * Middle: When location is selected
 * Bottom: When location is disabled
 * View the plugin demo for example location graphics
 *
 * Make sure you set your 3 location variables in the plugin settings and do
 * not use those variables for anything else in your game. These will hold the
 * mapid, x, y values to use in a "Transfer" event command.
 *
 *
 *
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT CALLS
 * ----------------------------------------------------------------------------
 * Step 1. Create a map
 * ---------------------
 * To create a new map to use in the map travel scene, use this script call:
 *
 *        Galv.MAPT.createMap(id,"mapImage",[[bg],[bg]],[[fg],[fg]]);
 *
 * INFO:
 * id          = a unique number to identify the map you created
 * "mapImage"  = the name of the map graphic to use from /img/maptravel/
 *               this image will determine the size of your map in the scene
 * [bg]        = an array to set up a background graphic behind the map image
 *               You can have as many bg arrays as desired each should have:
 *               ["bgimage",xmove,ymove,opacity]
 * [fg]        = works the same as bg arrays but instead for foreground images
 *               ["fgimage",xmove,ymove,opacity]
 *
 *
 *
 * Step 2. Setting locations and objects
 * -------------------------------------
 * You can add as many locations to a map as required using the below script
 * call for each location added.
 *
 *        Galv.MAPT.setLocation(id,"name","image",mx,my,tmid,tx,ty,"desc",f);
 *
 * INFO:
 * id          = the unique number identifying the map you created above
 * "name"      = the name of the location (also used to reference it)
 * "image"     = the name of the location graphic to use from /img/maptravel/
 *               this graphic requires 3 rows in the spritesheet for:
 *               top = normal, middle = active, bottom = disabled
 * mx          = the x postion on your map graphic for the location
 * my          = the y postion on your map graphic for the location
 * tmid        = transfer map id - the in-game map id to transfer to
 * tx          = the in-game map x co-ordinate to transfer to
 * ty          = the in-game map y co-ordinate to transfer to
 * "desc"      = a short description displayed when location is selected.
 *               Use the | symbol to specify a new line.
 * f           = frames of animation in your location image. Don't include
 *               this attribute to use the plugin setting default frames
 *
 * Note that you can use this setLocation to overwrite a previously set one
 * using the same name if you want to change it to something else.
 *
 * In addition to locations, you can add 'objects' that work in a similar
 * way but only have one row of graphics in the spritesheet and will not
 * appear in the location list.
 *
 *       Galv.MAPT.setObject(id,"name","image",mx,my,f);
 *       Galv.MAPT.removeObject(id,"name");
 *
 *
 * Step 3. Calling the scene
 * --------------------------
 * To open up the map travel scene for the player to fast travel to a location
 * that has been added to their map:
 *
 *         Galv.MAPT.openMap(id);      // unique id set above for map to open
 *                                     // if map isn't created nothing happens
 *
 *
 *
 * Other Script Calls
 * -------------------
 *
 *   Galv.MAPT.hasMap(id)    // use in conditional branch 'script' to check if
 *                           // map has been created in the player's game yet
 *
 *   Galv.MAPT.mapSelected   // use in conditional branch after scene is run
 *                           // to check if player selected a location or not
 *
 *
 *   Galv.MAPT.initLocation("name");  // set starting location of map scene to
 *                                    // this location.   
 *
 *   Galv.MAPT.enableLocation(id,"name",s);  // s can be true or false to
 *                                           // set the location "name" in the
 *                                           // map id to enabled or disabled
 *
 *   Galv.MAPT.removeLocation(id,"name");  // remove location from mapid list
 *
 *   Galv.MAPT.editLocation(id,"name","attribute",value);  // edit location
 *
 *   // id = the map id you are editing
 *   // "name" = the location name you are editing
 *   // "attribute" = the attribute you would like to edit. This can be:
 *   //               "image"         value = "imageName"
 *   //               "mapXY"         value = [x,y]
 *   //               "transfer"      value = [mapid,x,y]
 *   //               "desc"          value = "description here"
 *   // value = the value to change to. values for each attribute are above.
 *
 * EXAMPLE
 * Galv.MAPT.editLocation(0,"Your Mansion","desc","A new description!");
 *
 * Alternatively you could just overwrite the entire location by using
 * Galv.MAPT.setLocation(id,"name","image",mx,my,tmid,tx,ty,"desc");
 * and inputting the same name as you are overwriting.
 *
 * ----------------------------------------------------------------------------
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.MAPT.mapVar = Number(PluginManager.parameters('Galv_MapTravel')["Transfer Map Variable"]);
Galv.MAPT.xVar = Number(PluginManager.parameters('Galv_MapTravel')["Transfer X Variable"]);
Galv.MAPT.yVar = Number(PluginManager.parameters('Galv_MapTravel')["Transfer Y Variable"]);

Galv.MAPT.txtConfirm = PluginManager.parameters('Galv_MapTravel')["Confirm Text"];
Galv.MAPT.txtCancel = PluginManager.parameters('Galv_MapTravel')["Cancel Text"];
Galv.MAPT.cWinWidth = Number(PluginManager.parameters('Galv_MapTravel')["Confirm Window Width"]);

Galv.MAPT.defaultFrames = Number(PluginManager.parameters('Galv_MapTravel')["Default Location Frames"]);
Galv.MAPT.fSpeed = Number(PluginManager.parameters('Galv_MapTravel')["Frame Speed"]);

Galv.MAPT.active = 0;


Galv.MAPT.createMap = function(id,mapImage,backgrounds,foregrounds) {
	backgrounds = backgrounds || [];  // array of arrays with image details ["img",xm,ym,opac]
	foregrounds = foregrounds || [];  // array of arrays with image details ["img",xm,ym,opac]
	$gameSystem._travelMaps.maps[id] = {image:mapImage, backgrounds: backgrounds, foregrounds: foregrounds, locations: {}, objects: {}};
};

Galv.MAPT.setLocation = function(mapid,name,image,mx,my,tmid,tx,ty,desc,frames) {
	if (!Galv.MAPT.hasMap(mapid)) return;
	$gameSystem._travelMaps.maps[mapid].locations[name] = {name:name, image:image, mapXY:[mx,my], transfer:[tmid,tx,ty], enabled:true, desc: desc,frames:frames || Galv.MAPT.defaultFrames};
};

Galv.MAPT.setObject = function(mapid,name,image,mx,my,frames) {
	if (!Galv.MAPT.hasMap(mapid)) return;
	$gameSystem._travelMaps.maps[mapid].objects[name] = {name:name, image:image, mapXY:[mx,my],frames:frames || Galv.MAPT.defaultFrames};
};

Galv.MAPT.hasMap = function(id) {
	return $gameSystem._travelMaps.maps[id];
};

Galv.MAPT.openMap = function(id) {
	if (Galv.MAPT.hasMap(id)) {
		$gameSystem._travelMapsId = id;
		SceneManager.push(Scene_MapTravel);
	}
};

Galv.MAPT.enableLocation = function(mapid,name,status) {
	if (Galv.MAPT.hasMap(mapid)) {
		$gameSystem._travelMaps.maps[mapid].locations[name].enabled = status;
	}
};

Galv.MAPT.removeLocation = function(mapid,name) {
	if (Galv.MAPT.hasMap(mapid)) {
		delete($gameSystem._travelMaps.maps[mapid].locations[name]);
	}
};

Galv.MAPT.removeObject = function(mapid,name) {
	if (Galv.MAPT.hasMap(mapid)) {
		delete($gameSystem._travelMaps.maps[mapid].objects[name]);
	}
};

Galv.MAPT.initLocation = function(name) {
	$gameSystem._travelMaps.current = name;
};

Galv.MAPT.editLocation = function(mapid,name,attribute,value) {
	if (Galv.MAPT.hasMap(mapid)) {
		var loc = $gameSystem._travelMaps.maps[mapid].locations[name];
		if (loc) loc[attribute] = value;
	}
};


//-----------------------------------------------------------------------------
//  IMAGEMANAGER
//-----------------------------------------------------------------------------
ImageManager.loadMapTravelGraphic = function(filename, hue) {
    return this.loadBitmap('img/maptravel/', filename, hue, true);
};


//-----------------------------------------------------------------------------
//  SCENE SYSTEM
//-----------------------------------------------------------------------------
Galv.MAPT.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.MAPT.Game_System_initialize.call(this);
	this._travelMaps = {maps:{},current:null};  // to store and reference all travel map details
	this._travelMapsId = 0; // set to map id to use in travelmap scene
};

})();



//-----------------------------------------------------------------------------
//  SCENE MAP TRAVEL
//-----------------------------------------------------------------------------

function Scene_MapTravel() {
    this.initialize.apply(this, arguments);
}

Scene_MapTravel.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MapTravel.prototype.constructor = Scene_MapTravel;

Scene_MapTravel.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_MapTravel.prototype.createVars = function() {
	this._currentMousePos = {x:TouchInput.x,y:TouchInput.y};
	if ($gameSystem._travelMaps.current && this.data().locations[$gameSystem._travelMaps.current]) {
		Galv.MAPT.active = $gameSystem._travelMaps.current;
	} else {
		Galv.MAPT.active = 0;
	}
	Galv.MAPT.scrollTarget = null;
	this._prepRelease = false;
	this._drag = {x:0,y:0,sx:0,sy:0};
};

Scene_MapTravel.prototype.start = function() {
	this.createVars();
    Scene_MenuBase.prototype.start.call(this);
	this._menuActive = true;
};

Scene_MapTravel.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this._needRefresh = true; // need refresh to refresh sizes once map image loads
	this.createBackgrounds();
	this.createMap();
	this.createLocations();
	this.createObjects();
	this.createForegrounds();
	this.createLocWindow();
	this.createLocListWindow();
	this.createConfirmWindow();
};

Scene_MapTravel.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
};

Scene_MapTravel.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId];
};

Scene_MapTravel.prototype.createBackgrounds = function() {
	this._bgSprites = [];
	var bgs = this.data().backgrounds;
	
	for (var i = 0; i < bgs.length; i++) {
		this._bgSprites[i] = new TilingSprite();
		this._bgSprites[i].width = Graphics.boxWidth;
		this._bgSprites[i].height = Graphics.boxHeight;
		this._bgSprites[i].bitmap = ImageManager.loadMapTravelGraphic(bgs[i][0],null,'images/');
		this._bgSprites[i].opacity = bgs[i][3];
		this.addChild(this._bgSprites[i]);
	};
};

Scene_MapTravel.prototype.createMap = function() {
	this.mapSprite = new Sprite();
	var filename = this.data().image;
	this.mapSprite.bitmap = ImageManager.loadMapTravelGraphic(filename,null,'images/');
	this.addChild(this.mapSprite);
};

Scene_MapTravel.prototype.createLocations = function() {
	this._locations = [];
	var locs = this.data().locations;
	for (var l in locs) {
		this._locations.push(new Sprite_MapTravelIcon(locs[l].name));
	};
	
	for (var i = 0; i < this._locations.length; i++) {
		this.mapSprite.addChild(this._locations[i]);
	};
};

Scene_MapTravel.prototype.createObjects = function() {
	this._objects = [];
	var objs = this.data().objects;
	for (var o in objs) {
		this._objects.push(new Sprite_MapTravelIconObj(objs[o].name));
	};
	
	for (var i = 0; i < this._objects.length; i++) {
		this.mapSprite.addChild(this._objects[i]);
	};
};
	
Scene_MapTravel.prototype.createForegrounds = function() {		
	this._fgSprites = [];
	var fgs = this.data().foregrounds;
	
	for (var i = 0; i < fgs.length; i++) {
		this._fgSprites[i] = new TilingSprite();
		this._fgSprites[i].width = Graphics.boxWidth;
		this._fgSprites[i].height = Graphics.boxHeight;
		this._fgSprites[i].bitmap = ImageManager.loadMapTravelGraphic(fgs[i][0],null,'images/');
		this._fgSprites[i].opacity = fgs[i][3];
		this.addChild(this._fgSprites[i]);
	};
};

Scene_MapTravel.prototype.createLocWindow = function() {	
	this._locationWindow = new Window_MapTravelLocation();
    this.addChild(this._locationWindow);
};

Scene_MapTravel.prototype.createLocListWindow = function() {	
	this._locationListWindow = new Window_MapTravelList(0,0,Graphics.boxWidth / 3,Graphics.boxHeight - this._locationWindow.height);
	this._locationListWindow.activate();
    this.addChild(this._locationListWindow);
};

Scene_MapTravel.prototype.createConfirmWindow = function() {	
	this._confirmWindow = new Window_MapTravelConfirm();
	this._confirmWindow.setHandler('confirm', this.confirmOk.bind(this));
	this._confirmWindow.setHandler('cancel', this.confirmCancel.bind(this));
	this._confirmWindow.deactivate();
    this.addChild(this._confirmWindow);
};

Scene_MapTravel.prototype.openConfirm = function() {
	
	if (Galv.MAPT.active && this.data().locations[Galv.MAPT.active].enabled) {	
		this._confirmWindow.activate();
		this._confirmWindow.open();
		this._confirmWindow.select(0);
		this._locationListWindow.deactivate();
	} else {
		SoundManager.playBuzzer();
	}
};

Scene_MapTravel.prototype.closeConfirm = function() {
	this._confirmWindow.deactivate();
	this._confirmWindow.close();
	this._confirmWindow.select(-1);
	this._locationListWindow.activate();
};

Scene_MapTravel.prototype.confirmOk = function() {
	this.setTransfer();
};

Scene_MapTravel.prototype.confirmCancel = function() {
	this.closeConfirm();
};

Scene_MapTravel.prototype.setTransfer = function() {
	if (Galv.MAPT.active) {	
		if (this.data().locations[Galv.MAPT.active].enabled) {
			this.doTransfer();
			SoundManager.playOk();
		} else {
			SoundManager.playBuzzer();
		}
	}
};

Scene_MapTravel.prototype.doTransfer = function() {
	var vars = this.data().locations[Galv.MAPT.active].transfer;
	$gameVariables.setValue(Galv.MAPT.mapVar,vars[0]);
	$gameVariables.setValue(Galv.MAPT.xVar,vars[1]);
	$gameVariables.setValue(Galv.MAPT.yVar,vars[2]);
	Galv.MAPT.mapSelected = true;
	SceneManager.goto(Scene_Map);
	Galv.MAPT.active = false;
};

Scene_MapTravel.prototype.doExitScene = function() {
	SceneManager.pop();
};

Scene_MapTravel.prototype.update = function() {
	this.updateControls();
	this.updateLayers();
	Scene_MenuBase.prototype.update.call(this);
	this.updateRefresh();
	this.updateScroll();
};

Scene_MapTravel.prototype.updateScroll = function() {
	if (Galv.MAPT.scrollTarget) {
		var tx = Galv.MAPT.scrollTarget[0];
		var ty = Galv.MAPT.scrollTarget[1];
		var cx = Math.floor(this.mapSprite.x - Graphics.width / 1.5);
		var cy = Math.floor(this.mapSprite.y - (Graphics.height / 2) + (this._locationWindow.height / 2));
		
		var dist = Math.max(Math.round(Math.abs(tx + cx) * 0.1),1);
		var speed = Math.min(dist,15);
		if (-tx > cx) this.scrollLeft(speed);
		if (-tx < cx) this.scrollRight(speed);
		
		var dist = Math.max(Math.round(Math.abs(ty + cy) * 0.1),1);
		var speed = Math.min(dist,15);
		if (-ty > cy) this.scrollUp(speed);
		if (-ty < cy) this.scrollDown(speed);
	}
};

Scene_MapTravel.prototype.scrollLeft = function(speed) {
	this.mapSprite.x = Math.min(this.mapSprite.x + speed,0);
};

Scene_MapTravel.prototype.scrollRight = function(speed) {
	var m = this.mapSprite.bitmap.width;
	this.mapSprite.x = Math.max(this.mapSprite.x - speed,Graphics.boxWidth - m);
};

Scene_MapTravel.prototype.scrollUp = function(speed) {
	this.mapSprite.y = Math.min(this.mapSprite.y + speed,0);
};

Scene_MapTravel.prototype.scrollDown = function(speed) {
	var m = this.mapSprite.bitmap.height;
	this.mapSprite.y = Math.max(this.mapSprite.y - speed,Graphics.boxHeight - m);
};

Scene_MapTravel.prototype.updateControls = function() {
	if (this._needRefresh) return;
	this.updateKeyboardControls();
	this.updateMouseControls();
};

Scene_MapTravel.prototype.updateKeyboardControls = function() {
	if (!Galv.MAPT.active) {
		// If no location is selected, keyboard keys scroll around
		var speed = Input.isPressed('shift') ? 20 : 8;
		if (Input.isPressed('right') && !Input.isPressed('left')) {
			this.scrollRight(speed);
		} else if (Input.isPressed('left') && !Input.isPressed('right')) {
			this.scrollLeft(speed);
		}
		if (Input.isPressed('up') && !Input.isPressed('down')) {
			this.scrollUp(speed);
		} else if (Input.isPressed('down') && !Input.isPressed('up')) {
			this.scrollDown(speed);
		}
		
		if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
			Galv.MAPT.mapSelected = false;
			this.doExitScene();
		} else if (Input.isTriggered('ok')) {
			var selectClosest = null;
			var dist = 999999;
			for (var i = 0; i < this._locations.length; i++) {
				var a = this._locations[i].x + this.mapSprite.x - Graphics.width / 1.5;
				var b = this._locations[i].y + this.mapSprite.y - (Graphics.height / 2) + (this._locationWindow.height / 2);
				var dist2 = Math.sqrt( a * a + b * b );
				if (dist2 < dist) {
					selectCloset = this._locations[i];
					dist = dist2;
				}
			};	
			Galv.MAPT.active = selectCloset._name || this._locations[0]._name;
			this.refreshLocations();
		}
	} else {
		// If location is selected, cancel unselects location and no scrolling.
		if (!this._confirmWindow.active) {
			if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
				Galv.MAPT.active = null;
				Galv.MAPT.scrollTarget = null;
				this.refreshLocations();
			} else if (Input.isTriggered('ok')) {
				//this.setTransfer();
				this.openConfirm();
			}
		}
	}
};

Scene_MapTravel.prototype.updateMouseControls = function() {
	if (!this._confirmWindow.active) {
		if (TouchInput.isPressed()) {
			if (TouchInput.isTriggered() && !this._locationListWindow.isTouchedInsideFrame()) {
				Galv.MAPT.scrollTarget = null;
				this._drag = {x:Number(TouchInput.x),y:Number(TouchInput.y),sx:Number(this.mapSprite.x),sy:Number(this.mapSprite.y)};
				this._triggeredIn = true;
			}
			if (this._triggeredIn) {
				this.mapSprite.x = Math.max(Math.min(0,this._drag.sx - this._drag.x + TouchInput.x), Graphics.boxWidth - this.mapSprite.bitmap.width);
				this.mapSprite.y = Math.max(Math.min(0,this._drag.sy - this._drag.y + TouchInput.y), Graphics.boxHeight - this.mapSprite.bitmap.height);
				this._prepRelease = true;
			}
		} else if (this._prepRelease && this._triggeredIn) {
			for (var i = 0; i < this._locations.length; i++) {
				if (this._locations[i].isButtonTouched()) {
					if (Galv.MAPT.active === this._locations[i]._name) {
						//this.setTransfer();
						this.openConfirm();
					} else {
						Galv.MAPT.active = this._locations[i]._name;
						break;
					}
				}
			}
			this.refreshLocations();
			this._prepRelease = false;
			this._triggeredIn = false;
	
		} else {
			this._triggeredIn = false;
		}
	}
};

Scene_MapTravel.prototype.refreshLocations = function() {
	for (var i = 0; i < this._locations.length; i++) {
		this._locations[i].refresh();
	}
};

Scene_MapTravel.prototype.updateRefresh = function() {
	if (this._needRefresh) {
		for (var i = 0; i < this._bgSprites.length; i++) {
			this._bgSprites[i].width = this.mapSprite.bitmap.width;
			this._bgSprites[i].height = this.mapSprite.bitmap.height;
			this._bgSprites[i].x = this.mapSprite.x;
			this._bgSprites[i].y = this.mapSprite.y;
		};
		for (var i = 0; i < this._fgSprites.length; i++) {
			this._fgSprites[i].width = this.mapSprite.bitmap.width;
			this._fgSprites[i].height = this.mapSprite.bitmap.height;
			this._fgSprites[i].x = this.mapSprite.x;
			this._fgSprites[i].y = this.mapSprite.y;
		};
		this._needRefresh = false;
	};
};

Scene_MapTravel.prototype.updateLayers = function() {
	var bgs = this.data().backgrounds;
	for (var i = 0; i < this._bgSprites.length; i++) {
		this._bgSprites[i].x = this.mapSprite.x;
		this._bgSprites[i].y = this.mapSprite.y;
		this._bgSprites[i].origin.x += bgs[i][1];
		this._bgSprites[i].origin.y += bgs[i][2];
	};	
	var fgs = this.data().foregrounds;
	for (var i = 0; i < this._fgSprites.length; i++) {
		this._fgSprites[i].x = this.mapSprite.x;
		this._fgSprites[i].y = this.mapSprite.y;
		this._fgSprites[i].origin.x += fgs[i][1];
		this._fgSprites[i].origin.y += fgs[i][2];
	};
};


//-----------------------------------------------------------------------------
// Sprite_MapTravelIcon
//-----------------------------------------------------------------------------

function Sprite_MapTravelIcon() {
    this.initialize.apply(this, arguments);
}

Sprite_MapTravelIcon.prototype = Object.create(Sprite.prototype);
Sprite_MapTravelIcon.prototype.constructor = Sprite_MapTravelIcon;

Sprite_MapTravelIcon.prototype.initialize = function(name) {
	this._isReady = false;
	this._enabled = true;
	this._sy = -1;
	this._sx = 0;
	this._fIndex = 0;
	this._ticker = 0;
    Sprite.prototype.initialize.call(this);
	this._name = name;
	this.cacheBitmap();
	this.anchor.y = 0.5;
	this.anchor.x = 0.5;
	var data = this.data();
	this.x = data.mapXY[0];
	this.y = data.mapXY[1];
	this._frames = data.frames;
};

Sprite_MapTravelIcon.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId].locations[this._name];
};

Sprite_MapTravelIcon.prototype.cacheBitmap = function() {
	this._pw = 0;
	this._ph = 0;
	this.bitmap = ImageManager.loadMapTravelGraphic(this.data().image);
};

Sprite_MapTravelIcon.prototype.setBitmap = function() {
	this._pw = this.bitmap.width / this._frames;
	this._ph = this.bitmap.height / 3;
	
	if (!this.data().enabled) {
		this._enabled = false;
		this._sy = this._ph * 2;
	}
	this.updateBitmap();
};

Sprite_MapTravelIcon.prototype.updateBitmap = function() {
	if (this._enabled) this._sy = Galv.MAPT.active === this._name ? this._ph : 0;
	this.setFrame(this._sx, this._sy, this._pw, this._ph);
};

Sprite_MapTravelIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (!this._isReady && ImageManager.isReady()) {
		this.setBitmap();
		this._isReady = true;
	}
	
	if (this._ticker >= Galv.MAPT.fSpeed) {
		this._fIndex += 1;
		if (this._fIndex >= this._frames) this._fIndex = 0;
		this._sx = this._fIndex * this._pw;
		this.setFrame(this._sx, this._sy, this._pw, this._ph);
		this._ticker = 0;
	} else {
		this._ticker += 1;
	}
};

Sprite_MapTravelIcon.prototype.refresh = function() {
	this.updateBitmap();
};

Sprite_MapTravelIcon.prototype.isButtonTouched = function() {
    var x = this.canvasToLocalX(TouchInput.x + this.width * 0.5);
    var y = this.canvasToLocalY(TouchInput.y + this.height * 0.5);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Sprite_MapTravelIcon.prototype.canvasToLocalX = function(x) {
    var node = this;
    while (node) {
        x -= node.x;
        node = node.parent;
    }
    return x;
};

Sprite_MapTravelIcon.prototype.canvasToLocalY = function(y) {
    var node = this;
    while (node) {
        y -= node.y;
        node = node.parent;
    }
    return y;
};


//-----------------------------------------------------------------------------
// Sprite_MapTravelIconObj
//-----------------------------------------------------------------------------

function Sprite_MapTravelIconObj() {
    this.initialize.apply(this, arguments);
}

Sprite_MapTravelIconObj.prototype = Object.create(Sprite_MapTravelIcon.prototype);
Sprite_MapTravelIconObj.prototype.constructor = Sprite_MapTravelIconObj;

Sprite_MapTravelIconObj.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId].objects[this._name];
};

Sprite_MapTravelIconObj.prototype.updateBitmap = function() {
	this.setFrame(this._sx, 0, this._pw, this._ph);
};

Sprite_MapTravelIconObj.prototype.setBitmap = function() {
	this._pw = this.bitmap.width / this._frames;
	this._ph = this.bitmap.height;
	this.updateBitmap();
};

Sprite_MapTravelIconObj.prototype.isButtonTouched = function() {
};


//-----------------------------------------------------------------------------
// Window_MapTravelLocation
//-----------------------------------------------------------------------------

function Window_MapTravelLocation() {
    this.initialize.apply(this, arguments);
}

Window_MapTravelLocation.prototype = Object.create(Window_Base.prototype);
Window_MapTravelLocation.prototype.constructor = Window_MapTravelLocation;

Window_MapTravelLocation.prototype.initialize = function() {
    var width = Graphics.boxWidth; // - 40;
    var height = this.fittingHeight(2);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	this.y = Graphics.boxHeight;
	this._currentLocation = null;
};

Window_MapTravelLocation.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId].locations[Galv.MAPT.active];
};

Window_MapTravelLocation.prototype.refresh = function() {
    this.contents.clear();
	if (Galv.MAPT.active) {
		var desc = this.data().desc.split("|");
		for (var i = 0; i < desc.length; i++) {
			this.drawTextEx(desc[i], this.textPadding(), this.lineHeight() * i);
		}
		this._currentLocation = Galv.MAPT.active;
	}
};

Window_MapTravelLocation.prototype.update = function() {
	if (Galv.MAPT.active) {
		this.y = Math.max(this.y -= 12,Graphics.boxHeight - this.height);
	} else {
		this.y = Math.min(Graphics.boxHeight,this.y += 12);
	}
	if (this._currentLocation != Galv.MAPT.active) {
		this.refresh();
	}
};


//-----------------------------------------------------------------------------
// Window_MapTravelList
//-----------------------------------------------------------------------------

function Window_MapTravelList() {
    this.initialize.apply(this, arguments);
}

Window_MapTravelList.prototype = Object.create(Window_Selectable.prototype);
Window_MapTravelList.prototype.constructor = Window_MapTravelList;

Window_MapTravelList.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._data = [];
	this.refresh();
	this._currentActive = -1;
	this.x = -width;
};

Window_MapTravelList.prototype.maxCols = function() {
	return 1;
};

Window_MapTravelList.prototype.spacing = function() {
	return 48;
};

Window_MapTravelList.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};

Window_MapTravelList.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId];
};

Window_MapTravelList.prototype.item = function() {
	var index = this.index();
	return this._data && index >= 0 ? this._data[index] : null;
};

Window_MapTravelList.prototype.isCurrentItemEnabled = function() {
	return this.isEnabled(this.item());
};

Window_MapTravelList.prototype.isEnabled = function(item) {
	return item && item.enabled;
};

Window_MapTravelList.prototype.makeItemList = function() {
	this._data = [];
	var locs = this.data().locations;
	for (var l in locs) {
		this._data.push(locs[l]);
	};
};

Window_MapTravelList.prototype.drawItem = function(index) {
	var item = this._data[index];
	if (item) {
		var rect = this.itemRect(index);
		rect.width -= this.textPadding();
		this.changePaintOpacity(this.isEnabled(item));
		this.drawText(item.name,rect.x + 10,rect.y,rect.width - 10,"left");
		this.changePaintOpacity(1);
	}
};

Window_MapTravelList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_MapTravelList.prototype.update = function() {
	if (Galv.MAPT.active) {	
		this.x = Math.min(this.x + 15,0);
	} else {
		this.x = Math.max(this.x - 15,-this.width);
		return;
	}
	
	Window_Selectable.prototype.update.call(this);
	if (Galv.MAPT.active != this._currentActive) {
		// select item
		var id = -1;
		for (var i = 0; i < this._data.length; i++) {
			if (this._data[i].name === Galv.MAPT.active) {
				this._currentActive = Galv.MAPT.active;
				Galv.MAPT.scrollTarget = this.data().locations[Galv.MAPT.active].mapXY;
				id = i;
				break;
			}
		}
		this.select(id);
	}
};

Window_MapTravelList.prototype.select = function(index) {
	Window_Selectable.prototype.select.call(this,index);
	var item = this.item();
	if (item) {
		Galv.MAPT.active = this.item().name;
		if (SceneManager._scene.refreshLocations) SceneManager._scene.refreshLocations();
	}
};

Window_MapTravelList.prototype.onTouch = function(triggered) {
	var lastIndex = this.index();
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	var hitIndex = this.hitTest(x, y);
	if (hitIndex >= 0 && triggered) {
		if (hitIndex === this.index()) {
			if (triggered) {
				SceneManager._scene.openConfirm();
			}
		} else {
			this.select(hitIndex);
		}
	}
	if (this.index() !== lastIndex) {
		SoundManager.playCursor();		
	}
};


//-----------------------------------------------------------------------------
//  Window_MapTravelConfirm
//-----------------------------------------------------------------------------

function Window_MapTravelConfirm() {
    this.initialize.apply(this, arguments);
}

Window_MapTravelConfirm.prototype = Object.create(Window_Command.prototype);
Window_MapTravelConfirm.prototype.constructor = Window_MapTravelConfirm;

Window_MapTravelConfirm.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
};

Window_MapTravelConfirm.prototype.windowWidth = function() {
    return Galv.MAPT.cWinWidth;
};

Window_MapTravelConfirm.prototype.updatePlacement = function() {
	this.x = (Graphics.boxWidth - this.windowWidth()) *  0.7;
	this.y = (Graphics.boxHeight - this.height) / 2 - 54;
};

Window_MapTravelConfirm.prototype.makeCommandList = function() {
	this.addCommand(Galv.MAPT.txtConfirm,   'confirm');
	this.addCommand(Galv.MAPT.txtCancel,   'cancel');
};

Window_MapTravelConfirm.prototype.processOk = function() {
    Window_Command.prototype.processOk.call(this);
};