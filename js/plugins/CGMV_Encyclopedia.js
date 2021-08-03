/*:
 * @plugindesc CGMV Encyclopedia
 * @author Casper Gaming
 * @help
 * ===========================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ===========================================================================
 * Become a Patron to get a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ===========================================================================
 * Version: 1.8
 * ---------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.1
 * Requires CGMV Core version 1.3+
 * ---------------------------------------------------------------------------
 * Description: This plugin allows you to add a powerful encyclopedia system
 * to your game. It can include things such as discovered enemies (bestiary),
 * items, weapons, armors, etc. and even states or custom categories.
 * ---------------------------------------------------------------------------
 * Documentation:
 * This plugin supports the following Plugin Commands:
 * - CGMVEncyclopedia Discover [symbol] [id]
 * This plugin command discovered the item with id for the category symbol.
 * Also works for custom categories.
 * Ex: CGMVEncyclopedia Discover bestiary 1
 *
 * - CGMVEncyclopedia Scene
 * This plugin command calls the Encyclopedia Scene
 *
 * - CGMVEncyclopedia Initialize
 * This plugin command reinitializes the encyclopedia data. Only use for
 * testing with saved games where the data stored in the encyclopedia has
 * changed.
 *
 * Custom categories must be manually tracked. Default categories (bestiary,
 * item, weapon, armor, skill, state) will all be automatically tracked if
 * included except for some uncommon circumstances.
 *
 * This plugin supports the following notetags:
 * <cgmvdesc:[description]> - Puts a "note" in the encyclopedia display page
 *
 * <cgmvencyclopediahide> - Does not include the item in the encyclopedia
 *
 * Large Icon Multiplier Option Help:
 * This option changes the size of the icon displayed by default for items,
 * armors, weapons, states, and skills. It displaces text to the right based
 * on its height. Here are some common multiplier sizes that play nice with
 * text:
 * Lines displaced: 1, use multiplier size: 1.1
 * Lines displaced: 2, use multiplier size: 2.2
 * Lines displaced: 3, use multiplier size: 3.3
 *
 * Version History:
 * 1.0 - Initial release
 *
 * 1.1:
 * - Can now scroll with Arrow Keys and Mouse Wheel
 * - No longer relies on deprecated CGMV Core commands
 *
 * 1.2:
 * - Fixed an issue with states not tracking properly for achievements
 *
 * 1.3:
 * - Compatibility patch for SRD SuperToolsEngine
 *
 * 1.4:
 * - Fixed bug that could cause game to crash when discovering the last item in the database
 *
 * 1.5:
 * - Fixed bug with skills mixing up TP and MP cost.
 *
 * 1.6:
 * - Fixed initialization bug that could occur with some other plugins.
 *
 * 1.7:
 * - Fixed bug with Discover plugin command not working.
 *
 * 1.8:
 * - Fixed weird display when currency unit began with a space
 * - Fixed bug with description beginning new line too early when description contained newline character
 *
 * @param Category Options
 * 
 * @param Include Bestiary
 * @type boolean
 * @desc Determines to include the bestiary part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Items
 * @type boolean
 * @desc Determines to include the items part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Armors
 * @type boolean
 * @desc Determines to include the armors part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Weapons
 * @type boolean
 * @desc Determines to include the weapons part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Skills
 * @type boolean
 * @desc Determines to include the skills part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include States
 * @type boolean
 * @desc Determines to include the states part of the encyclopedia
 * @default true
 * @parent Category Options
 *
 * @param Categories
 * @type struct<Category>[]
 * @default ["{\"Category Name\":\"Bestiary\",\"Category Symbol\":\"bestiary\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Items\",\"Category Symbol\":\"items\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Armors\",\"Category Symbol\":\"armors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Weapons\",\"Category Symbol\":\"weapons\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Skills\",\"Category Symbol\":\"skills\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"States\",\"Category Symbol\":\"states\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}"]
 * @desc Categories for the encyclopedia to select from in the encyclopedia scene.
 * @parent Category Options
 *
 * @param Custom Entry Options
 *
 * @param Custom Entries
 * @parent Custom Entry Options
 * @type struct<Custom>[]
 * @default []
 * @desc Custom entries not already covered in the encyclopedia
 *
 * @param Encyclopedia Scene Options
 *
 * @param Encyclopedia Scene Title
 * @desc Text to put in the title window at the top of the encyclopedia scene
 * @default Encyclopedia
 * @parent Encyclopedia Scene Options
 *
 * @param Unknown Entry
 * @desc Text to put in the list window for an unknown entry
 * @default ? ? ? ? ?
 * @parent Encyclopedia Scene Options
 *
 * @param Unknown Entry Display
 * @desc Text to put in the display window for an unknown entry
 * @default This has not yet been discovered.
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Text
 * @desc Text to put for the total completion %
 * @default Total
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Rounding
 * @desc How many decimals to round to.
 * @type number
 * @min 1
 * @default 2
 * @parent Encyclopedia Scene Options
 *
 * @param Number Entries
 * @type boolean
 * @desc Number each entry in the list window?
 * @default true
 * @parent Encyclopedia Scene Options
 *
 * @param Display Window Options
 *
 * @param Scroll Wait
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * Default: 300
 * @default 300
 *
 * @param Scroll Speed
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc speed at which the display window scrolls (if needed)
 * Default: 1
 * @default 1
 *
 * @param Large Icon Multiplier
 * @desc Determines the factor to increase the icon size by for a large icon
 * @type number
 * @decimals 1
 * @min 0.1
 * @default 3.3
 * @parent Display Window Options
 *
 * @param Text Options
 *
 * @param Yes Text
 * @desc Word to use for a yes answer
 * @default Yes
 * @parent Text Options
 *
 * @param No Text
 * @desc Word to use for a no answer
 * @default No
 * @parent Text Options
 *
 * @param Price Text
 * @desc Text to show when describing the price
 * @default Price
 * @parent Text Options
 *
 * @param No Price Text
 * @desc Text to show when describing the price when the item is unsellable
 * @default Not for sale
 * @parent Text Options
 *
 * @param Key Item Text
 * @desc Text to show when describing a key item or not key item
 * @default Key Item
 * @parent Text Options
 *
 * @param Possession Text
 * @desc Text to show when describing how many of an item the player has
 * @default Possession
 * @parent Text Options
 *
 * @param Equip Type Text
 * @desc Text to show when describing what slot the equipment goes in (equip type)
 * @default Equip Slot
 * @parent Text Options
 *
 * @param Armor Type Text
 * @desc Text to show when describing what type of armor it is (armor type)
 * @default Armor Type
 * @parent Text Options
 *
 * @param No Armor Type Text
 * @desc Text to show when armor has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Weapon Type Text
 * @desc Text to show when describing what type of weapon it is (weapon type)
 * @default Weapon Type
 * @parent Text Options
 *
 * @param No Weapon Type Text
 * @desc Text to show when weapon has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Skill Type Text
 * @desc Text to show when describing what type of skill it is (skill type)
 * @default Skill Type
 * @parent Text Options
 *
 * @param No Skill Type Text
 * @desc Text to show when skill has no type in database
 * @default Basic
 * @parent Text Options
 *
 * @param Drops Text
 * @desc Text to show when describing rewards from an enemy
 * @default Drops
 * @parent Text Options
 *
 * @param Show Drop Chances
 * @desc Determine whether drop chances are shown in the encyclopedia
 * @type boolean
 * @default true
 * @parent Text Options
 *
 * @param Drop Chance Text
 * @desc Text to show when describing drop chance for an item
 * @default Chance
 * @parent Text Options
 *
 * @param Sketch Text
 * @desc Text to show when describing a sketch for an item
 * @default Sketch
 * @parent Text Options
 *
 * @param Note Text
 * @desc Text to describe what is found in meta notes
 * @default Note
 * @parent Text Options
 *
 * @param Success Rate Text
 * @desc Text to describe success rate of an item
 * @default Success Rate
 * @parent Text Options
 *
 * @param Consumable Text
 * @desc Text to describe whether an item is consumable
 * @default Consumable
 * @parent Text Options
 *
 * @param Effects Text
 * @desc Text to describe effects
 * @default Item Effects
 * @parent Text Options
 *
 * @param HP Effect Text
 * @desc Text to describe when an item has an HP effect
 * @default HP Effect
 * @parent Text Options
 *
 * @param MP Effect Text
 * @desc Text to describe when an item has an MP effect
 * @default MP Effect
 * @parent Text Options
 *
 * @param TP Effect Text
 * @desc Text to describe when an item has a TP effect
 * @default TP Effect
 * @parent Text Options
 *
 * @param Add State Text
 * @desc Text to describe when an item has an add state effect
 * @default Causes
 * @parent Text Options
 *
 * @param Remove State Text
 * @desc Text to describe when an item has a remove state effect
 * @default Cures
 * @parent Text Options
 *
 * @param Add Buff Text
 * @desc Text to describe when an item has a buff effect
 * @default Buffs
 * @parent Text Options
 *
 * @param Add Debuff Text
 * @desc Text to describe when an item has a debuff effect
 * @default Debuffs
 * @parent Text Options
 *
 * @param Remove Buff Text
 * @desc Text to describe when an item removes a buff effect
 * @default Remove Buffs
 * @parent Text Options
 *
 * @param Remove Debuff Text
 * @desc Text to describe when an item removes a debuff effect
 * @default Clear Debuffs
 * @parent Text Options
 *
 * @param Grow Text
 * @desc Text to describe when an item has a grow effect
 * @default Trains
 * @parent Text Options
 *
 * @param Learn Spell Text
 * @desc Text to describe when an item has a learn skill effect
 * @default Teaches
 * @parent Text Options
 *
 * @param Party Ability Text
 * @desc Text to describe when an armor or weapon has a party ability trait
 * @default Special Effect
 * @parent Text Options
 *
 * @param Half Encounter Text
 * @desc Text to describe party ability half encounter
 * @default Half Encounter Rate
 * @parent Text Options
 *
 * @param No Encounter Text
 * @desc Text to describe party ability no encounter
 * @default No Encounters
 * @parent Text Options
 *
 * @param Cancel Surprise Text
 * @desc Text to describe party ability cancel surprise
 * @default Cancel Surprise
 * @parent Text Options
 *
 * @param Raise Preemptive Text
 * @desc Text to describe party ability raise preemptive
 * @default Raise Preemptive
 * @parent Text Options
 *
 * @param Gold Double Text
 * @desc Text to describe party ability gold double
 * @default 2x Gold Drops
 * @parent Text Options
 *
 * @param Drop Item Double Text
 * @desc Text to describe party ability drop item double
 * @default 2x Item Drops
 * @parent Text Options
 *
 * @param Description Text
 * @desc Text to describe item description
 * @default Description
 * @parent Text Options
 *
 * @param Element Text
 * @desc Text to describe attack element trait
 * @default Element
 * @parent Text Options
 *
 * @param Attack Speed Text
 * @desc Text to describe attack speed trait
 * @default Speed Effect
 * @parent Text Options
 *
 * @param Attack Times Text
 * @desc Text to describe attack times + trait
 * @default Additional Attacks
 * @parent Text Options
 *
 * @param Attack State Text
 * @desc Text to describe attack apply state trait
 * @default Applies
 * @parent Text Options
 *
 * @param MP Cost Text
 * @desc Text to describe MP Cost
 * @default MP Cost
 * @parent Text Options
 *
 * @param TP Cost Text
 * @desc Text to describe TP Cost
 * @default TP Cost
 * @parent Text Options
 *
 * @param User TP Gain Text
 * @desc Text to describe user TP Gain
 * @default User TP Gain
 * @parent Text Options
 *
 * @param Battle Removal Text
 * @desc Text to describe state removal after battle property
 * @default Removed after battle
 * @parent Text Options
 *
 * @param Walking Removal Text
 * @desc Text to describe state removal after walking property
 * @default Removed after walking
 * @parent Text Options
 *
 * @param Damage Removal Text
 * @desc Text to describe state removal after damage property
 * @default Removed after damage
 * @parent Text Options
 *
 * @param Duration Text
 * @desc Text to describe state auto-removal duration
 * @default Duration
 * @parent Text Options
 *
 * @param Infinite Text
 * @desc Text to describe when state not automatically removed after some number of turns
 * @default Infinite
 * @parent Text Options
 *
 * @param Turns Text
 * @desc Text to describe turns in battle
 * @default Turns
 * @parent Text Options
 *
 * @param Seal Skill Types Text
 * @desc Text to describe trait that seals skill types
 * @default Locks
 * @parent Text Options
 *
 * @param Add Skill Types Text
 * @desc Text to describe trait that adds skill types
 * @default Unlocks
 * @parent Text Options
 *
 * @param Seal Skill Text
 * @desc Text to describe trait that seals skills
 * @default Locks
 * @parent Text Options
 *
 * @param Add Skill Text
 * @desc Text to describe trait that adds skills
 * @default Grants
 * @parent Text Options
 *
 * @param State Resist Text
 * @desc Text to describe trait that resists states
 * @default Resists
 * @parent Text Options
*/
/*~struct~Category:
 * @param Category Name
 * @type text
 * @desc Text to show for category name
 * 
 * @param Category Symbol
 * @type text
 * @desc Internal recognition of category, see documentation for help
 *
 * @param Category Display Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to show up in category window
 * 
 * @param Category Enable Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to be enabled and selectable
 */
 /*~struct~Requirements:
 * @param Item
 * @type item
 * 
 * @param Switch
 * @type switch
 */
  /*~struct~Custom:
 * @param Name
 * @type text
 * @desc The entry name.
 * 
 * @param Category Symbol
 * @type text
 * @desc Category this entry belongs to.
 *
 * @param Description
 * @type note
 * @desc Description to display for the entry.
 * 
 * @param Sketch
 * @dir img/
 * @type file
 * @desc image to show at bottom of entry.
 */
