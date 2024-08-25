gdjs.EngineCode = {};
gdjs.EngineCode.localVariables = [];
gdjs.EngineCode.forEachCount0_3 = 0;

gdjs.EngineCode.forEachCount1_3 = 0;

gdjs.EngineCode.forEachIndex3 = 0;

gdjs.EngineCode.forEachObjects3 = [];

gdjs.EngineCode.forEachTotalCount3 = 0;

gdjs.EngineCode.GDPreview_9595buttonObjects1= [];
gdjs.EngineCode.GDPreview_9595buttonObjects2= [];
gdjs.EngineCode.GDPreview_9595buttonObjects3= [];
gdjs.EngineCode.GDPreview_9595buttonObjects4= [];
gdjs.EngineCode.GDtop_9595pannelObjects1= [];
gdjs.EngineCode.GDtop_9595pannelObjects2= [];
gdjs.EngineCode.GDtop_9595pannelObjects3= [];
gdjs.EngineCode.GDtop_9595pannelObjects4= [];
gdjs.EngineCode.GDbottom_9595panelObjects1= [];
gdjs.EngineCode.GDbottom_9595panelObjects2= [];
gdjs.EngineCode.GDbottom_9595panelObjects3= [];
gdjs.EngineCode.GDbottom_9595panelObjects4= [];
gdjs.EngineCode.GDObjects_9595panelObjects1= [];
gdjs.EngineCode.GDObjects_9595panelObjects2= [];
gdjs.EngineCode.GDObjects_9595panelObjects3= [];
gdjs.EngineCode.GDObjects_9595panelObjects4= [];
gdjs.EngineCode.GDcodes_9595buttonObjects1= [];
gdjs.EngineCode.GDcodes_9595buttonObjects2= [];
gdjs.EngineCode.GDcodes_9595buttonObjects3= [];
gdjs.EngineCode.GDcodes_9595buttonObjects4= [];
gdjs.EngineCode.GDobject_9595panel_9595bgObjects1= [];
gdjs.EngineCode.GDobject_9595panel_9595bgObjects2= [];
gdjs.EngineCode.GDobject_9595panel_9595bgObjects3= [];
gdjs.EngineCode.GDobject_9595panel_9595bgObjects4= [];
gdjs.EngineCode.GDThea_9595txtObjects1= [];
gdjs.EngineCode.GDThea_9595txtObjects2= [];
gdjs.EngineCode.GDThea_9595txtObjects3= [];
gdjs.EngineCode.GDThea_9595txtObjects4= [];
gdjs.EngineCode.GDKK_9595txtObjects1= [];
gdjs.EngineCode.GDKK_9595txtObjects2= [];
gdjs.EngineCode.GDKK_9595txtObjects3= [];
gdjs.EngineCode.GDKK_9595txtObjects4= [];
gdjs.EngineCode.GDBackgroundObjects1= [];
gdjs.EngineCode.GDBackgroundObjects2= [];
gdjs.EngineCode.GDBackgroundObjects3= [];
gdjs.EngineCode.GDBackgroundObjects4= [];
gdjs.EngineCode.GDCode_9595blockObjects1= [];
gdjs.EngineCode.GDCode_9595blockObjects2= [];
gdjs.EngineCode.GDCode_9595blockObjects3= [];
gdjs.EngineCode.GDCode_9595blockObjects4= [];
gdjs.EngineCode.GDSave_9595buttonObjects1= [];
gdjs.EngineCode.GDSave_9595buttonObjects2= [];
gdjs.EngineCode.GDSave_9595buttonObjects3= [];
gdjs.EngineCode.GDSave_9595buttonObjects4= [];
gdjs.EngineCode.GDTheaObjects1= [];
gdjs.EngineCode.GDTheaObjects2= [];
gdjs.EngineCode.GDTheaObjects3= [];
gdjs.EngineCode.GDTheaObjects4= [];
gdjs.EngineCode.GDKKObjects1= [];
gdjs.EngineCode.GDKKObjects2= [];
gdjs.EngineCode.GDKKObjects3= [];
gdjs.EngineCode.GDKKObjects4= [];


