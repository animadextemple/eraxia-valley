/*:
 * @plugindesc CGMV Toast Script
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
 * Made for RPG Maker MV 1.6.0
 * ------------------------------------------------------------------------------
 * Description: This plugin creates a pop-up window for Scene Map
 * which will display briefly and then close.
 * ------------------------------------------------------------------------------
 * Documentation:
 * This plugin supports the following Plugin commands:
 * CGMVToast New Text - sets up a new Text-based toast
 * CGMVToast New Pic - sets up a new picture-based toast
 * CGMVToast Invisible - Sets the background for the toast to be invisible
 * CGMVToast SE filename - Sets the name of the SE file to be played upon showing the toast
 * CGMVToast Finalize - creates the toast that has been set up through previous Plugin Commands
 * 
 * If using a text-based toast, the following commands allow customization:
 * CGMVToast Align alignment - alignment can either be left, right, or center
 * CGMVToast Width Number - sets the width of the toast (unless fixed width option is enabled)
 * CGMVToast Line1 Text - Sets the text to show on the first line of the toast
 * CGMVToast Line2 Text - Sets the text to show on the second line of the toast
 * CGMVToast Line1Color Number - Sets the color for the first line of text using windowskin colors
 * CGMVToast Line2Color Number - Sets the color for the second line of text using windowskin colors
 * 
 * If using a picture-based toast, the following commands allow customization:
 * CGMVToast Picture filename - Sets the picture to be displayed in toast area.
 *
 * Example of creating a picture based toast (Each line would be a separate Plugin Command):
 * CGMVToast New Pic
 * CGMVToast Picture testpicture1234
 * CGMVToast SE Applause1
 * CGMVToast Invisible
 * CGMVToast Finalize
 * 
 * Example of creating a text based toast (Each line would be a separate Plugin Command):
 * CGMVToast New Text
 * CGMVToast SE Applause1
 * CGMVToast Align center
 * CGMVToast Line1 This is the first line
 * CGMVToast Line2 This is the second
 * CGMVToast Line1Color 16
 * CGMVToast Line2Color 0
 * CGMVToast Finalize
 * 
 * Parameter help & defaults:
 * Max Window Count - Determines max amount of toast windows shown at once
 * Maximum: 3
 * Default: 1
 * 
 * Spacing - Determines pixels between each toast window.
 * This is the vertical distance.
 * Default: 36
 * 
 * Width - Determines default width (in pixels) of the toast windows
 * Default: 360
 * 
 * Fixed Width - Determines if toasts should adjust width or not.
 * Default: false
 * If toast width is fixed, the width of a toast window will always be equal to the width setting.
 * If width is not fixed, toasts can set their own width or will be defaulted to the width setting if no width is set.
 * 
 * Display Time - Length of time toast is displayed for (in frames)
 * Default: 240 (60 frames = 1 sec)
 *
 * Image dimensions should be 324x72 by default (if changing width, subtract 36 from width value).
 *
 * Update History:
 * Version 1.0 - Initial Release
 *
 * 1.1:
 * - Fixed bug with SE only coming out of right speaker/headphone
 *
 * 1.2:
 * - Toast windows now available in more scenes, not just the map
 *
 * 1.3:
 * - Added ability to use standard message system control characters such as \v[x] in toasts
 * 
 * @param Max Window Count
 * @type number
 * @min 1
 * @max 3
 * @desc Determines max amount of toast windows shown at once
 * @default 1
 *
 * @param Spacing
 * @type number
 * @min 0
 * @desc Determines pixels between each toast window.
 * @default 36
 *
 * @param Width
 * @type number
 * @min 0
 * @desc Determines default width (in pixels) of the toast windows
 * @default 360
 *
 * @param Fixed Width
 * @type boolean
 * @desc Determines if toasts should adjust width or not.
 * @default false
 *
 * @param Display Time
 * @type number
 * @min 0
 * @desc Length of time toast is displayed for (in frames)
 * @default 240
*/
var Imported = Imported || {};
Imported.CGMV_Toast = true;
var CGMV = CGMV || {};
CGMV.Toast = CGMV.Toast || {};
CGMV.Toast.version = 1.2;
CGMV.Toast.parameters = PluginManager.parameters('CGMV_Toast');
CGMV.Toast.MaxWindowCount = Number(CGMV.Toast.parameters["Max Window Count"]) || 1;
CGMV.Toast.Spacing = Number(CGMV.Toast.parameters["Spacing"]) || 36;
CGMV.Toast.FixedWidth = (CGMV.Toast.parameters["Fixed Width"] === "true") ? true : false;
CGMV.Toast.Width = Number(CGMV.Toast.parameters["Width"]) || 360;
CGMV.Toast.DisplayTime = Number(CGMV.Toast.parameters["Display Time"]) || 240;
//=============================================================================
// CGMV
//-----------------------------------------------------------------------------
// Store data to be used for toast windows.
// modified functions: createPluginData
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Create toast window array.
//-----------------------------------------------------------------------------
var alias_CGMV_Toast_createPluginData = CGMV_Core.prototype.createPluginData;
CGMV_Core.prototype.createPluginData = function() {
	alias_CGMV_Toast_createPluginData.call(this);
	this._toastWindowInfo = [];
	this._toast = {}; // temporary toast object used to set up toasts
};
//-----------------------------------------------------------------------------
// Alias. Handles toast plugin commands
//-----------------------------------------------------------------------------
var alias_CGMV_Toast_pluginCommand = CGMV_Core.prototype.pluginCommand;
CGMV_Core.prototype.pluginCommand = function(command, args) {
	alias_CGMV_Toast_pluginCommand.call(this, command, args);
	if(command == "CGMVToast") {
		if(args[0] == "New") {
			this._toast = {};
			if(args[1] == "Text") {
				this._toast.CGMVToast = true;
			}
			else if(args[1] == "Pic") {
				this._toast.CGMVPicToast = true;
			}
		}
		else if(args[0] == "Align") {
			this._toast.align = args[1];
		}
		else if(args[0] == "Width") {
			this._toast.width = args[1];
		}
		else if(args[0] == "Line1") {
			this._toast.line1 = "";
			for(var i = 1; i < args.length; i++) {
				this._toast.line1 += args[i] + " ";
			}
		}
		else if(args[0] == "Line2") {
			this._toast.line2 = "";
			for(var i = 1; i < args.length; i++) {
				this._toast.line2 += args[i] + " ";
			}
		}
		else if(args[0] == "Line1Color") {
			this._toast.line1color = args[1];
		}
		else if(args[0] == "Line2Color") {
			this._toast.line2color = args[1];
		}
		else if(args[0] == "Finalize") {
			this.createNewToast(this._toast);
		}
		else if(args[0] == "Invisible") {
			this._toast.invisible = true;
		}
		else if(args[0] == "SE") {
			this._toast.SE = {name: args[1], pan: 0, pitch: 100, volume: 100};
		}
		else if(args[0] == "Picture") {
			this._toast.picture = args[1];
		}
	}
};
//-----------------------------------------------------------------------------
// Add toast data to toast array. Will fail if not appropriate data type.
//-----------------------------------------------------------------------------
CGMV_Core.prototype.createNewToast = function(toastObject) {
	if(toastObject != null && typeof toastObject === "object") {
		this._toastWindowInfo.push(toastObject);
	}
};
//-----------------------------------------------------------------------------
// Get most recent toast from queue
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getToast = function() {
	return this._toastWindowInfo.shift();
};
//-----------------------------------------------------------------------------
// Determine if toast waiting for display
//-----------------------------------------------------------------------------
CGMV_Core.prototype.hasToast = function() {
	return this._toastWindowInfo.length > 0;
};
//=============================================================================
// SceneManager
//-----------------------------------------------------------------------------
// Determine if the scene should have toast windows made
//=============================================================================
//-----------------------------------------------------------------------------
// Determine if the scene should make toast windows
//-----------------------------------------------------------------------------
SceneManager.canCreateToasts = function() {
	if(this._scene.constructor === Scene_File || this._scene.constructor === Scene_Boot || this._scene.constructor === Scene_Gameover ||
	   this._scene.constructor === Scene_Save || this._scene.constructor === Scene_Load || this._scene.constructor === Scene_Options ||
	   this._scene.constructor === Scene_Title) {
		return false;
	}
	return true;
};
//=============================================================================
// Scene_Base
//-----------------------------------------------------------------------------
// Modify the base scene to add handling for the toast windows.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Initialize whether the scene has toasts to false
//-----------------------------------------------------------------------------
var alias_CGMV_Toast_SceneBase_initialize = Scene_Base.prototype.initialize;
Scene_Base.prototype.initialize = function() {
    alias_CGMV_Toast_SceneBase_initialize.call(this);
	this._hasToastWindows = false;
};
//-----------------------------------------------------------------------------
// Alias. Create toast windows after scene makes the window layer (if needed)
//-----------------------------------------------------------------------------
var alias_CGMV_Toast_createWindowLayer = Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
    alias_CGMV_Toast_createWindowLayer.call(this);
	if(SceneManager.canCreateToasts()) {
		var width = Graphics.boxWidth;
		var height = Graphics.boxHeight;
		var x = (Graphics.width - width) / 2;
		var y = (Graphics.height - height) / 2;
		this._toastLayer = new WindowLayer();
		this._toastLayer.move(x, y, width, height);
		this.addChild(this._toastLayer);
		this.createCGMVToastWindows();
	}
};
//-----------------------------------------------------------------------------
// Alias. Remove toast window layer.
//-----------------------------------------------------------------------------
var alias_CGMV_Toast_SceneBase_terminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
	alias_CGMV_Toast_SceneBase_terminate.call(this);
	this.removeChild(this._toastLayer);
};
//-----------------------------------------------------------------------------
// Add toast window
//-----------------------------------------------------------------------------
Scene_Base.prototype.addToast = function(window) {
    this._toastLayer.addChild(window);
};
//-----------------------------------------------------------------------------
// Alias. Update toast windows
//-----------------------------------------------------------------------------
var alias_CGMV_Toast_SceneBase_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
	alias_CGMV_Toast_SceneBase_update.call(this);
	if(this._hasToastWindows && this.isActive() && !this.isBusy()) {
        this.updateToastWindows();
    }
};
//-----------------------------------------------------------------------------
// Create amount of toast windows depending on need.
//-----------------------------------------------------------------------------
Scene_Base.prototype.createCGMVToastWindows = function() {
    this._CGMVToastWindow1 = new CGMV_Window_Toast(0);
    this.addToast(this._CGMVToastWindow1);
	if(CGMV.Toast.MaxWindowCount > 1) {
		this._CGMVToastWindow2 = new CGMV_Window_Toast(1);
		this.addToast(this._CGMVToastWindow2);
	}
	if(CGMV.Toast.MaxWindowCount > 2) {
		this._CGMVToastWindow3 = new CGMV_Window_Toast(2);
		this.addToast(this._CGMVToastWindow3);
	}
	this._hasToastWindows = true;
};
//-----------------------------------------------------------------------------
// Create amount of toast windows depending on need.
//-----------------------------------------------------------------------------
Scene_Base.prototype.updateToastWindows = function() {
	if($cgmv.hasToast()) {
		if(!this._CGMVToastWindow1._isDisplaying) {
			this._CGMVToastWindow1.open($cgmv.getToast());
		}
		else if(CGMV.Toast.MaxWindowCount > 1 && !this._CGMVToastWindow2._isDisplaying) {
			this._CGMVToastWindow2.open($cgmv.getToast());
		}
		else if(CGMV.Toast.MaxWindowCount > 2 && !this._CGMVToastWindow3._isDisplaying) {
			this._CGMVToastWindow3.open($cgmv.getToast());
		}
	}
};
//=============================================================================
// CGMV_Window_Toast
//-----------------------------------------------------------------------------
// The toast window. Loads information from $cgmv
//=============================================================================
function CGMV_Window_Toast() {
    this.initialize.apply(this, arguments);
}
CGMV_Window_Toast.prototype = Object.create(Window_Base.prototype);
CGMV_Window_Toast.prototype.constructor = CGMV_Window_Toast;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.initialize = function(winNum) {
    var width = this.windowWidth();
    var height = this.windowHeight();
	var x = Graphics.boxWidth/2 - width/2;
	var y = Graphics.boxHeight - height - winNum*(height + CGMV.Toast.Spacing);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
	this._toastInfo = null;
	this._isDisplaying = false;
	this._showBG = true;
	this._bitmap = ImageManager.loadEmptyBitmap();
	this._bitmapLoading = false;
    this.contents.clear();
};
//-----------------------------------------------------------------------------
// Default Window Width
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.windowWidth = function() {
    return CGMV.Toast.Width;
};
//-----------------------------------------------------------------------------
// Default Window height
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.windowHeight = function() {
    return this.fittingHeight(2);
};
//-----------------------------------------------------------------------------
// Update for fade in/out
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this._showCount > 0 && this.canDisplay()) {
        this.updateFadeIn();
        this._showCount--;
    } else {
		this.updateFadeOut();
    }
	if(this.contentsOpacity <= 0 && !this._bitmapLoading) {
		this._isDisplaying = false;
	}
};
//-----------------------------------------------------------------------------
// Check if everything is ready for displaying the toast.
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.canDisplay = function() {
	return this.isBitmapReady();
};
//-----------------------------------------------------------------------------
// Check if the bitmap is loaded. Perform a blt if so.
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.isBitmapReady = function() {
	if(!this._bitmapLoading) {
		return true;
	}
	else {
		if(this._bitmap.width == 0) {
			return false;
		}
		else {
			this._bitmapLoading = false;
			var sx = 0;
			var sy = 0;
			var sw = this._bitmap.width;
			var sh = this._bitmap.height;
			var dx = 0;
			var dy = 0;
			var dw = this.contents.width;
			var dh = this.contents.height;
			this.contents.blt(this._bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
			this._bitmap = ImageManager.loadEmptyBitmap();
			return true;
		}
	}
};
//-----------------------------------------------------------------------------
// Fade in
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.updateFadeIn = function() {
	if(this._showBG) {
		this.opacity += 16;
	}
    this.contentsOpacity += 16;
};
//-----------------------------------------------------------------------------
// Fade out
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.updateFadeOut = function() {
	if(this._showBG) {
		this.opacity -= 16;
	}
    this.contentsOpacity -= 16;
};
//-----------------------------------------------------------------------------
// Open the window
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.open = function(obj) {
	this._isDisplaying = true;
    this.refresh(obj);
    this._showCount = CGMV.Toast.DisplayTime;
};
//-----------------------------------------------------------------------------
// Close the window
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.close = function() {
    this._showCount = 0;
};
//-----------------------------------------------------------------------------
// Refresh the window
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.refresh = function(toastObject) {
	this.doCommonEffects(toastObject);
	this.contents.clear();
	this.resetTextColor();
	//Default toast with up to 2 text lines
	if(toastObject.hasOwnProperty('CGMVToast')) {
		var x = this.textPadding();
		var y = 0;
		var width = this.contents.width - this.textPadding() * 2;
		var align = 'center';
		if(toastObject.hasOwnProperty('align')) {
			align = toastObject.align;
		}
		if(toastObject.hasOwnProperty('line1color')) {
			this.changeTextColor(this.textColor(toastObject.line1color));
		}
		if(toastObject.hasOwnProperty('line1')) {
			this.drawText(this.convertEscapeCharacters(toastObject.line1), x, y, width, align);
		}
		this.resetTextColor();
		if(toastObject.hasOwnProperty('line2color')) {
			this.changeTextColor(this.textColor(toastObject.line2color));
		} 
		if(toastObject.hasOwnProperty('line2')) {
			y += this.lineHeight();
			this.drawText(this.convertEscapeCharacters(toastObject.line2), x, y, width, align);
		}
	}
	//Default picture toast
	if(toastObject.hasOwnProperty('CGMVPicToast')) {
		if(toastObject.hasOwnProperty('picture')) {
			this._bitmap = ImageManager.loadPicture(toastObject.picture);
			this._bitmapLoading = true;
		} 
	}
	this.processCustomToast(toastObject);
};
//-----------------------------------------------------------------------------
// Perform common effects for all toast types (resize Width and play SE)
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.doCommonEffects = function(toastObject) {
	if(toastObject.hasOwnProperty('width') && !CGMV.Toast.FixedWidth) {
		this.updateWidth(toastObject.width);
	}
	else {
		this.updateWidth(CGMV.Toast.Width);
	}
	if(toastObject.hasOwnProperty('SE')) {
		AudioManager.playStaticSe(toastObject.SE);
	}
	this._showBG = true;
	if(toastObject.hasOwnProperty('invisible')) {
			this._showBG = false;
	}
};
//-----------------------------------------------------------------------------
// Change window width
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.updateWidth = function(width) {
	if(width != this.width) {
		this.width = width;
		this.createContents();
	}
};
//-----------------------------------------------------------------------------
// Processing for custom toasts. To be used by other scripts for toast behavior
//-----------------------------------------------------------------------------
CGMV_Window_Toast.prototype.processCustomToast = function(toastObject) {
	// Put toast behavior here
};