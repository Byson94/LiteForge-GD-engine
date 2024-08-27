var gdjs;
(function(i) {
    const g = new i.Logger("Game manager"),
        h = u => new Promise(e => setTimeout(e, u)),
        c = u => u.usedResources.map(e => e.name);
    let l = null;
    const p = () => {
        if (l) return l;
        l = [];
        try {
            new CompressionStream("gzip"), l.push("cs:gzip")
        } catch {}
        try {
            new CompressionStream("deflate"), l.push("cs:deflate")
        } catch {}
        return l
    };
    class m {
        constructor(e, t) {
            this._sceneAndExtensionsData = [];
            this._notifyScenesForGameResolutionResize = !1;
            this._paused = !1;
            this._hasJustResumed = !1;
            this._sessionMetricsInitialized = !1;
            this._disableMetrics = !1;
            this.getPlatformInfo = () => ({
                isCordova: !!window.cordova,
                devicePlatform: typeof device != "undefined" && device.platform || "",
                navigatorPlatform: typeof navigator != "undefined" ? navigator.platform : "",
                hasTouch: typeof navigator != "undefined" ? !!navigator.maxTouchPoints && navigator.maxTouchPoints > 2 : !1,
                supportedCompressionMethods: p()
            });
            this._options = t || {}, this._variables = new i.VariablesContainer(e.variables), this._variablesByExtensionName = new Map;
            for (const s of e.eventsFunctionsExtensions) s.globalVariables.length > 0 && this._variablesByExtensionName.set(s.name, new i.VariablesContainer(s.globalVariables));
            this._data = e, this._updateSceneAndExtensionsData(), this._resourcesLoader = new i.ResourceLoader(this, e.resources.resources, c(e), e.layouts), this._effectsManager = new i.EffectsManager, this._maxFPS = this._data.properties.maxFPS, this._minFPS = this._data.properties.minFPS, this._gameResolutionWidth = this._data.properties.windowWidth, this._gameResolutionHeight = this._data.properties.windowHeight, this._originalWidth = this._gameResolutionWidth, this._originalHeight = this._gameResolutionHeight, this._resizeMode = this._data.properties.sizeOnStartupMode, this._adaptGameResolutionAtRuntime = this._data.properties.adaptGameResolutionAtRuntime, this._scaleMode = e.properties.scaleMode || "linear", this._pixelsRounding = this._data.properties.pixelsRounding, this._antialiasingMode = this._data.properties.antialiasingMode, this._isAntialisingEnabledOnMobile = this._data.properties.antialisingEnabledOnMobile, this._renderer = new i.RuntimeGameRenderer(this, this._options.forceFullscreen || !1), this._watermark = new i.watermark.RuntimeWatermark(this, e.properties.authorUsernames, this._data.properties.watermark), this._sceneStack = new i.SceneStack(this), this._inputManager = new i.InputManager, this._injectExternalLayout = this._options.injectExternalLayout || "", this._debuggerClient = i.DebuggerClient ? new i.DebuggerClient(this) : null, this._isPreview = this._options.isPreview || !1, this._sessionId = null, this._playerId = null, this._embeddedResourcesMappings = new Map;
            for (const s of this._data.resources.resources)
                if (s.metadata) try {
                    const n = JSON.parse(s.metadata);
                    n?.embeddedResourcesMapping && this._embeddedResourcesMappings.set(s.name, n.embeddedResourcesMapping)
                } catch {
                    g.error("Some metadata of resources can not be successfully parsed.")
                }
            if (this._eventsBasedObjectDatas = new Map, this._data.eventsFunctionsExtensions)
                for (const s of this._data.eventsFunctionsExtensions)
                    for (const n of s.eventsBasedObjects) this._eventsBasedObjectDatas.set(s.name + "::" + n.name, n);
            this.isUsingGDevelopDevelopmentEnvironment() && g.info("This game will run on the development version of GDevelop APIs.")
        }
        setProjectData(e) {
            this._data = e, this._updateSceneAndExtensionsData(), this._resourcesLoader.setResources(e.resources.resources, c(e), e.layouts)
        }
        _updateSceneAndExtensionsData() {
            const e = this._data.eventsFunctionsExtensions.filter(t => t.sceneVariables.length > 0);
            this._sceneAndExtensionsData = this._data.layouts.map(t => ({
                sceneData: t,
                usedExtensionsWithVariablesData: e
            }))
        }
        getAdditionalOptions() {
            return this._options
        }
        getRenderer() {
            return this._renderer
        }
        getVariables() {
            return this._variables
        }
        getVariablesForExtension(e) {
            return this._variablesByExtensionName.get(e) || null
        }
        getSoundManager() {
            return this._resourcesLoader.getSoundManager()
        }
        getImageManager() {
            return this._resourcesLoader.getImageManager()
        }
        getFontManager() {
            return this._resourcesLoader.getFontManager()
        }
        getBitmapFontManager() {
            return this._resourcesLoader.getBitmapFontManager()
        }
        getJsonManager() {
            return this._resourcesLoader.getJsonManager()
        }
        getModel3DManager() {
            return this._resourcesLoader.getModel3DManager()
        }
        getSpineManager() {
            return this._resourcesLoader.getSpineManager()
        }
        getSpineAtlasManager() {
            return this._resourcesLoader.getSpineAtlasManager()
        }
        getInputManager() {
            return this._inputManager
        }
        getEffectsManager() {
            return this._effectsManager
        }
        getGameData() {
            return this._data
        }
        getEventsBasedObjectData(e) {
            const t = this._eventsBasedObjectDatas.get(e);
            return t || (g.error('The game has no events-based object of the type "' + e + '"'), null)
        }
        getSceneAndExtensionsData(e) {
            for (let t = 0, s = this._sceneAndExtensionsData.length; t < s; ++t) {
                const n = this._sceneAndExtensionsData[t];
                if (e === void 0 || n.sceneData.name === e) return n
            }
            return g.error('The game has no scene called "' + e + '"'), null
        }
        hasScene(e) {
            for (let t = 0, s = this._data.layouts.length; t < s; ++t) {
                const n = this._data.layouts[t];
                if (e === void 0 || n.name == e) return !0
            }
            return !1
        }
        getExternalLayoutData(e) {
            let t = null;
            for (let s = 0, n = this._data.externalLayouts.length; s < n; ++s) {
                const r = this._data.externalLayouts[s];
                if (r.name === e) {
                    t = r;
                    break
                }
            }
            return t
        }
        getInitialObjectsData() {
            return this._data.objects || []
        }
        getOriginalWidth() {
            return this._originalWidth
        }
        getOriginalHeight() {
            return this._originalHeight
        }
        getGameResolutionWidth() {
            return this._gameResolutionWidth
        }
        getGameResolutionHeight() {
            return this._gameResolutionHeight
        }
        setGameResolutionSize(e, t) {
            if (this._gameResolutionWidth = e, this._gameResolutionHeight = t, this._adaptGameResolutionAtRuntime && i.RuntimeGameRenderer && i.RuntimeGameRenderer.getWindowInnerWidth && i.RuntimeGameRenderer.getWindowInnerHeight) {
                const s = i.RuntimeGameRenderer.getWindowInnerWidth(),
                    n = i.RuntimeGameRenderer.getWindowInnerHeight();
                this._resizeMode === "adaptWidth" ? this._gameResolutionWidth = this._gameResolutionHeight * s / n : this._resizeMode === "adaptHeight" && (this._gameResolutionHeight = this._gameResolutionWidth * n / s)
            }
            this._renderer.updateRendererSize(), this._notifyScenesForGameResolutionResize = !0
        }
        setGameResolutionResizeMode(e) {
            this._resizeMode = e, this._forceGameResolutionUpdate()
        }
        getGameResolutionResizeMode() {
            return this._resizeMode
        }
        setAdaptGameResolutionAtRuntime(e) {
            this._adaptGameResolutionAtRuntime = e, this._forceGameResolutionUpdate()
        }
        getAdaptGameResolutionAtRuntime() {
            return this._adaptGameResolutionAtRuntime
        }
        getMinimalFramerate() {
            return this._minFPS
        }
        getScaleMode() {
            return this._scaleMode
        }
        getPixelsRounding() {
            return this._pixelsRounding
        }
        getAntialiasingMode() {
            return this._antialiasingMode
        }
        isAntialisingEnabledOnMobile() {
            return this._isAntialisingEnabledOnMobile
        }
        pause(e) {
            this._paused !== e && (this._paused = e, this._debuggerClient && (this._paused ? this._debuggerClient.sendGamePaused() : this._debuggerClient.sendGameResumed()))
        }
        hasJustResumed() {
            return this._hasJustResumed
        }
        prioritizeLoadingOfScene(e) {
            this._resourcesLoader.loadSceneResources(e)
        }
        getSceneLoadingProgress(e) {
            return this._resourcesLoader.getSceneLoadingProgress(e)
        }
        areSceneAssetsLoaded(e) {
            return this._resourcesLoader.areSceneAssetsLoaded(e)
        }
        areSceneAssetsReady(e) {
            return this._resourcesLoader.areSceneAssetsReady(e)
        }
        loadAllAssets(e, t) {
            this.loadFirstAssetsAndStartBackgroundLoading(this._getFirstSceneName(), t).then(e)
        }
        async loadFirstAssetsAndStartBackgroundLoading(e, t) {
            try {
                const s = this._data.properties.loadingScreen.backgroundImageResourceName;
                s && await this._resourcesLoader.getImageManager().loadResource(s), await Promise.all([this._loadAssetsWithLoadingScreen(!0, async n => {
                    await this._resourcesLoader.loadGlobalAndFirstSceneResources(e, n), this._resourcesLoader.loadAllSceneInBackground()
                }, t), i.getAllAsynchronouslyLoadingLibraryPromise()])
            } catch (s) {
                throw this._debuggerClient && this._debuggerClient.onUncaughtException(s), s
            }
        }
        async loadSceneAssets(e, t) {
            await this._loadAssetsWithLoadingScreen(!1, async s => {
                await this._resourcesLoader.loadAndProcessSceneResources(e, s)
            }, t)
        }
        async _loadAssetsWithLoadingScreen(e, t, s) {
            this.pause(!0);
            const n = new i.LoadingScreenRenderer(this.getRenderer(), this._resourcesLoader.getImageManager(), this._data.properties.loadingScreen, this._data.properties.watermark.showWatermark, e);
            await t(async (o, a) => {
                const d = Math.floor(100 * o / a);
                n.setPercent(d), s && s(d), n.renderIfNeeded() && await h(1)
            }), await n.unload(), this.pause(!1)
        }
        _getFirstSceneName() {
            const e = this._data.firstLayout;
            return this.hasScene(e) ? e : this.getSceneAndExtensionsData().sceneData.name
        }
        startGameLoop() {
            try {
                if (!this.hasScene()) {
                    g.error("The game has no scene.");
                    return
                }
                this._forceGameResolutionUpdate(), this._sceneStack.push(this._getFirstSceneName(), this._injectExternalLayout), this._watermark.displayAtStartup(), this._setupGameVisibilityEvents();
                let e = 0;
                this._hasJustResumed = !1, this._renderer.startGameLoop(t => {
                    try {
                        if (this._paused || (e += t, this._maxFPS > 0 && 1e3 / e > this._maxFPS + 7)) return !0;
                        const s = e;
                        return e = 0, this._notifyScenesForGameResolutionResize && (this._sceneStack.onGameResolutionResized(), this._notifyScenesForGameResolutionResize = !1), this._sceneStack.step(s) ? (this.getInputManager().onFrameEnded(), this._hasJustResumed = !1, !0) : !1
                    } catch (s) {
                        throw this._debuggerClient && this._debuggerClient.onUncaughtException(s), s
                    }
                }), setTimeout(() => {
                    this._setupSessionMetrics()
                }, 1e4)
            } catch (e) {
                throw this._debuggerClient && this._debuggerClient.onUncaughtException(e), e
            }
        }
        enableMetrics(e) {
            this._disableMetrics = !e, e && this._setupSessionMetrics()
        }
        _setupGameVisibilityEvents() {
            typeof navigator != "undefined" && typeof document != "undefined" && (document.addEventListener("visibilitychange", () => {
                document.visibilityState === "visible" && (this._hasJustResumed = !0)
            }), window.addEventListener("resume", () => {
                this._hasJustResumed = !0
            }, !1))
        }
        _setupSessionMetrics() {
            if (this._sessionMetricsInitialized || this._disableMetrics || this.isPreview() || typeof fetch == "undefined" || !this._data.properties.projectUuid) return;
            const e = "https://api.gdevelop-app.com/analytics";
            this._playerId = this._makePlayerUuid();
            let t = 0,
                s = 0,
                n = Date.now();
            const r = this.getPlatformInfo();
            fetch(e + "/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    gameId: this._data.properties.projectUuid,
                    playerId: this._playerId,
                    game: {
                        name: this._data.properties.name || "",
                        packageName: this._data.properties.packageName || "",
                        version: this._data.properties.version || "",
                        location: window.location.href
                    },
                    platform: {
                        isCordova: r.isCordova,
                        devicePlatform: r.devicePlatform,
                        navigatorPlatform: r.navigatorPlatform,
                        hasTouch: r.hasTouch
                    }
                })
            }).then(a => {
                if (!a.ok) throw console.error("Error while creating the session", a), new Error("Error while creating the session");
                return a
            }).then(a => a.text()).then(a => {
                this._sessionId = a
            }).catch(() => {});
            const o = () => {
                if (!this._sessionId) return;
                const a = Date.now();
                if (s += a - n, n = a, s < 5 * 1e3) return;
                const d = Math.floor(s / 1e3) * 1e3;
                t += d, s -= d, navigator.sendBeacon(e + "/session-hit", JSON.stringify({
                    gameId: this._data.properties.projectUuid,
                    playerId: this._playerId,
                    sessionId: this._sessionId,
                    duration: Math.floor(t / 1e3)
                }))
            };
            if (typeof navigator != "undefined" && typeof document != "undefined") {
                document.addEventListener("visibilitychange", () => {
                    document.visibilityState === "visible" ? n = Date.now() : o()
                }), window.addEventListener("pagehide", o, !1), window.addEventListener("pause", o, !1), window.addEventListener("resume", () => {
                    n = Date.now()
                }, !1);
                const a = typeof safari == "object" && safari.pushNotification,
                    d = /electron/i.test(navigator.userAgent);
                (a || d) && window.addEventListener("beforeunload", () => {
                    o()
                })
            }
            this._sessionMetricsInitialized = !0, this._sessionId = this._sessionId
        }
        _makePlayerUuid() {
            try {
                const e = "GDJS-internal-player-uuid",
                    t = localStorage.getItem(e);
                if (t) return t;
                const s = i.makeUuid();
                return localStorage.setItem(e, s), s
            } catch {
                return i.makeUuid()
            }
        }
        getSessionId() {
            return this._sessionId
        }
        getPlayerId() {
            return this._playerId
        }
        onWindowInnerSizeChanged() {
            this._forceGameResolutionUpdate()
        }
        _forceGameResolutionUpdate() {
            this.setGameResolutionSize(this._gameResolutionWidth, this._gameResolutionHeight)
        }
        startCurrentSceneProfiler(e) {
            const t = this._sceneStack.getCurrentScene();
            return t ? (t.startProfiler(e), !0) : !1
        }
        stopCurrentSceneProfiler() {
            const e = this._sceneStack.getCurrentScene();
            !e || e.stopProfiler()
        }
        wasFirstSceneLoaded() {
            return this._sceneStack.wasFirstSceneLoaded()
        }
        getSceneStack() {
            return this._sceneStack
        }
        isPreview() {
            return this._isPreview
        }
        isUsingGDevelopDevelopmentEnvironment() {
            return this._options.environment === "dev"
        }
        getExtensionProperty(e, t) {
            for (let s of this._data.properties.extensionProperties)
                if (s.extension === e && s.property === t) return s.value;
            return null
        }
        resolveEmbeddedResource(e, t) {
            const s = this._embeddedResourcesMappings.get(e);
            return s && s[t] ? s[t] : t
        }
        getEmbeddedResourcesNames(e) {
            return this._embeddedResourcesMappings.has(e) ? Object.keys(this._embeddedResourcesMappings.get(e)) : []
        }
        getNetworkSyncData(e) {
            const t = {
                    var: this._variables.getNetworkSyncData(e),
                    ss: this._sceneStack.getNetworkSyncData(e) || void 0
                },
                s = {};
            return this._variablesByExtensionName.forEach((n, r) => {
                const o = n.getNetworkSyncData(e);
                o.length && (s[r] = o)
            }), t.extVar = s, (!t.var || t.var.length === 0) && !t.ss && (!t.extVar || Object.keys(t.extVar).length === 0) ? null : t
        }
        updateFromNetworkSyncData(e) {
            if (e.var && this._variables.updateFromNetworkSyncData(e.var), e.ss && this._sceneStack.updateFromNetworkSyncData(e.ss), e.extVar)
                for (const t in e.extVar) {
                    if (!e.extVar.hasOwnProperty(t)) continue;
                    const s = e.extVar[t],
                        n = this.getVariablesForExtension(t);
                    n && n.updateFromNetworkSyncData(s)
                }
        }
    }
    i.RuntimeGame = m
})(gdjs || (gdjs = {}));
//# sourceMappingURL=runtimegame.js.map
