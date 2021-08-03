/*:
 * @plugindesc CGMV Game Info
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
 * Description: This plugin provides the option of displaying some
 * info on the bottom of the title screen, such as website or
 * copyright info.
 * ------------------------------------------------------------------------------
 * Documentation:
 * Not needed.
 * 
 * @param Left Text
 * @desc Text shown on bottom left of title screen.
 *
 * @param Center Text
 * @desc Text shown on bottom center of title screen.
 *
 * @param Right Text
 * @desc Text shown on bottom right of title screen.
 *
 * @param Font Size
 * @type number
 * @min 1
 * @desc Font size for the text at bottom of title screen.
 * Default: 12
 * @default 12
*/
var Imported = Imported || {};
Imported.CGMV_GameInfo = true;

var CGMV = CGMV || {};
CGMV.GameInfo = CGMV.GameInfo || {};
CGMV.GameInfo.version = 1.0;
CGMV.GameInfo.parameters = PluginManager.parameters('CGMV_GameInfo');
CGMV.GameInfo.LeftText = CGMV.GameInfo.parameters["Left Text"] || "";
CGMV.GameInfo.CenterText = CGMV.GameInfo.parameters["Center Text"] || "";
CGMV.GameInfo.RightText = CGMV.GameInfo.parameters["Right Text"] || "";
CGMV.GameInfo.FontSize = Number(CGMV.GameInfo.parameters["Font Size"]) || 12;
//=============================================================================
// Scene_Title
//-----------------------------------------------------------------------------
// Modify the title scene to add additional text at bottom. Also handles map
// switching.
// added functions: drawCGMVInfo
// modified functions: createForeground
//=============================================================================
//-----------------------------------------------------------------------------
// Also add CGMV info text to foreground
//-----------------------------------------------------------------------------
var alias_CGMV_Title_createForeground = Scene_Title.prototype.createForeground;
Scene_Title.prototype.createForeground = function() {
    alias_CGMV_Title_createForeground.call(this);
	this.drawCGMVInfo();
};
//-----------------------------------------------------------------------------
// Draw CGMV info text
//-----------------------------------------------------------------------------
Scene_Title.prototype.drawCGMVInfo = function() {
	var x = 20;
    var y = Graphics.height - (28 + CGMV.GameInfo.FontSize);
    var maxWidth = Graphics.width - x * 2;
    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = 2;
    this._gameTitleSprite.bitmap.fontSize = CGMV.GameInfo.FontSize;
	this._gameTitleSprite.bitmap.drawText(CGMV.GameInfo.LeftText, x, y, maxWidth, 48, 'left');
    this._gameTitleSprite.bitmap.drawText(CGMV.GameInfo.CenterText, x, y, maxWidth, 48, 'center');
	this._gameTitleSprite.bitmap.drawText(CGMV.GameInfo.RightText, x, y, maxWidth, 48, 'right');
};