/*:
 * @plugindesc Core CGMV Script.
 * @author Casper Gaming
 * @help
 * ==============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ==============================================================================
 * Become a Patron to get access to a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ==============================================================================
 * Version: 1.6
 * ------------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.1
 * ------------------------------------------------------------------------------
 * Description: This is the core CGMV plugin which is used extensively
 * by other CGMV plugins and is likely to be required.
 * ------------------------------------------------------------------------------
 * Documentation:
 * The following plugin commands are supported:
 * CGMV Init   # Re-initializes the CGMV Core. Only use this if you know what
 *             # you are doing! Erases CGMV data.
 * 
 * Some CGMV Plugins may use a date format.
 * The following date formats are supported:
 * 0: MM/DD/YYYY     (ex: 1/20/2001)
 * 1: DD/MM/YYYY     (ex: 20/1/2001)
 * 2: YYYY/MM/DD     (ex: 2001/1/20)
 * 3: Month DD, YYYY (ex: January 20, 2001)
 * 4: DD Month YYYY  (ex: 20 January 2001)
 * 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
 * 6: DD Mon. YYYY   (ex: 20 Jan 2001)
 * 7: MM/DD          (ex: 1/20)
 * 8: DD/MM          (ex: 20/1)
 *
 * Version History:
 * 1.0 - Initial release
 *
 * 1.1:
 * - Added CGMV title window
 * - Added map name meta used by many plugins
 *
 * 1.2:
 * - Added CGMV Temp class for temp data
 * - Added bold ability for text
 *
 * 1.3:
 * - Added CGMV Global Data
 * - Added scrollable window type
 *
 * 1.4:
 * - Added handling for inputs
 *
 * 1.5:
 * - Added quick lookup for items used in newer CGMV plugins
 * - Removed duplicate code that was present in CGMV_Core and CGMV_Temp
 * - Bug fix for handling some invalid/unrecognized inputs
 *
 * 1.6:
 * - Fixed bug that could cause keypresses to crash the game before CGMV plugins are loaded.
*/
var Imported = Imported || {};
Imported.CGMV_Core = true;
var CGMV = CGMV || {};
CGMV.Core = CGMV.Core || {};
CGMV.Core.version = 1.6;
//=============================================================================
// CGMV_Glob
//-----------------------------------------------------------------------------
// This class stores CGMV data shared between game files (global)
//=============================================================================
function CGMV_Glob() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Glob.prototype.initialize = function() {
	this.createPluginData();
};
//-----------------------------------------------------------------------------
// To be overridden by CGMV plugins
//-----------------------------------------------------------------------------
CGMV_Glob.prototype.createPluginData = function() {
	// Used by CGMV plugins
};
//-----------------------------------------------------------------------------
// Make global data contents
//-----------------------------------------------------------------------------
CGMV_Glob.prototype.makeData = function() {
    var contents = {};
    return contents;
};
//-----------------------------------------------------------------------------
// Apply global data contents
//-----------------------------------------------------------------------------
CGMV_Glob.prototype.applyData = function(contents) {
	// Used by CGMV plugins
};
//=============================================================================
// CGMV_Temp
//-----------------------------------------------------------------------------
// This class stores data not saved for CGMV plugins
//=============================================================================
function CGMV_Temp() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.initialize = function() {
	this.createPluginData();
	this.keysPressed = {};
};
//-----------------------------------------------------------------------------
// To be overridden by CGMV plugins
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.createPluginData = function() {
	// Used by CGMV plugins
};
//-----------------------------------------------------------------------------
// Report an error to the console
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.reportError = function(error, script, suggestion) {
	suggestion = suggestion || "Update Plugins";
	console.warn("Error in plugin: " + script);
	console.warn("Error description: " + error);
	console.warn("Possible solution: " + suggestion);
};
//-----------------------------------------------------------------------------
// Takes a number and returns it's toLocaleString value
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.numberSplit = function(num) {
	return num.toLocaleString();
};
//-----------------------------------------------------------------------------
// Takes an amount of frames and gives back the time in hours:minutes:seconds
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.timeSplit = function(frameCount) {
	var temp = frameCount/60;
	var seconds = temp%60;
	var minutes = Math.floor(temp/60) % 60;
	var hours = Math.floor(temp/60/60) % 60;
    return hours.padZero(2) + ':' + minutes.padZero(2) + ':' + seconds.padZero(2);
};
//-----------------------------------------------------------------------------
// Handle plugin commands here
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.pluginCommand = function(command, args) {
	if(command == "CGMVTemp") {
		if(args[0] == "Init") {
			$cgmvTemp = new CGMV_Temp();
		}
		else if(args[0] == "Test") {
			// Used to test things
		}
	}
};
//-----------------------------------------------------------------------------
// Takes an amount of seconds and tries to approximate it to Hours, Minutes, or Seconds
// Does not go above days as a time unit.
// For example, 30 seconds would return [30, "seconds"]
//              45 minutes would return [45, "minutes"]
//              18 hours would return   [18, "hours"] 
//              28 days would return    [28, "days"]
// If there is an error, it will return an empty array
// If forceApproximation is true, will round down to nearest even unit provided
// by approximateToUnitString
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.approximateTimeValue = function(seconds, forceApproximation, approximateToUnitString) {
	forceApproximation = forceApproximation || false;
	var value = [];
	if (forceApproximation) {
		value[0] = this.approximateTimeValueToUnit(seconds, approximateToUnitString);
		value[1] = approximateToUnitString;
	}
	else if(seconds >= 86400) { // 86400 seconds in a day
		value[0] = Math.floor(seconds/60/60/24);
		value[1] = "Days";
	}
	else if(seconds >= 3600 && seconds < 86400) { // 3060 seconds in an hour, 86400 seconds in a day
		value[0] = Math.floor(seconds/60/60);
		value[1] = "Hours";
	}
	else if(seconds >= 60 && seconds < 3600) { // 60 seconds in a minute, 3600 seconds in an hour
		value[0] = Math.floor(seconds/60);
		value[1] = "Minutes";
	}
	else if(seconds < 60) { // 60 seconds in a minute
		value[0] = seconds;
		value[1] = "Seconds";
	}
	return value;
};
//-----------------------------------------------------------------------------
// Takes an amount of seconds and approximates it to an amount of time units (minute, hour, day)
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.approximateTimeValueToUnit = function(seconds, unitString) {
	var value = 0;
	if(unitString === "Days") {
		value = Math.floor(seconds/60/60/24);
	}
	else if(unitString === "Hours") {
		value = Math.floor(seconds/60/60);
	}
	else if(unitString === "Minutes") {
		value = Math.floor(seconds/60);
	}
	else if(unitString === "Seconds") {
		value = seconds;
	}
	else {
		var script = "CGMV Core";
		var error = "Unrecognized unitString in approximateTimeValueToUnit()";
		this.reportError(error, script);
	}
	return value;
};
//-----------------------------------------------------------------------------
// Take javascript getDate, getMonth, and getFullYear and return formatted date text
// Valid formats (using / as delim):
// 0: MM/DD/YYYY     (ex: 1/20/2001)
// 1: DD/MM/YYYY     (ex: 20/1/2001)
// 2: YYYY/MM/DD     (ex: 2001/1/20)
// 3: Month DD, YYYY (ex: January 20, 2001)
// 4: DD Month YYYY  (ex: 20 January 2001)
// 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
// 6: DD Mon. YYYY   (ex: 20 Jan 2001)
// 7: MM/DD          (ex: 1/20)
// 8: DD/MM          (ex: 20/1)
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.createDateText = function(day, month, year, format, delim) {
	var txt;
	switch(format) {
		case 0:
			txt = (month+1).toString() + delim + day.toString() + delim + year.toString();
			return txt;
		case 1:
			txt = day.toString() + delim + (month+1).toString() + delim + year.toString();
			return txt;
		case 2:
			txt = year.toString() + delim + (month+1).toString() + delim + day.toString();
			return txt;
		case 3:
			txt = this.getFullMonthName(month) + " " + day.toString() + ", " + year.toString();
			return txt;
		case 4:
			txt = day.toString() + " " + this.getFullMonthName(month) + " " + year.toString();
			return txt;
		case 5:
			txt = this.getShortMonthName(month) + " " + day.toString() + ", " + year.toString();
			return txt;
		case 6:
			txt = day.toString() + " " + this.getShortMonthName(month) + " " + year.toString();
			return txt;
		case 7:
			txt = (month+1).toString() + delim + day.toString();
			return txt;
		case 8:
			txt =  day.toString() + delim + (month+1).toString();
			return txt;
		default:
			this.reportError("createDateText: Out of range", "CGMV Core");
			txt = "Unknown Date";
	}
	return txt;
};
//-----------------------------------------------------------------------------
// Convert javascript getMonth int to full name of month string
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.getFullMonthName = function(month) {
	var monthName = "";
	switch(month) {
		case 0: monthName = "January"; break;
		case 1: monthName = "February"; break;
		case 2: monthName = "March"; break;
		case 3: monthName = "April"; break;
		case 4: monthName = "May"; break;
		case 5: monthName = "June"; break;
		case 6: monthName = "July"; break;
		case 7: monthName = "August"; break;
		case 8: monthName = "September"; break;
		case 9: monthName = "October"; break;
		case 10: monthName = "November"; break;
		case 11: monthName = "December"; break;
		default:
			this.reportError("getFullMonthName: Out of range", "CGMV Core");
			monthName = "Unknown";
	}
	return monthName;
};
//-----------------------------------------------------------------------------
// Convert javascript getMonth int to abbreviated name of month string
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.getShortMonthName = function(month) {
	var monthName = "";
	switch(month) {
		case 0: monthName = "Jan"; break;
		case 1: monthName = "Feb"; break;
		case 2: monthName = "Mar"; break;
		case 3: monthName = "Apr"; break;
		case 4: monthName = "May"; break;
		case 5: monthName = "Jun"; break;
		case 6: monthName = "Jul"; break;
		case 7: monthName = "Aug"; break;
		case 8: monthName = "Sep"; break;
		case 9: monthName = "Oct"; break;
		case 10: monthName = "Nov"; break;
		case 11: monthName = "Dec"; break;
		default:
			this.reportError("getShortMonthName: Out of range", "CGMV Core", "Update CGMV Plugins");
			monthName = "Unknown";
	}
	return monthName;
};
//-----------------------------------------------------------------------------
// Look up item given type and id
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.lookupItem = function(type, id) {
	switch(type) {
		case 'item':
			return $dataItems[id];
		case 'weapon':
			return $dataWeapons[id];
		case 'armor':
			return $dataArmors[id];
		default:
			this.reportError("Item type setup incorrectly", "CGMV Core", "Check item parameters set up through CGMV plugins");
			return null;
	}
};
//-----------------------------------------------------------------------------
// on key down
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.onKeyDown = function(keyCode) {
	if(!keyCode) return;
	if(keyCode > 111 && keyCode < 124) return;
	this.keysPressed[keyCode] = true;
	this.refreshForKeysDown();
};
//-----------------------------------------------------------------------------
// on key up
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.onKeyUp = function(keyCode) {
	if(!keyCode) return;
	if(keyCode > 111 && keyCode < 124) return;
	this.keysPressed[keyCode] = false;
	this.refreshForKeysUp();
};
//-----------------------------------------------------------------------------
// Refresh plugins on key down
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.refreshForKeysDown = function() {
	//Used by other plugins
};
//-----------------------------------------------------------------------------
// Refresh plugins on key up
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.refreshForKeysUp = function() {
	//Used by other plugins
};
//-----------------------------------------------------------------------------
// is Key Pressed?
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.isKeyPressed = function(keyCode) {
	return this.keysPressed[keyCode];
};
//=============================================================================
// CGMV
//-----------------------------------------------------------------------------
// This class contains some common methods for other CGMV plugins.
//=============================================================================
function CGMV_Core() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize CGMV_Core
//-----------------------------------------------------------------------------
CGMV_Core.prototype.initialize = function() {
	this.createPluginData();
};
//-----------------------------------------------------------------------------
// Handle plugin commands here
//-----------------------------------------------------------------------------
CGMV_Core.prototype.pluginCommand = function(command, args) {
	if(command == "CGMV") {
		if(args[0] == "Init") {
			$cgmv = new CGMV_Core();
		}
		else if(args[0] == "Test") {
			// Used to test things
		}
	}
};
//-----------------------------------------------------------------------------
// To be overridden by CGMV plugins
//-----------------------------------------------------------------------------
CGMV_Core.prototype.createPluginData = function() {
	// Used by CGMV plugins
};
//=============================================================================
// DataManager
//-----------------------------------------------------------------------------
// Saving and loading CGMV data
// modified functions: createGameObjects, makeSaveContents, extractSaveContents
//=============================================================================
var $cgmv = null;
var $cgmvTemp = null;
var $cgmvGlob = null;
//-----------------------------------------------------------------------------
// Initialize the $cgmv variable
//-----------------------------------------------------------------------------
var CGMV_Core_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    CGMV_Core_createGameObjects.call(this);
	$cgmv = new CGMV_Core();
	$cgmvTemp = new CGMV_Temp();
	$cgmvGlob = new CGMV_Glob();
	this.CGMV_loadGlobalInfo();
};
//-----------------------------------------------------------------------------
// Save CGMV data
//-----------------------------------------------------------------------------
var CGMV_Core_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = CGMV_Core_makeSaveContents.call(this);
    contents.cgmv = $cgmv;
    return contents;
};
//-----------------------------------------------------------------------------
// Load CGMV data
//-----------------------------------------------------------------------------
var CGMV_Core_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    CGMV_Core_extractSaveContents.call(this, contents);
	contents.cgmv ? $cgmv = contents.cgmv : console.log("Could not load CGMV data!");
};
//-----------------------------------------------------------------------------
// Also save CGMV global data
//-----------------------------------------------------------------------------
var CGMV_Core_saveGameWithoutRescue = DataManager.saveGameWithoutRescue;
DataManager.saveGameWithoutRescue = function(savefileId) {
	var result = CGMV_Core_saveGameWithoutRescue.call(this, savefileId);
	if(result) {
		this.CGMV_saveGlobalInfo();
	}
    return result;
};
//-----------------------------------------------------------------------------
// Load CGMV global data
//-----------------------------------------------------------------------------
DataManager.CGMV_loadGlobalInfo = function() {
    var json;
	var globData = {};
    try {
        json = StorageManager.load(-667);
    } catch (e) {
        console.error(e);
    }
    if (json) {
        globData = JSON.parse(json);
    }
	$cgmvGlob.applyData(globData);
};
//-----------------------------------------------------------------------------
// Save CGMV global data
//-----------------------------------------------------------------------------
DataManager.CGMV_saveGlobalInfo = function() {
    StorageManager.save(-667, JSON.stringify($cgmvGlob.makeData()));
};
//=============================================================================
// StorageManager
//-----------------------------------------------------------------------------
// Saving and loading CGMV global data
//=============================================================================
//-----------------------------------------------------------------------------
// CGMV separate data
//-----------------------------------------------------------------------------
var CGMV_Core_localFilePath = StorageManager.localFilePath;
StorageManager.localFilePath = function(savefileId) {
	var name;
	if(savefileId === -667) {
		name = 'cgmv.rpgsave';
		return this.localFileDirectoryPath() + name;
	}
	return CGMV_Core_localFilePath.call(this, savefileId);
};
//-----------------------------------------------------------------------------
// CGMV separate data
//-----------------------------------------------------------------------------
var CGMV_Core_webStorageKey = StorageManager.webStorageKey;
StorageManager.webStorageKey = function(savefileId) {
	if(savefileId === -667) {
		return 'RPG CGMVData';
	}
	return CGMV_Core_webStorageKey.call(this, savefileId);
};
//=============================================================================
// Game_Interpreter
//-----------------------------------------------------------------------------
// Refer plugin commands to core plugin
// modified functions: pluginCommand
//=============================================================================
//-----------------------------------------------------------------------------
// Refer plugin commands to core plugin
//-----------------------------------------------------------------------------
var CGMV_Core_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    $cgmv.pluginCommand(command, args);
	$cgmvTemp.pluginCommand(command, args);
	CGMV_Core_pluginCommand.call(this, command, args);
};
//=============================================================================
// CGMV_Window_Title
//-----------------------------------------------------------------------------
// Window used by CGMV Scripts to show a title window at the top of scenes
//=============================================================================
function CGMV_Window_Title() {
    this.initialize.apply(this, arguments);
}
CGMV_Window_Title.prototype = Object.create(Window_Base.prototype);
CGMV_Window_Title.prototype.constructor = CGMV_Window_Title;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_Title.prototype.initialize = function(x, y, text) {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._text = text;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_Title.prototype.refresh = function() {
    this.contents.clear();
	var width = this.contents.width - this.textPadding() * 2;
    this.drawText(this._text, 0, 0, width, 'center');
};
//=============================================================================
// Game Map
//-----------------------------------------------------------------------------
// Add function for getting map name (unique to CGMV plugins)
//=============================================================================
//-----------------------------------------------------------------------------
// Get CGMV map name
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMVgetMapName = function() {
    var name = "Unknown";
	if($dataMap.meta.cgmvname) {
		name = $dataMap.meta.cgmvname;
	}
	return name;
};
//=============================================================================
// Bitmap
//-----------------------------------------------------------------------------
// Add ability to bold text
// modified functions: initialize, _makeFontNameText
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Add bold property on initialization
//-----------------------------------------------------------------------------
var CGMV_Core_BitmapInitialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
    CGMV_Core_BitmapInitialize.call(this, width, height);
	this.CGMVfontBold = false; // use own bold to not conflict with other plugins
};
//-----------------------------------------------------------------------------
// Alias. Return bolded font if bold set to true
//-----------------------------------------------------------------------------
var CGMV_Core_Bitmap_makeFontNameText = Bitmap.prototype._makeFontNameText;
Bitmap.prototype._makeFontNameText = function() {
	if(this.CGMVfontBold) return 'Bold ' + this.fontSize + 'px ' + this.fontFace;
	return CGMV_Core_Bitmap_makeFontNameText.call(this);
};
//=============================================================================
// CGMV_Window_Scrollable
//-----------------------------------------------------------------------------
// Window used by CGMV Scripts to allow for more info to be shown than would
// otherwise fit and also scroll automatically to show info.
//=============================================================================
function CGMV_Window_Scrollable() {
    this.initialize.apply(this, arguments);
}
CGMV_Window_Scrollable.prototype = Object.create(Window_Base.prototype);
CGMV_Window_Scrollable.prototype.constructor = CGMV_Window_Scrollable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.initialize = function(x, y, width, height, heightMultiplier, scrollWait, scrollSpeed) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._handlers = {};
	this._scroll = false;
	this._scrollMode = 0; // 0 = down, 1 = up
	this._scrollTimer = 0;
	this._scrollWait = scrollWait;
	this._scrollSpeed = scrollSpeed;
    this._neededHeight = 0;
	this._windowHeight = height;
	this._heightMultiplier = heightMultiplier;
	this.createContents();
};
//-----------------------------------------------------------------------------
// Get contents height
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.contentsHeight = function() {
   return this._windowHeight*this._heightMultiplier;
};
//-----------------------------------------------------------------------------
// Process Handling
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.processHandling = function() {
    if (this.isActive()) {
        if (this.isCancelEnabled() && (Input.isRepeated('cancel') || TouchInput.isCancelled())) {
            this.processCancel();
		}
    }
};
//-----------------------------------------------------------------------------
// Process Cancel
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};
//-----------------------------------------------------------------------------
// Update Input Data
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.updateInputData = function() {
    Input.update();
    TouchInput.update();
};
//-----------------------------------------------------------------------------
// Call Cancel Handler
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.callCancelHandler = function() {
    this.callHandler('cancel');
};
//-----------------------------------------------------------------------------
// Updates for scroll (if needed)
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.processHandling();
	if(this._scroll) {
		this.processArrowKeys();
		this.processWheel();
		if(this._scrollTimer > this._scrollWait) {
			this.updateScroll();
		}
		this._scrollTimer += 1;
    }
};
//-----------------------------------------------------------------------------
// Update the automatic scroll effect
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.updateScroll = function() {
	if(this.origin.y + this._windowHeight >= this._neededHeight && this._scrollMode == 0) {
		this._scrollMode = 1; // Scroll up
		this._scrollTimer = 0;
	}
	else if(this.origin.y <= 0 && this._scrollMode == 1) {
		this._scrollMode = 0; // Scroll down
		this._scrollTimer = 0;
	}
	else {
		var speed = (this._scrollMode == 1) ? -this._scrollSpeed : this._scrollSpeed;
		this.processScroll(speed);
	}
};
//-----------------------------------------------------------------------------
// Process Arrow Key Input
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.processArrowKeys = function() {
    if(this.isActive()) {
        if(Input.isPressed('down')) {
            this.processScroll(this._scrollSpeed*5);
			this._scrollTimer = 0;
        }
        if(Input.isPressed('up')) {
            this.processScroll(-this._scrollSpeed*5);
			this._scrollTimer = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Process Wheel Input
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.processWheel = function() {
    if (this.isActive()) {
        var threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this.processScroll(this._scrollSpeed*20);
			this._scrollTimer = 0;
        }
        if (TouchInput.wheelY <= -threshold) {
            this.processScroll(-this._scrollSpeed*20);
			this._scrollTimer = 0;
        }
    }
};
//-----------------------------------------------------------------------------
// Process scrolling
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.processScroll = function(scrollAmount) {
	if(this.origin.y + this._windowHeight + scrollAmount > this._neededHeight) {
		this.origin.y = this._neededHeight - this._windowHeight;
	}
	else if(this.origin.y + scrollAmount < 0) {
		this.origin.y = 0;
	}
	else {
		this.origin.y += scrollAmount;
	}
};
//-----------------------------------------------------------------------------
// Check if needs to scroll (might change after drawing contents because bitmap)
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.checkForScroll = function() {
	if(this._neededHeight > this._windowHeight) {
		this._scroll = true;
	}
};
//-----------------------------------------------------------------------------
// Reset variables for new object
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.setupWindowForNewEntry = function() {
	this.origin.y = 0;
	this._scrollTimer = 0;
	this._scrollMode = 0;
	this._neededHeight = 0;
	this._scroll = false;
	this.contents.clear();
};
//-----------------------------------------------------------------------------
// Check if window is active
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.isActive = function() {
	return this.active;
};
//-----------------------------------------------------------------------------
// Set Handler same as Window_Selectable
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.setHandler = function(symbol, method) {
    this._handlers[symbol] = method;
};
//-----------------------------------------------------------------------------
// check if is handled same as Window_Selectable
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.isHandled = function(symbol) {
    return !!this._handlers[symbol];
};
//-----------------------------------------------------------------------------
// Call Handler same as Window_Selectable
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.callHandler = function(symbol) {
    if (this.isHandled(symbol)) {
        this._handlers[symbol]();
    }
};
//-----------------------------------------------------------------------------
// Check if cancel handling exists
//-----------------------------------------------------------------------------
CGMV_Window_Scrollable.prototype.isCancelEnabled = function() {
    return this.isHandled('cancel');
};
//=============================================================================
// Input
//-----------------------------------------------------------------------------
// Pass input keycodes to CGMV Temp
//=============================================================================
//-----------------------------------------------------------------------------
// Pass Inputs to CGMV Temp
//-----------------------------------------------------------------------------
var CGMV_Core_onKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event) {
    CGMV_Core_onKeyDown.call(this, event);
	if($cgmvTemp) $cgmvTemp.onKeyDown(event.keyCode);
};
//-----------------------------------------------------------------------------
// Pass Inputs to CGMV Temp
//-----------------------------------------------------------------------------
var CGMV_Core_onKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) {
    CGMV_Core_onKeyUp.call(this, event);
	if($cgmvTemp) $cgmvTemp.onKeyUp(event.keyCode);
};