/*:
 * @plugindesc CGMV Plugin for managing the Menu's command window
 * @author Casper Gaming
 * @help
 * ==============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ==============================================================================
 * Become a Patron to get access to a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ==============================================================================
 * Version: 1.0
 * ------------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.0
 * ------------------------------------------------------------------------------
 * Description: This plugin modifies the menu command window. With it,
 * you can change the order of each entry and even add your own custom
 * menu entries (even for non-CGMV plugins). You can also add switches
 * to enable/disable or hide/show each individual entry.
 * ------------------------------------------------------------------------------
 * Documentation:
 * Some Command Symbols can have special meanings, mainly
 * when they represent the original 8 commands.
 * The following symbols represent the original 8 commands (case sensitive):
 * item - Will handle like the original item command
 * skill - Will handle like the original skill command
 * equip - Will handle like the original equip command
 * status - Will handle like the original status command
 * formation - Will handle like the original formation command
 * options - Will handle like the original options command
 * save - Will handle like the original save command
 * gameEnd - will handle like the original game end command
 * 
 * It is important that you do not use these strings as the Command Symbol
 * property unless you mean to refer to the original commands.
 * 
 * If you set the parameter "Keep Original Commands" to true, the 8 original
 * commands will be untouched and custom commands will go where the makers of
 * RPG Maker MV intended them to go in the list of menu items. This is the
 * beginner-friendly option.
 *
 * If you set the parameter "Keep Original Commands" to false, no commands will
 * be added by default and you will need to add any menu item you wish to use
 * even if it is one of the ones that come with the maker (such as the Item
 * command). However, with this option you have more control over where in the
 * list each entry appears and you can also easily hide or disable menu entries
 * with the switches associated with them. Below you can find the default 8
 * commands which you can copy+paste into the text part of the parameter setup
 * if using this option. You can still change the order, and modify switches to
 * enable/disable and hide/show the option, as well as the command name.
 *
 * Item command:
 * {"Command Name":"Item","Command Symbol":"item","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0"}
 *
 * Skill command:
 * {"Command Name":"Skill","Command Symbol":"skill","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0"}
 *
 * Equip command:
 * {"Command Name":"Equip","Command Symbol":"equip","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0"}
 *
 * Status command:
 * {"Command Name":"Status","Command Symbol":"status","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0"}
 *
 * Formation command:
 * {"Command Name":"Formation","Command Symbol":"formation","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0"}
 *
 * Options command:
 * {"Command Name":"Options","Command Symbol":"options","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0"}
 *
 * Save command:
 * {"Command Name":"Save","Command Symbol":"save","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0"}
 *
 * Game End command:
 * {"Command Name":"Game End","Command Symbol":"gameEnd","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0"}
 * ------------------------------------------------------------------------------
 * Some default commands can be found for CGMV plugins so you can easily add
 * these plugins to your menu.
 *
 * CGMV Achievements:
 * {"Command Name":"Achievements","Command Symbol":"achievements","JS Command":"\"SceneManager.push(CGMV_Scene_Achievements);\"","Enable Switch":"0","Show Switch":"0"}
 * 
 *
 * @param Commands
 * @type struct<Handler>[]
 * @desc Command Name and associated js commands
 * @default []
 *
 * @param NumCommands
 * @text Number of Commands
 * @type number
 * @min 1
 * @desc Maximum amount of commands to display before scrolling.
 * @default 8
 *
 * @param Keep Original Commands
 * @type boolean
 * @default true
 * @desc Determine whether to show the original commands
 * in their original order. (keep true if beginner)
*/
/*~struct~Handler:
 * @param Command Name
 * @type text
 * @desc Name of the command to display in the command window.
 *
 * @param Command Symbol
 * @type text
 * @desc This symbol is used internally to recognize the command.
 * Special meaning for original commands (see documentation).
 *
 * @param JS Command
 * @type note
 * @desc JavaScript to run when command is selected.
 * @default ""
 *
 * @param Enable Switch
 * @type switch
 * @default 0
 * @desc Turning this switch on will enable the command.
 *
 * @param Show Switch
 * @type switch
 * @default 0
 * @desc Turning this switch on will show the command.
*/
var Imported = Imported || {};
Imported.CGMV_Menu_CommandWindow = true;
var CGMV = CGMV || {};
CGMV.Menu_CommandWindow = CGMV.Menu_CommandWindow || {};
CGMV.Menu_CommandWindow.version = 1.0;
CGMV.Menu_CommandWindow.parameters = PluginManager.parameters('CGMV_Menu_CommandWindow');
CGMV.Menu_CommandWindow.NumCommands = Number(CGMV.Menu_CommandWindow.parameters["NumCommands"]) || 8;
CGMV.Menu_CommandWindow.CommandsText = CGMV.Menu_CommandWindow.parameters["Commands"] || "";
CGMV.Menu_CommandWindow.KeepOriginals = (CGMV.Menu_CommandWindow.parameters["Keep Original Commands"] === "true") ? true : false;
CGMV.Menu_CommandWindow.CommandsArray = JSON.parse(CGMV.Menu_CommandWindow.CommandsText);
CGMV.Menu_CommandWindow.Commands = [];
for(i = 0; i < CGMV.Menu_CommandWindow.CommandsArray.length; i++) {
	CGMV.Menu_CommandWindow.Commands.push(JSON.parse(CGMV.Menu_CommandWindow.CommandsArray[i]));
	CGMV.Menu_CommandWindow.Commands[i]["Enable Switch"] = Number(CGMV.Menu_CommandWindow.Commands[i]["Enable Switch"]);
	CGMV.Menu_CommandWindow.Commands[i]["Show Switch"] = Number(CGMV.Menu_CommandWindow.Commands[i]["Show Switch"]);
}
//=============================================================================
// Scene Menu
//-----------------------------------------------------------------------------
// Handling for command window entries
//=============================================================================
//-----------------------------------------------------------------------------
// Handling for custom Commands added through the plugin
//-----------------------------------------------------------------------------
Scene_Menu.prototype.commandCustomCGMV = function() {
	for(var i = 0; i < CGMV.Menu_CommandWindow.Commands.length; i++) {
		if(this._commandWindow.currentSymbol() == CGMV.Menu_CommandWindow.Commands[i]["Command Symbol"]) {
			try {
				eval(JSON.parse(CGMV.Menu_CommandWindow.Commands[i]["JS Command"]));
			}
			catch (e) {
				console.warn("Eval Error in CGMV Menu Command Window: " + e.message);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Alias. Add additional commands.
//-----------------------------------------------------------------------------
var alias_CGMV_Menu_CommandWindow_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	alias_CGMV_Menu_CommandWindow_createCommandWindow.call(this);
	for(var i = 0; i < CGMV.Menu_CommandWindow.Commands.length; i++) {
		if(this.isCustomCommand(CGMV.Menu_CommandWindow.Commands[i]["Command Symbol"])) {
			this._commandWindow.setHandler(CGMV.Menu_CommandWindow.Commands[i]["Command Symbol"],      this.commandCustomCGMV.bind(this));
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if command is a custom command in need of custom handler
//-----------------------------------------------------------------------------
Scene_Menu.prototype.isCustomCommand = function(symbol) {
	if(symbol == 'item' || symbol == 'skill' || symbol == 'equip' || symbol == 'status' ||
	symbol == 'formation' || symbol == 'options' || symbol == 'save' || symbol == 'gameEnd') {
		return false;
	}
	return true;
};
//=============================================================================
// Window MenuCommand
//-----------------------------------------------------------------------------
// Change amount of commands displayed at once and add new original commands
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Change amount of commands visible at one time
//-----------------------------------------------------------------------------
var alias_CGMV_Menu_CommandWindow_numVisibleRows = Window_MenuCommand.prototype.numVisibleRows;
Window_MenuCommand.prototype.numVisibleRows = function() {
	var oldVal = alias_CGMV_Menu_CommandWindow_numVisibleRows.call(this);
    return Math.min(oldVal, CGMV.Menu_CommandWindow.NumCommands);
};
//-----------------------------------------------------------------------------
// Alias. Add original commands.
//-----------------------------------------------------------------------------
var alias_CGMV_Menu_CommandWindow_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	alias_CGMV_Menu_CommandWindow_addOriginalCommands.call(this);
	for(var i = 0; i < CGMV.Menu_CommandWindow.Commands.length; i++) {
		var cmd = CGMV.Menu_CommandWindow.Commands[i];
		if(this.CGMVNeedsCommand(cmd)) {
			var enabled = this.CGMVGetEnabledStatus(cmd);
			this.addCommand(cmd["Command Name"], cmd["Command Symbol"], enabled);
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if Command should show
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.CGMVNeedsCommand = function(cmd) {
	if(cmd["Show Switch"] > 0 && !$gameSwitches.value(cmd["Show Switch"])) {
		return false;
	}
	return this.needsCommand(cmd["Command Symbol"]);
};
//-----------------------------------------------------------------------------
// Determine if Command should show
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.CGMVGetEnabledStatus = function(cmd) {
	if(cmd["Enable Switch"] > 0 && !$gameSwitches.value(cmd["Enable Switch"])) {
		return false;
	}
	switch(cmd["Command Symbol"]) {
		case 'item':
			return this.areMainCommandsEnabled();
		case 'skill':
			return this.areMainCommandsEnabled();
		case 'equip':
			return this.areMainCommandsEnabled();
		case 'status':
			return this.areMainCommandsEnabled();
		case 'formation':
			return this.isFormationEnabled();
		case 'options':
			return this.isOptionsEnabled();
		case 'save':
			return this.isSaveEnabled();
		case 'gameEnd':
			return this.isGameEndEnabled();
	}
	return true;
};
//-----------------------------------------------------------------------------
// Alias. Add main commands only if original commands should not be touched
//-----------------------------------------------------------------------------
var alias_CGMV_Menu_CommandWindow_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
Window_MenuCommand.prototype.addMainCommands = function() {
    if(CGMV.Menu_CommandWindow.KeepOriginals) {
		alias_CGMV_Menu_CommandWindow_addMainCommands.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add formation command only if original commands should not be touched
//-----------------------------------------------------------------------------
var alias_CGMV_Menu_CommandWindow_addFormationCommand = Window_MenuCommand.prototype.addFormationCommand;
Window_MenuCommand.prototype.addFormationCommand = function() {
    if(CGMV.Menu_CommandWindow.KeepOriginals) {
		alias_CGMV_Menu_CommandWindow_addFormationCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add options command only if original commands should not be touched
//-----------------------------------------------------------------------------
var alias_CGMV_Menu_CommandWindow_addOptionsCommand = Window_MenuCommand.prototype.addOptionsCommand;
Window_MenuCommand.prototype.addOptionsCommand = function() {
    if(CGMV.Menu_CommandWindow.KeepOriginals) {
		alias_CGMV_Menu_CommandWindow_addOptionsCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add save command only if original commands should not be touched
//-----------------------------------------------------------------------------
var alias_CGMV_Menu_CommandWindow_addSaveCommand = Window_MenuCommand.prototype.addSaveCommand;
Window_MenuCommand.prototype.addSaveCommand = function() {
    if(CGMV.Menu_CommandWindow.KeepOriginals) {
		alias_CGMV_Menu_CommandWindow_addSaveCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add game end command only if original commands should not be touched
//-----------------------------------------------------------------------------
var alias_CGMV_Menu_CommandWindow_addGameEndCommand = Window_MenuCommand.prototype.addGameEndCommand;
Window_MenuCommand.prototype.addGameEndCommand = function() {
	if(CGMV.Menu_CommandWindow.KeepOriginals) {
		alias_CGMV_Menu_CommandWindow_addGameEndCommand.call(this);
	}
};