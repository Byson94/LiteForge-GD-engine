var gdjs;
(function(i) {
    const h = new i.Logger("RuntimeScene"),
        d = new i.Logger("RuntimeScene (setup warnings)");
    class c extends i.RuntimeInstanceContainer {
        constructor(t) {
            super();
            this._eventsFunction = null;
            this._lastId = 0;
            this._name = "";
            this._gameStopRequested = !1;
            this._requestedScene = "";
            this._asyncTasksManager = new i.AsyncTasksManager;
            this._isLoaded = !1;
            this._isJustResumed = !1;
            this._backgroundColor = 0;
            this._clearCanvas = !0;
            this._profiler = null;
            this._onProfilerStopped = null;
            this.networkId = null;
            this._runtimeGame = t, this._variables = new i.VariablesContainer, this._variablesByExtensionName = new Map, this._timeManager = new i.TimeManager, this._onceTriggers = new i.OnceTriggers, this._requestedChange = l.CONTINUE, this._cachedGameResolutionWidth = t ? t.getGameResolutionWidth() : 0, this._cachedGameResolutionHeight = t ? t.getGameResolutionHeight() : 0, this._renderer = new i.RuntimeSceneRenderer(this, t ? t.getRenderer() : null), this._debuggerRenderer = new i.DebuggerRenderer(this), this.onGameResolutionResized()
        }
        addLayer(t) {
            const e = new i.Layer(t, this);
            this._layers.put(t.name, e), this._orderedLayers.push(e)
        }
        onGameResolutionResized() {
            const t = this.getViewportOriginX(),
                e = this.getViewportOriginY();
            this._cachedGameResolutionWidth = this._runtimeGame ? this._runtimeGame.getGameResolutionWidth() : 0, this._cachedGameResolutionHeight = this._runtimeGame ? this._runtimeGame.getGameResolutionHeight() : 0;
            for (const a in this._layers.items) this._layers.items.hasOwnProperty(a) && this._layers.items[a].onGameResolutionResized(t, e);
            this._renderer.onGameResolutionResized()
        }
        loadFromScene(t) {
            if (!t) {
                h.error("loadFromScene was called without a scene");
                return
            }
            const {
                sceneData: e,
                usedExtensionsWithVariablesData: a
            } = t;
            this._isLoaded && this.unloadScene(), this._runtimeGame && this._runtimeGame.getRenderer().setWindowTitle(e.title), this._name = e.name, this.setBackgroundColor(e.r, e.v, e.b);
            for (let r = 0, s = e.layers.length; r < s; ++r) this.addLayer(e.layers[r]);
            this._variables = new i.VariablesContainer(e.variables);
            for (const r of a) this._variablesByExtensionName.set(r.name, new i.VariablesContainer(r.sceneVariables));
            for (let r = 0, s = e.behaviorsSharedData.length; r < s; ++r) {
                const o = e.behaviorsSharedData[r];
                this.setInitialSharedDataForBehavior(o.name, o)
            }
            const n = this.getGame().getInitialObjectsData();
            for (let r = 0, s = n.length; r < s; ++r) this.registerObject(n[r]);
            for (let r = 0, s = e.objects.length; r < s; ++r) this.registerObject(e.objects[r]);
            if (this.createObjectsFrom(e.instances, 0, 0, 0, !0), this._setLayerDefaultZOrders(), this.setEventsGeneratedCodeFunction(e), this._onceTriggers = new i.OnceTriggers, this._runtimeGame && !this._runtimeGame.wasFirstSceneLoaded())
                for (let r = 0; r < i.callbacksFirstRuntimeSceneLoaded.length; ++r) i.callbacksFirstRuntimeSceneLoaded[r](this);
            for (let r = 0; r < i.callbacksRuntimeSceneLoaded.length; ++r) i.callbacksRuntimeSceneLoaded[r](this);
            e.stopSoundsOnStartup && this._runtimeGame && this._runtimeGame.getSoundManager().clearAll(), this._isLoaded = !0, this._timeManager.reset()
        }
        getInitialSharedDataForBehavior(t) {
            const e = super.getInitialSharedDataForBehavior(t);
            return e || h.error("Can't find shared data for behavior with name: " + t), e
        }
        onPause() {
            const t = this.getAdhocListOfAllInstances();
            for (let e = 0, a = t.length; e < a; ++e) t[e].onScenePaused(this);
            for (let e = 0; e < i.callbacksRuntimeScenePaused.length; ++e) i.callbacksRuntimeScenePaused[e](this)
        }
        onResume() {
            this._isJustResumed = !0;
            const t = this.getAdhocListOfAllInstances();
            for (let e = 0, a = t.length; e < a; ++e) t[e].onSceneResumed(this);
            for (let e = 0; e < i.callbacksRuntimeSceneResumed.length; ++e) i.callbacksRuntimeSceneResumed[e](this)
        }
        unloadScene() {
            if (!this._isLoaded) return;
            this._profiler && this.stopProfiler();
            for (let e = 0; e < i.callbacksRuntimeSceneUnloading.length; ++e) i.callbacksRuntimeSceneUnloading[e](this);
            const t = this.getAdhocListOfAllInstances();
            for (let e = 0, a = t.length; e < a; ++e) {
                const n = t[e];
                n.onDeletedFromScene(this), n.onDestroyed()
            }
            this._renderer && this._renderer.onSceneUnloaded();
            for (let e = 0; e < i.callbacksRuntimeSceneUnloaded.length; ++e) i.callbacksRuntimeSceneUnloaded[e](this);
            this._destroy(), this._isLoaded = !1, this.onGameResolutionResized()
        }
        _destroy() {
            super._destroy(), this._variables = new i.VariablesContainer, this._variablesByExtensionName = new Map, this._initialBehaviorSharedData = new Hashtable, this._eventsFunction = null, this._lastId = 0, this.networkId = null, this._onceTriggers = null
        }
        setEventsGeneratedCodeFunction(t) {
            const e = i[t.mangledName + "Code"];
            e && e.func ? this._eventsFunction = e.func : (d.warn("No function found for running logic of scene " + this._name), this._eventsFunction = function() {})
        }
        setEventsFunction(t) {
            this._eventsFunction = t
        }
        renderAndStep(t) {
            this._profiler && this._profiler.beginFrame(), this._requestedChange = l.CONTINUE, this._timeManager.update(t, this._runtimeGame.getMinimalFramerate()), this._profiler && this._profiler.begin("asynchronous actions (wait action, etc...)"), this._asyncTasksManager.processTasks(this), this._profiler && this._profiler.end("asynchronous actions (wait action, etc...)"), this._profiler && this._profiler.begin("objects (pre-events)"), this._updateObjectsPreEvents(), this._profiler && this._profiler.end("objects (pre-events)"), this._profiler && this._profiler.begin("callbacks and extensions (pre-events)");
            for (let e = 0; e < i.callbacksRuntimeScenePreEvents.length; ++e) i.callbacksRuntimeScenePreEvents[e](this);
            this._profiler && this._profiler.end("callbacks and extensions (pre-events)"), this._profiler && this._profiler.begin("events"), this._eventsFunction !== null && this._eventsFunction(this), this._profiler && this._profiler.end("events"), this._profiler && this._profiler.begin("objects (post-events)"), this._updateObjectsPostEvents(), this._profiler && this._profiler.end("objects (post-events)"), this._profiler && this._profiler.begin("callbacks and extensions (post-events)");
            for (let e = 0; e < i.callbacksRuntimeScenePostEvents.length; ++e) i.callbacksRuntimeScenePostEvents[e](this);
            return this._profiler && this._profiler.end("callbacks and extensions (post-events)"), this._profiler && this._profiler.begin("objects (pre-render, effects update)"), this._updateObjectsPreRender(), this._profiler && this._profiler.end("objects (pre-render, effects update)"), this._profiler && this._profiler.begin("layers (effects update)"), this._updateLayersPreRender(), this._profiler && this._profiler.end("layers (effects update)"), this._profiler && this._profiler.begin("render"), this._debugDrawEnabled && this._debuggerRenderer.renderDebugDraw(this.getAdhocListOfAllInstances(), this._debugDrawShowHiddenInstances, this._debugDrawShowPointsNames, this._debugDrawShowCustomPoints), this._isJustResumed = !1, this.render(), this._profiler && this._profiler.end("render"), this._profiler && this._profiler.endFrame(), !!this.getRequestedChange()
        }
        render() {
            this._renderer.render()
        }
        _updateObjectsPreRender() {
            if (this._timeManager.isFirstFrame()) {
                super._updateObjectsPreRender();
                return
            } else {
                this._updateLayersCameraCoordinates(2);
                const t = this.getAdhocListOfAllInstances();
                for (let e = 0, a = t.length; e < a; ++e) {
                    const n = t[e],
                        r = n.getRendererObject();
                    if (r) {
                        if (n.isHidden()) r.visible = !1;
                        else {
                            const s = this._layersCameraCoordinates[n.getLayer()];
                            if (!s) continue;
                            const o = n.getVisibilityAABB();
                            r.visible = !o || !(o.min[0] > s[2] || o.min[1] > s[3] || o.max[0] < s[0] || o.max[1] < s[1])
                        }
                        r.visible && (this._runtimeGame.getEffectsManager().updatePreRender(n.getRendererEffects(), n), n.updatePreRender(this))
                    } else n.updatePreRender(this)
                }
            }
        }
        setBackgroundColor(t, e, a) {
            this._backgroundColor = parseInt(i.rgbToHex(t, e, a), 16)
        }
        getBackgroundColor() {
            return this._backgroundColor
        }
        setClearCanvas(t) {
            this._clearCanvas = t
        }
        getClearCanvas() {
            return this._clearCanvas
        }
        getName() {
            return this._name
        }
        createNewUniqueId() {
            return this._lastId++, this._lastId
        }
        getRenderer() {
            return this._renderer
        }
        getDebuggerRenderer() {
            return this._debuggerRenderer
        }
        getGame() {
            return this._runtimeGame
        }
        getScene() {
            return this
        }
        getViewportWidth() {
            return this._cachedGameResolutionWidth
        }
        getViewportHeight() {
            return this._cachedGameResolutionHeight
        }
        getViewportOriginX() {
            return this._cachedGameResolutionWidth / 2
        }
        getViewportOriginY() {
            return this._cachedGameResolutionHeight / 2
        }
        convertCoords(t, e, a) {
            const n = a || [0, 0];
            return n[0] = t, n[1] = e, n
        }
        convertInverseCoords(t, e, a) {
            const n = a || [0, 0];
            return n[0] = t, n[1] = e, n
        }
        onChildrenLocationChanged() {}
        getVariables() {
            return this._variables
        }
        getVariablesForExtension(t) {
            return this._variablesByExtensionName.get(t) || null
        }
        getTimeManager() {
            return this._timeManager
        }
        getElapsedTime() {
            return this._timeManager.getElapsedTime()
        }
        getSoundManager() {
            return this._runtimeGame.getSoundManager()
        }
        getAsyncTasksManager() {
            return this._asyncTasksManager
        }
        getRequestedChange() {
            return this._requestedChange
        }
        getRequestedScene() {
            return this._requestedScene
        }
        requestChange(t, e) {
            this._requestedChange = t, e && (this._requestedScene = e)
        }
        getProfiler() {
            return this._profiler
        }
        startProfiler(t) {
            this._profiler || (this._profiler = new i.Profiler, this._onProfilerStopped = t)
        }
        stopProfiler() {
            if (!this._profiler) return;
            const t = this._profiler,
                e = this._onProfilerStopped;
            this._profiler = null, this._onProfilerStopped = null, e && e(t)
        }
        getOnceTriggers() {
            return this._onceTriggers
        }
        sceneJustResumed() {
            return this._isJustResumed
        }
        getNetworkSyncData(t) {
            const e = t.playerNumber,
                a = this._variables.getNetworkSyncData(t),
                n = {};
            return this._variablesByExtensionName.forEach((r, s) => {
                const o = r.getNetworkSyncData(t);
                o && (n[s] = o)
            }), e !== void 0 && e !== 1 && (!this.networkId || a.length === 0 && !Object.keys(n).length) ? null : {
                var: a,
                extVar: n,
                id: this.getOrCreateNetworkId()
            }
        }
        updateFromNetworkSyncData(t) {
            if (t.var && this._variables.updateFromNetworkSyncData(t.var), t.extVar)
                for (const e in t.extVar) {
                    if (!t.extVar.hasOwnProperty(e)) continue;
                    const a = t.extVar[e],
                        n = this._variablesByExtensionName.get(e);
                    n && n.updateFromNetworkSyncData(a)
                }
        }
        getOrCreateNetworkId() {
            if (!this.networkId) {
                const t = i.makeUuid().substring(0, 8);
                this.networkId = t
            }
            return this.networkId
        }
    }
    i.RuntimeScene = c;
    let l;
    (function(s) {
        s[s.CONTINUE = 0] = "CONTINUE", s[s.PUSH_SCENE = 1] = "PUSH_SCENE", s[s.POP_SCENE = 2] = "POP_SCENE", s[s.REPLACE_SCENE = 3] = "REPLACE_SCENE", s[s.CLEAR_SCENES = 4] = "CLEAR_SCENES", s[s.STOP_GAME = 5] = "STOP_GAME"
    })(l = i.SceneChangeRequest || (i.SceneChangeRequest = {}))
})(gdjs || (gdjs = {}));
//# sourceMappingURL=runtimescene.js.map
