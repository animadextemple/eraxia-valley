/*:
 * @plugindesc Adds additional message functionality.
 * @author Casper Gaming
 * @help
 * ==============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ==============================================================================
 * Become a Patron to get access to a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ==============================================================================
 * Version: 1.1
 * ------------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.0
 * ------------------------------------------------------------------------------
 * Documentation:
 * The message system implements a few new text codes that can be used in
 * the game message.
 *
 * \ii[x] draws item x with icon
 * \ia[x] draws armor x with icon
 * \iw[x] draws weapon x with icon
 * \is[x] draws skill x with icon
 * \ist[x] draws state x with icon
 * 
 * Name Window:
 * \nw[name] creates a name window.
 * \nwc[x] changes the color of the name window's text to x.
 *
 * Inside the name window, you can use the following codes:
 * <anx> where x is the actor ID. This substitutes the actor's name in the name window
 * <annx> where x is the actor ID. This substitutes the actor's nickname in the name window
 *
 * Version history:
 * 1.0 - Initial Release
 *
 * 1.1:
 * Fixed bug with changing actor names via name input processing.
*/
var Imported = Imported || {};
Imported.CGMV_MessageSystem = true;

var CGMV = CGMV || {};
CGMV.MessageSystem = CGMV.MessageSystem || {};
CGMV.MessageSystem.version = 1.1;
//=============================================================================
// CGMV_MessageSystem_Window_Name
//-----------------------------------------------------------------------------
// This class adds a name window. Used as part of the message system for showing
// a name of a character. Use command nw[name] to set name.
//=============================================================================
function CGMV_MessageSystem_Window_Name() {
    this.initialize.apply(this, arguments);
};
CGMV_MessageSystem_Window_Name.prototype = Object.create(Window_Base.prototype);
CGMV_MessageSystem_Window_Name.prototype.constructor = CGMV_MessageSystem_Window_Name;
//-----------------------------------------------------------------------------
// Initializes the name window
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
	this.name = "";
	this.color = 0;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};
//-----------------------------------------------------------------------------
// Sets the initial window width
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.windowWidth = function() {
    return 240;
};
//-----------------------------------------------------------------------------
// Adjusts window width as needed depending on name length.
// Does not unnecessarily adjust width.
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.updateWindowWidth = function(name) {
    var measure = Math.max(240, this.textWidth(name));
	if(measure > 240) {
		this.width = measure;
		this.createContents();
	}
	else if(this.width > measure) {
		this.width = measure;
		this.createContents();
	}
};
//-----------------------------------------------------------------------------
// Sets the window height for one line of text
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};
//-----------------------------------------------------------------------------
// Setter function for the name variable
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.setName = function(name) {
	this.name = name;
	this.processName();
};
//-----------------------------------------------------------------------------
// Processes codes in the name text
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.processName = function() {
	this.name = this.name.replace(/<an(\d+)>/gi, function() {
        return $gameActors.actor(arguments[1])._name;
    }.bind(this));
	this.name = this.name.replace(/<ann(\d+)>/gi, function() {
        return $gameActors.actor(arguments[1])._nickname;
    }.bind(this));
};
//-----------------------------------------------------------------------------
// Getter function for the name variable
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.name = function() {
    return this.name;
};
//-----------------------------------------------------------------------------
// Setter function for the color variable
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.setColor = function(color) {
    this.color = color;
};
//-----------------------------------------------------------------------------
// Refreshes the name window. Clears previous contents and draws name
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	this.changeTextColor(this.textColor(this.color));
	this.drawText(this.name, x, 0, width, 'center');
	this.setColor(0);
};
//-----------------------------------------------------------------------------
// Open function for the name window
//-----------------------------------------------------------------------------
CGMV_MessageSystem_Window_Name.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};
//=============================================================================
// Window_Message
//-----------------------------------------------------------------------------
// added functions: CGMV_Message_System_preprocessCommands
// modified functions: subWindows, createSubWindows, startMessage, terminateMessage,
// updatePlacement, updateBackground
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Adds additional windows to the array of subwindows.
//-----------------------------------------------------------------------------
var alias_CGMV_Message_System_subWindows = Window_Message.prototype.subWindows;
Window_Message.prototype.subWindows = function() {
	var array = alias_CGMV_Message_System_subWindows.call(this);
	array.push(this._nameWindow);
    return array;
};
//-----------------------------------------------------------------------------
// Alias. Creates the additional subwindows
//-----------------------------------------------------------------------------
var alias_CGMV_Message_System_createSubWindows = Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
	alias_CGMV_Message_System_createSubWindows.call(this);
	this._nameWindow = new CGMV_MessageSystem_Window_Name(0, 0);
	this._nameWindow.openness = 0;
};

