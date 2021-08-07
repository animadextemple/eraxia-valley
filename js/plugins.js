// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"SRD_SuperToolsEngine","status":true,"description":"The heart of all maker-style plugins; it adds a playtesting editor that can be opened with F12.","parameters":{"Connect Editor":"true","Auto Open Window":"false","Auto Move Window":"true","Menu Editor Exempt List":"[\"Window_BattleLog\",\"Window_MapName\"]"}},
{"name":"Community_Basic","status":true,"description":"Plugin used to set basic parameters.","parameters":{"cacheLimit":"20","screenWidth":"816","screenHeight":"624","changeWindowWidthTo":"","changeWindowHeightTo":"","renderingMode":"auto","alwaysDash":"off"}},
{"name":"AltMenuScreen","status":false,"description":"Alternative menu screen layout.","parameters":{}},
{"name":"AltSaveScreen","status":true,"description":"Alternative save/load screen layout.","parameters":{}},
{"name":"WeaponSkill","status":true,"description":"Change skill id of attack for each weapon.","parameters":{}},
{"name":"MrTS_BattleCharacterLimit","status":true,"description":"Changes character placement for battles.","parameters":{"Max Characters":"8","Characters Per Row":"4","Offset":"120","Vertical Offset":"260","Lower Index":"48","Forward Offset":"100","Row Spacing":"100","Vertical Chara Spacing":"54"}},
{"name":"CGMV_SplashScreen","status":true,"description":"CGMV Splash Screen","parameters":{"Display Time":"360","Fade Speed":"2","Splashes":"[\"{\\\"Image\\\":\\\"system/MadeWithMv\\\",\\\"Sound Effect\\\":\\\"\\\",\\\"Sound Delay\\\":\\\"0\\\"}\",\"{\\\"Image\\\":\\\"system/Animadex_Temple\\\",\\\"Sound Effect\\\":\\\"\\\",\\\"Sound Delay\\\":\\\"0\\\"}\",\"{\\\"Image\\\":\\\"system/Eraxia_Valley\\\",\\\"Sound Effect\\\":\\\"\\\",\\\"Sound Delay\\\":\\\"0\\\"}\"]"}},
{"name":"CGMV_Core","status":true,"description":"Core CGMV Script.","parameters":{}},
{"name":"CGMV_MessageSystem","status":true,"description":"Adds additional message functionality.","parameters":{}},
{"name":"CGMV_Toast","status":true,"description":"CGMV Toast Script","parameters":{"Max Window Count":"3","Spacing":"36","Width":"360","Fixed Width":"false","Display Time":"300"}},
{"name":"CGMV_GameInfo","status":true,"description":"CGMV Game Info","parameters":{"Left Text":"Beta - Version 0.4.0","Center Text":"Eraxia Valley - RPG","Right Text":"Animadex Temple","Font Size":"15"}},
{"name":"CGMV_GameOver","status":true,"description":"CGMV GameOver","parameters":{"Custom Images and Music Options":"","GameOver Image Variable":"1","GameOver Music Variable":"2","Images":"[]","Music":"[]","Command Window Options":"","Show Command Window":"true","Command Continue":"Continuer","Command Title":"Retour à l'écran Titre"}},
{"name":"Galv_QuestLog","status":true,"description":"(v.1.3) A system to track quests/sidequests in your RPG.","parameters":{"File":"Quests","Folder":"data","Separator Character":",","- OPTIONS -":"","Font Size":"22","Categories":"Quêtes Principales|#41D2E5,Quêtes Personnages|#EDE83B,Quêtes Évènements|#E11D7D","-- ICONS --":"","Not Complete Icon":"163","Complete Icon":"164","Failed Icon":"162","Tracked Quest Icon":"88","-- VOCAB --":"","Quest Command":"Quêtes","Active Cmd Txt":"Activées","Completed Cmd Txt":"Terminées","Failed Cmd Txt":"Ratées","Desc Txt":"Details","Objectives Txt":"Objectifs","Difficulty Txt":"Niveau","No Tracked Quest":"Aucune quête séléctionner.","-- EXTRA --":"","Pop XY":"20,20","Pop Time":"130","Pop New Quest":"Nouvelle Quête :","Pop Complete Quest":"Quête Terminée :","Pop Fail Quest":"Quête Ratée :","Pop New Objective":"Nouvel Objectif :","Pop Complete Objective":"Objectif Terminé :","Pop Fail Objective":"Objectif Raté :"}},
{"name":"GALV_TimedMessagePopups","status":true,"description":"(v.2.0) Display popup message boxes on screen that do not stop gameplay and auto close after a set time.","parameters":{"Y Offset":"-60","Default Windowskin":"Window","Use Arrows":"true","Windowskin Back Opacity":"255","Text Outline Width":"0"}},
{"name":"GALV_TitleCommands","status":true,"description":"Allows you to customize what commands appear in the title screen menu.","parameters":{"Default Commands":"Nouvelle partie,new,always|Continue,con,isSave|Options,opt,always|Quitter,quit,always","Mod Condition":"","Mod Commands":""}},
{"name":"MUSH_OptionSystemPlus_P2","status":true,"description":"[v.1.02] Creates a new Option System and Option Menu.","parameters":{"Sections":"","SectionCosmeticsName":"Cosmetics","SectionGraphicsName":"Graphics","SectionAudioName":"Audio","SectionOtherName":"Miscellaneous\r","Cosmetics":"","WindowRed":"","WindowRedName":"Window Red","WindowRedValue":"0","WindowRedBarColor1":"rgba(200, 100, 0, 1)","WindowRedBarColor2":"rgba(255, 0, 0, 1)","WindowGreen":"","WindowGreenName":"Window Green","WindowGreenValue":"0","WindowGreenBarColor1":"rgba(0, 200, 100, 1)","WindowGreenBarColor2":"rgba(0, 255, 0, 1)","WindowBlue":"","WindowBlueName":"Window Blue","WindowBlueValue":"0","WindowBlueBarColor1":"rgba(100, 0, 200, 1)","WindowBlueBarColor2":"rgba(0, 0, 255, 1)","WindowOpacity":"","WindowOpacityName":"Window Opacity","WindowOpacityValue":"255","WindowOpacityBarColor1":"rgba(128, 128, 128, 1)","WindowOpacityBarColor2":"rgba(200, 200, 200, 1)","Windowskin":"","WindowskinName":"Windowskin","WindowskinList":"","WindowskinDefaultName":"Window","MenuBack":"","MenuBackName":"Menu Background","MenuBackList":"","MenuBackDefaultName":"Default","MenuBackStretch":"false\r","Graphics":"","ScreenResolution":"","ScreenResolutionName":"Screen Resolution","ScreenResolutionList":"[ [816, 624] ]","ScreenResolutionScale":"false","ScreenResolutionReposition":"false","VSync":"","VSyncName":"VSync","VSyncDefault":"true","VSyncNameON":"ON","VSyncNameOFF":"OFF","Fullscreen":"","FullscreenName":"Fullscreen Mode","FullscreenOn":"ON","FullscreenOff":"OFF","FpsMeter":"","FpsMeterName":"FPS Meter","FpsMeterOn":"ON","FpsMeterOff":"OFF\r","Audio":"","BGM":"","BGMName":"BGM Volume","BGMColor1":"rgba(128, 128, 0, 1)","BGMColor2":"rgba(168, 168, 0, 1)","BGS":"","BGSName":"BSM Volume","BGSColor1":"rgba(128, 128, 0, 1)","BGSColor2":"rgba(168, 168, 0, 1)","ME":"","MEName":"ME Volume","MEColor1":"rgba(128, 128, 0, 1)","MEColor2":"rgba(168, 168, 0, 1)","SE":"","SEName":"SE Volume","SEColor1":"rgba(128, 128, 0, 1)","SEColor2":"rgba(168, 168, 0, 1)\r","Other":"","AlwaysDash":"","AlwaysDashName":"Always Dash","AlwaysDashNameOn":"ON","AlwaysDashNameOff":"OFF","CommandRemember":"","CommandRememberName":"Command Remember","CommandRememberNameOn":"ON","CommandRememberNameOff":"OFF"}},
{"name":"SRD_FullscreenToggleOption","status":true,"description":"Adds a Fullscreen Toggle to the Options Window","parameters":{"Option Name":"Plein écran","Position":"Middle","Default Value":"false","Persist Default?":"false"}},
{"name":"SRD_HUDMaker","status":true,"description":"Allows developers to create their own map-based HUD through an in-game GUI window!","parameters":{"Active Updating":"false","Show During Events":"transparent","Map Global Condition":"","Battle Global Condition":"","Disable Delete Key":"true"}},
{"name":"SRD_RemoveFadedContinue","status":true,"description":"This Plugin removes the faded out \"continue\" choice from\r\nthe choices at the title screen.","parameters":{}},
{"name":"SRD_CharacterChoices","status":true,"description":"Allows the use of the \"Show Choices\" event to have the Player to select an animated Character.","parameters":{"Walking Speed":"10","Character Padding":"18","Sprite Width":"48","Sprite Height":"48","X Offset":"12","Y Offset":"14"}},
{"name":"SRD_TranslationEngine","status":true,"description":"Provides game developers with an in-game tool for building and managing translations/localizations for their game's text.","parameters":{"Source Language Name":"Français","Languages":"[\"English\"]","Default Language":"","Provide Option?":"true","Option Name":"Language","Allow Message Update?":"true"}}
];
