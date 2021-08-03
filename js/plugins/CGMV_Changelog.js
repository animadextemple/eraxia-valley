/*:
 * @plugindesc CGMV Changelog
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
 * Made for RPG Maker MV 1.6.1+
 * ------------------------------------------------------------------------------
 * Description: This plugin creates a changelog option on the title screen
 * ------------------------------------------------------------------------------
 * Documentation:
 * Bullet points are optional. If you do not want to display a bullet point
 * before each change, leave the option blank.
 *
 * Bullet points can be numbered. If you want changes to be numbered, set the
 * bullet option to "num".
 *
 * Otherwise, the text entered for the bullet option will be displayed before
 * each change in the changelog. For example, "- " will display a - before each
 * change.
 *
 * Update History:
 * Version 1.0 - Initial Release
 *
 * @param Changes
 * @type struct<Change>[]
 * @default []
 * @desc Set up different change log entries here
 *
 * @param Window Options
 *
 * @param ScrollSpeed
 * @parent Window Options
 * @type number
 * @min 0
 * @desc speed at which the recipe window display scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Bullet
 * @parent Window Options
 * @type text
 * @desc Character to use as a bullet point before each entry. Set to "num" to number the changes and leave blank to not use a bullet point.
 * @default 
 *
 * @param Order
 * @parent Window Options
 * @type boolean
 * @on Descending
 * @off Ascending
 * @desc If descending, shows the changelog entries from last to first. If ascending, shows entries from first to last.
 * @default true
 *
 * @param Wrap Text
 * @parent Window Options
 * @type boolean
 * @desc If true, the text for a changelog entry will wrap if it would otherwise be too long to fit on the line.
 * @default true
 *
 * @param Changelog Text
 * @parent Window Options
 * @type text
 * @desc Text to display at the top of the changelog window and in title command window.
 * @default Changelog
*/
/*~struct~Change:
 * @param Entry Date
 * @type text
 * @default ""
 * @desc The date the changes were made.
 *
 * @param Entries
 * @type text[]
 * @default []
 * @desc The changes made, such as additions, tuning, bug fixes, etc.
 */