gdjs.EngineCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{gdjs.evtTools.window.setFullScreen(runtimeScene, false, false);
}}

}


};gdjs.EngineCode.mapOfGDgdjs_9546EngineCode_9546GDTheaObjects3Objects = Hashtable.newFrom({"Thea": gdjs.EngineCode.GDTheaObjects3});
gdjs.EngineCode.mapOfGDgdjs_9546EngineCode_9546GDKKObjects3Objects = Hashtable.newFrom({"KK": gdjs.EngineCode.GDKKObjects3});
gdjs.EngineCode.eventsList1 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Thea"), gdjs.EngineCode.GDTheaObjects3);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDTheaObjects3.length;i<l;++i) {
    if ( gdjs.EngineCode.GDTheaObjects3[i].getX() != 87 ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDTheaObjects3[k] = gdjs.EngineCode.GDTheaObjects3[i];
        ++k;
    }
}
gdjs.EngineCode.GDTheaObjects3.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDTheaObjects3.length;i<l;++i) {
    if ( gdjs.EngineCode.GDTheaObjects3[i].getY() != 512 ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDTheaObjects3[k] = gdjs.EngineCode.GDTheaObjects3[i];
        ++k;
    }
}
gdjs.EngineCode.GDTheaObjects3.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.EngineCode.GDTheaObjects3 */
{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.EngineCode.mapOfGDgdjs_9546EngineCode_9546GDTheaObjects3Objects, 87, 512, "Object panel");
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("KK"), gdjs.EngineCode.GDKKObjects3);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDKKObjects3.length;i<l;++i) {
    if ( gdjs.EngineCode.GDKKObjects3[i].getX() != 273 ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDKKObjects3[k] = gdjs.EngineCode.GDKKObjects3[i];
        ++k;
    }
}
gdjs.EngineCode.GDKKObjects3.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDKKObjects3.length;i<l;++i) {
    if ( gdjs.EngineCode.GDKKObjects3[i].getY() != 512 ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDKKObjects3[k] = gdjs.EngineCode.GDKKObjects3[i];
        ++k;
    }
}
gdjs.EngineCode.GDKKObjects3.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.EngineCode.GDKKObjects3 */
{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.EngineCode.mapOfGDgdjs_9546EngineCode_9546GDKKObjects3Objects, 273, 512, "Object panel");
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("KK"), gdjs.EngineCode.GDKKObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDKKObjects2.length;i<l;++i) {
    if ( gdjs.EngineCode.GDKKObjects2[i].getBehavior("Draggable").wasJustDropped() ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDKKObjects2[k] = gdjs.EngineCode.GDKKObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDKKObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.EngineCode.GDKKObjects2 */
{for(var i = 0, len = gdjs.EngineCode.GDKKObjects2.length ;i < len;++i) {
    gdjs.EngineCode.GDKKObjects2[i].setLayer("");
}
}}

}


};gdjs.EngineCode.asyncCallback10868148 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.EngineCode.localVariables);
{gdjs.evtTools.camera.showLayer(runtimeScene, "Object panel");
}gdjs.EngineCode.localVariables.length = 0;
}
gdjs.EngineCode.eventsList2 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.EngineCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.05), (runtimeScene) => (gdjs.EngineCode.asyncCallback10868148(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.EngineCode.asyncCallback10869116 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.EngineCode.localVariables);
{gdjs.evtTools.camera.hideLayer(runtimeScene, "Object panel");
}gdjs.EngineCode.localVariables.length = 0;
}
gdjs.EngineCode.eventsList3 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.EngineCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.05), (runtimeScene) => (gdjs.EngineCode.asyncCallback10869116(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.EngineCode.eventsList4 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.camera.layerIsVisible(runtimeScene, "Object panel");
if (isConditionTrue_0) {

{ //Subevents
gdjs.EngineCode.eventsList1(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Thea"), gdjs.EngineCode.GDTheaObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDTheaObjects2.length;i<l;++i) {
    if ( gdjs.EngineCode.GDTheaObjects2[i].getBehavior("Draggable").wasJustDropped() ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDTheaObjects2[k] = gdjs.EngineCode.GDTheaObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDTheaObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.EngineCode.GDTheaObjects2 */
{for(var i = 0, len = gdjs.EngineCode.GDTheaObjects2.length ;i < len;++i) {
    gdjs.EngineCode.GDTheaObjects2[i].setLayer("");
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Objects_panel"), gdjs.EngineCode.GDObjects_9595panelObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDObjects_9595panelObjects2.length;i<l;++i) {
    if ( gdjs.EngineCode.GDObjects_9595panelObjects2[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDObjects_9595panelObjects2[k] = gdjs.EngineCode.GDObjects_9595panelObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDObjects_9595panelObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.camera.layerIsVisible(runtimeScene, "Object panel"));
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.EngineCode.eventsList2(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Objects_panel"), gdjs.EngineCode.GDObjects_9595panelObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDObjects_9595panelObjects2.length;i<l;++i) {
    if ( gdjs.EngineCode.GDObjects_9595panelObjects2[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDObjects_9595panelObjects2[k] = gdjs.EngineCode.GDObjects_9595panelObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDObjects_9595panelObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.camera.layerIsVisible(runtimeScene, "Object panel");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.EngineCode.eventsList3(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("KK"), gdjs.EngineCode.GDKKObjects2);
gdjs.copyArray(runtimeScene.getObjects("Thea"), gdjs.EngineCode.GDTheaObjects2);
{for(var i = 0, len = gdjs.EngineCode.GDTheaObjects2.length ;i < len;++i) {
    gdjs.EngineCode.GDTheaObjects2[i].getBehavior("Resizable").setSize(105, 105);
}
}{for(var i = 0, len = gdjs.EngineCode.GDKKObjects2.length ;i < len;++i) {
    gdjs.EngineCode.GDKKObjects2[i].getBehavior("Resizable").setSize(105, 105);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Thea"), gdjs.EngineCode.GDTheaObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDTheaObjects2.length;i<l;++i) {
    if ( gdjs.EngineCode.GDTheaObjects2[i].getBehavior("Draggable").isDragged() ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDTheaObjects2[k] = gdjs.EngineCode.GDTheaObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDTheaObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.EngineCode.GDTheaObjects2 */
{for(var i = 0, len = gdjs.EngineCode.GDTheaObjects2.length ;i < len;++i) {
    gdjs.EngineCode.GDTheaObjects2[i].getBehavior("Effect").enableEffect("moving", true);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("KK"), gdjs.EngineCode.GDKKObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDKKObjects2.length;i<l;++i) {
    if ( gdjs.EngineCode.GDKKObjects2[i].getBehavior("Draggable").isDragged() ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDKKObjects2[k] = gdjs.EngineCode.GDKKObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDKKObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.EngineCode.GDKKObjects2 */
{for(var i = 0, len = gdjs.EngineCode.GDKKObjects2.length ;i < len;++i) {
    gdjs.EngineCode.GDKKObjects2[i].getBehavior("Effect").enableEffect("moving", true);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Thea"), gdjs.EngineCode.GDTheaObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDTheaObjects2.length;i<l;++i) {
    if ( !(gdjs.EngineCode.GDTheaObjects2[i].getBehavior("Draggable").isDragged()) ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDTheaObjects2[k] = gdjs.EngineCode.GDTheaObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDTheaObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.EngineCode.GDTheaObjects2 */
{for(var i = 0, len = gdjs.EngineCode.GDTheaObjects2.length ;i < len;++i) {
    gdjs.EngineCode.GDTheaObjects2[i].getBehavior("Effect").enableEffect("moving", false);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("KK"), gdjs.EngineCode.GDKKObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDKKObjects2.length;i<l;++i) {
    if ( !(gdjs.EngineCode.GDKKObjects2[i].getBehavior("Draggable").isDragged()) ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDKKObjects2[k] = gdjs.EngineCode.GDKKObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDKKObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.EngineCode.GDKKObjects2 */
{for(var i = 0, len = gdjs.EngineCode.GDKKObjects2.length ;i < len;++i) {
    gdjs.EngineCode.GDKKObjects2[i].getBehavior("Effect").enableEffect("moving", false);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("KK"), gdjs.EngineCode.GDKKObjects1);
gdjs.copyArray(runtimeScene.getObjects("Thea"), gdjs.EngineCode.GDTheaObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDTheaObjects1.length;i<l;++i) {
    if ( gdjs.EngineCode.GDTheaObjects1[i].getBehavior("Draggable").isDragged() ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDTheaObjects1[k] = gdjs.EngineCode.GDTheaObjects1[i];
        ++k;
    }
}
gdjs.EngineCode.GDTheaObjects1.length = k;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDKKObjects1.length;i<l;++i) {
    if ( gdjs.EngineCode.GDKKObjects1[i].getBehavior("Draggable").isDragged() ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDKKObjects1[k] = gdjs.EngineCode.GDKKObjects1[i];
        ++k;
    }
}
gdjs.EngineCode.GDKKObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Delete");
}
if (isConditionTrue_0) {
/* Reuse gdjs.EngineCode.GDKKObjects1 */
/* Reuse gdjs.EngineCode.GDTheaObjects1 */
{for(var i = 0, len = gdjs.EngineCode.GDTheaObjects1.length ;i < len;++i) {
    gdjs.EngineCode.GDTheaObjects1[i].deleteFromScene(runtimeScene);
}
for(var i = 0, len = gdjs.EngineCode.GDKKObjects1.length ;i < len;++i) {
    gdjs.EngineCode.GDKKObjects1[i].deleteFromScene(runtimeScene);
}
}}

}


};gdjs.EngineCode.asyncCallback10874460 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.EngineCode.localVariables);
{gdjs.evtTools.camera.showLayer(runtimeScene, "code");
}gdjs.EngineCode.localVariables.length = 0;
}
gdjs.EngineCode.eventsList5 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.EngineCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.05), (runtimeScene) => (gdjs.EngineCode.asyncCallback10874460(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.EngineCode.asyncCallback10877108 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.EngineCode.localVariables);
{gdjs.evtTools.camera.hideLayer(runtimeScene, "code");
}gdjs.EngineCode.localVariables.length = 0;
}
gdjs.EngineCode.eventsList6 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.EngineCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.05), (runtimeScene) => (gdjs.EngineCode.asyncCallback10877108(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.EngineCode.eventsList7 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Code_block"), gdjs.EngineCode.GDCode_9595blockObjects2);
{for(var i = 0, len = gdjs.EngineCode.GDCode_9595blockObjects2.length ;i < len;++i) {
    gdjs.EngineCode.GDCode_9595blockObjects2[i].setPlaceholder("// Creating a new variable with the scene name" + gdjs.evtTools.string.newLine() + "let scene = runtimeScene;" + gdjs.evtTools.string.newLine() + gdjs.evtTools.string.newLine() + "// Get all instances of the object named + 'name of your object'" + gdjs.evtTools.string.newLine() + "let objects = scene.getObjects(\"Your object name\");" + gdjs.evtTools.string.newLine() + gdjs.evtTools.string.newLine() + "// Check if the object exists" + gdjs.evtTools.string.newLine() + "if (objects.length > 0) {" + gdjs.evtTools.string.newLine() + gdjs.evtTools.string.newLine() + "// the code you are trying to do" + gdjs.evtTools.string.newLine() + gdjs.evtTools.string.newLine() + "      }");
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("codes_button"), gdjs.EngineCode.GDcodes_9595buttonObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDcodes_9595buttonObjects2.length;i<l;++i) {
    if ( gdjs.EngineCode.GDcodes_9595buttonObjects2[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDcodes_9595buttonObjects2[k] = gdjs.EngineCode.GDcodes_9595buttonObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDcodes_9595buttonObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.camera.layerIsVisible(runtimeScene, "code"));
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.EngineCode.eventsList5(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("codes_button"), gdjs.EngineCode.GDcodes_9595buttonObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDcodes_9595buttonObjects2.length;i<l;++i) {
    if ( gdjs.EngineCode.GDcodes_9595buttonObjects2[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDcodes_9595buttonObjects2[k] = gdjs.EngineCode.GDcodes_9595buttonObjects2[i];
        ++k;
    }
}
gdjs.EngineCode.GDcodes_9595buttonObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.camera.layerIsVisible(runtimeScene, "code");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.EngineCode.eventsList6(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.camera.layerIsVisible(runtimeScene, "code");
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Code_block"), gdjs.EngineCode.GDCode_9595blockObjects1);
{runtimeScene.getGame().getVariables().getFromIndex(0).setString((( gdjs.EngineCode.GDCode_9595blockObjects1.length === 0 ) ? "" :gdjs.EngineCode.GDCode_9595blockObjects1[0].getText()));
}}

}


};gdjs.EngineCode.eventsList8 = function(runtimeScene) {

};gdjs.EngineCode.eventsList9 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("KK"), gdjs.EngineCode.GDKKObjects2);
gdjs.copyArray(runtimeScene.getObjects("Thea"), gdjs.EngineCode.GDTheaObjects2);

gdjs.EngineCode.forEachTotalCount3 = 0;
gdjs.EngineCode.forEachObjects3.length = 0;
gdjs.EngineCode.forEachCount0_3 = gdjs.EngineCode.GDTheaObjects2.length;
gdjs.EngineCode.forEachTotalCount3 += gdjs.EngineCode.forEachCount0_3;
gdjs.EngineCode.forEachObjects3.push.apply(gdjs.EngineCode.forEachObjects3,gdjs.EngineCode.GDTheaObjects2);
gdjs.EngineCode.forEachCount1_3 = gdjs.EngineCode.GDKKObjects2.length;
gdjs.EngineCode.forEachTotalCount3 += gdjs.EngineCode.forEachCount1_3;
gdjs.EngineCode.forEachObjects3.push.apply(gdjs.EngineCode.forEachObjects3,gdjs.EngineCode.GDKKObjects2);
for (gdjs.EngineCode.forEachIndex3 = 0;gdjs.EngineCode.forEachIndex3 < gdjs.EngineCode.forEachTotalCount3;++gdjs.EngineCode.forEachIndex3) {
gdjs.EngineCode.GDKKObjects3.length = 0;

gdjs.EngineCode.GDTheaObjects3.length = 0;


if (gdjs.EngineCode.forEachIndex3 < gdjs.EngineCode.forEachCount0_3) {
    gdjs.EngineCode.GDTheaObjects3.push(gdjs.EngineCode.forEachObjects3[gdjs.EngineCode.forEachIndex3]);
}
else if (gdjs.EngineCode.forEachIndex3 < gdjs.EngineCode.forEachCount0_3+gdjs.EngineCode.forEachCount1_3) {
    gdjs.EngineCode.GDKKObjects3.push(gdjs.EngineCode.forEachObjects3[gdjs.EngineCode.forEachIndex3]);
}
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDTheaObjects3.length;i<l;++i) {
    if ( gdjs.EngineCode.GDTheaObjects3[i].isOnLayer("") ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDTheaObjects3[k] = gdjs.EngineCode.GDTheaObjects3[i];
        ++k;
    }
}
gdjs.EngineCode.GDTheaObjects3.length = k;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDKKObjects3.length;i<l;++i) {
    if ( gdjs.EngineCode.GDKKObjects3[i].isOnLayer("") ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDKKObjects3[k] = gdjs.EngineCode.GDKKObjects3[i];
        ++k;
    }
}
gdjs.EngineCode.GDKKObjects3.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.variable.valuePush(runtimeScene.getGame().getVariables().getFromIndex(1), (( gdjs.EngineCode.GDKKObjects3.length === 0 ) ? (( gdjs.EngineCode.GDTheaObjects3.length === 0 ) ? "" :gdjs.EngineCode.GDTheaObjects3[0].getName()) :gdjs.EngineCode.GDKKObjects3[0].getName()));
}{gdjs.evtTools.variable.valuePush(runtimeScene.getGame().getVariables().getFromIndex(1), (( gdjs.EngineCode.GDKKObjects3.length === 0 ) ? (( gdjs.EngineCode.GDTheaObjects3.length === 0 ) ? 0 :gdjs.EngineCode.GDTheaObjects3[0].getPointX("")) :gdjs.EngineCode.GDKKObjects3[0].getPointX("")));
}{gdjs.evtTools.variable.valuePush(runtimeScene.getGame().getVariables().getFromIndex(1), (( gdjs.EngineCode.GDKKObjects3.length === 0 ) ? (( gdjs.EngineCode.GDTheaObjects3.length === 0 ) ? 0 :gdjs.EngineCode.GDTheaObjects3[0].getPointY("")) :gdjs.EngineCode.GDKKObjects3[0].getPointY("")));
}}
}

}


{


let isConditionTrue_0 = false;
{
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "Preview");
}}

}


};gdjs.EngineCode.eventsList10 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Preview_button"), gdjs.EngineCode.GDPreview_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDPreview_9595buttonObjects1.length;i<l;++i) {
    if ( gdjs.EngineCode.GDPreview_9595buttonObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDPreview_9595buttonObjects1[k] = gdjs.EngineCode.GDPreview_9595buttonObjects1[i];
        ++k;
    }
}
gdjs.EngineCode.GDPreview_9595buttonObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.variable.variableClearChildren(runtimeScene.getGame().getVariables().getFromIndex(1));
}
{ //Subevents
gdjs.EngineCode.eventsList9(runtimeScene);} //End of subevents
}

}


};gdjs.EngineCode.eventsList11 = function(runtimeScene) {

};gdjs.EngineCode.eventsList12 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("KK"), gdjs.EngineCode.GDKKObjects2);
gdjs.copyArray(runtimeScene.getObjects("Thea"), gdjs.EngineCode.GDTheaObjects2);

gdjs.EngineCode.forEachTotalCount3 = 0;
gdjs.EngineCode.forEachObjects3.length = 0;
gdjs.EngineCode.forEachCount0_3 = gdjs.EngineCode.GDTheaObjects2.length;
gdjs.EngineCode.forEachTotalCount3 += gdjs.EngineCode.forEachCount0_3;
gdjs.EngineCode.forEachObjects3.push.apply(gdjs.EngineCode.forEachObjects3,gdjs.EngineCode.GDTheaObjects2);
gdjs.EngineCode.forEachCount1_3 = gdjs.EngineCode.GDKKObjects2.length;
gdjs.EngineCode.forEachTotalCount3 += gdjs.EngineCode.forEachCount1_3;
gdjs.EngineCode.forEachObjects3.push.apply(gdjs.EngineCode.forEachObjects3,gdjs.EngineCode.GDKKObjects2);
for (gdjs.EngineCode.forEachIndex3 = 0;gdjs.EngineCode.forEachIndex3 < gdjs.EngineCode.forEachTotalCount3;++gdjs.EngineCode.forEachIndex3) {
gdjs.EngineCode.GDKKObjects3.length = 0;

gdjs.EngineCode.GDTheaObjects3.length = 0;


if (gdjs.EngineCode.forEachIndex3 < gdjs.EngineCode.forEachCount0_3) {
    gdjs.EngineCode.GDTheaObjects3.push(gdjs.EngineCode.forEachObjects3[gdjs.EngineCode.forEachIndex3]);
}
else if (gdjs.EngineCode.forEachIndex3 < gdjs.EngineCode.forEachCount0_3+gdjs.EngineCode.forEachCount1_3) {
    gdjs.EngineCode.GDKKObjects3.push(gdjs.EngineCode.forEachObjects3[gdjs.EngineCode.forEachIndex3]);
}
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDTheaObjects3.length;i<l;++i) {
    if ( gdjs.EngineCode.GDTheaObjects3[i].isOnLayer("") ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDTheaObjects3[k] = gdjs.EngineCode.GDTheaObjects3[i];
        ++k;
    }
}
gdjs.EngineCode.GDTheaObjects3.length = k;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDKKObjects3.length;i<l;++i) {
    if ( gdjs.EngineCode.GDKKObjects3[i].isOnLayer("") ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDKKObjects3[k] = gdjs.EngineCode.GDKKObjects3[i];
        ++k;
    }
}
gdjs.EngineCode.GDKKObjects3.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.variable.valuePush(runtimeScene.getGame().getVariables().getFromIndex(2), (( gdjs.EngineCode.GDKKObjects3.length === 0 ) ? (( gdjs.EngineCode.GDTheaObjects3.length === 0 ) ? "" :gdjs.EngineCode.GDTheaObjects3[0].getName()) :gdjs.EngineCode.GDKKObjects3[0].getName()));
}{gdjs.evtTools.variable.valuePush(runtimeScene.getGame().getVariables().getFromIndex(2), (( gdjs.EngineCode.GDKKObjects3.length === 0 ) ? (( gdjs.EngineCode.GDTheaObjects3.length === 0 ) ? 0 :gdjs.EngineCode.GDTheaObjects3[0].getPointX("")) :gdjs.EngineCode.GDKKObjects3[0].getPointX("")));
}{gdjs.evtTools.variable.valuePush(runtimeScene.getGame().getVariables().getFromIndex(2), (( gdjs.EngineCode.GDKKObjects3.length === 0 ) ? (( gdjs.EngineCode.GDTheaObjects3.length === 0 ) ? 0 :gdjs.EngineCode.GDTheaObjects3[0].getPointY("")) :gdjs.EngineCode.GDKKObjects3[0].getPointY("")));
}}
}

}


{


let isConditionTrue_0 = false;
{
{gdjs.evtTools.storage.writeStringInJSONFile("Save", "Project", gdjs.evtTools.network.variableStructureToJSON(runtimeScene.getGame().getVariables().getFromIndex(2)));
}{gdjs.evtTools.storage.writeStringInJSONFile("Save", "Codes", gdjs.evtTools.network.variableStructureToJSON(runtimeScene.getGame().getVariables().getFromIndex(0)));
}{gdjs.evtsExt__PopUp__Alert.func(runtimeScene, "Project saved!", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}}

}


};gdjs.EngineCode.eventsList13 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Save_button"), gdjs.EngineCode.GDSave_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.EngineCode.GDSave_9595buttonObjects1.length;i<l;++i) {
    if ( gdjs.EngineCode.GDSave_9595buttonObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.EngineCode.GDSave_9595buttonObjects1[k] = gdjs.EngineCode.GDSave_9595buttonObjects1[i];
        ++k;
    }
}
gdjs.EngineCode.GDSave_9595buttonObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.EngineCode.eventsList12(runtimeScene);} //End of subevents
}

}


};gdjs.EngineCode.mapOfGDgdjs_9546EngineCode_9546GDTheaObjects3ObjectsGDgdjs_9546EngineCode_9546GDKKObjects3Objects = Hashtable.newFrom({"Thea": gdjs.EngineCode.GDTheaObjects3, "KK": gdjs.EngineCode.GDKKObjects3});
gdjs.EngineCode.eventsList14 = function(runtimeScene) {

};gdjs.EngineCode.eventsList15 = function(runtimeScene) {

{


const repeatCount3 = gdjs.evtTools.variable.getVariableChildCount(runtimeScene.getGame().getVariables().getFromIndex(2)) / 3;
for (let repeatIndex3 = 0;repeatIndex3 < repeatCount3;++repeatIndex3) {
gdjs.EngineCode.GDKKObjects3.length = 0;

gdjs.EngineCode.GDTheaObjects3.length = 0;


let isConditionTrue_0 = false;
if (true)
{
{gdjs.evtTools.object.createObjectFromGroupOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.EngineCode.mapOfGDgdjs_9546EngineCode_9546GDTheaObjects3ObjectsGDgdjs_9546EngineCode_9546GDKKObjects3Objects, runtimeScene.getGame().getVariables().getFromIndex(2).getChild(gdjs.EngineCode.localVariables[0].getFromIndex(0).getAsNumber()).getAsString(), runtimeScene.getGame().getVariables().getFromIndex(2).getChild(gdjs.EngineCode.localVariables[0].getFromIndex(0).getAsNumber() + 1).getAsNumber(), runtimeScene.getGame().getVariables().getFromIndex(2).getChild(gdjs.EngineCode.localVariables[0].getFromIndex(0).getAsNumber() + 2).getAsNumber(), "");
}{gdjs.EngineCode.localVariables[0].getFromIndex(0).add(3);
}}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Code_block"), gdjs.EngineCode.GDCode_9595blockObjects1);
{for(var i = 0, len = gdjs.EngineCode.GDCode_9595blockObjects1.length ;i < len;++i) {
    gdjs.EngineCode.GDCode_9595blockObjects1[i].getBehavior("Text").setText(runtimeScene.getGame().getVariables().getFromIndex(0).getAsString());
}
}}

}


};gdjs.EngineCode.eventsList16 = function(runtimeScene) {

{


{
const variables = new gdjs.VariablesContainer();
{
const variable = new gdjs.Variable();
variable.setNumber(0);
variables._declare("counter", variable);
}
gdjs.EngineCode.localVariables.push(variables);
}
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.storage.elementExistsInJSONFile("Save", "Project");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.storage.elementExistsInJSONFile("Save", "Codes");
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.storage.readStringFromJSONFile("Save", "Project", runtimeScene, runtimeScene.getScene().getVariables().getFromIndex(1));
}{gdjs.evtTools.network.jsonToVariableStructure(runtimeScene.getScene().getVariables().getFromIndex(1).getAsString(), runtimeScene.getGame().getVariables().getFromIndex(2));
}{gdjs.evtTools.storage.readStringFromJSONFile("Save", "Codes", runtimeScene, runtimeScene.getScene().getVariables().getFromIndex(2));
}{gdjs.evtTools.network.jsonToVariableStructure(runtimeScene.getScene().getVariables().getFromIndex(2).getAsString(), runtimeScene.getGame().getVariables().getFromIndex(0));
}
{ //Subevents
gdjs.EngineCode.eventsList15(runtimeScene);} //End of subevents
}
gdjs.EngineCode.localVariables.pop();

}


};gdjs.EngineCode.eventsList17 = function(runtimeScene) {

{


gdjs.EngineCode.eventsList0(runtimeScene);
}


{


gdjs.EngineCode.eventsList4(runtimeScene);
}


{


gdjs.EngineCode.eventsList7(runtimeScene);
}


{


gdjs.EngineCode.eventsList10(runtimeScene);
}


{


gdjs.EngineCode.eventsList13(runtimeScene);
}


{


gdjs.EngineCode.eventsList16(runtimeScene);
}


};

