var gdjs;
(function(t) {
    const i = new t.Logger("Engine runtime");
    let u;
    (function(n) {
        const e = !0
    })(u = t.evtTools || (t.evtTools = {})), t.objectsTypes = new Hashtable, t.behaviorsTypes = new Hashtable, t.callbacksFirstRuntimeSceneLoaded = [], t.callbacksRuntimeSceneLoaded = [], t.callbacksRuntimeScenePreEvents = [], t.callbacksRuntimeScenePostEvents = [], t.callbacksRuntimeScenePaused = [], t.callbacksRuntimeSceneResumed = [], t.callbacksRuntimeSceneUnloading = [], t.callbacksRuntimeSceneUnloaded = [], t.callbacksObjectDeletedFromScene = [], t.gdevelopLogo = "", t.rgbToHex = function(e, n, r) {
        return "" + ((1 << 24) + (e << 16) + (n << 8) + r).toString(16).slice(1)
    }, t.hexToRGBColor = function(e) {
        const n = parseInt(e.replace("#", ""), 16);
        return Number.isFinite(n) ? [n >> 16 & 255, n >> 8 & 255, n & 255] : [0, 0, 0]
    }, t.rgbOrHexToRGBColor = function(e) {
        const n = e.split(";");
        return n.length === 3 ? [parseInt(n[0], 10), parseInt(n[1], 10), parseInt(n[2], 10)] : t.hexToRGBColor(e)
    }, t.rgbOrHexStringToNumber = e => {
        const n = t.rgbOrHexToRGBColor(e);
        return t.rgbToHexNumber(n[0], n[1], n[2])
    }, t.rgbToHexNumber = function(e, n, r) {
        return (e << 16) + (n << 8) + r
    }, t.hexNumberToRGB = e => ({
        r: e >> 16 & 255,
        g: e >> 8 & 255,
        b: e & 255,
        a: 255
    }), t.hexNumberToRGBArray = e => [e >> 16 & 255, e >> 8 & 255, e & 255], t.random = function(e) {
        return e <= 0 ? 0 : Math.floor(Math.random() * (e + 1))
    }, t.randomInRange = function(e, n) {
        return e + t.random(n - e)
    }, t.randomFloat = function(e) {
        return e <= 0 ? 0 : Math.random() * e
    }, t.randomFloatInRange = function(e, n) {
        return e + t.randomFloat(n - e)
    }, t.randomWithStep = function(e, n, r) {
        return r <= 0 ? e + t.random(n - e) : e + t.random(Math.floor((n - e) / r)) * r
    }, t.toRad = function(e) {
        return e / 180 * Math.PI
    }, t.toDegrees = function(e) {
        return e * 180 / Math.PI
    }, t.registerObject = function(e, n) {
        t.objectsTypes.put(e, n)
    }, t.registerBehavior = function(e, n) {
        t.behaviorsTypes.put(e, n)
    }, t.registerFirstRuntimeSceneLoadedCallback = function(e) {
        t.callbacksFirstRuntimeSceneLoaded.push(e)
    }, t.registerRuntimeSceneLoadedCallback = function(e) {
        t.callbacksRuntimeSceneLoaded.push(e)
    }, t.registerRuntimeScenePreEventsCallback = function(e) {
        t.callbacksRuntimeScenePreEvents.push(e)
    }, t.registerRuntimeScenePostEventsCallback = function(e) {
        t.callbacksRuntimeScenePostEvents.push(e)
    }, t.registerRuntimeScenePausedCallback = function(e) {
        t.callbacksRuntimeScenePaused.push(e)
    }, t.registerRuntimeSceneResumedCallback = function(e) {
        t.callbacksRuntimeSceneResumed.push(e)
    }, t.registerRuntimeSceneUnloadingCallback = function(e) {
        t.callbacksRuntimeSceneUnloading.push(e)
    }, t.registerRuntimeSceneUnloadedCallback = function(e) {
        t.callbacksRuntimeSceneUnloaded.push(e)
    }, t.registerObjectDeletedFromSceneCallback = function(e) {
        t.callbacksObjectDeletedFromScene.push(e)
    }, t._unregisterCallback = function(e) {
        const n = r => {
            for (let o = 0; o < r.length;) r[o] === e ? r.splice(o, 1) : o++
        };
        n(t.callbacksFirstRuntimeSceneLoaded), n(t.callbacksRuntimeSceneLoaded), n(t.callbacksRuntimeScenePreEvents), n(t.callbacksRuntimeScenePostEvents), n(t.callbacksRuntimeScenePaused), n(t.callbacksRuntimeSceneResumed), n(t.callbacksRuntimeSceneUnloading), n(t.callbacksRuntimeSceneUnloaded), n(t.callbacksObjectDeletedFromScene)
    }, t.registerGlobalCallbacks = function() {
        i.warn("You're calling gdjs.registerGlobalCallbacks. This method is now useless and you must not call it anymore.")
    }, t.getObjectConstructor = function(e) {
        return e !== void 0 && t.objectsTypes.containsKey(e) ? t.objectsTypes.get(e) : (i.warn('Object type "' + e + '" was not found.'), t.objectsTypes.get(""))
    }, t.getBehaviorConstructor = function(e) {
        return e !== void 0 && t.behaviorsTypes.containsKey(e) ? t.behaviorsTypes.get(e) : (i.warn('Behavior type "' + e + '" was not found.'), t.behaviorsTypes.get(""))
    }, t.staticArray = function(e) {
        return e._staticArray = e._staticArray || [], e._staticArray
    }, t.staticArray2 = function(e) {
        return e._staticArray2 = e._staticArray2 || [], e._staticArray2
    }, t.staticObject = function(e) {
        return e._staticObject = e._staticObject || {}, e._staticObject
    }, t.objectsListsToArray = function(e) {
        var n = t.staticArray(t.objectsListsToArray);
        e.values(n);
        for (var r = [], o = 0; o < n.length; ++o)
            for (var a = n[o], c = 0; c < a.length; ++c) r.push(a[c]);
        return r
    }, t.copyArray = function(e, n) {
        for (var r = e.length, o = 0; o < r; ++o) n[o] = e[o];
        n.length = r
    }, t.makeUuid = function() {
        if (typeof crypto == "undefined" || !crypto.getRandomValues) {
            const o = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, o);
            return o()
        }
        if (!t.makeUuid.hex) {
            t.makeUuid.hex = [];
            for (var e = 0; e < 256; e++) t.makeUuid.hex[e] = (e < 16 ? "0" : "") + e.toString(16)
        }
        const n = t.makeUuid.hex;
        var r = crypto.getRandomValues(new Uint8Array(16));
        return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, n[r[0]] + n[r[1]] + n[r[2]] + n[r[3]] + "-" + n[r[4]] + n[r[5]] + "-" + n[r[6]] + n[r[7]] + "-" + n[r[8]] + n[r[9]] + "-" + n[r[10]] + n[r[11]] + n[r[12]] + n[r[13]] + n[r[14]] + n[r[15]]
    }, t.nearlyEqual = (e, n, r) => {
        const o = Math.abs(e),
            a = Math.abs(n),
            c = Math.abs(e - n);
        return e === n ? !0 : e == 0 || n == 0 || o + a < Number.EPSILON ? c < r * Number.EPSILON : c / Math.min(o + a, Number.MAX_VALUE) < r
    };
    const l = [];
    t.registerAsynchronouslyLoadingLibraryPromise = e => {
        l.push(e)
    }, t.getAllAsynchronouslyLoadingLibraryPromise = () => Promise.all(l)
})(gdjs || (gdjs = {})), console.warn = console.warn || console.log, console.error = console.error || console.log;
//# sourceMappingURL=gd.js.map
