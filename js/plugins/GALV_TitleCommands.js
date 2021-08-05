//-----------------------------------------------------------------------------
//  Galv's Title Commands
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_TitleCommands.js
//-----------------------------------------------------------------------------
//  2016-07-06 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_TitleCommands = true;

var Galv = Galv || {};            // Galv's main object
Galv.TCMD = Galv.TCMD || {};    // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Allows you to customize what commands appear in the title screen menu.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Default Commands
 * @desc The default title command list before the below Mod Condition is met
 * @default New Game,new,always|Continue,con,isSave|Options,opt,always
 *
 * @param Mod Condition
 * @desc A condition that will use Mod Commands instead of default. Leave blank to not use.
 * @default
 *
 * @param Mod Commands
 * @desc A title command list that will be used if the Mod Condition is met.
 * @default
 *
 * @help
 *   Galv's TitleCommands
 * ----------------------------------------------------------------------------
 * This plugin was designed to control the command menu on the title screen.
 * If you use any plugins that add additional commands to this menu, you will
 * need to add them manually in the plugin settings.
 *
 * HOW IT WORKS
 * ------------
 * The plugin settings contains separate input boxes where you can set up
 * what commands display in the menu and condition required for each command.
 *
 *
 * --- Default Commands ---
 * The first box is for default menu commands and contains setup data for them.
 * For each menu command, the data is arranged as below:
 *
 *      Command Text,function,condition,hide
 *
 * Command Text = The text that appears for the command button
 * function     = Function name that controls what the command button does
 * condition    = Condition that the command button will be enabled
 * hide         = Make this true to set the command button to hide instead of
 *                being disabled if the condition is not met. Leave it out
 *                completely if not needed
 *
 * For multiple commands, separate each command data with a | symbol. The
 * order of these commands changes the order of the buttons in the menu.
 *
 * EXAMPLE:
 *     New Game,new,always|Continue,con,isSave|Options,opt,always
 *
 * Function quick text:
 *     new          = new game
 *     con          = continue
 *     opt          = options
 *     quit         = exit game
 *     newPlus      = New Game Plus (requires Galv's New Game Plus plugin)
 *     credits      = Credits (requires Galv's Roll Credits plugin)
 * Alternatively you can use a javascript function name of a function from
 * Scene_Title. If you are using another custom plugin that adds commands
 * to the menu, you will need to discover what the function is called for
 * that plugin and use it in the function text of the setting.
 *
 * Condition quick text:
 *     always      = command is always enabled
 *     isSave      = only if a save file exists is it enabled
 *     canNewGamePlus = if New Game+ active (requires Galv's New Game Plus)
 * Alternatively use javascript code relative to Scene_Title. (Advanced)
 *
 *
 *
 * --- Mod Condition ---
 * This is javascript code (advanced users only). If this condition is true
 * then instead of showing the Default Commands, the title menu will instead
 * show the Mod Commands.
 *
 * EXAMPLES:
 *   DataManager.isAnySavefileExists()  // if there is an existing save game
 *   Galv.NEWGP.games   // requires Galv's New Game Plus. Checks if any games
 *                      // have new game plus activated
 *
 *
 * --- Mod Commands ---
 * Set these up exactly as the 'Default Commands' section above. If no Mod
 * Condition then this will not do anything.
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------


(function() {

Galv.TCMD.functions = {
	'new': 'commandNewGame',
	'con': 'commandContinue',
	'opt': 'commandOptions',
	'quit': 'commandQuit',
	'newPlus': 'commandNewGamePlus',
	'credits': 'commandCredits'
};

Galv.TCMD.conditions = {
	'isSave': 'DataManager.isAnySavefileExists()',
	'always': 'true',
	'canNewGamePlus': 'Galv.NEWGP.games'
};

// commands
Galv.TCMD.cmds = [];
var txt = PluginManager.parameters('Galv_TitleCommands')['Default Commands']
var cmds = txt.split("|");
for (var i = 0; i < cmds.length; i++) {
	Galv.TCMD.cmds.push(cmds[i].split(","));
}

// mod commands
Galv.TCMD.condition = PluginManager.parameters('Galv_TitleCommands')['Mod Condition'];
Galv.TCMD.modCmds = [];
var txt = PluginManager.parameters('Galv_TitleCommands')['Mod Commands']
var cmds = txt.split("|");
for (var i = 0; i < cmds.length; i++) {
	Galv.TCMD.modCmds.push(cmds[i].split(","));
}


// SCENE TITLE
//-----------------------------------------------------------------------------

Scene_Title.prototype.commandQuit = function() {
    SceneManager.exit();
};


// WINDOW TITLE COMMAND
//-----------------------------------------------------------------------------

Window_TitleCommand.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCustomCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
};

Window_TitleCommand.prototype.makeCommandList = function() {
	this.makeCustomCommandList();
};

Window_TitleCommand.prototype.makeCustomCommandList = function() {
	// Check if default or mod commands
	var mod = eval(Galv.TCMD.condition);
	if (mod) {
		var list = Galv.TCMD.modCmds; // mod list
	} else {
		var list = Galv.TCMD.cmds; // default list	
	}

	// Build command list
	for (var i = 0; i < list.length; i++) {
		var txt = list[i][0];
		var func = list[i][1];
		var hide = list[i][3];
		
		var conFun = Galv.TCMD.conditions[list[i][2]] || list[i][2];
		var cond = eval(conFun);
		
		if (!(!cond && hide)) this.addCommand(txt, func, cond);
		
	}
};

Window_TitleCommand.prototype.callOkHandler = function() {
	var symbol = this.currentSymbol();
    var func = Galv.TCMD.functions[symbol] || symbol;
	eval('SceneManager._scene.' + func + '()');	
};

})();