gdjs.EngineCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.EngineCode.GDPreview_9595buttonObjects1.length = 0;
gdjs.EngineCode.GDPreview_9595buttonObjects2.length = 0;
gdjs.EngineCode.GDPreview_9595buttonObjects3.length = 0;
gdjs.EngineCode.GDPreview_9595buttonObjects4.length = 0;
gdjs.EngineCode.GDtop_9595pannelObjects1.length = 0;
gdjs.EngineCode.GDtop_9595pannelObjects2.length = 0;
gdjs.EngineCode.GDtop_9595pannelObjects3.length = 0;
gdjs.EngineCode.GDtop_9595pannelObjects4.length = 0;
gdjs.EngineCode.GDbottom_9595panelObjects1.length = 0;
gdjs.EngineCode.GDbottom_9595panelObjects2.length = 0;
gdjs.EngineCode.GDbottom_9595panelObjects3.length = 0;
gdjs.EngineCode.GDbottom_9595panelObjects4.length = 0;
gdjs.EngineCode.GDObjects_9595panelObjects1.length = 0;
gdjs.EngineCode.GDObjects_9595panelObjects2.length = 0;
gdjs.EngineCode.GDObjects_9595panelObjects3.length = 0;
gdjs.EngineCode.GDObjects_9595panelObjects4.length = 0;
gdjs.EngineCode.GDcodes_9595buttonObjects1.length = 0;
gdjs.EngineCode.GDcodes_9595buttonObjects2.length = 0;
gdjs.EngineCode.GDcodes_9595buttonObjects3.length = 0;
gdjs.EngineCode.GDcodes_9595buttonObjects4.length = 0;
gdjs.EngineCode.GDobject_9595panel_9595bgObjects1.length = 0;
gdjs.EngineCode.GDobject_9595panel_9595bgObjects2.length = 0;
gdjs.EngineCode.GDobject_9595panel_9595bgObjects3.length = 0;
gdjs.EngineCode.GDobject_9595panel_9595bgObjects4.length = 0;
gdjs.EngineCode.GDThea_9595txtObjects1.length = 0;
gdjs.EngineCode.GDThea_9595txtObjects2.length = 0;
gdjs.EngineCode.GDThea_9595txtObjects3.length = 0;
gdjs.EngineCode.GDThea_9595txtObjects4.length = 0;
gdjs.EngineCode.GDKK_9595txtObjects1.length = 0;
gdjs.EngineCode.GDKK_9595txtObjects2.length = 0;
gdjs.EngineCode.GDKK_9595txtObjects3.length = 0;
gdjs.EngineCode.GDKK_9595txtObjects4.length = 0;
gdjs.EngineCode.GDBackgroundObjects1.length = 0;
gdjs.EngineCode.GDBackgroundObjects2.length = 0;
gdjs.EngineCode.GDBackgroundObjects3.length = 0;
gdjs.EngineCode.GDBackgroundObjects4.length = 0;
gdjs.EngineCode.GDCode_9595blockObjects1.length = 0;
gdjs.EngineCode.GDCode_9595blockObjects2.length = 0;
gdjs.EngineCode.GDCode_9595blockObjects3.length = 0;
gdjs.EngineCode.GDCode_9595blockObjects4.length = 0;
gdjs.EngineCode.GDSave_9595buttonObjects1.length = 0;
gdjs.EngineCode.GDSave_9595buttonObjects2.length = 0;
gdjs.EngineCode.GDSave_9595buttonObjects3.length = 0;
gdjs.EngineCode.GDSave_9595buttonObjects4.length = 0;
gdjs.EngineCode.GDTheaObjects1.length = 0;
gdjs.EngineCode.GDTheaObjects2.length = 0;
gdjs.EngineCode.GDTheaObjects3.length = 0;
gdjs.EngineCode.GDTheaObjects4.length = 0;
gdjs.EngineCode.GDKKObjects1.length = 0;
gdjs.EngineCode.GDKKObjects2.length = 0;
gdjs.EngineCode.GDKKObjects3.length = 0;
gdjs.EngineCode.GDKKObjects4.length = 0;

gdjs.EngineCode.eventsList17(runtimeScene);

return;

}

gdjs['EngineCode'] = gdjs.EngineCode;
