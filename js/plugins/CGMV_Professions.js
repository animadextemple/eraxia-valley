/*:
 * @plugindesc CGMV Professions
 * @author Casper Gaming
 * @help
 * ==============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ==============================================================================
 * Become a Patron to get access to a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ==============================================================================
 * Version: 1.3
 * ------------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.1+
 * ------------------------------------------------------------------------------
 * Description: This plugin allows you to make a profession or skill system in
 * your game.
 * ------------------------------------------------------------------------------
 * Documentation:
 * 
 * This plugin supports the following plugin commands:
 * - CGMVProfessions Scene 
 * This calls the Professions scene.
 *
 * - CGMVProfessions Discover ProfessionName false
 * Sets the profession ProfessionName to be undiscovered.
 *
 * - CGMVProfessions Discover ProfessionName true
 * Sets the profession ProfessionName to be discovered.
 *
 * - CGMVProfessions Experience ProfessionName + Amount
 * Adds Amount to ProfessionName's experience.
 *
 * - CGMVProfessions Experience ProfessionName - Amount
 * Subtracts Amount from ProfessionName's experience.
 *
 * - CGMVProfessions Experience ProfessionName = Amount
 * Sets ProfessionName's experience to Amount.
 *
 * - CGMVProfessions Level ProfessionName + Amount
 * Adds Amount to ProfessionName's level.
 *
 * - CGMVProfessions Level ProfessionName - Amount
 * Subtracts Amount from ProfessionName's level.
 *
 * - CGMVProfessions Level ProfessionName = Amount
 * Sets ProfessionName's level to Amount.
 *
 * - CGMVProfessions Initialize
 * Re-initializes the plugin data. Useful for testing with saved games.
 * This will reset all data, including experience and levels earned.
 *
 * Update History:
 * Version 1.0 - Initial Release
 *
 * Version 1.1:
 * - Added support for CGMV Achievements
 *
 * Version 1.2:
 * - Fixed some default values for plugin parameters
 * - Added ability to not use an icon for a profession. An Icon Index of -1 means the icon will not display.
 * - Hidden professions will now not impact total/earned level in the level display window.
 *
 * Version 1.3:
 * - Changed a text plugin parameter to a proper boolean
 *
 * @param Professions
 * @type struct<Profession>[]
 * @default []
 * @desc Set up different professions here
 *
 * @param Window Options
 *
 * @param Scene Title
 * @parent Window Options
 * @desc Text to show in the window at the top of the profession scene
 * @default Professions
 *
 * @param Total Level Text
 * @parent Window Options
 * @desc Text to show describing the total level shown at bottom of scene
 * @default Total Level
 *
 * @param ScrollSpeed
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc speed at which the achievement window display scrolls (if needed)
 * Default: 1
 * @default 1
 *
 * @param ScrollWait
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * Default: 300
 * @default 300
 *
 * @param Text Options
 *
 * @param Level Text
 * @parent Text Options
 * @default Level
 * @desc Text to describe level
 *
 * @param Exp Text
 * @parent Text Options
 * @default Experience
 * @desc Text to describe current experience
 *
 * @param Exp To Level Text
 * @parent Text Options
 * @default Experience To Level
 * @desc Text to describe experience needed to level
 *
 * @param Description Text
 * @parent Text Options
 * @default Description
 * @desc Text to describe the profession description
 *
 * @param Other CGMV Plugin Options
 *
 * @param Show Level Up Toast
 * @parent Other CGMV Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window upon level up (requires CGMV Toast)
 *
 * @param Level Up Text
 * @parent Other CGMV Plugin Options
 * @default has leveled up!
 * @desc Text to describe a level up in the toast window (requires CGMV Toast)
*/
/*~struct~Profession:
 * @param Name
 * @type text
 * @desc The name of the profession.
 * 
 * @param Discovered
 * @type boolean
 * @default true
 * @desc Determine whether the profession is discovered at the start of the game.
 * 
 * @param Level
 * @type number
 * @min 1
 * @default 1
 * @desc The level the profession begins at.
 *
 * @param Max level
 * @type number
 * @min 1
 * @default 99
 * @desc The maximum level the profession can be.
 *
 * @param Use Experience Curve?
 * @type boolean
 * @default true
 * @desc Determine whether to generate an experience curve or to use hard-coded values
 *
 * @param Experience Curve
 * @type number[]
 * @default ["30","20","30","30"]
 * @desc Experience Curve to use. If using experience curve, generates exp curve using same formula for actor levels. Otherwise, each value is amount of exp needed for each level.
 *
 * @param Icon
 * @type number
 * @default 0
 * @min -1
 * @desc Icon index to use for the profession
 *
 * @param Color
 * @type number[]
 * @default ["255", "255", "255"]
 * @desc RGB values for the color associated with the profession. Only considers the first 3 values given.
 *
 * @param Description
 * @type note
 * @default ""
 * @desc Profession description
 *
 * @param Toast Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when displaying a toast window for the profession. Requires CGMV Toast
 */
