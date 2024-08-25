gdjs.MenuCode = {};
gdjs.MenuCode.localVariables = [];
gdjs.MenuCode.GDTITLEObjects1= [];
gdjs.MenuCode.GDTITLEObjects2= [];
gdjs.MenuCode.GDTest_9595outObjects1= [];
gdjs.MenuCode.GDTest_9595outObjects2= [];
gdjs.MenuCode.GDcreatorObjects1= [];
gdjs.MenuCode.GDcreatorObjects2= [];
gdjs.MenuCode.GDInfoObjects1= [];
gdjs.MenuCode.GDInfoObjects2= [];
gdjs.MenuCode.GDwhy_9595to_9595read_9595wikiObjects1= [];
gdjs.MenuCode.GDwhy_9595to_9595read_9595wikiObjects2= [];
gdjs.MenuCode.GDthumbnailObjects1= [];
gdjs.MenuCode.GDthumbnailObjects2= [];
gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects1= [];
gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects2= [];
gdjs.MenuCode.GDTheaObjects1= [];
gdjs.MenuCode.GDTheaObjects2= [];
gdjs.MenuCode.GDKKObjects1= [];
gdjs.MenuCode.GDKKObjects2= [];


gdjs.MenuCode.mapOfGDgdjs_9546MenuCode_9546GDcreatorObjects1Objects = Hashtable.newFrom({"creator": gdjs.MenuCode.GDcreatorObjects1});
gdjs.MenuCode.mapOfGDgdjs_9546MenuCode_9546GDcreatorObjects1Objects = Hashtable.newFrom({"creator": gdjs.MenuCode.GDcreatorObjects1});
gdjs.MenuCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("creator"), gdjs.MenuCode.GDcreatorObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.MenuCode.mapOfGDgdjs_9546MenuCode_9546GDcreatorObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
/* Reuse gdjs.MenuCode.GDcreatorObjects1 */
{for(var i = 0, len = gdjs.MenuCode.GDcreatorObjects1.length ;i < len;++i) {
    gdjs.MenuCode.GDcreatorObjects1[i].getBehavior("Tween").addObjectScaleTween3("SLC", 1.1, "linear", 0.2, false, true);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("creator"), gdjs.MenuCode.GDcreatorObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.MenuCode.mapOfGDgdjs_9546MenuCode_9546GDcreatorObjects1Objects, runtimeScene, true, true);
if (isConditionTrue_0) {
/* Reuse gdjs.MenuCode.GDcreatorObjects1 */
{for(var i = 0, len = gdjs.MenuCode.GDcreatorObjects1.length ;i < len;++i) {
    gdjs.MenuCode.GDcreatorObjects1[i].getBehavior("Tween").addObjectScaleTween3("SLC", 1, "linear", 0.1, false, true);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("creator"), gdjs.MenuCode.GDcreatorObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.MenuCode.GDcreatorObjects1.length;i<l;++i) {
    if ( gdjs.MenuCode.GDcreatorObjects1[i].getBehavior("ButtonFSM").IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.MenuCode.GDcreatorObjects1[k] = gdjs.MenuCode.GDcreatorObjects1[i];
        ++k;
    }
}
gdjs.MenuCode.GDcreatorObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.window.openURL("https://gd.games/byson94", runtimeScene);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Test_out"), gdjs.MenuCode.GDTest_9595outObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.MenuCode.GDTest_9595outObjects1.length;i<l;++i) {
    if ( gdjs.MenuCode.GDTest_9595outObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.MenuCode.GDTest_9595outObjects1[k] = gdjs.MenuCode.GDTest_9595outObjects1[i];
        ++k;
    }
}
gdjs.MenuCode.GDTest_9595outObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Engine", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Learn_how_to_use_it"), gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects1.length;i<l;++i) {
    if ( gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects1[k] = gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects1[i];
        ++k;
    }
}
gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.window.openURL("https://github.com/Byson94/LiteForge-GD-engine/wiki", runtimeScene);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{gdjs.evtTools.window.setFullScreen(runtimeScene, false, false);
}}

}


};

gdjs.MenuCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.MenuCode.GDTITLEObjects1.length = 0;
gdjs.MenuCode.GDTITLEObjects2.length = 0;
gdjs.MenuCode.GDTest_9595outObjects1.length = 0;
gdjs.MenuCode.GDTest_9595outObjects2.length = 0;
gdjs.MenuCode.GDcreatorObjects1.length = 0;
gdjs.MenuCode.GDcreatorObjects2.length = 0;
gdjs.MenuCode.GDInfoObjects1.length = 0;
gdjs.MenuCode.GDInfoObjects2.length = 0;
gdjs.MenuCode.GDwhy_9595to_9595read_9595wikiObjects1.length = 0;
gdjs.MenuCode.GDwhy_9595to_9595read_9595wikiObjects2.length = 0;
gdjs.MenuCode.GDthumbnailObjects1.length = 0;
gdjs.MenuCode.GDthumbnailObjects2.length = 0;
gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects1.length = 0;
gdjs.MenuCode.GDLearn_9595how_9595to_9595use_9595itObjects2.length = 0;
gdjs.MenuCode.GDTheaObjects1.length = 0;
gdjs.MenuCode.GDTheaObjects2.length = 0;
gdjs.MenuCode.GDKKObjects1.length = 0;
gdjs.MenuCode.GDKKObjects2.length = 0;

gdjs.MenuCode.eventsList0(runtimeScene);

return;

}

gdjs['MenuCode'] = gdjs.MenuCode;
