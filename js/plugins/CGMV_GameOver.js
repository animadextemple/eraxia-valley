/*:
 * @plugindesc CGMV GameOver
 * @author Casper Gaming
 * @help
 * ===========================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ===========================================================================
 * Become a Patron to get a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ===========================================================================
 * Version: 1.1
 * ---------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.0
 * ---------------------------------------------------------------------------
 * Description: This plugin allows you to change gameover music/image based on
 * a variable. It also adds a menu to the game over scene so the player can
 * easily get back into the action without needing to go to the title screen.
 * ---------------------------------------------------------------------------
 * Documentation:
 *
 * The GameOver Image Variable and GameOver Music Variable's have special
 * functions: 
 * 
 * - If these variables' in-game values are set to 0, the default music
 *   and/or image will be used.
 * 
 * - If the values are set below 0, no image will be shown or music played
 *   (useful if you want an image with no sound, or a sound with no image).
 *
 * - Otherwise, the value of the variables in-game will determine the image
 *   and music used. Example: value of 1 = use first custom music/image.
 *
 * Music can be any type (ME, SE, BGM, BGS).
 *
 * This plugin uses CGMV Core to report errors. If not behaving as expected,
 * please check the console first (F8 while in-game) and follow suggestions
 * provided there.
 *
 * Version History:
 * 1.0 - Initial release
 *
 * 1.1:
 * - No longer relies on deprecated CGMV Core commands
 *
 * @param Custom Images and Music Options
 * 
 * @param GameOver Image Variable
 * @type variable
 * @desc Determines the variable to change gameover image
 * @default 1
 * @parent Custom Images and Music Options
 * 
 * @param GameOver Music Variable
 * @type variable
 * @desc Determines the variable to change gameover music
 * @default 2
 * @parent Custom Images and Music Options
 *
 * @param Images
 * @type file[]
 * @dir img/
 * @default []
 * @desc Images to show in the game over scene.
 * @parent Custom Images and Music Options
 *
 * @param Music
 * @type file[]
 * @dir audio/
 * @default []
 * @desc Music to play in the game over scene.
 * @parent Custom Images and Music Options
 *
 * @param Command Window Options
 *
 * @param Show Command Window
 * @type boolean
 * @desc Determines whether to show the command window or not
 * @default true
 * @parent Command Window Options
 *
 * @param Command Continue
 * @desc Text for the Continue command
 * @default Continue
 * @parent Command Window Options
 *
 * @param Command Title
 * @desc Text for the Title command
 * @default To Title
 * @parent Command Window Options
*/
var Imported = Imported || {};
Imported.CGMV_GameOver = true;
var CGMV = CGMV || {};
CGMV.GameOver = CGMV.GameOver || {};
CGMV.GameOver.version = 1.1;
CGMV.GameOver.parameters = PluginManager.parameters('CGMV_GameOver');
CGMV.GameOver.ImageVariable = Number(CGMV.GameOver.parameters["GameOver Image Variable"]) || 1;
CGMV.GameOver.MusicVariable = Number(CGMV.GameOver.parameters["GameOver Music Variable"]) || 2;
CGMV.GameOver.Images = JSON.parse(CGMV.GameOver.parameters["Images"]);
CGMV.GameOver.Music = JSON.parse(CGMV.GameOver.parameters["Music"]);
CGMV.GameOver.ShowCommandWindow = (CGMV.GameOver.parameters["Show Command Window"] === "true") ? true : false;
CGMV.GameOver.CommandContinue = CGMV.GameOver.parameters["Command Continue"] || "Continue";
CGMV.GameOver.CommandTitle = CGMV.GameOver.parameters["Command Title"] || "To Title";
//=============================================================================
// Scene_Gameover
//-----------------------------------------------------------------------------
// Show different images/music based on variable.
// modified functions: playGameoverMusic, createBackground, create, update, stop, terminate
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Play different music based on variable value.
//-----------------------------------------------------------------------------
var alias_CGMV_GameOver_playGameoverMusic = Scene_Gameover.prototype.playGameoverMusic;
Scene_Gameover.prototype.playGameoverMusic = function() {
	if($gameVariables.value(CGMV.GameOver.MusicVariable) == 0) {
		alias_CGMV_GameOver_playGameoverMusic.call(this);
	}
	else {
		if($gameVariables.value(CGMV.GameOver.MusicVariable) < 0) {
			return;
		}
		else if($gameVariables.value(CGMV.GameOver.MusicVariable) > CGMV.GameOver.Music.length) {
			alias_CGMV_GameOver_playGameoverMusic.call(this);
			var script = "CGMV GameOver";
			var error = "Variable value out of range";
			var suggestion = "Check to make sure your GameOver Music Variable has intended value";
			$cgmvTemp.reportError(error, script, suggestion);
		}
		else {
			this.CGMV_GameOver_playSound();
		}
	}
};
//-----------------------------------------------------------------------------
// Play correct sound based on variable (me, se, bgm, bgs).
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMV_GameOver_playSound = function() {
	var file = CGMV.GameOver.Music[$gameVariables.value(CGMV.GameOver.MusicVariable) - 1].split("/");
	var type = file[0];
	var sound = {name: file[1], pan: 0, pitch: 100, volume: 100};
	if(type === "me") {
		AudioManager.stopBgm();
		AudioManager.stopBgs();
		AudioManager.playMe(sound);
	}
	else if(type === "bgm") {
		AudioManager.stopBgs();
		AudioManager.playBgm(sound);
	}
	else if(type === "bgs") {
		AudioManager.stopBgm();
		AudioManager.playBgs(sound);
	}
	else if(type === "se") {
		AudioManager.stopBgm();
		AudioManager.stopBgs();
		AudioManager.playSe(sound);
	}
};
//-----------------------------------------------------------------------------
// Alias. Show different Image based on variable value.
//-----------------------------------------------------------------------------
var alias_CGMV_GameOver_createBackground = Scene_Gameover.prototype.createBackground;
Scene_Gameover.prototype.createBackground = function() {
    if($gameVariables.value(CGMV.GameOver.ImageVariable) == 0) {
		alias_CGMV_GameOver_createBackground.call(this);
	}
	else {
		if($gameVariables.value(CGMV.GameOver.ImageVariable) < 0) {
			return;
		}
		else if($gameVariables.value(CGMV.GameOver.ImageVariable) > CGMV.GameOver.Images.length) {
			alias_CGMV_GameOver_createBackground.call(this);
			var script = "CGMV GameOver";
			var error = "Variable value out of range";
			var suggestion = "Check to make sure your GameOver Image Variable has intended value";
			$cgmvTemp.reportError(error, script, suggestion);
		}
		else {
			var file = CGMV.GameOver.Images[$gameVariables.value(CGMV.GameOver.ImageVariable) - 1].split("/");
			var folder = 'img/' + file[0] + '/';
			var filename = file[1];
			this._backSprite = new Sprite();
			this._backSprite.bitmap = ImageManager.loadBitmap(folder, filename, 0, true);
			this.addChild(this._backSprite);
		}
	}
};
//-----------------------------------------------------------------------------
// Alias. Also create command window if option enabled
//-----------------------------------------------------------------------------
var alias_CGMV_GameOver_create = Scene_Gameover.prototype.create;
Scene_Gameover.prototype.create = function() {
    alias_CGMV_GameOver_create.call(this);
	if(CGMV.GameOver.ShowCommandWindow) {
		this.createWindowLayer();
		this.CGMV_GameOver_createCommandWindow();
	}
};
//-----------------------------------------------------------------------------
// Alias. Don't gotoTitle on input if Command Window enabled.
//-----------------------------------------------------------------------------
var alias_CGMV_GameOver_update = Scene_Gameover.prototype.update;
Scene_Gameover.prototype.update = function() {
    if(CGMV.GameOver.ShowCommandWindow) {
		if (!this.isBusy()) {
			this._commandWindow.open();
		}
		Scene_Base.prototype.update.call(this);
	}
	else {
		alias_CGMV_GameOver_update.call(this);
	}
};
//-----------------------------------------------------------------------------
// Check if Command Window is closing if enabled.
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.isBusy = function() {
	if(CGMV.GameOver.ShowCommandWindow) {
		return this._commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
	}
	return Scene_Base.prototype.isBusy.call(this);
};
//-----------------------------------------------------------------------------
// Create Command Window
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMV_GameOver_createCommandWindow = function() {
	this._commandWindow = new CGMV_Window_GameOverCommand();
	this._commandWindow.setHandler('continue', this.CGMV_GameOver_commandContinue.bind(this));
    this._commandWindow.setHandler('title',  this.CGMV_GameOver_commandTitle.bind(this));
	this.CGMV_GameOver_addCustomHandlers();
    this.addWindow(this._commandWindow);
};
//-----------------------------------------------------------------------------
// Possible expansion later
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMV_GameOver_addCustomHandlers = function() {
	// Add additional commands here
};
//-----------------------------------------------------------------------------
// Continue command handling
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMV_GameOver_commandContinue = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Load);
};
//-----------------------------------------------------------------------------
// Title command handling
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMV_GameOver_commandTitle = function() {
    this._commandWindow.close();
	this.fadeOutAll();
	AudioManager.stopAll();
    this.gotoTitle();
};
//-----------------------------------------------------------------------------
// Alias. Snap for background (scene file background) if showing command window
//-----------------------------------------------------------------------------
var alias_CGMV_GameOver_terminate = Scene_Gameover.prototype.terminate;
Scene_Gameover.prototype.terminate = function() {
	if(CGMV.GameOver.ShowCommandWindow) {
		Scene_Base.prototype.terminate.call(this);
		SceneManager.snapForBackground();
	}
	else {
		alias_CGMV_GameOver_terminate.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. No additional functionality if showing command window.
//-----------------------------------------------------------------------------
var alias_CGMV_GameOver_stop = Scene_Gameover.prototype.stop;
Scene_Gameover.prototype.stop = function() {
	if(CGMV.GameOver.ShowCommandWindow) {
		Scene_Base.prototype.stop.call(this);
	}
	else {
		alias_CGMV_GameOver_stop.call(this);
	}
};
//=============================================================================
// CGMV_Window_GameOverCommand
//-----------------------------------------------------------------------------
// Command Window showed on the Game Over scene.
//=============================================================================
function CGMV_Window_GameOverCommand() {
    this.initialize.apply(this, arguments);
}

CGMV_Window_GameOverCommand.prototype = Object.create(Window_Command.prototype);
CGMV_Window_GameOverCommand.prototype.constructor = CGMV_Window_GameOverCommand;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_GameOverCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
};
//-----------------------------------------------------------------------------
// Get width of window
//-----------------------------------------------------------------------------
CGMV_Window_GameOverCommand.prototype.windowWidth = function() {
    return 240;
};
//-----------------------------------------------------------------------------
// Update placement of window
//-----------------------------------------------------------------------------
CGMV_Window_GameOverCommand.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = Graphics.boxHeight - this.height - 96;
};
//-----------------------------------------------------------------------------
// Create command list
//-----------------------------------------------------------------------------
CGMV_Window_GameOverCommand.prototype.makeCommandList = function() {
    this.addCommand(CGMV.GameOver.CommandContinue, 'continue', this.isContinueEnabled());
    this.addCommand(CGMV.GameOver.CommandTitle, 'title');
};
//-----------------------------------------------------------------------------
// Check if continue enabled
//-----------------------------------------------------------------------------
CGMV_Window_GameOverCommand.prototype.isContinueEnabled = function() {
    return DataManager.isAnySavefileExists();
};