var Imported = Imported || {};
Imported.CGMV_Changelog = true;
var CGMV = CGMV || {};
CGMV.Changelog = CGMV.Changelog || {};
CGMV.Changelog.version = 1.0;
CGMV.Changelog.parameters = PluginManager.parameters('CGMV_Changelog');
CGMV.Changelog.Changes = JSON.parse(CGMV.Changelog.parameters["Changes"]);
CGMV.Changelog.Bullet = CGMV.Changelog.parameters["Bullet"];
CGMV.Changelog.Order = (CGMV.Changelog.parameters["Order"] === "true") ? true : false;
CGMV.Changelog.Wrap = (CGMV.Changelog.parameters["Wrap Text"] === "true") ? true : false;
CGMV.Changelog.ScrollSpeed = Number(CGMV.Changelog.parameters["ScrollSpeed"]) || 1;
CGMV.Changelog.ScrollWait = Number(CGMV.Changelog.parameters["ScrollWait"]) || 300;
CGMV.Changelog.WindowTitle = CGMV.Changelog.parameters["Changelog Text"] || "Changelog";
//=============================================================================
// CGMV_ChangelogEntry
//-----------------------------------------------------------------------------
// Store and manage changelog data
//=============================================================================
function CGMV_ChangelogEntry() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Entry
//-----------------------------------------------------------------------------
CGMV_ChangelogEntry.prototype.initialize = function(entry) {
	this._date = entry["Entry Date"];
	this._changes = [];
	var entries = JSON.parse(entry["Entries"]);
	for(var i = 0; i < entries.length; i++) {
		this._changes.push(entries[i]);
	}
};
//-----------------------------------------------------------------------------
// Date of the changelog entry
//-----------------------------------------------------------------------------
CGMV_ChangelogEntry.prototype.getDate = function() {
	return this._date;
};
//=============================================================================
// CGMV_Temp
//-----------------------------------------------------------------------------
// Manage Changelog Data. Use temp class since this info doesn't need to be
// saved.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize changelog data
//-----------------------------------------------------------------------------
var alias_CGMV_Changelog_createPluginData = CGMV_Temp.prototype.createPluginData;
CGMV_Temp.prototype.createPluginData = function() {
	alias_CGMV_Changelog_createPluginData.call(this);
	this.initializeChangelogData();
};
//-----------------------------------------------------------------------------
// Initialize changelog data
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.initializeChangelogData = function() {
	this._changelogEntries = [];
	if(!CGMV.Changelog.Order) {
		for(var i = 0; i < CGMV.Changelog.Changes.length; i++) {
			var entry = new CGMV_ChangelogEntry(JSON.parse(CGMV.Changelog.Changes[i]));
			this._changelogEntries.push(entry);
		}
	}
	else {
		for(var i = CGMV.Changelog.Changes.length - 1; i >=0; i--) {
			var entry = new CGMV_ChangelogEntry(JSON.parse(CGMV.Changelog.Changes[i]));
			this._changelogEntries.push(entry);
		}
	}
};
//-----------------------------------------------------------------------------
// Get changelogs
//-----------------------------------------------------------------------------
CGMV_Temp.prototype.getChangelogs = function() {
	return this._changelogEntries;
};
//=============================================================================
// CGMV_Scene_Changelog
//-----------------------------------------------------------------------------
// Handles the changelog scene
//=============================================================================
function CGMV_Scene_Changelog() {
    this.initialize.apply(this, arguments);
}
CGMV_Scene_Changelog.prototype = Object.create(Scene_MenuBase.prototype);
CGMV_Scene_Changelog.prototype.constructor = CGMV_Scene_Changelog;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Scene_Changelog.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create changelog window
//-----------------------------------------------------------------------------
CGMV_Scene_Changelog.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMV_Scene_Changelog.prototype.createDisplayWindow = function() {
	var x = Graphics.boxWidth/8;
	var y = Graphics.boxHeight - Graphics.boxHeight*9/10;
	var height = Graphics.boxHeight - Graphics.boxHeight/5;
	var width = Graphics.boxWidth - Graphics.boxWidth/4;
    this._displayWindow = new CGMV_Window_ChangelogDisplay(x, y, width, height);
	this._displayWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._displayWindow);
};
//=============================================================================
// CGMV_Window_ChangelogDisplay
//-----------------------------------------------------------------------------
// Window displaying changelog information
//=============================================================================
function CGMV_Window_ChangelogDisplay() {
    this.initialize.apply(this, arguments);
}
CGMV_Window_ChangelogDisplay.prototype = Object.create(CGMV_Window_Scrollable.prototype);
CGMV_Window_ChangelogDisplay.prototype.constructor = CGMV_Window_ChangelogDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_ChangelogDisplay.prototype.initialize = function(x, y, width, height) {
	var heightMultiplier = 25; // maximum of 25 windows tall of data to scroll
    CGMV_Window_Scrollable.prototype.initialize.call(this, x, y, width, height, heightMultiplier, CGMV.Changelog.ScrollWait, CGMV.Changelog.ScrollSpeed);
	this.activate();
	this.requestRefresh();
};
//-----------------------------------------------------------------------------
// If refresh is requested from other window
//-----------------------------------------------------------------------------
CGMV_Window_ChangelogDisplay.prototype.requestRefresh = function() {
    this.refresh();
	this._neededHeight += this.standardPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_ChangelogDisplay.prototype.refresh = function() {
	this.setupWindowForNewEntry();
	this._neededHeight = 0;
	var width = this.contents.width;
	this.drawTitle();
	var y = this.lineHeight();
	y = this.drawChanges(y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Title of window
//-----------------------------------------------------------------------------
CGMV_Window_ChangelogDisplay.prototype.drawTitle = function() {
	this.contents.CGMVfontBold = true;
	this.drawText(CGMV.Changelog.WindowTitle, 0, 0, this.contents.width, 'center');
	this.contents.CGMVfontBold = false;
};
//-----------------------------------------------------------------------------
// Draw changes. Returns the y-value past the last change drawn
//-----------------------------------------------------------------------------
CGMV_Window_ChangelogDisplay.prototype.drawChanges = function(y) {
	var num = (CGMV.Changelog.Bullet === "num") ? true : false;
	var changelogs = $cgmvTemp.getChangelogs();
	if(!changelogs || changelogs.length === 0) { // Error loading changelog data
		$cgmvTemp.reportError("Error loading changelog data", "CGMV Changelog", "Check changelog entry configuration");
		return y;
	}
	for(var i = 0; i < changelogs.length; i++) {
		this.contents.CGMVfontBold = true;
		this.drawText(changelogs[i].getDate(), 0, y, this.contents.width, 'left');
		y += this.lineHeight();
		this.contents.CGMVfontBold = false;
		var changes = changelogs[i]._changes;
		for(var j = 0; j < changes.length; j++) {
			var changeCount = j+1;
			var bulletText = (num) ? changeCount + ". " : CGMV.Changelog.Bullet;
			if(CGMV.Changelog.Wrap) {
				y = this.drawWrappedChangelogEntry(bulletText + changes[j], 0, y, this.contents.width, 'left');
			}
			else {
				this.drawText(bulletText + changes[j], 0, y, this.contents.width, 'left');
				y += this.lineHeight();
			}
		}
		y += this.lineHeight(); // Add blank line between entries
	}
	y -= this.lineHeight(); // Remove blank line after last entry
	return y;
};
//-----------------------------------------------------------------------------
// Draw changes that are wrapped if longer than the width. Returns the y-value past the last change drawn
//-----------------------------------------------------------------------------
CGMV_Window_ChangelogDisplay.prototype.drawWrappedChangelogEntry = function(entry, x, y, width, alignment) {
	words = entry.split(" ");
	var separator = " ";
	for(var i = 0; i < words.length; i++) {
		if(i == words.length - 1) separator = "";
		var tempWidth = this.textWidth(words[i] + separator);
		if(tempWidth + x > width && tempWidth <= width) {
			y += this.lineHeight();
			x = 0;
		}
		this.drawText(words[i] + separator, x, y, width-x, alignment);
		x += tempWidth;
	}
	y += this.lineHeight();
	return y;
};
//=============================================================================
// Scene_Title
//-----------------------------------------------------------------------------
// Show changelog in title screen
//=============================================================================
//-----------------------------------------------------------------------------
// Add changelog command to title window
//-----------------------------------------------------------------------------
var alias_CGMV_Changelog_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	alias_CGMV_Changelog_createCommandWindow.call(this);
    this._commandWindow.setHandler('changelog',  this.CGMVcommandChangelog.bind(this));
};
//-----------------------------------------------------------------------------
// Handling for changelog command
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMVcommandChangelog = function() {
    this._commandWindow.close();
    SceneManager.push(CGMV_Scene_Changelog);
};
//=============================================================================
// Window_TitleCommand
//-----------------------------------------------------------------------------
// Show changelog in title screen
//=============================================================================
//-----------------------------------------------------------------------------
// Add changelog command to title window
//-----------------------------------------------------------------------------
var alias_CGMV_Changelog_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
	alias_CGMV_Changelog_makeCommandList.call(this);
    this.addCommand(CGMV.Changelog.WindowTitle, 'changelog');
};