var Imported = Imported || {};
Imported.CGMV_Encyclopedia = true;
var CGMV = CGMV || {};
CGMV.Encyclopedia = CGMV.Encyclopedia || {};
CGMV.Encyclopedia.version = 1.8;
CGMV.Encyclopedia.parameters = PluginManager.parameters('CGMV_Encyclopedia');
CGMV.Encyclopedia.IncludeBestiary = (CGMV.Encyclopedia.parameters["Include Bestiary"] === "true") ? true : false;
CGMV.Encyclopedia.IncludeItems = (CGMV.Encyclopedia.parameters["Include Items"] === "true") ? true : false;
CGMV.Encyclopedia.IncludeArmors = (CGMV.Encyclopedia.parameters["Include Armors"] === "true") ? true : false;
CGMV.Encyclopedia.IncludeWeapons = (CGMV.Encyclopedia.parameters["Include Weapons"] === "true") ? true : false;
CGMV.Encyclopedia.IncludeSkills = (CGMV.Encyclopedia.parameters["Include Skills"] === "true") ? true : false;
CGMV.Encyclopedia.IncludeStates = (CGMV.Encyclopedia.parameters["Include States"] === "true") ? true : false;
CGMV.Encyclopedia.NumberEntries = (CGMV.Encyclopedia.parameters["Number Entries"] === "true") ? true : false;
CGMV.Encyclopedia.ShowDropChances = (CGMV.Encyclopedia.parameters["Show Drop Chances"] === "true") ? true : false;
CGMV.Encyclopedia.EncyclopediaWindowTitle = CGMV.Encyclopedia.parameters["Encyclopedia Scene Title"] || "Encyclopedia";
CGMV.Encyclopedia.UnknownEntry = CGMV.Encyclopedia.parameters["Unknown Entry"] || "? ? ? ? ?";
CGMV.Encyclopedia.UnknownEntryDisplay = CGMV.Encyclopedia.parameters["Unknown Entry Display"] || "This has not yet been discovered.";
CGMV.Encyclopedia.TotalText = CGMV.Encyclopedia.parameters["Total Window Text"] || "Total";
CGMV.Encyclopedia.PriceText = CGMV.Encyclopedia.parameters["Price Text"] || "Price";
CGMV.Encyclopedia.NoPriceText = CGMV.Encyclopedia.parameters["No Price Text"] || "Not for sale";
CGMV.Encyclopedia.KeyItemText = CGMV.Encyclopedia.parameters["Key Item Text"] || "Key Item";
CGMV.Encyclopedia.PossessionText = CGMV.Encyclopedia.parameters["Possession Text"] || "Possession";
CGMV.Encyclopedia.EquipTypeText = CGMV.Encyclopedia.parameters["Equip Type Text"] || "Equip Slot";
CGMV.Encyclopedia.ArmorTypeText = CGMV.Encyclopedia.parameters["Armor Type Text"] || "Armor Type";
CGMV.Encyclopedia.NoArmorTypeText = CGMV.Encyclopedia.parameters["No Armor Type Text"] || "None";
CGMV.Encyclopedia.WeaponTypeText = CGMV.Encyclopedia.parameters["Weapon Type Text"] || "Weapon Type";
CGMV.Encyclopedia.NoWeaponTypeText = CGMV.Encyclopedia.parameters["No Weapon Type Text"] || "None";
CGMV.Encyclopedia.SkillTypeText = CGMV.Encyclopedia.parameters["Skill Type Text"] || "Skill Type";
CGMV.Encyclopedia.NoSkillTypeText = CGMV.Encyclopedia.parameters["No Skill Type Text"] || "Basic";
CGMV.Encyclopedia.DropsText = CGMV.Encyclopedia.parameters["Drops Text"] || "Drops";
CGMV.Encyclopedia.DropChanceText = CGMV.Encyclopedia.parameters["Drop Chance Text"] || "Chance";
CGMV.Encyclopedia.SketchText = CGMV.Encyclopedia.parameters["Sketch Text"] || "Sketch";
CGMV.Encyclopedia.NoteText = CGMV.Encyclopedia.parameters["Note Text"] || "Note";
CGMV.Encyclopedia.SuccessRateText = CGMV.Encyclopedia.parameters["Success Rate Text"] || "Success Rate";
CGMV.Encyclopedia.ConsumableText = CGMV.Encyclopedia.parameters["Consumable Text"] || "Consumable";
CGMV.Encyclopedia.EffectsText = CGMV.Encyclopedia.parameters["Effects Text"] || "Effects";
CGMV.Encyclopedia.HPEffectText = CGMV.Encyclopedia.parameters["HP Effect Text"] || "HP Effect";
CGMV.Encyclopedia.MPEffectText = CGMV.Encyclopedia.parameters["MP Effect Text"] || "MP Effect";
CGMV.Encyclopedia.TPEffectText = CGMV.Encyclopedia.parameters["TP Effect Text"] || "TP Effect";
CGMV.Encyclopedia.AddStateText = CGMV.Encyclopedia.parameters["Add State Text"] || "Causes";
CGMV.Encyclopedia.RemoveStateText = CGMV.Encyclopedia.parameters["Remove State Text"] || "Cures";
CGMV.Encyclopedia.AddBuffText = CGMV.Encyclopedia.parameters["Add Buff Text"] || "Buffs";
CGMV.Encyclopedia.AddDebuffText = CGMV.Encyclopedia.parameters["Add Debuff Text"] || "Debuffs";
CGMV.Encyclopedia.BuffRemovalText = CGMV.Encyclopedia.parameters["Remove Buff Text"] || "Remove Buffs";
CGMV.Encyclopedia.DebuffRemovalText = CGMV.Encyclopedia.parameters["Remove Debuff Text"] || "Clear Debuffs";
CGMV.Encyclopedia.GrowText = CGMV.Encyclopedia.parameters["Grow Text"] || "Trains";
CGMV.Encyclopedia.LearnSkillText = CGMV.Encyclopedia.parameters["Learn Skill Text"] || "Teaches";
CGMV.Encyclopedia.PartyAbilityText = CGMV.Encyclopedia.parameters["Party Ability Text"] || "Special Effect";
CGMV.Encyclopedia.HalfEncounterText = CGMV.Encyclopedia.parameters["Half Encounter Text"] || "Half Encounter Rate";
CGMV.Encyclopedia.NoEncounterText = CGMV.Encyclopedia.parameters["No Encounter Text"] || "No Encounters";
CGMV.Encyclopedia.CancelSurpriseText = CGMV.Encyclopedia.parameters["Cancel Surprise Text"] || "Cancel Surprise";
CGMV.Encyclopedia.RaisePreemptiveText = CGMV.Encyclopedia.parameters["Raise Preemptive Text"] || "Raise Preemptive";
CGMV.Encyclopedia.GoldDoubleText = CGMV.Encyclopedia.parameters["Gold Double Text"] || "2x Gold Drops";
CGMV.Encyclopedia.DropItemDoubleText = CGMV.Encyclopedia.parameters["Drop item Double Text"] || "2x Item Drops";
CGMV.Encyclopedia.DescriptionText = CGMV.Encyclopedia.parameters["Description Text"] || "Description";
CGMV.Encyclopedia.ElementText = CGMV.Encyclopedia.parameters["Element Text"] || "Element";
CGMV.Encyclopedia.AttackSpeedText = CGMV.Encyclopedia.parameters["Attack Speed Text"] || "Speed Bonus";
CGMV.Encyclopedia.AttackTimesText = CGMV.Encyclopedia.parameters["Attack Times Text"] || "Additional Attacks";
CGMV.Encyclopedia.AttackStateText = CGMV.Encyclopedia.parameters["Attack State Text"] || "Applies";
CGMV.Encyclopedia.MPCostText = CGMV.Encyclopedia.parameters["MP Cost Text"] || "MP Cost";
CGMV.Encyclopedia.TPCostText = CGMV.Encyclopedia.parameters["TP Cost Text"] || "TP Cost";
CGMV.Encyclopedia.UserTPGainText = CGMV.Encyclopedia.parameters["User TP Gain Text"] || "User TP Gain";
CGMV.Encyclopedia.BattleRemovalText = CGMV.Encyclopedia.parameters["Battle Removal Text"] || "Removed after battle";
CGMV.Encyclopedia.WalkingRemovalText = CGMV.Encyclopedia.parameters["Walking Removal Text"] || "Removed after walking";
CGMV.Encyclopedia.DamageRemovalText = CGMV.Encyclopedia.parameters["Damage Removal Text"] || "Removed after damage";
CGMV.Encyclopedia.DurationText = CGMV.Encyclopedia.parameters["Duration Text"] || "Duration";
CGMV.Encyclopedia.InfiniteText = CGMV.Encyclopedia.parameters["Infinite Text"] || "Infinite";
CGMV.Encyclopedia.TurnsText = CGMV.Encyclopedia.parameters["Turns Text"] || "Turns";
CGMV.Encyclopedia.SealSkillTypesText = CGMV.Encyclopedia.parameters["Seal Skill Types Text"] || "Locks";
CGMV.Encyclopedia.AddSkillTypesText = CGMV.Encyclopedia.parameters["Add Skill Types Text"] || "Unlocks";
CGMV.Encyclopedia.SealSkillText = CGMV.Encyclopedia.parameters["Seal Skill Text"] || "Locks";
CGMV.Encyclopedia.AddSkillText = CGMV.Encyclopedia.parameters["Add Skill Text"] || "Grants";
CGMV.Encyclopedia.StateResistText = CGMV.Encyclopedia.parameters["State Resist Text"] || "Resists";
CGMV.Encyclopedia.YesText = CGMV.Encyclopedia.parameters["Yes Text"] || "Yes";
CGMV.Encyclopedia.NoText = CGMV.Encyclopedia.parameters["No Text"] || "No";
CGMV.Encyclopedia.DecimalSpots = Number(CGMV.Encyclopedia.parameters["Total Window Rounding"]) || 2;
CGMV.Encyclopedia.ScrollWait = Number(CGMV.Encyclopedia.parameters["Scroll Wait"]) || 300;
CGMV.Encyclopedia.ScrollSpeed = Number(CGMV.Encyclopedia.parameters["Scroll Speed"]) || 1;
CGMV.Encyclopedia.LargeIconMultiplier = parseFloat(CGMV.Encyclopedia.parameters["Large Icon Multiplier"]) || 3.0;
CGMV.Encyclopedia.Categories = JSON.parse(CGMV.Encyclopedia.parameters["Categories"]);
CGMV.Encyclopedia.CustomEntries = JSON.parse(CGMV.Encyclopedia.parameters["Custom Entries"]);
//=============================================================================
// CGMV_EncyclopediaData
//-----------------------------------------------------------------------------
// Class that stores the id and discovery of built-in encyclopedia classes
// such as enemies or items. Not for custom category data.
//=============================================================================
function CGMV_EncyclopediaData(id, index) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMV_EncyclopediaData.prototype.initialize = function(id, index) {
	this._id = id;
	this._index = index;
	this._discovered = false;
};
//=============================================================================
// CGMV_CustomEncyclopediaData
//-----------------------------------------------------------------------------
// Class that stores the data of custom entries in the encyclopedia
//=============================================================================
function CGMV_CustomEncyclopediaData(id, data) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMV_CustomEncyclopediaData.prototype.initialize = function(id, data) {
	this._id = id+1;
	this._index = id+1;
	this._discovered = false;
	this._name = data.Name;
	this._sketch = (data.Sketch == "") ? null : "img/" + data.Sketch;
	this._description = data.Description;
};
//=============================================================================
// CGMV_Encyclopedia
//-----------------------------------------------------------------------------
// Store and manage encyclopedia data.
//=============================================================================
function CGMV_Encyclopedia() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Encyclopedia
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.initialize = function() {
	this._bestiary = [];
	this._items = [];
	this._armors = [];
	this._weapons = [];
	this._skills = [];
	this._states = [];
	this.initializeData(this._bestiary, $dataEnemies.length-1, 'bestiary'); // -1 because $data are not
	this.initializeData(this._items, $dataItems.length-1, 'items');      // 0-indexed, but have null
	this.initializeData(this._armors, $dataArmors.length-1, 'armors');    // for first value instead
	this.initializeData(this._weapons, $dataWeapons.length-1, 'weapons');
	this.initializeData(this._skills, $dataSkills.length-1, 'skills');
	this.initializeData(this._states, $dataStates.length-1, 'states');
	this._totalDiscovered = 0;
	this._bestiaryDiscovered = 0;
	this._itemsDiscovered = 0;
	this._armorsDiscovered = 0;
	this._weaponsDiscovered = 0;
	this._skillsDiscovered = 0;
	this._statesDiscovered = 0;
	this._customData = {};
	this._customDiscovered = {};
	this.initializeCustomData();
	this._totalEntries = this.calculateTotalEntries();
};
//-----------------------------------------------------------------------------
// Initialize any encyclopedia data array to all undiscovered.
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.initializeData = function(array, length, symbol) {
	switch(symbol) {
		case 'bestiary':
			if(!CGMV.Encyclopedia.IncludeBestiary) return;
			var gameData = $dataEnemies;
			break;
		case 'items':
			if(!CGMV.Encyclopedia.IncludeItems) return;
			var gameData = $dataItems;
			break;
		case 'armors':
			if(!CGMV.Encyclopedia.IncludeArmors) return;
			var gameData = $dataArmors;
			break;
		case 'weapons':
			if(!CGMV.Encyclopedia.IncludeWeapons) return;
			var gameData = $dataWeapons;
			break;
		case 'skills':
			if(!CGMV.Encyclopedia.IncludeSkills) return;
			var gameData = $dataSkills;
			break;
		case 'states':
			if(!CGMV.Encyclopedia.IncludeStates) return;
			var gameData = $dataStates;
	}
	var index = 1;
	for(var i = 0; i < length; i++) {
		if(gameData[i+1] && gameData[i+1].meta && gameData[i+1].meta.cgmvencyclopediahide) continue;
		var data = new CGMV_EncyclopediaData(i+1, index); // i+1 because $data are not 0-indexed
		array.push(data);
		index++;
	}
};
//-----------------------------------------------------------------------------
// Initialize custom data
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.initializeCustomData = function() {
	var customData = CGMV.Encyclopedia.CustomEntries;
	for(var i = 0; i < customData.length; i++) {
		var data = JSON.parse(customData[i]);
		var symbol = data["Category Symbol"];
		if(!this._customData.hasOwnProperty(symbol)) {
			this._customData[symbol] = [];
			this._customDiscovered[symbol] = 0;
		}
		var obj = new CGMV_CustomEncyclopediaData(this._customData[symbol].length, data);
		this._customData[symbol].push(obj);
	}
};
//-----------------------------------------------------------------------------
// Calculate total amount of entries
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.calculateTotalEntries = function() {
	var total = 0;
	if(CGMV.Encyclopedia.IncludeBestiary) total += this._bestiary.length;
	if(CGMV.Encyclopedia.IncludeItems) total += this._items.length;
	if(CGMV.Encyclopedia.IncludeArmors) total += this._armors.length;
	if(CGMV.Encyclopedia.IncludeWeapons) total += this._weapons.length;
	if(CGMV.Encyclopedia.IncludeSkills) total += this._skills.length;
	if(CGMV.Encyclopedia.IncludeStates) total += this._states.length;
	if(this._customData) {
		var keyArray = Object.keys(this._customData);
		for(var i = 0; i < keyArray.length; i++) {
			total += this._customData[keyArray[i]].length;
		}
	}
	return total;
};
//-----------------------------------------------------------------------------
// Processing a (potential) new discovery
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.processDiscovery = function(symbol, id) {
	symbol = symbol.toLowerCase();
	var dataArray = this.getEncyclopediaData(symbol);
	if(dataArray.length < 1) return;
	var dataObject = this.getEncyclopediaObject(dataArray, Number(id));
	if(dataObject && !dataObject._discovered) { // Actually is new discovery
		this._totalDiscovered++;
		switch(symbol) {
			case 'bestiary':
				this._bestiaryDiscovered++;
				break;
			case 'items':
				this._itemsDiscovered++;
				break;
			case 'armors':
				this._armorsDiscovered++;
				break;
			case 'weapons':
				this._weaponsDiscovered++;
				break;
			case 'skills':
				this._skillsDiscovered++;
				break;
			case 'states':
				this._statesDiscovered++;
				break;
			default:
				this._customDiscovered[symbol]++;
		}
		dataObject._discovered = true;
		if(Imported.CGMV_Achievements && CGMV.Achievements.version > 1.1) $cgmv.checkAchievementEncyclopediaCriteria(); // 1.2 version when enc. ach added
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Object from Array
// Possible that arrays are not in order of the ID, in this case it will find proper ID.
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.getEncyclopediaObject = function(array, id) {
	if(array[id-1] && array[id-1]._id === id) return array[id-1];
	for(var i = 0; i < array.length; i++) {
		if(array[i]._id === id) return array[i];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.getAmountDiscovered = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalDiscovered;
		case 'bestiary': return this._bestiaryDiscovered;
		case 'items': return this._itemsDiscovered;
		case 'armors': return this._armorsDiscovered;
		case 'weapons': return this._weaponsDiscovered;
		case 'skills': return this._skillsDiscovered;
		case 'states': return this._statesDiscovered;
		default: return (this._customDiscovered[symbol] || this._customDiscovered[symbol] === 0) ? this._customDiscovered[symbol] : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.getAmountEntries = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalEntries;
		case 'bestiary': return this._bestiary.length;
		case 'items': return this._items.length;
		case 'armors': return this._armors.length;
		case 'weapons': return this._weapons.length;
		case 'skills': return this._skills.length;
		case 'states': return this._states.length;
		default: return (this._customData[symbol]) ? this._customData[symbol].length : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Data
// Returns data array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.getEncyclopediaData = function(symbol) {
	switch(symbol) {
		case 'bestiary': return this._bestiary;
		case 'items': return this._items;
		case 'armors': return this._armors;
		case 'weapons': return this._weapons;
		case 'skills': return this._skills;
		case 'states': return this._states;
		default: return (this._customData[symbol]) ? this._customData[symbol] : [];
	}
};
//-----------------------------------------------------------------------------
// Discover troop enemies
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.discoverTroop = function(troopId) {
	if(!CGMV.Encyclopedia.IncludeBestiary) return;
	var troop = $dataTroops[troopId];
	troop.members.forEach(function(member) {
		if ($dataEnemies[member.enemyId]) {
			this.processDiscovery('bestiary', member.enemyId);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Discover items, weapons, or armors
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.discoverItem = function(id, symbol) {
	if(symbol == "item") {
		if(!CGMV.Encyclopedia.IncludeItems) return;
		this.processDiscovery('items', id);
	}
	else if(symbol == "weapon") {
		if(!CGMV.Encyclopedia.IncludeWeapons) return;
		this.processDiscovery('weapons', id);
	}
	else if(symbol == "armor") {
		if(!CGMV.Encyclopedia.IncludeArmors) return;
		this.processDiscovery('armors', id);
	}
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.discoverSkill = function(id) {
	if(!CGMV.Encyclopedia.IncludeSkills) return;
	this.processDiscovery('skills', id);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMV_Encyclopedia.prototype.discoverState = function(id) {
	if(!CGMV.Encyclopedia.IncludeStates) return;
	this.processDiscovery('states', id);
};
//=============================================================================
// CGMV
//-----------------------------------------------------------------------------
// Manage encyclopedia data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize encyclopedia data
//-----------------------------------------------------------------------------
var alias_CGMV_Encyclopedia_createPluginData = CGMV_Core.prototype.createPluginData;
CGMV_Core.prototype.createPluginData = function() {
	alias_CGMV_Encyclopedia_createPluginData.call(this);
	this.initializeEncyclopediaData(false);
};
//-----------------------------------------------------------------------------
// Initialize encyclopedia data
//-----------------------------------------------------------------------------
CGMV_Core.prototype.initializeEncyclopediaData = function(reinitialize) {
	if(!this._encyclopedia || reinitialize) {
		this.setupEncyclopediaVariables();
	}
};
//-----------------------------------------------------------------------------
// Initialize encyclopedia variables
//-----------------------------------------------------------------------------
CGMV_Core.prototype.setupEncyclopediaVariables = function() {
	this._encyclopedia = new CGMV_Encyclopedia();
};
//-----------------------------------------------------------------------------
// Alias. Handles encyclopedia plugin commands
//-----------------------------------------------------------------------------
var alias_CGMV_Encyclopedia_pluginCommand = CGMV_Core.prototype.pluginCommand;
CGMV_Core.prototype.pluginCommand = function(command, args) {
	alias_CGMV_Encyclopedia_pluginCommand.call(this, command, args);
	if(command == "CGMVEncyclopedia") {
		if(args[0] == "Scene") {
			SceneManager.push(CGMV_Scene_Encyclopedia);
		}
		else if(args[0] == "Discover") {
			this.encyclopediaDiscovery(args[1], args[2]);
		}
		else if(args[0] == "Initialize") {
			this.initializeEncyclopediaData(true);
		}
	}
};
//-----------------------------------------------------------------------------
// Discover encyclopedia entry manually
//-----------------------------------------------------------------------------
CGMV_Core.prototype.encyclopediaDiscovery = function(symbol, id) {
	this._encyclopedia.processDiscovery(symbol, id);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaDiscovered = function(symbol) {
	return this._encyclopedia.getAmountDiscovered(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaEntries = function(symbol) {
	return this._encyclopedia.getAmountEntries(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Data Array
// Returns proper array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaData = function(symbol) {
	return this._encyclopedia.getEncyclopediaData(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Object
// Returns data object from array
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaObject = function(symbol, id) {
	var array = this._encyclopedia.getEncyclopediaData(symbol);
	return this._encyclopedia.getEncyclopediaObject(array, id);
};
//-----------------------------------------------------------------------------
// Discover enemies from a troop
//-----------------------------------------------------------------------------
CGMV_Core.prototype.EncyclopediaDiscoverTroop = function(troopId) {
	this._encyclopedia.discoverTroop(troopId);
};
//-----------------------------------------------------------------------------
// Discover items, weapons, and armors (symbol = "item", "weapon", "armor")
//-----------------------------------------------------------------------------
CGMV_Core.prototype.EncyclopediaDiscoverItem = function(id, symbol) {
	this._encyclopedia.discoverItem(id, symbol);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMV_Core.prototype.EncyclopediaDiscoverSkill = function(skillId) {
	this._encyclopedia.discoverSkill(skillId);
};
//-----------------------------------------------------------------------------
// Discover states
//-----------------------------------------------------------------------------
CGMV_Core.prototype.EncyclopediaDiscoverState = function(stateId) {
	this._encyclopedia.discoverState(stateId);
};
//-----------------------------------------------------------------------------
// Get total discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaTotalPercent = function() {
	var percentage = this._encyclopedia.getAmountDiscovered('total') / this._encyclopedia.getAmountEntries('total');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get bestiary discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaBestiaryPercent = function() {
	var percentage = this._encyclopedia.getAmountDiscovered('bestiary') / this._encyclopedia.getAmountEntries('bestiary');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get items discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaItemsPercent = function() {
	var percentage = this._encyclopedia.getAmountDiscovered('items') / this._encyclopedia.getAmountEntries('items');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get weapons discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaWeaponsPercent = function() {
	var percentage = this._encyclopedia.getAmountDiscovered('weapons') / this._encyclopedia.getAmountEntries('weapons');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get armors discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaArmorsPercent = function() {
	var percentage = this._encyclopedia.getAmountDiscovered('armors') / this._encyclopedia.getAmountEntries('armors');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get skills discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaSkillsPercent = function() {
	var percentage = this._encyclopedia.getAmountDiscovered('skills') / this._encyclopedia.getAmountEntries('skills');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get states discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaStatesPercent = function() {
	var percentage = this._encyclopedia.getAmountDiscovered('states') / this._encyclopedia.getAmountEntries('states');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get custom discovered %
//-----------------------------------------------------------------------------
CGMV_Core.prototype.getEncyclopediaCustomPercent = function(symbol) {
	var percentage = this._encyclopedia.getAmountDiscovered(symbol) / this._encyclopedia.getAmountEntries(symbol);
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMV.Encyclopedia.DecimalSpots));
};
//=============================================================================
// CGMV_Scene_Encyclopedia
//-----------------------------------------------------------------------------
// Handle the encyclopedia scene
//=============================================================================
function CGMV_Scene_Encyclopedia() {
    this.initialize.apply(this, arguments);
}
CGMV_Scene_Encyclopedia.prototype = Object.create(Scene_MenuBase.prototype);
CGMV_Scene_Encyclopedia.prototype.constructor = CGMV_Scene_Encyclopedia;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create encyclopedia windows
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createTitleWindow();
	this.createCategoryWindow();
	this.createTotalsWindow();
	this.createListWindow();
	this.createDummyWindow();
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create encyclopedia title window
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.createTitleWindow = function() {
    this._titleWindow = new CGMV_Window_Title(0, 0, CGMV.Encyclopedia.EncyclopediaWindowTitle);
	this._titleWindow.refresh();
    this.addWindow(this._titleWindow);
};
//-----------------------------------------------------------------------------
// Create encyclopedia category window
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.createCategoryWindow = function() {
    this._categoryWindow = new CGMV_Window_EncyclopediaCategory(0, this._titleWindow.height);
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Create Totals Window
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.createTotalsWindow = function() {
    this._totalsWindow = new CGMV_Window_EncyclopediaTotals(0, 0);
	this._categoryWindow.setTotalWindow(this._totalsWindow);
    this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Create List Window
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.createListWindow = function() {
	var width = Graphics.boxWidth/3;
	var height = Graphics.boxHeight - this._titleWindow.height - this._categoryWindow.height - this._totalsWindow.height;
	var y = this._titleWindow.height + this._categoryWindow.height;
    this._listWindow = new CGMV_Window_EncyclopediaList(0, y, width, height);
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._categoryWindow.setListWindow(this._listWindow);
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Create Dummy Window
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.createDummyWindow = function() {
    var x = this._listWindow.width;
	var y = this._titleWindow.height + this._categoryWindow.height;
	var width = Graphics.boxWidth*2/3
	var height = Graphics.boxHeight - this._titleWindow.height - this._categoryWindow.height;
    this._dummyWindow = new Window_Base(x, y, width, height);
    this.addWindow(this._dummyWindow);
};
//-----------------------------------------------------------------------------
// Create Display Window
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.createDisplayWindow = function() {
    var x = this._dummyWindow.x;
	var y = this._dummyWindow.y;
	var width = this._dummyWindow.width;
	var height = this._dummyWindow.height;
    this._displayWindow = new CGMV_Window_EncyclopediaDisplay(x, y, width, height);
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.hide();
	this._displayWindow.deactivate();
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// On category OK
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.onCategoryOk = function() {
	this._dummyWindow.hide();
	this._displayWindow.show();
    this._categoryWindow.deactivate();
	this._listWindow.activate();
	this._listWindow.select(0);
};
//-----------------------------------------------------------------------------
// On list cancel
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.onListCancel = function() {
	this._dummyWindow.show();
	this._displayWindow.hide();
    this._categoryWindow.activate();
	this._listWindow.deactivate();
	this._listWindow.deselect();
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On display cancel
//-----------------------------------------------------------------------------
CGMV_Scene_Encyclopedia.prototype.onDisplayCancel = function() {
    this._displayWindow.deactivate();
	this._listWindow.activate();
};
//=============================================================================
// CGMV_Window_EncyclopediaCategory
//-----------------------------------------------------------------------------
// Command window for choosing a category in the encyclopedia
//=============================================================================
function CGMV_Window_EncyclopediaCategory(x, y) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_EncyclopediaCategory.prototype = Object.create(Window_HorzCommand.prototype);
CGMV_Window_EncyclopediaCategory.prototype.constructor = CGMV_Window_EncyclopediaCategory;
//-----------------------------------------------------------------------------
// Window Width
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaCategory.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaCategory.prototype.makeCommandList = function() {
	for(var i = 0; i < CGMV.Encyclopedia.Categories.length; i++) {
		var categoryData = JSON.parse(CGMV.Encyclopedia.Categories[i]);
		if(this.canShowCommand(categoryData)) {
			var name = categoryData["Category Name"];
			var symbol = categoryData["Category Symbol"];
			this.addCommand(name, symbol, this.enableEncyclopediaCommand(categoryData));
		}
	}
};
//-----------------------------------------------------------------------------
// Can Show Category?
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaCategory.prototype.canShowCommand = function(categoryData) {
	if(categoryData["Category Symbol"] === "bestiary" && !CGMV.Encyclopedia.IncludeBestiary) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "items" && !CGMV.Encyclopedia.IncludeItems) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "armors" && !CGMV.Encyclopedia.IncludeArmors) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "weapons" && !CGMV.Encyclopedia.IncludeWeapons) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "skills" && !CGMV.Encyclopedia.IncludeSkills) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "states" && !CGMV.Encyclopedia.IncludeStates) {
		return false;
	}
	var showReqs = JSON.parse(categoryData["Category Display Requirements"]);
	var itemID = Number(showReqs["Item"]);
	var switchID = Number(showReqs["Switch"]);
	if(itemID > 0 && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID > 0 && $gameSwitches.value(switchID) != true) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Command Enabled?
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaCategory.prototype.enableEncyclopediaCommand = function(categoryData) {
	var enableReqs = JSON.parse(categoryData["Category Enable Requirements"]);
	var itemID = Number(enableReqs["Item"]);
	var switchID = Number(enableReqs["Switch"]);
	if(itemID > 0 && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID > 0 && $gameSwitches.value(switchID) != true) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Set total (helper) window
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaCategory.prototype.setTotalWindow = function(totalWindow) {
	this._totalWindow = totalWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaCategory.prototype.callUpdateHelp = function() {
	if(this.active) {
		this.updateHelperWindows();
	}
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaCategory.prototype.updateHelperWindows = function() {
	if(this._listWindow) {
		this._listWindow.setItem(this.currentData());
	}
	if(this._totalWindow) {
		this._totalWindow.setItem(this.currentData());
	}
};
//=============================================================================
// CGMV_Window_EncyclopediaTotals
//-----------------------------------------------------------------------------
// Shows completion % for encyclopedia
//=============================================================================
function CGMV_Window_EncyclopediaTotals(x, y) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_EncyclopediaTotals.prototype = Object.create(Window_Base.prototype);
CGMV_Window_EncyclopediaTotals.prototype.constructor = CGMV_Window_EncyclopediaTotals;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaTotals.prototype.initialize = function(x, y) {
	var width = Graphics.boxWidth/3; // 1/3 of the screen wide
	var height = this.fittingHeight(2); // 2 lines tall
	y = Graphics.boxHeight - height;
	this._symbol = null;
	this._name = null;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaTotals.prototype.setItem = function(data) {
	this._symbol = data.symbol;
	this._name =  data.name;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaTotals.prototype.refresh = function() {
	this.contents.clear();
	this.drawSpecificCompletion(this._symbol, this._name);
	this.drawTotalCompletion();
};
//-----------------------------------------------------------------------------
// Draw overall completion %
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaTotals.prototype.drawTotalCompletion = function() {
	var descriptor = CGMV.Encyclopedia.TotalText + ": ";
	var totalWidth = this.contents.width - this.textPadding()*2;
	var x = this.textWidth(descriptor);
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, this.lineHeight(), totalWidth, 'left');
	this.changeTextColor(this.normalColor());
	var totalDiscovered = $cgmv.getEncyclopediaDiscovered('total');
	var totalEntries = $cgmv.getEncyclopediaEntries('total');
	var completion = Number((totalDiscovered/totalEntries)*100).toFixed(CGMV.Encyclopedia.DecimalSpots);
	if(completion == 100) completion = 100;
	this.drawText(completion + "%", x, this.lineHeight(), totalWidth-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw specific category completion
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaTotals.prototype.drawSpecificCompletion = function(symbol, name) {
	var descriptor = name + ": ";
	var totalWidth = this.contents.width - this.textPadding()*2;
	var x = this.textWidth(descriptor);
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, 0, totalWidth*0.75, 'left');
	var discovered = $cgmv.getEncyclopediaDiscovered(symbol);
	var entries = $cgmv.getEncyclopediaEntries(symbol);
	var completion = Number((discovered/entries)*100).toFixed(CGMV.Encyclopedia.DecimalSpots);
	if(completion == 100) completion = 100;
	if(totalWidth-x > totalWidth*0.25) {
		width = totalWidth-x
	}
	else {
		width = totalWidth*0.25;
		x = totalWidth*0.75;
	}
	this.changeTextColor(this.normalColor());
	this.drawText(completion + "%", x, 0, width, 'left');
};
//=============================================================================
// CGMV_Window_EncyclopediaList
//-----------------------------------------------------------------------------
// Selectable window for choosing an entry in a list.
//=============================================================================
function CGMV_Window_EncyclopediaList(x, y, w, h) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_EncyclopediaList.prototype = Object.create(Window_Selectable.prototype);
CGMV_Window_EncyclopediaList.prototype.constructor = CGMV_Window_EncyclopediaList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.initialize = function(x, y, w, h) {
    Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	this._symbol = null;
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.setItem = function(data) {
	this._symbol = data.symbol;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.makeItemList = function() {
    this._data = $cgmv.getEncyclopediaData(this._symbol);
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
	var number = CGMV.Encyclopedia.NumberEntries ? item._index + ". " : "";
	var name = item._discovered ? this.getItemName(this._symbol, item._id) : CGMV.Encyclopedia.UnknownEntry;
    this.drawText(number + name, rect.x, rect.y, rect.width, 'left');
    this.changePaintOpacity(true);
};
//-----------------------------------------------------------------------------
// Determine if item is enabled
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.isEnabled = function(item) {
    return item._discovered;
};
//-----------------------------------------------------------------------------
// Get the name of the object
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.getItemName = function(symbol, id) {
    switch(symbol) {
		case 'bestiary': return $dataEnemies[id].name;
		case 'items': return $dataItems[id].name;
		case 'armors': return $dataArmors[id].name;
		case 'weapons': return $dataWeapons[id].name;
		case 'skills': return $dataSkills[id].name;
		case 'states': return $dataStates[id].name;
		default:
			var obj = $cgmv.getEncyclopediaObject(symbol, id);
			return (obj) ? obj._name : CGMV.Encyclopedia.UnknownEntry;
	}
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this.updateHelp();
	}
};
//-----------------------------------------------------------------------------
// Update display window
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaList.prototype.updateHelp = function() {
    this._displayWindow.setItem(this.item(), this._symbol);
};
//=============================================================================
// CGMV_Window_EncyclopediaDisplay
//-----------------------------------------------------------------------------
// Shows completion % for encyclopedia
//=============================================================================
function CGMV_Window_EncyclopediaDisplay(x, y, w, h) {
    this.initialize.apply(this, arguments);
}
CGMV_Window_EncyclopediaDisplay.prototype = Object.create(CGMV_Window_Scrollable.prototype);
CGMV_Window_EncyclopediaDisplay.prototype.constructor = CGMV_Window_EncyclopediaDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.initialize = function(x, y, w, h) {
	var heightMultiplier = 4; // maximum of 4 windows tall of data to scroll
    CGMV_Window_Scrollable.prototype.initialize.call(this, x, y, w, h, heightMultiplier, CGMV.Encyclopedia.ScrollWait, CGMV.Encyclopedia.ScrollSpeed);
	this._data = null;
	this._bitmap = null;
	this._bitmapNeedsDrawing = false;
	this._bitmapY = 0;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
	this._largeIconWidth = Window_Base._iconWidth*CGMV.Encyclopedia.LargeIconMultiplier;
	this._largeIconHeight = Window_Base._iconHeight*CGMV.Encyclopedia.LargeIconMultiplier;
	this.createContents();
};
//-----------------------------------------------------------------------------
// Add drawing of bitmap since not always loaded
// Also updates for scroll (if needed)
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.update = function() {
	CGMV_Window_Scrollable.prototype.update.call(this);
	if(this._bitmapNeedsDrawing && ImageManager.isReady()) {
		var pw = this._bitmap.width;
		var ph = this._bitmap.height;
		var sx = 0;
		var sy = 0;
		var dw = (this.contents.width < pw) ? this.contents.width : pw;
		var dh = (dw/pw)*ph;
		var x = this.contents.width/2-dw/2;
		this.contents.blt(this._bitmap, 0, 0, pw, ph, x, this._bitmapY, dw, dh);
		this._bitmapNeedsDrawing = false;
		this._neededHeight += dh;
		this.checkForScroll();
	}
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.setItem = function(item, symbol) {
	if(!item) return;
	this._data = item;
	this._symbol = symbol;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.refresh = function() {
	this.setupWindowForNewEntry();
	if(this._data) this.drawEncyclopediaEntry();
};
//-----------------------------------------------------------------------------
// Draw Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaEntry = function() {
	if(!this._data._discovered) {
		this.drawUnknownItem();
	}
	else {
		switch(this._symbol) {
			case 'bestiary': this.drawBestiary();
							 break;
			case 'items':	 this.drawItem();
							 break;
			case 'armors': 	 this.drawArmor();
							 break;
			case 'weapons':	 this.drawWeapon();
							 break;
			case 'skills': 	 this.drawSkill();
							 break;
			case 'states': 	 this.drawState();
							 break;
			default: 		 this.drawCustom();
		}
	}
	this._neededHeight += this.standardPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawUnknownItem = function() {
	this.drawText(CGMV.Encyclopedia.UnknownEntryDisplay, 0, 0, this.contents.width, 'center');
	this._neededHeight = this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Bestiary Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawBestiary = function() {
	var enemy = $dataEnemies[this._data._id];
	this.drawEncyclopediaName(enemy.name);
	this.drawEncyclopediaStats(enemy.params, this.lineHeight());
	this.drawEncyclopediaCenteredText(CGMV.Encyclopedia.DropsText, this.lineHeight()*5, true);
	this.drawEncyclopediaBestiaryRewards(enemy.exp, enemy.gold);
	var y = this.drawEncyclopediaBestiaryDrops(enemy.dropItems);
	y = this.drawEncyclopediaMeta(enemy.meta.cgmvdesc, y);
	y = this.drawEncyclopediaBestiarySketch(enemy.battlerHue, enemy.battlerName, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Item Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawItem = function() {
	var item = $dataItems[this._data._id];
	this.drawEncyclopediaName(item.name);
	this.drawEncyclopediaLargeIcon(item.iconIndex);
	this.drawEncyclopediaPrice(item.price);
	this.drawEncyclopediaKeyItem(item.itypeId);
	this.drawEncyclopediaPossession($gameParty.numItems(item));
	this.drawEncyclopediaSuccessRate(item.successRate);
	this.drawEncyclopediaConsumable(item.consumable);
	var y = this.drawUserTPGain(item.tpGain, this.lineHeight()*6);
	y = this.drawEncyclopediaEffects(item.effects, y);
	y = this.drawEncyclopediaDescription(item.description, y);
	y = this.drawEncyclopediaMeta(item.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Armor Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawArmor = function() {
	var armor = $dataArmors[this._data._id];
	this.drawEncyclopediaName(armor.name);
	this.drawEncyclopediaLargeIcon(armor.iconIndex);
	this.drawEncyclopediaPrice(armor.price);
	this.drawEncyclopediaType($dataSystem.equipTypes[armor.etypeId], 'equip', this.lineHeight()*2);
	this.drawEncyclopediaPossession($gameParty.numItems(armor));
	this.drawEncyclopediaType($dataSystem.armorTypes[armor.atypeId], 'armor', this.lineHeight()*4);
	this.drawEncyclopediaStats(armor.params, this.lineHeight()*5, true);
	var y = this.drawEncyclopediaTrait(armor.traits, this.lineHeight()*9);
	y = this.drawEncyclopediaDescription(armor.description, y);
	y = this.drawEncyclopediaMeta(armor.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Weapon Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawWeapon = function() {
	var weapon = $dataWeapons[this._data._id];
	this.drawEncyclopediaName(weapon.name);
	this.drawEncyclopediaLargeIcon(weapon.iconIndex);
	this.drawEncyclopediaPrice(weapon.price);
	this.drawEncyclopediaType($dataSystem.equipTypes[weapon.etypeId], 'equip', this.lineHeight()*2);
	this.drawEncyclopediaPossession($gameParty.numItems(weapon));
	this.drawEncyclopediaType($dataSystem.weaponTypes[weapon.wtypeId], 'weapon', this.lineHeight()*4);
	this.drawEncyclopediaStats(weapon.params, this.lineHeight()*5, true);
	var y = this.drawEncyclopediaTrait(weapon.traits, this.lineHeight()*9);
	y = this.drawEncyclopediaDescription(weapon.description, y);
	y = this.drawEncyclopediaMeta(weapon.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Skill Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawSkill = function() {
	var skill = $dataSkills[this._data._id];
	this.drawEncyclopediaName(skill.name);
	this.drawEncyclopediaLargeIcon(skill.iconIndex);
	this.drawEncyclopediaType($dataSystem.skillTypes[skill.stypeId], 'skill', this.lineHeight());
	this.drawSkillCosts(skill.mpCost, skill.tpCost);
	this.drawEncyclopediaSuccessRate(skill.successRate);
	var y = this.drawUserTPGain(skill.tpGain, this.lineHeight()*5);
	y = this.drawEncyclopediaEffects(skill.effects, y);
	y = this.drawEncyclopediaDescription(skill.description, y);
	y = this.drawEncyclopediaMeta(skill.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw State Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawState = function() {
	var state = $dataStates[this._data._id];
	this.drawEncyclopediaName(state.name);
	this.drawEncyclopediaLargeIcon(state.iconIndex);
	this.drawStateDuration(state.autoRemovalTiming, state.minTurns, state.maxTurns);
	this.drawStateRemoval(state.removeAtBattleEnd, CGMV.Encyclopedia.BattleRemovalText, this.lineHeight()*2);
	this.drawStateRemoval(state.removeByWalking, CGMV.Encyclopedia.WalkingRemovalText, this.lineHeight()*3);
	this.drawStateRemoval(state.removeByDamage, CGMV.Encyclopedia.DamageRemovalText, this.lineHeight()*4);
	var y = this.drawEncyclopediaTrait(state.traits, this.lineHeight()*5);
	y = this.drawEncyclopediaMeta(state.meta.cgmvdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Custom Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawCustom = function() {
	var item = this._data;
	this.drawEncyclopediaName(item._name);
	var y = this.drawCustomDescription(item._description);
	y = this.drawCustomBitmap(item._sketch, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Name - Always used for all categories
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaName = function(name) {
	this.contents.CGMVfontBold = true;
	this.drawText(name, 0, 0, this.contents.width, 'center');
	this.contents.CGMVfontBold = false;
};
//-----------------------------------------------------------------------------
// Draws Centered Text
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaCenteredText = function(txt, y, useColor) {
	useColor = useColor || false;
	if(useColor) this.changeTextColor(this.systemColor());
	this.drawText(txt, 0, y, this.contents.width, 'center');
	this.changeTextColor(this.normalColor());
};
//-----------------------------------------------------------------------------
// Draws a standard Encyclopedia line - used for all categories
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaStandardLine = function(descriptor1, descriptor2, x, y, width) {
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor1, x, y, width-x, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(this.normalColor());
	this.drawText(descriptor2, x, y, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draws text array with descriptor in first line.
// Makes sure to have enough space for each item.
// Returns y-value of line below lowest line drawn.
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawTextArray = function(y, descriptor, array, separator) {
	separator = separator || " ";
	var descriptor = descriptor + ": ";
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	var x = this.textWidth(descriptor);
	this.changeTextColor(this.normalColor());
	for(var i = 0; i < array.length; i++) {
		if(i == array.length - 1) separator = "";
		if(array[i].includes(" ")) {
			var xy = this.drawWords(y, x, array[i]);
			x = xy[0];
			y = xy[1];
			this.drawText(separator, x, y, this.contents.width, 'left');
			x += this.textWidth(separator);
		}
		else {
			var tempWidth = this.textWidth(array[i] + separator);
			console.log("Textwidth: " + array[i] + " " + tempWidth + " " + x + " " + this.contents.width);
			if(tempWidth + x > this.contents.width) {
				if(tempWidth <= this.contents.width) {
					y += this.lineHeight();
					x = 0;
				}
			}
			this.drawText(array[i] + separator, x, y, this.contents.width-x, 'left');
			x += tempWidth;
		}
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws words. Makes sure to have enough space for each word.
// Returns x-value past last word drawn and y-value of lowest line drawn.
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawWords = function(y, x, string) {
	var array = string.split(" ");
	var separator = " ";
	for(var i = 0; i < array.length; i++) {
		if(i == array.length - 1) separator = "";
		var tempWidth = this.textWidth(array[i] + separator);
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(array[i] + separator, x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return [x, y];
};
//-----------------------------------------------------------------------------
// Draw Items (skill, state, etc) - Draws skills with icon with enough space on line
// Returns y value below last line drawn
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawItemNames = function(descriptor, x, y, width, itemIds, symbol) {
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, x, y, width, 'left');
	this.changeTextColor(this.normalColor());
	x += this.textWidth(descriptor);
	for(var i = 0; i < itemIds.length; i++) {
		if(symbol == 'skill') var item = $dataSkills[itemIds[i]];
		else if(symbol == 'state') var item = $dataStates[itemIds[i]];
		var widthNeeded = this.textWidth(item.name) + Window_Base._iconWidth + 4;
		if(itemIds.length > i+1) widthNeeded += this.textWidth(", ");
		if(widthNeeded + x > width) {
			y += this.lineHeight();
			x = 0;
		}
		this.drawItemName(item, x, y, width)
		x += widthNeeded;
		if(itemIds.length > i+1) this.drawText(", ", x-this.textWidth(", "), y, width, 'left');
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Large icon - Always used for item, armor, weapon, skill, state.
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaLargeIcon = function(iconIndex) {
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
//-----------------------------------------------------------------------------
// Draw Price - Always used for item, armor, weapon
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaPrice = function(price) {
	var y = this.lineHeight();
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Encyclopedia.PriceText + ": ";
	var currencyUnit = (TextManager.currencyUnit.charAt(0) === " ") ? TextManager.currencyUnit : " " + TextManager.currencyUnit;
	var descriptor2 = (price == 0) ? CGMV.Encyclopedia.NoPriceText : $cgmvTemp.numberSplit(price) + currencyUnit;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Key item - Always used for item
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaKeyItem = function(itype) {
	var y = this.lineHeight()*2;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Encyclopedia.KeyItemText + ": ";
	var descriptor2 = (itype == 2) ? CGMV.Encyclopedia.YesText : CGMV.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Type - Always used for armor, weapon, skill
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaType = function(typeName, typeSymbol, y) {
	switch(typeSymbol) {
		case 'equip':
			var descriptor1 = CGMV.Encyclopedia.EquipTypeText + ": ";
			break;
		case 'armor':
			var descriptor1 = CGMV.Encyclopedia.ArmorTypeText + ": ";
			if(typeName === "") typeName = CGMV.Encyclopedia.NoArmorTypeText;
			break;
		case 'weapon':
			var descriptor1 = CGMV.Encyclopedia.WeaponTypeText + ": ";
			if(typeName === "") typeName = CGMV.Encyclopedia.NoWeaponTypeText;
			break;
		case 'skill':
			var descriptor1 = CGMV.Encyclopedia.SkillTypeText + ": ";
			if(typeName === "") typeName = CGMV.Encyclopedia.NoSkillTypeText;
	}
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor2 = typeName;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Possession - Always used for item
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaPossession = function(amount) {
	var y = this.lineHeight()*3;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Encyclopedia.PossessionText + ": ";
	var descriptor2 = $cgmvTemp.numberSplit(amount);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Stats - Always used by armors and bestiary
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaStats = function(params, yStart, useSign) {
	useSign = useSign || false;
	var sign = "";
	var width = this.contents.width/2; // 2 column display
	for(var i = 0; i < 8; i++) {
		var y = this.lineHeight()*(Math.trunc(i/2));
		var x = (i%2 == 0) ? 0 : width;
		var descriptor1 = TextManager.param(i) + ": ";
		var descriptor2 = $cgmvTemp.numberSplit(params[i]);
		sign = (useSign && params[i] > 0) ? "+" : "";
		this.drawEncyclopediaStandardLine(descriptor1, sign + descriptor2, x, yStart + y, width*(1+i%2));
	}
};
//-----------------------------------------------------------------------------
// Draw exp and gold of an enemy - Always used by the Bestiary
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiaryRewards = function(exp, gold) {
	var y = this.lineHeight()*6;
	var x = 0;
	var descriptor1 = TextManager.basic(8) + ": "; // full EXP string (not abbr)
	var descriptor2 = $cgmvTemp.numberSplit(exp);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
	y += this.lineHeight();
	var currencyUnit = (TextManager.currencyUnit.charAt(0) === " ") ? TextManager.currencyUnit.substring(1) : TextManager.currencyUnit;
	descriptor1 = currencyUnit + ": ";
	descriptor2 = $cgmvTemp.numberSplit(gold);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw dropped items of an enemy - Always used by Bestiary
// Returns y-value of line past last drop.
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiaryDrops = function(drops) {
	var width = this.contents.width/2;
	var y = this.lineHeight()*8;
	for(var i =0; i < drops.length; i++) {
		if(drops[i].kind == 0) continue;
		switch(drops[i].kind) {
			case 1: var drop = $dataItems[drops[i].dataId];
				    break;
			case 2: var drop = $dataWeapons[drops[i].dataId];
				    break;
			case 3: var drop = $dataArmors[drops[i].dataId];
		}
		var x = 0;
		this.drawItemName(drop, x, y, width);
		if(CGMV.Encyclopedia.ShowDropChances) {
			x = width;
			var descriptor = CGMV.Encyclopedia.DropChanceText + ": ";
			this.changeTextColor(this.systemColor());
			this.drawText(descriptor, x, y, this.contents.width-x, 'left');
			this.changeTextColor(this.normalColor());
			x += this.textWidth(descriptor);
			descriptor = ((1/drops[i].denominator)*100).toFixed(2) + "%";
			this.drawText(descriptor, x, y, this.contents.width, 'left');
		}
		y += this.lineHeight();
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw dropped items of an enemy - Always used by Bestiary
// Returns y-value of line past last drop.
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiarySketch = function(battlerHue, battlerName, y) {
	var descriptor = CGMV.Encyclopedia.SketchText + ": ";
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	this.changeTextColor(this.normalColor());
	y += this.lineHeight();
	if ($gameSystem.isSideView()) {
		this._bitmap = ImageManager.loadSvEnemy(battlerName, battlerHue);
	} else {
		this._bitmap = ImageManager.loadEnemy(battlerName, battlerHue);
	}
	this._bitmapY = y;
	this._bitmapNeedsDrawing = true;
	return y;
};
//-----------------------------------------------------------------------------
// Draws meta note if applicable. Returns y-value past last line.
// <cgmvdesc:Description Here>
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaMeta = function(meta, y) {
	if(!meta) return y;
	var txtArray = meta.split(" ");
	return this.drawTextArray(y, CGMV.Encyclopedia.NoteText, txtArray);
};
//-----------------------------------------------------------------------------
// Draws description if applicable. Returns y-value past last line.
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaDescription = function(description, y) {
	if(description === "") return y;
	var desc2 = description.split("\n");
	var txtArray = [];
	for(var i = 0; i < desc2.length; i++) {
		var temp = desc2[i].split(" ");
		for(var j = 0; j < temp.length; j++) {
			txtArray.push(temp[j]);
		}
	}
	return this.drawTextArray(y, CGMV.Encyclopedia.DescriptionText, txtArray);
};
//-----------------------------------------------------------------------------
// Draws success rate of an item - used for item entries
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaSuccessRate = function(rate) {
	var y = this.lineHeight()*4;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Encyclopedia.SuccessRateText + ": ";
	var descriptor2 = rate + "%";
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws whether item is consumed on use - used for item entries
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaConsumable = function(consumable) {
	var y = this.lineHeight()*5;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Encyclopedia.ConsumableText + ": ";
	var descriptor2 = consumable ? CGMV.Encyclopedia.YesText : CGMV.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws item effects as needed - used for item entries
// Returns y value after drawing the last effect
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaEffects = function(effects, y) {
	if(effects.length < 1) return this.lineHeight()*6;
	var tracker = {"HPv1": 0, "HPv2": 0, "MPv1": 0, "MPv2": 0, "TP": 0, "ADDSTATE": [], "REMOVESTATE": [], "BUFFS": [], "DEBUFFS": [],
				   "REMOVEDBUFFS": [], "REMOVEDDEBUFFS": [], "GROW": [], "LEARNS": []};
	for(var i = 0; i < effects.length; i++) {
		if(effects[i].code == 11) { // HP effect
			tracker.HPv1 += effects[i].value1*100;
			tracker.HPv2 += effects[i].value2;
		}
		else if(effects[i].code == 12) { // MP effect
			tracker.MPv1 += effects[i].value1*100;
			tracker.MPv2 += effects[i].value2;
		}
		else if(effects[i].code == 13) { // TP effect
			tracker.TP += effects[i].value1;
		}
		else if(effects[i].code == 21) { // Add State effect
			if(effects[i].dataId != 0) {
				tracker.ADDSTATE.push(effects[i].dataId);
			}
		}
		else if(effects[i].code == 22) { // Remove State effect
			if(effects[i].dataId != 0) {
				tracker.REMOVESTATE.push(effects[i].dataId);
			}
		}
		else if(effects[i].code == 31) { // Add buff effect
			tracker.BUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 32) { // Add debuff effect
			tracker.DEBUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 33) { // Remove buff effect
			tracker.REMOVEDBUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 34) { // Remove debuff effect
			tracker.REMOVEDDEBUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 42) { // Grow effect
			tracker.GROW.push(effects[i].dataId);
		}
		else if(effects[i].code == 43) { // Learn Skill effect
			tracker.LEARNS.push(effects[i].dataId);
		}
	}
	if(!(tracker.HPv1 != 0 || tracker.HPv2 != 0 || tracker.MPv1 != 0 || tracker.MPv2 != 0 || tracker.TP != 0 || 
	   tracker.ADDSTATE.length > 0 || tracker.REMOVESTATE.length > 0 || tracker.BUFFS.length > 0 || tracker.DEBUFFS.length > 0 || 
	   tracker.REMOVEDBUFFS.length > 0 || tracker.REMOVEDDEBUFFS.length > 0 || tracker.GROW.length > 0 || tracker.LEARNS.length > 0)) {
			return this.lineHeight()*6;
	}
	this.drawEncyclopediaCenteredText(CGMV.Encyclopedia.EffectsText, y, true);
	y += this.lineHeight();
	var x = 0;
	var width = this.contents.width;
	var descriptor1 = "";
	var descriptor2 = "";
	if(tracker.HPv1 != 0 || tracker.HPv2 != 0) {
		descriptor1 = CGMV.Encyclopedia.HPEffectText + ": ";
		if(tracker.HPv1 > 100) tracker.HPv1 = 100;
		if(tracker.HPv1 < -100) tracker.HPv1 = -100;
		if(tracker.HPv1 != 0 && tracker.HPv2 != 0) {
			var sign = (tracker.HPv2 > 0) ? "+ " : "- ";
			descriptor2 = tracker.HPv1 + "% " + sign + $cgmvTemp.numberSplit(Math.abs(tracker.HPv2));
		}
		else if(tracker.HPv1 != 0) {
			descriptor2 = tracker.HPv1 + "%";
			if(tracker.HPv1 > 0) descriptor2 = "+" + descriptor2;
		}
		else {
			descriptor2 = $cgmvTemp.numberSplit(tracker.HPv2);
			if(tracker.HPv2 > 0) descriptor2 = "+" + descriptor2;
		}
		this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.MPv1 != 0 || tracker.MPv2 != 0) {
		descriptor1 = CGMV.Encyclopedia.MPEffectText + ": ";
		if(tracker.MPv1 > 100) tracker.MPv1 = 100;
		if(tracker.MPv1 < -100) tracker.MPv1 = -100;
		if(tracker.MPv1 != 0 && tracker.MPv2 != 0) {
			var sign = (tracker.MPv2 > 0) ? "+ " : "- ";
			descriptor2 = tracker.MPv1 + "% " + sign + $cgmvTemp.numberSplit(Math.abs(tracker.MPv2));
		}
		else if(tracker.MPv1 != 0) {
			descriptor2 = tracker.MPv1 + "%";
			if(tracker.MPv1 > 0) descriptor2 = "+" + descriptor2;
		}
		else {
			descriptor2 = $cgmvTemp.numberSplit(tracker.MPv2);
			if(tracker.MPv2 > 0) descriptor2 = "+" + descriptor2;
		}
		this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.TP != 0) {
		descriptor1 = CGMV.Encyclopedia.TPEffectText + ": ";
		descriptor2 = $cgmvTemp.numberSplit(tracker.TP);
		if(tracker.TP > 0) descriptor2 = "+" + descriptor2;
		this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.ADDSTATE.length > 0) {
		y = this.drawItemNames(CGMV.Encyclopedia.AddStateText + ": ", x, y, width, tracker.ADDSTATE, 'state');
	}
	if(tracker.REMOVESTATE.length > 0) {
		y = this.drawItemNames(CGMV.Encyclopedia.RemoveStateText + ": ", x, y, width, tracker.REMOVESTATE, 'state');
	}
	if(tracker.BUFFS.length > 0) {
		y = this.drawBuffParameters(CGMV.Encyclopedia.AddBuffText + ": ", x, y, width, tracker.BUFFS);
	}
	if(tracker.DEBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMV.Encyclopedia.AddDebuffText + ": ", x, y, width, tracker.DEBUFFS);
	}
	if(tracker.REMOVEDBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMV.Encyclopedia.BuffRemovalText + ": ", x, y, width, tracker.REMOVEDBUFFS);
	}
	if(tracker.REMOVEDDEBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMV.Encyclopedia.DebuffRemovalText + ": ", x, y, width, tracker.REMOVEDDEBUFFS);
	}
	if(tracker.GROW.length > 0) {
		y = this.drawBuffParameters(CGMV.Encyclopedia.GrowText + ": ", x, y, width, tracker.GROW);
	}
	if(tracker.LEARNS.length > 0) {
		y = this.drawItemNames(CGMV.Encyclopedia.LearnSkillText + ": ", x, y, width, tracker.LEARNS, 'skill');
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw Buff Parameters - Draws buffs/debuffs with enough space on line
// Returns y value below last line drawn
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawBuffParameters = function(descriptor, x, y, width, buffArray) {
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, x, y, width, 'left');
	this.changeTextColor(this.normalColor());
	x += this.textWidth(descriptor);
	for(var i = 0; i < buffArray.length; i++) {
		var txt = TextManager.param(buffArray[i]);
		if(buffArray.length > i+1) txt += ", ";
		if(this.textWidth(txt) + x > width) {
			y += this.lineHeight();
			x = 0;
		}
		this.drawText(txt, x, y, width, 'left');
		x += this.textWidth(txt);
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Trait - draws a trait such as attack element or party ability
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawEncyclopediaTrait = function(traits, y) {
	if(traits.length < 1) return y;
	var tracker = {"ATKSPEED": 0, "ATKTIMES": 0, "ATKELEMENT": [], "ATKSTATES": [], "PARTYABILITY": [],
				   "ADDSKILLTYPES": [], "SEALSKILLTYPES": [], "ADDSKILLS": [], "SEALSKILLS": [], "STATERESIST": []}
	for(var i = 0; i < traits.length; i++) {
		if(traits[i].code == 31) { // Attack Element
			tracker.ATKELEMENT.push($dataSystem["elements"][traits[i].dataId]);
		}
		else if(traits[i].code == 32) { // Attack State
			tracker.ATKSTATES.push(traits[i].dataId);
		}
		else if(traits[i].code == 33) { // Attack Speed
			tracker.ATKSPEED += traits[i].value;
		}
		else if(traits[i].code == 34) { // Attack Times
			tracker.ATKTIMES += traits[i].value;
		}
		else if(traits[i].code == 41) { // Add Skill Type
			tracker.ADDSKILLTYPES.push($dataSystem.skillTypes[traits[i].dataId]);
		}
		else if(traits[i].code == 42) { // Seal Skill Type
			tracker.SEALSKILLTYPES.push($dataSystem.skillTypes[traits[i].dataId]);
		}
		else if(traits[i].code == 43) { // Add Skill
			tracker.ADDSKILLS.push(traits[i].dataId);
		}
		else if(traits[i].code == 44) { // Seal Skill
			tracker.SEALSKILLS.push(traits[i].dataId);
		}
		else if(traits[i].code == 14) { // State Resist
			tracker.STATERESIST.push(traits[i].dataId);
		}
		else if(traits[i].code == 64) { // party ability
			switch(traits[i].dataId) {
				case 0: tracker.PARTYABILITY.push(CGMV.Encyclopedia.HalfEncounterText);
						break;
				case 1: tracker.PARTYABILITY.push(CGMV.Encyclopedia.NoEncounterText);
						break;
				case 2: tracker.PARTYABILITY.push(CGMV.Encyclopedia.CancelSurpriseText);
						break;
				case 3: tracker.PARTYABILITY.push(CGMV.Encyclopedia.RaisePreemptiveText);
						break;
				case 4: tracker.PARTYABILITY.push(CGMV.Encyclopedia.GoldDoubleText);
						break;
				case 5: tracker.PARTYABILITY.push(CGMV.Encyclopedia.DropItemDoubleText);
			}
		}
	}
	if(!(tracker.ATKSPEED != 0 || tracker.ATKTIMES != 0 || tracker.ATKELEMENT.length > 0 || tracker.ATKSTATES.length > 0 ||
	     tracker.PARTYABILITY.length > 0 || tracker.ADDSKILLTYPES.length > 0 || tracker.SEALSKILLTYPES.length > 0 || 
		 tracker.ADDSKILLS.length > 0 || tracker.SEALSKILLS.length > 0 || tracker.STATERESIST.length > 0)) {
		return y;
	}
	if(tracker.ATKSPEED != 0) {
		this.drawEncyclopediaStandardLine(CGMV.Encyclopedia.AttackSpeedText + ": ", tracker.ATKSPEED, 0, y, this.contents.width);
		y += this.lineHeight();
	}
	if(tracker.ATKTIMES != 0) {
		this.drawEncyclopediaStandardLine(CGMV.Encyclopedia.AttackTimesText + ": ", tracker.ATKTIMES, 0, y, this.contents.width);
		y += this.lineHeight();
	}
	if(tracker.ATKELEMENT.length > 0) {
		y = this.drawTextArray(y, CGMV.Encyclopedia.ElementText, tracker.ATKELEMENT, ", ");
	}
	if(tracker.ATKSTATES.length > 0) {
		y = this.drawItemNames(CGMV.Encyclopedia.AttackStateText + ": ", 0, y, this.contents.width, tracker.ATKSTATES, 'state');
	}
	if(tracker.PARTYABILITY.length > 0) {
		y = this.drawTextArray(y, CGMV.Encyclopedia.PartyAbilityText, tracker.PARTYABILITY, ", ");
	}
	if(tracker.SEALSKILLTYPES.length > 0) {
		y = this.drawTextArray(y, CGMV.Encyclopedia.SealSkillTypesText, tracker.SEALSKILLTYPES, ", ");
	}
	if(tracker.ADDSKILLTYPES.length > 0) {
		y = this.drawTextArray(y, CGMV.Encyclopedia.AddSkillTypesText, tracker.ADDSKILLTYPES, ", ");
	}
	if(tracker.ADDSKILLS.length > 0) {
		y = this.drawItemNames(CGMV.Encyclopedia.AddSkillText + ": ", 0, y, this.contents.width, tracker.ADDSKILLS, 'skill');
	}
	if(tracker.SEALSKILLS.length > 0) {
		y = this.drawItemNames(CGMV.Encyclopedia.SealSkillText + ": ", 0, y, this.contents.width, tracker.SEALSKILLS, 'skill');
	}
	if(tracker.STATERESIST.length > 0) {
		y = this.drawItemNames(CGMV.Encyclopedia.StateResistText + ": ", 0, y, this.contents.width, tracker.STATERESIST, 'state');
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draws skill tp and mp costs - used for skill entries
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawSkillCosts = function(mpCost, tpCost) {
	var y = this.lineHeight()*2;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Encyclopedia.MPCostText + ": ";
	var descriptor3 = CGMV.Encyclopedia.TPCostText + ": ";
	var descriptor2 = $cgmvTemp.numberSplit(mpCost);
	var descriptor4 = $cgmvTemp.numberSplit(tpCost);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
	y += this.lineHeight();
	x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	this.drawEncyclopediaStandardLine(descriptor3, descriptor4, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws skill tp and mp costs - used for skill/item entries
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawUserTPGain = function(tpGain, y) {
	if(tpGain == 0) return y;
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Encyclopedia.UserTPGainText + ": ";
	var descriptor2 = $cgmvTemp.numberSplit(tpGain);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
	y += this.lineHeight();
	return y;
};
//-----------------------------------------------------------------------------
// Draw generic state removal - Always used state entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawStateRemoval = function(removed, descriptor, y) {
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = descriptor + ": ";
	var descriptor2 = (removed) ? CGMV.Encyclopedia.YesText : CGMV.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw auto removal - Always used state entry
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawStateDuration = function(auto, min, max) {
	var y = this.lineHeight();
	var x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + this.standardPadding() : 0;
	var descriptor1 = CGMV.Encyclopedia.DurationText + ": ";
	if(auto) {
		var descriptor2 = (min == max) ? min + " " + CGMV.Encyclopedia.TurnsText : min + " - " + max + " " + CGMV.Encyclopedia.TurnsText;
	}
	else {
		var descriptor2 =  CGMV.Encyclopedia.InfiniteText;
	}
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws custom description. Some additional parsing required.
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawCustomDescription = function(description) {
	var y = this.lineHeight();
	var descriptor = CGMV.Encyclopedia.DescriptionText + ": ";
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	this.changeTextColor(this.normalColor());
	var x = this.textWidth(descriptor);
	description = description.substring(1, description.length-1);
	description = description.replace(/\\n/g, " \\n ");
	description = description.replace(/  \\n/g, " \\n");
	var array = description.split(" ");
	var separator = " ";
	for(var i = 0; i < array.length; i++) {
		if(i == array.length - 1) separator = "";
		var tempWidth = this.textWidth(array[i] + separator);
		if(array[i] == "\\n") {
			x = 0;
			y += this.lineHeight();
			continue;
		}
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(array[i] + separator, x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws custom sketch. Does not actually draw the bitmap (image not loaded yet),
// but queues image up to be loaded.
//-----------------------------------------------------------------------------
CGMV_Window_EncyclopediaDisplay.prototype.drawCustomBitmap = function(bitmap, y) {
	if(!bitmap) return y;
	var descriptor = CGMV.Encyclopedia.SketchText + ": ";
	this.changeTextColor(this.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	this.changeTextColor(this.normalColor());
	y += this.lineHeight();
	var split = bitmap.split("/");
	var folder = split[0] + "/" + split[1] + "/";
	var filename = split[2];
	this._bitmap = ImageManager.loadBitmap(folder, filename, 0, true);
	this._bitmapY = y;
	this._bitmapNeedsDrawing = true;
	return y;
};
//=============================================================================
// BattleManager
//-----------------------------------------------------------------------------
// Discover enemies automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover the enemies when battle starts
//-----------------------------------------------------------------------------
var alias_CGMV_Encyclopedia_BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    alias_CGMV_Encyclopedia_BattleManager_setup.call(this, troopId, canEscape, canLose);
	$cgmv.EncyclopediaDiscoverTroop(troopId);
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Discover items, weapons, armors automatically.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover items, weapons, armors when party gains them.
//-----------------------------------------------------------------------------
var alias_CGMV_Encyclopedia_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	alias_CGMV_Encyclopedia_GameParty_gainItem.call(this, item, amount, includeEquip);
    if (DataManager.isItem(item)) {
        $cgmv.EncyclopediaDiscoverItem(item.id, "item");
    } else if (DataManager.isWeapon(item)) {
        $cgmv.EncyclopediaDiscoverItem(item.id, "weapon");
    } else if (DataManager.isArmor(item)) {
        $cgmv.EncyclopediaDiscoverItem(item.id, "armor");
    }
};
//=============================================================================
// Game_Actor
//-----------------------------------------------------------------------------
// Discover skills automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover skills when actor learns skill.
//-----------------------------------------------------------------------------
var alias_CGMV_Encyclopedia_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    alias_CGMV_Encyclopedia_GameActor_learnSkill.call(this, skillId);
	$cgmv.EncyclopediaDiscoverSkill(skillId);
};
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Discover states automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover state when actor or enemy afflicted with one
//-----------------------------------------------------------------------------
var alias_CGMV_Encyclopedia_GameBattler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
	alias_CGMV_Encyclopedia_GameBattler_addState.call(this, stateId);
    if (this.isStateAddable(stateId)) {
        $cgmv.EncyclopediaDiscoverState(stateId);
    }
};