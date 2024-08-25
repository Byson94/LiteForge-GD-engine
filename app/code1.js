gdjs.PreviewCode = {};
gdjs.PreviewCode.localVariables = [];
gdjs.PreviewCode.GDBack_9595buttonObjects1= [];
gdjs.PreviewCode.GDBack_9595buttonObjects2= [];
gdjs.PreviewCode.GDTheaObjects1= [];
gdjs.PreviewCode.GDTheaObjects2= [];
gdjs.PreviewCode.GDKKObjects1= [];
gdjs.PreviewCode.GDKKObjects2= [];


gdjs.PreviewCode.mapOfGDgdjs_9546PreviewCode_9546GDTheaObjects2ObjectsGDgdjs_9546PreviewCode_9546GDKKObjects2Objects = Hashtable.newFrom({"Thea": gdjs.PreviewCode.GDTheaObjects2, "KK": gdjs.PreviewCode.GDKKObjects2});
gdjs.PreviewCode.eventsList0 = function(runtimeScene) {

};gdjs.PreviewCode.eventsList1 = function(runtimeScene) {

{


const repeatCount2 = gdjs.evtTools.variable.getVariableChildCount(runtimeScene.getGame().getVariables().getFromIndex(1)) / 3;
for (let repeatIndex2 = 0;repeatIndex2 < repeatCount2;++repeatIndex2) {
gdjs.PreviewCode.GDKKObjects2.length = 0;

gdjs.PreviewCode.GDTheaObjects2.length = 0;


let isConditionTrue_0 = false;
if (true)
{
{gdjs.evtTools.object.createObjectFromGroupOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.PreviewCode.mapOfGDgdjs_9546PreviewCode_9546GDTheaObjects2ObjectsGDgdjs_9546PreviewCode_9546GDKKObjects2Objects, runtimeScene.getGame().getVariables().getFromIndex(1).getChild(gdjs.PreviewCode.localVariables[0].getFromIndex(0).getAsNumber()).getAsString(), runtimeScene.getGame().getVariables().getFromIndex(1).getChild(gdjs.PreviewCode.localVariables[0].getFromIndex(0).getAsNumber() + 1).getAsNumber(), runtimeScene.getGame().getVariables().getFromIndex(1).getChild(gdjs.PreviewCode.localVariables[0].getFromIndex(0).getAsNumber() + 2).getAsNumber(), "");
}{gdjs.PreviewCode.localVariables[0].getFromIndex(0).add(3);
}}
}

}


};gdjs.PreviewCode.userFunc0x9830f0 = function GDJSInlineCode(runtimeScene) {
"use strict";
// Get the value of the global variable "Script" as a string
let scriptCode = runtimeScene.getGame().getVariables().get("Script").getAsString();

// Execute the JavaScript code stored in the "Script" variable
try {
    eval(scriptCode);
} catch (e) {
    console.error("Error executing script:", e);
}

};
gdjs.PreviewCode.eventsList2 = function(runtimeScene) {

{


{
const variables = new gdjs.VariablesContainer();
{
const variable = new gdjs.Variable();
variable.setNumber(0);
variables._declare("counter", variable);
}
gdjs.PreviewCode.localVariables.push(variables);
}
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {

{ //Subevents
gdjs.PreviewCode.eventsList1(runtimeScene);} //End of subevents
}
gdjs.PreviewCode.localVariables.pop();

}


{

gdjs.copyArray(runtimeScene.getObjects("Back_button"), gdjs.PreviewCode.GDBack_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.PreviewCode.GDBack_9595buttonObjects1.length;i<l;++i) {
    if ( gdjs.PreviewCode.GDBack_9595buttonObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.PreviewCode.GDBack_9595buttonObjects1[k] = gdjs.PreviewCode.GDBack_9595buttonObjects1[i];
        ++k;
    }
}
gdjs.PreviewCode.GDBack_9595buttonObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.popScene(runtimeScene);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("KK"), gdjs.PreviewCode.GDKKObjects1);
gdjs.copyArray(runtimeScene.getObjects("Thea"), gdjs.PreviewCode.GDTheaObjects1);
{for(var i = 0, len = gdjs.PreviewCode.GDTheaObjects1.length ;i < len;++i) {
    gdjs.PreviewCode.GDTheaObjects1[i].getBehavior("Effect").enableEffect("moving", false);
}
}{for(var i = 0, len = gdjs.PreviewCode.GDKKObjects1.length ;i < len;++i) {
    gdjs.PreviewCode.GDKKObjects1[i].getBehavior("Effect").enableEffect("moving", false);
}
}{for(var i = 0, len = gdjs.PreviewCode.GDTheaObjects1.length ;i < len;++i) {
    gdjs.PreviewCode.GDTheaObjects1[i].activateBehavior("Draggable", false);
}
}{for(var i = 0, len = gdjs.PreviewCode.GDKKObjects1.length ;i < len;++i) {
    gdjs.PreviewCode.GDKKObjects1[i].activateBehavior("Draggable", false);
}
}{runtimeScene.getScene().getVariables().getFromIndex(0).setBoolean(false);
}}

}


{


gdjs.PreviewCode.userFunc0x9830f0(runtimeScene);

}


};

gdjs.PreviewCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.PreviewCode.GDBack_9595buttonObjects1.length = 0;
gdjs.PreviewCode.GDBack_9595buttonObjects2.length = 0;
gdjs.PreviewCode.GDTheaObjects1.length = 0;
gdjs.PreviewCode.GDTheaObjects2.length = 0;
gdjs.PreviewCode.GDKKObjects1.length = 0;
gdjs.PreviewCode.GDKKObjects2.length = 0;

gdjs.PreviewCode.eventsList2(runtimeScene);

return;

}

gdjs['PreviewCode'] = gdjs.PreviewCode;
