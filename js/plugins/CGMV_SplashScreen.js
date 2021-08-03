/*:
 * @plugindesc CGMV Splash Screen
 * @author Casper Gaming
 * @help
 * ==============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ==============================================================================
 * Become a Patron to get access to a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ==============================================================================
 * Version: 1.2
 * ------------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.0
 * ------------------------------------------------------------------------------
 * Description: This plugin creates a splash screen for your game. It can handle
 * multiple splashes.
 * ------------------------------------------------------------------------------
 * Documentation:
 * Display Time is amount of time to display an image for in frames.
 * 60 frames = 1 second
 *
 * Fade Speed is the amount of opacity to add/subtract for each frame of fade
 * in/out.
 *
 * Version History:
 * 1.0 - Initial Release
 *
 * 1.1:
 * - Fixed bug causing battle test to not work with this plugin.
 *
 * 1.2:
 * - Optimized code
 * - Added ability to play sound effect for each splash
 * - Added ability to delay sound effect for each splash
 * - Fixed bug with sprites not being centered
 * 
 * @param Display Time
 * @type number
 * @min 1
 * @desc Determines amount of time splash is shown for.
 * @default 360
 * 
 * @param Fade Speed
 * @type number
 * @min 1
 * @max 255
 * @desc Determines how fast each splash fades
 * @default 2
 *
 * @param Splashes
 * @type struct<Splash>[]
 * @default []
 * @desc Set up splash image/sound properties
*/
 /*~struct~Splash:
 * @param Image
 * @type file
 * @dir img/
 * @default
 * @desc The image to show on the splash screen
 * 
 * @param Sound Effect
 * @type file
 * @dir audio/se
 * @desc Sound to play when the splash is shown
 *
 * @param Sound Delay
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of time (in frames) to wait before playing the sound effect
*/
var Imported = Imported || {};
Imported.CGMV_SplashScreen = true;
var CGMV = CGMV || {};
CGMV.SplashScreen = CGMV.SplashScreen || {};
CGMV.SplashScreen.version = 1.2;
CGMV.SplashScreen.parameters = PluginManager.parameters('CGMV_SplashScreen');
CGMV.SplashScreen.DisplayTime = Number(CGMV.SplashScreen.parameters["Display Time"]) || 480;
CGMV.SplashScreen.FadeSpeed = Number(CGMV.SplashScreen.parameters["Fade Speed"]) || 2;
CGMV.SplashScreen.Splashes = JSON.parse(CGMV.SplashScreen.parameters["Splashes"]);
//=============================================================================
// CGMV_Splash
//-----------------------------------------------------------------------------
// Object which stores splash data
//=============================================================================
function CGMV_Splash() {
    this.initialize(...arguments);
}
CGMV_Splash.prototype.constructor = CGMV_Splash;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Splash.prototype.initialize = function(splashData) {
	const splash = JSON.parse(splashData);
	this._imagePath = splash["Image"];
	this._se = splash["Sound Effect"];
	this._soundDelay = splash["Sound Delay"];
	this.initImage();
};
//-----------------------------------------------------------------------------
// Initialize the image
//-----------------------------------------------------------------------------
CGMV_Splash.prototype.initImage = function() {
	const separator = this._imagePath.lastIndexOf("/");
	const filename = this._imagePath.slice(separator+1);
	const folder = "img/" + this._imagePath.slice(0, separator+1);
	this._image = ImageManager.loadBitmap(folder, filename);
};
//-----------------------------------------------------------------------------
// Determine if this splash has sound
//-----------------------------------------------------------------------------
CGMV_Splash.prototype.hasSound = function() {
	return this._se !== "";
};
//-----------------------------------------------------------------------------
// Get the splash image
//-----------------------------------------------------------------------------
CGMV_Splash.prototype.getImage = function() {
	return this._image;
};
//-----------------------------------------------------------------------------
// Get the splash sound effect
//-----------------------------------------------------------------------------
CGMV_Splash.prototype.getSe = function() {
	return this._se;
};
//-----------------------------------------------------------------------------
// Get the splash sound effect delay
//-----------------------------------------------------------------------------
CGMV_Splash.prototype.getSoundDelay = function() {
	return this._soundDelay;
};
//=============================================================================
// CGMV_Scene_SplashScreen
//-----------------------------------------------------------------------------
// Scene to show splash images and then transfer to title scene.
//=============================================================================
function CGMV_Scene_SplashScreen() {
    this.initialize.apply(this, arguments);
}
CGMV_Scene_SplashScreen.prototype = Object.create(Scene_Base.prototype);
CGMV_Scene_SplashScreen.prototype.constructor = CGMV_Scene_SplashScreen;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	this._timer = 0;
	this._fadeMode = 'none';
	this._fastFade = false;
	this._isReady = true;
	this._image = null;
	this._index = 0;
	this._hasSound = false;
	this._se = "";
	this._soundDelay = 0;
	this._soundPlayed = false;
	this._splashes = this.initSplashes();
};
//-----------------------------------------------------------------------------
// Initialize splash objects
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.initSplashes = function() {
    let splashes = [];
	CGMV.SplashScreen.Splashes.forEach((splash) => {
		splashes.push(new CGMV_Splash(splash));
	});
	return splashes;
};
//-----------------------------------------------------------------------------
// Create splash scene assets
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createImage();
};
//-----------------------------------------------------------------------------
// Create first splash image
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.createImage = function() {
    this._image = new Sprite(this._splashes[0].getImage());
	this._image.opacity = 0;
	this.addChild(this._image);
};
//-----------------------------------------------------------------------------
// Change image bitmap to next image
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.splash = function() {
	return this._splashes[this._index];
};
//-----------------------------------------------------------------------------
// Change image bitmap to next image
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.setNewImage = function() {
	const splash = this.splash();
    this._image.bitmap = splash.getImage();
	this._image.opacity = 0;
	this._hasSound = splash.hasSound();
	this._soundDelay = splash.getSoundDelay();
	this._se = {name: splash.getSe(), pan: 0, pitch: 100, volume: 100};
	this._soundPlayed = false;
	AudioManager.stopSe();
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if(this._timer === 0) {
		this.updateLoad();
	} else {
		this.updateFade();
	}
	if(Input.isTriggered('ok') || TouchInput.isPressed()) {
		this._fadeMode = 'out';
		this._fastFade = true;
	}
	this.updateAudio();
};
//-----------------------------------------------------------------------------
// Update image loading (if none left, leave scene)
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.updateLoad = function() {
	if(this._isReady) {
		if(this._index >= CGMV.SplashScreen.Splashes.length) {
			SceneManager.goto(Scene_Title);
			Window_TitleCommand.initCommandPosition();
		} else {
			this.setNewImage();
			this._isReady = false;
			this._index++;
		}
	}
	if(ImageManager.isReady()) {
		this.centerSprite(this._image);
		this._fadeMode = 'in';
		this._timer++;
	}
};
//-----------------------------------------------------------------------------
// Update image fade in/out
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.updateFade = function() {
	if(this._fadeMode === 'in') {
		if(this._image.opacity < 255) {
			this._image.opacity += CGMV.SplashScreen.FadeSpeed;
		}
		this._timer++;
		if(this._timer >= CGMV.SplashScreen.DisplayTime) {
			this._fadeMode = 'out';
		}
	}
	else if(this._fadeMode ==='out') {
		this._image.opacity -= CGMV.SplashScreen.FadeSpeed;
		if(this._fastFade) {
			this._image.opacity -= CGMV.SplashScreen.FadeSpeed*3;
		}
		if(this._image.opacity <= 0) {
			this._timer = 0;
			this._fadeMode = 'none';
			this._isReady = true;
			this._fastFade = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Update image loading (if none left, leave scene)
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.updateAudio = function() {
	if(this._hasSound && !this._soundPlayed && this._timer > this._soundDelay) {
		this._soundPlayed = true;
		AudioManager.playSe(this._se);
	}
};
//-----------------------------------------------------------------------------
// Center Sprite
//-----------------------------------------------------------------------------
CGMV_Scene_SplashScreen.prototype.centerSprite = function(sprite) {
	sprite.x = (Graphics._width - sprite.width) / 2;
	sprite.y = (Graphics._height - sprite.height) / 2;
};
//=============================================================================
// Scene_Boot
//-----------------------------------------------------------------------------
// Change which scene begins the game
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Change first scene unless event or battle test.
//-----------------------------------------------------------------------------
var alias_CGMV_SplashScreen_SceneBoot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	if(DataManager.isBattleTest() || DataManager.isEventTest()) {
		alias_CGMV_SplashScreen_SceneBoot_start.call(this);
	}
	else {
		Scene_Base.prototype.start.call(this);
		SoundManager.preloadImportantSounds();
		this.checkPlayerLocation();
		DataManager.setupNewGame();
		SceneManager.goto(CGMV_Scene_SplashScreen);
		this.updateDocumentTitle();
	}
};