//-----------------------------------------------------------------------------
// Alias. Preprocesses some text commands before they are stripped off
//-----------------------------------------------------------------------------
var alias_CGMV_Message_System_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	this.CGMV_Message_System_preprocessCommands($gameMessage.allText());
	alias_CGMV_Message_System_startMessage.call(this);
};
//-----------------------------------------------------------------------------
// Alias. Closes the new subwindows
//-----------------------------------------------------------------------------
var alias_CGMV_Message_System_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    alias_CGMV_Message_System_terminateMessage.call(this);
    this._nameWindow.close();
};
//-----------------------------------------------------------------------------
// Alias. Updates location of new subwindows based on position of main window
//-----------------------------------------------------------------------------
var alias_CGMV_Message_System_updatePlacement = Window_Message.prototype.updatePlacement;
Window_Message.prototype.updatePlacement = function() {
    alias_CGMV_Message_System_updatePlacement.call(this);
    this._nameWindow.y = this.y > 0 ? this.y - this._nameWindow.height : this.height;
};
//-----------------------------------------------------------------------------
// Alias. Updates background of name window to mirror message window background.
//-----------------------------------------------------------------------------
var alias_CGMV_Message_System_updateBackground = Window_Message.prototype.updateBackground;
Window_Message.prototype.updateBackground = function() {
	alias_CGMV_Message_System_updateBackground.call(this);
    this._nameWindow.setBackgroundType(this._background);
};
//-----------------------------------------------------------------------------
// This function preprocesses some text commands before they can be modified by
// other functions.
//-----------------------------------------------------------------------------
Window_Message.prototype.CGMV_Message_System_preprocessCommands = function(text) {
	if(text.match(/\\nw\[.*?\]/im)) {
		var name = text.match(/\\nw\[(.*?)\]/im)[1];
		this._nameWindow.setName(name);
		if(text.match(/\\nwc\[\d+\]/im)) {
			var color = text.match(/\\nwc\[(\d+)\]/im)[1];
			this._nameWindow.setColor(parseInt(color));
		}
		this._nameWindow.updateWindowWidth(name);
		this._nameWindow.open();
	}
	else {
		this._nameWindow.close();
	}
};
//=============================================================================
// Window_Base
//-----------------------------------------------------------------------------
// added functions: none
// modified functions: convertEscapeCharacters
//=============================================================================
//-----------------------------------------------------------------------------
// Removes the additional codes for messages from being printed out or parsed
//-----------------------------------------------------------------------------
alias_CGMV_Message_System_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	//Replace name window commands
	text = text.replace(/\\nw\[.*?\]/gi, '');
	text = text.replace(/\\nwc\[\d+\]/gi, '');
	//Replace item commands
	text = text.replace(/\\II\[(\d+)\]/gi, function() {
		var item = $dataItems[arguments[1]];
        return '\\i[' + item.iconIndex + ']' + item.name;
    }.bind(this));
	text = text.replace(/\\IA\[(\d+)\]/gi, function() {
		var item = $dataArmors[arguments[1]];
        return '\\i[' + item.iconIndex + ']' + item.name;
    }.bind(this));
	text = text.replace(/\\IW\[(\d+)\]/gi, function() {
		var item = $dataWeapons[arguments[1]];
        return '\\i[' + item.iconIndex + ']' + item.name;
    }.bind(this));
	text = text.replace(/\\IS\[(\d+)\]/gi, function() {
		var item = $dataSkills[arguments[1]];
        return '\\i[' + item.iconIndex + ']' + item.name;
    }.bind(this));
	text = text.replace(/\\IST\[(\d+)\]/gi, function() {
		var item = $dataStates[arguments[1]];
        return '\\i[' + item.iconIndex + ']' + item.name;
    }.bind(this));
    return alias_CGMV_Message_System_convertEscapeCharacters.call(this, text);
};