var Imported = Imported || {};
Imported.CGMV_Professions = true;
var CGMV = CGMV || {};
CGMV.Professions = CGMV.Professions || {};
CGMV.Professions.version = 1.3;
CGMV.Professions.parameters = PluginManager.parameters('CGMV_Professions');
CGMV.Professions.Entries = JSON.parse(CGMV.Professions.parameters["Professions"]);
CGMV.Professions.SceneTitle = CGMV.Professions.parameters["Scene Title"] || "Professions";
CGMV.Professions.TotalLevelText = CGMV.Professions.parameters["Total Level Text"] || "Total Level";
CGMV.Professions.ScrollSpeed = Number(CGMV.Professions.parameters["ScrollSpeed"]) || 1;
CGMV.Professions.ScrollWait = Number(CGMV.Professions.parameters["ScrollWait"]) || 300;
CGMV.Professions.LevelText = CGMV.Professions.parameters["Level Text"] || "Level";
CGMV.Professions.ExpText = CGMV.Professions.parameters["Exp Text"] || "Experience";
CGMV.Professions.ExpToLevelText = CGMV.Professions.parameters["Exp To Level Text"] || "Experience To Level";
CGMV.Professions.DescriptionText = CGMV.Professions.parameters["Description Text"] || "Description";
CGMV.Professions.ShowLevelUpToast = (CGMV.Professions.parameters["Show Level Up Toast"] === "true") ? true : false;
CGMV.Professions.LevelUpText = CGMV.Professions.parameters["level Up Text"] || "has leveled up!";
//=============================================================================
// CGMV_Profession
//-----------------------------------------------------------------------------
// Store and manage profession data
//=============================================================================
function CGMV_Profession() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Profession
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.initialize = function(profession) {
	this._name = profession.Name;
	this._discovered = (profession.Discovered === 'true') ? true : false;
	this._maxLevel = Number(profession["Max level"]);
	this._level = Number(profession.Level);
	this._usingExpCurve = (profession["Use Experience Curve?"] === 'true') ? true : false;
	this._iconIndex = Number(profession.Icon);
	this._description = JSON.parse(profession.Description.replace(/\\n/g, " \\\\n "));
	this._color = this.setupColor(JSON.parse(profession.Color));
	this._expArray = JSON.parse(profession["Experience Curve"]);
	for(var i = 0; i < this._expArray.length; i++) {
		this._expArray[i] = Number(this._expArray[i]);
	}
	this._exp = 0;
	this._toastSE = profession["Toast Sound Effect"];
};
//-----------------------------------------------------------------------------
// Setup Color. Takes 3 values (RGB) in an array and returns color object.
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.setupColor = function(rgbArray) {
	if(rgbArray.length == 3) return 'rgb(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ')';
	return 'rgb(255,255,255)';
};
//-----------------------------------------------------------------------------
// Get experience required for level
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.expForLevel = function(level) {
	if(level <= 1) return 0;
	if(level > this._maxLevel) return this.expForLevel(this._maxLevel);
	if(!this._usingExpCurve) return this._expArray[level-2]; // level-2 since 0 not level and 1 lowest level possible
	var basis = this._expArray[0];
    var extra = this._expArray[1];
    var acc_a = this._expArray[2];
    var acc_b = this._expArray[3];
	if(acc_b === 0) acc_b = 1;
    return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
            (level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra);
};
//-----------------------------------------------------------------------------
// Get experience required for level taking into account current exp
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.expNeeded = function(level) {
	return this.expForLevel(level) - this._exp;
};
//-----------------------------------------------------------------------------
// Get experience required for next level taking into account current exp
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.expNeededToNextLevel = function() {
	if(this._level >= this._maxLevel) return 0;
	return this.expForLevel(this._level + 1) - this._exp;
};
//-----------------------------------------------------------------------------
// Changed discovery status
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.changeDiscoveredStatus = function(discovered) {
	this._discovered = discovered;
};
//-----------------------------------------------------------------------------
// Gain/Lose experience
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.changeExp = function(mode, amount) {
	switch(mode) {
		case '=': 
			this._exp = amount;
			break;
		case '+':
			this._exp += amount;
			break;
		case '-':
			this._exp -= amount;
			break;
		default:
			var script = "CGMV Professions";
			var error = "Malformed 'Experience' command received";
			var suggestion = "Check for proper plugin command usage in events";
			$cgmvTemp.reportError(error, script, suggestion);
	}
	if(this._exp < 0) this._exp = 0;
	this.checkProfessionForLevel();
};
//-----------------------------------------------------------------------------
// Check profession for level up/down. Always call this to level up/down.
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.checkProfessionForLevel = function() {
	while(this._level < this._maxLevel && this._exp >= this.expForLevel(this._level+1)) {
		this.levelUp();
	}
	while(this._level > 1 && this._exp < this.expForLevel(this._level)) {
		this.levelDown();
	}
};
//-----------------------------------------------------------------------------
// Level Up
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.levelUp = function() {
	this._level++;
	if(CGMV.Professions.ShowLevelUpToast && Imported.CGMV_Toast) this.setupLevelUpToast();
	if(Imported.CGMV_Achievements) $cgmv.checkAchievementProfessionCriteria();
};
//-----------------------------------------------------------------------------
// Level Down
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.levelDown = function() {
	this._level--;
};
//-----------------------------------------------------------------------------
// Change Level
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.changeLevel = function(mode, amount) {
	switch(mode) {
		case '=': 
			if(amount > this._maxLevel) amount = this._maxLevel;
			if(amount < 1) amount = 1;
			var levelExp = this.expForLevel(amount);
			break;
		case '+':
			var totalLevel = this._level + amount;
			if(totalLevel > this._maxLevel) totalLevel = this._maxLevel;
			if(totalLevel < 1) totalLevel = 1;
			var levelExp = this.expForLevel(totalLevel);
			break;
		case '-':
			var totalLevel = this._level - amount;
			if(totalLevel > this._maxLevel) totalLevel = this._maxLevel;
			if(totalLevel < 1) totalLevel = 1;
			var levelExp = this.expForLevel(totalLevel);
			break;
		default:
			levelExp = this._exp;
			var script = "CGMV Professions";
			var error = "Malformed 'Level' command received";
			var suggestion = "Check for proper plugin command usage in events";
			$cgmvTemp.reportError(error, script, suggestion);
	}
	var neededExp = levelExp - this._exp;
	this.gainExp(neededExp);
};
//-----------------------------------------------------------------------------
// Gain Exp
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.gainExp = function(amount) {
	this.changeExp('+', amount);
};
//-----------------------------------------------------------------------------
// Lose Exp
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.loseExp = function(amount) {
	this.changeExp('-', amount);
};
//-----------------------------------------------------------------------------
// Set up level up toast (Requires CGMV Toast)
//-----------------------------------------------------------------------------
CGMV_Profession.prototype.setupLevelUpToast = function() {
	var toast = {};
	toast.CGMVProfessionToast = true;
	toast.color = this._color;
	toast.name = this._name;
	toast.level = this._level;
	if(this._toastSE !== "") toast.SE = {name: this._toastSE, pan: 0, pitch: 100, volume: 100};
	$cgmv.createNewToast(toast);
};
//=============================================================================
// CGMV
//-----------------------------------------------------------------------------
// Manage profession data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize profession data
//-----------------------------------------------------------------------------
var alias_CGMV_Professions_createPluginData = CGMV_Core.prototype.createPluginData;
CGMV_Core.prototype.createPluginData = function() {
	alias_CGMV_Professions_createPluginData.call(this);
	this.initializeProfessionData(false);
};
//-----------------------------------------------------------------------------
// Initialize profession data
//-----------------------------------------------------------------------------
CGMV_Core.prototype.initializeProfessionData = function(reinitialize) {
	if(!this._professions || reinitialize) {
		this.setupProfessionVariables();
	}
	for(var i = 0; i < CGMV.Professions.Entries.length; i++) {
		var prof = new CGMV_Profession(JSON.parse(CGMV.Professions.Entries[i]));
		if(!this.getProfession(prof._name)) this._professions.push(prof);
	}
};
//-----------------------------------------------------------------------------
// Initialize profession variables
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupProfessionVariables = function() {
	this._professions = [];
};
//-----------------------------------------------------------------------------
// Returns array of all professions
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getAllProfessions = function() {
	return this._professions;
};
//-----------------------------------------------------------------------------
// Returns array of all professions
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getAllDiscoveredProfessions = function() {
	var discoveredProfs = [];
	for(var i = 0; i < this._professions.length; i++) {
		if(this._professions[i]._discovered) discoveredProfs.push(this._professions[i]);
	}
	return discoveredProfs;
};
//-----------------------------------------------------------------------------
// Get profession by name. Returns null if unsuccessful
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getProfession = function(name) {
	for(var i = 0; i < this._professions.length; i++) {
		if(name == this._professions[i]._name) return this._professions[i];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a profession
//-----------------------------------------------------------------------------
CGMV_Core.prototype.discoverProfession = function(name, discovered) {
	var profession = this.getProfession(name);
	if(profession) {
		(discovered === "false") ? discovered = false : discovered = true;
		profession.changeDiscoveredStatus(discovered);
	}
};
//-----------------------------------------------------------------------------
// Gain/Lose exp for profession
//-----------------------------------------------------------------------------
CGMV_Core.prototype.changeProfessionExp = function(name, mode, amount) {
	var profession = this.getProfession(name);
	if(profession) {
		profession.changeExp(mode, amount);
	}
};
//-----------------------------------------------------------------------------
// Change profession level
//-----------------------------------------------------------------------------
CGMV_Core.prototype.changeProfessionLevel = function(name, mode, amount) {
	var profession = this.getProfession(name);
	if(profession) {
		profession.changeLevel(mode, amount);
	}
};
//-----------------------------------------------------------------------------
// Alias. Handles profession plugin commands
//-----------------------------------------------------------------------------
var alias_CGMV_Professions_pluginCommand = CGMV_Core.prototype.pluginCommand;
CGMV_Core.prototype.pluginCommand = function(command, args) {
	alias_CGMV_Professions_pluginCommand.call(this, command, args);
	if(command === "CGMVProfessions") {
		if(args[0] === "Scene") {
			SceneManager.push(CGMV_Scene_Professions);
		}
		else if(args[0] === "Discover") {
			this.discoverProfession(args[1], args[2]);
		}
		else if(args[0] === "Initialize") {
			this.initializeProfessionData(true);
		}
		else if(args[0] === "Experience") {
			this.changeProfessionExp(args[1], args[2], Number(args[3]));
		}
		else if(args[0] === "Level") {
			this.changeProfessionLevel(args[1], args[2], Number(args[3]));
		}
	}
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available
//-----------------------------------------------------------------------------
CGMV_Core.prototype.totalProfessionLevels = function() {
	var total = 0;
	for(var i = 0; i < this._professions.length; i++) {
		total += this._professions[i]._maxLevel;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned
//-----------------------------------------------------------------------------
CGMV_Core.prototype.professionLevelsEarned = function() {
	var total = 0;
	for(var i = 0; i < this._professions.length; i++) {
		total += this._professions[i]._level;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available (if discovered profession)
//-----------------------------------------------------------------------------
CGMV_Core.prototype.totalProfessionLevelsDiscovered = function() {
	var total = 0;
	for(var i = 0; i < this._professions.length; i++) {
		if(this._professions[i]._discovered) total += this._professions[i]._maxLevel;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned (if discovered profession)
//-----------------------------------------------------------------------------
CGMV_Core.prototype.professionLevelsEarnedDiscovered = function() {
	var total = 0;
	for(var i = 0; i < this._professions.length; i++) {
		if(this._professions[i]._discovered) total += this._professions[i]._level;
	}
	return total;
};
//=============================================================================
// CGMV_Scene_Professions
//-----------------------------------------------------------------------------
// Handle the professions scene
//=============================================================================
function CGMV_Scene_Professions() {
    this.initialize.apply(this, arguments);
}
CGMV_Scene_Professions.prototype = Object.create(Scene_MenuBase.prototype);
CGMV_Scene_Professions.prototype.constructor = CGMV_Scene_Professions;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Scene_Professions.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create profession windows
//-----------------------------------------------------------------------------
CGMV_Scene_Professions.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createTitleWindow();
	this.createTotalWindow();
	this.createListWindow();
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create title window
//-----------------------------------------------------------------------------
CGMV_Scene_Professions.prototype.createTitleWindow = function() {
    this._titleWindow = new CGMV_Window_Title(0, 0, CGMV.Professions.SceneTitle);
	this._titleWindow.refresh();
    this.addWindow(this._titleWindow);
};
//-----------------------------------------------------------------------------
// Create total window
//-----------------------------------------------------------------------------
CGMV_Scene_Professions.prototype.createTotalWindow = function() {
    this._totalWindow = new CGMV_Window_ProfessionTotal(0, Graphics.boxHeight-this._titleWindow.height);
	this._totalWindow.refresh();
    this.addWindow(this._totalWindow);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMV_Scene_Professions.prototype.createListWindow = function() {
	var height = Graphics.boxHeight - this._totalWindow.height - this._titleWindow.height;
	var width = Graphics.boxWidth/3;
    this._listWindow = new CGMV_Window_ProfessionList(0, this._titleWindow.height, width, height);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.refresh();
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMV_Scene_Professions.prototype.createDisplayWindow = function() {
	var x = this._listWindow.width;
	var y = this._titleWindow.height;
	var height = this._listWindow.height;
	var width = Graphics.boxWidth*2/3;
    this._displayWindow = new CGMV_Window_ProfessionDisplay(x, y, width, height);
	this._displayWindow.refresh();
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMV_Scene_Professions.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On Display Cancel
//-----------------------------------------------------------------------------
CGMV_Scene_Professions.prototype.onDisplayCancel = function() {
	this._displayWindow.deactivate();
	this._listWindow.activate();
};
//=============================================================================
// CGMV_Window_ProfessionTotal
//-----------------------------------------------------------------------------
// Shows total level for all professions
//=============================================================================
function CGMV_Window_ProfessionTotal(x, y) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_ProfessionTotal.prototype = Object.create(Window_Base.prototype);
CGMV_Window_ProfessionTotal.prototype.constructor = CGMV_Window_ProfessionTotal;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionTotal.prototype.initialize = function(x, y) {
	var width = Graphics.boxWidth;
	var height = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionTotal.prototype.refresh = function() {
	this.contents.clear();
	this.drawTotalLevel();
};
//-----------------------------------------------------------------------------
// Draw total level
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionTotal.prototype.drawTotalLevel = function() {
	var totalLevels = $cgmv.totalProfessionLevelsDiscovered();
	var earnedLevels = $cgmv.professionLevelsEarnedDiscovered();
	var descriptor = CGMV.Professions.TotalLevelText + ": ";
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, 0, this.contents.width, 'left');
	var x = this.textWidth(descriptor);
	descriptor = earnedLevels + " / " + totalLevels;
	this.changeTextColor(this.normalColor());
	this.drawText(descriptor, x, 0, this.contents.width-x, 'left');
};
//=============================================================================
// CGMV_Window_ProfessionList
//-----------------------------------------------------------------------------
// Selectable window for choosing a profession in a list.
//=============================================================================
function CGMV_Window_ProfessionList(x, y, w, h) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_ProfessionList.prototype = Object.create(Window_Selectable.prototype);
CGMV_Window_ProfessionList.prototype.constructor = CGMV_Window_ProfessionList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionList.prototype.initialize = function(x, y, w, h) {
    Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	this.select(0);
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionList.prototype.makeItemList = function() {
    this._data = $cgmv.getAllDiscoveredProfessions();
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionList.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
	this.changeTextColor(item._color);
	var iconBoxWidth = 0;
	if(item._iconIndex >= 0) {
		this.drawIcon(item._iconIndex, rect.x, rect.y);
		iconBoxWidth = Window_Base._iconWidth + 4;
	}
    this.drawText(item._name, rect.x + iconBoxWidth, rect.y, rect.width, 'left');
	this.changeTextColor(this.normalColor());
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this._displayWindow.setItem(this.item());
	}
};
//=============================================================================
// CGMV_Window_ProfessionDisplay
//-----------------------------------------------------------------------------
// Window displaying profession information
//=============================================================================
function CGMV_Window_ProfessionDisplay() {
    this.initialize.apply(this, arguments);
}
CGMV_Window_ProfessionDisplay.prototype = Object.create(CGMV_Window_Scrollable.prototype);
CGMV_Window_ProfessionDisplay.prototype.constructor = CGMV_Window_ProfessionDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.initialize = function(x, y, width, height) {
	var heightMultiplier = 4; // maximum of 4 windows tall of data to scroll
    CGMV_Window_Scrollable.prototype.initialize.call(this, x, y, width, height, heightMultiplier, CGMV.Professions.ScrollWait, CGMV.Professions.ScrollSpeed);
	this._profession = null;
	this._largeIconWidth = Window_Base._iconWidth*2.2;
	this._largeIconHeight = Window_Base._iconHeight*2.2;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
};
//-----------------------------------------------------------------------------
// Set the profession to be displayed
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.setItem = function(profession) {
	this._profession = profession;
	this.refresh();
	this._neededHeight += this.standardPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.refresh = function() {
	if(!this._profession) return;
	this.setupWindowForNewEntry();
	this._neededHeight = 0;
	var profession = this._profession;
	var width = this.contents.width;
	this.drawProfessionName(profession._name);
	if(profession._iconIndex > 0) this.drawLargeIcon(profession._iconIndex);
	this.drawProfessionLevel(profession);
	this.drawProfessionExperience(profession);
	this.drawProfessionExperienceToLevel(profession.expNeededToNextLevel());
	var y = this.drawProfessionDescription(profession._description);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Name of profession
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.drawProfessionName = function(name) {
	this.contents.CGMVfontBold = true;
	this.drawText(name, 0, 0, this.contents.width, 'center');
	this.contents.CGMVfontBold = false;
};
//-----------------------------------------------------------------------------
// Draw profession level
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.drawProfessionLevel = function(profession) {
	var descriptor1 = CGMV.Professions.LevelText + ": ";
	var descriptor2 = profession._level + " / " + profession._maxLevel;
	var x = (profession._iconIndex >= 0) ? this._largeIconWidth + 8 : 0;
	var y = this.lineHeight();
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, y, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession experience
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.drawProfessionExperience = function(profession) {
	var exp = profession._exp;
	var descriptor1 = CGMV.Professions.ExpText + ": ";
	var descriptor2 = $cgmvTemp.numberSplit(exp);
	var x = (profession._iconIndex >= 0) ? this._largeIconWidth + 8 : 0;
	var y = this.lineHeight()*2;
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, y, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession experience to next level
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.drawProfessionExperienceToLevel = function(exp) {
	var descriptor1 = CGMV.Professions.ExpToLevelText + ": ";
	var descriptor2 = $cgmvTemp.numberSplit(exp);
	var x = 0;
	var y = this.lineHeight()*3;
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, y, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession description - returns y-value of line below last line drawn
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.drawProfessionDescription = function(description) {
	var descriptor1 = CGMV.Professions.DescriptionText + ": ";
	var descriptor2 = description.split(" ");
	var x = 0;
	var y = this.lineHeight()*4;
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor1, x, y, this.contents.width, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(this.normalColor());
	for(var i = 0; i < descriptor2.length; i++) {
		if(descriptor2[i] === "") continue;
		if(descriptor2[i] === '\\n') {
			y += this.lineHeight();
			x = 0;
			continue;
		}
		var tempWidth = this.textWidth(descriptor2[i] + " ");
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(descriptor2[i] + " ", x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws a standard line (blue system text: white text)
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.drawProfessionStandardLine = function(descriptor1, descriptor2, x, y, width) {
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor1, x, y, width-x, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(this.normalColor());
	this.drawText(descriptor2, x, y, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw Large icon
//-----------------------------------------------------------------------------
CGMV_Window_ProfessionDisplay.prototype.drawLargeIcon = function(iconIndex) {
	var bitmap = this._iconBitmap;
	var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
	var dw = this._largeIconWidth;
	var dh = this._largeIconHeight;
	var x = 0;
	var y = this.lineHeight();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
//=============================================================================
// CGMV_Window_Toast
//-----------------------------------------------------------------------------
// Handle CGMV Profession Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Processing for custom toasts. Alias
//-----------------------------------------------------------------------------
if(Imported.CGMV_Toast) {
var alias_CGMV_Professions_processCustomToast = CGMV_Window_Toast.prototype.processCustomToast;
CGMV_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMV_Professions_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('CGMVProfessionToast')) {
		this.changeTextColor(toastObject.color);
		this.drawText(toastObject.name, 0, 0, this.contents.width, 'left');
		this.changeTextColor(this.normalColor());
		var x = this.textWidth(toastObject.name + " ");
		this.drawText(CGMV.Professions.LevelUpText, x, 0, this.contents.width-x, 'left');
		this.drawText(CGMV.Professions.LevelText + ": " + toastObject.level, 0, this.lineHeight(), this.contents.width, 'center');
	}
};
}