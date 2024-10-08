var gdjs;
(function(a) {
    const c = new a.Logger("CustomRuntimeObject");
    class h extends a.RuntimeInstanceContainer {
        constructor(t, n) {
            super();
            this._isLoaded = !1;
            this._parent = t, this._customObject = n, this._runtimeScene = t.getScene(), this._debuggerRenderer = new a.DebuggerRenderer(this)
        }
        addLayer(t) {
            const n = new a.RuntimeCustomObjectLayer(t, this);
            this._layers.put(t.name, n), this._orderedLayers.push(n)
        }
        createObject(t) {
            const n = super.createObject(t);
            return this._customObject.onChildrenLocationChanged(), n
        }
        loadFrom(t) {
            this._isLoaded && this.onDestroyFromScene(this._parent);
            const n = this._runtimeScene.getGame().getEventsBasedObjectData(t.type);
            if (!n) {
                c.error("loadFrom was called without an events-based object");
                return
            }
            for (let s = 0, e = n.objects.length; s < e; ++s) {
                const r = n.objects[s];
                this.registerObject({
                    ...r,
                    ...t.childrenContent[r.name]
                })
            }
            if (t.layers.length > 0)
                for (let s = 0, e = t.layers.length; s < e; ++s) this.addLayer(t.layers[s]);
            else this.addLayer({
                name: "",
                visibility: !0,
                cameras: [{
                    defaultSize: !0,
                    defaultViewport: !0,
                    height: 0,
                    viewportBottom: 0,
                    viewportLeft: 0,
                    viewportRight: 0,
                    viewportTop: 0,
                    width: 0
                }],
                effects: [],
                ambientLightColorR: 0,
                ambientLightColorG: 0,
                ambientLightColorB: 0,
                isLightingLayer: !1,
                followBaseLayerCamera: !1
            });
            this.createObjectsFrom(t.instances, 0, 0, 0, !0), this._setLayerDefaultZOrders(), this._isLoaded = !0
        }
        updateFrom(t, n) {
            const s = this._runtimeScene.getGame().getEventsBasedObjectData(n.type);
            if (!s) return c.error("updateFrom was called without an events-based object"), !1;
            for (let e = 0, r = s.objects.length; e < r; ++e) {
                const o = s.objects[e].name,
                    i = {
                        ...s.objects[e],
                        ...t.childrenContent[o]
                    },
                    d = {
                        ...s.objects[e],
                        ...n.childrenContent[o]
                    };
                this.updateObject(d);
                for (const l of this.getInstancesOf(o)) l.updateFromObjectData(i, d)
            }
            return !0
        }
        onDestroyFromScene(t) {
            if (!this._isLoaded) return;
            const n = this.getAdhocListOfAllInstances();
            for (let s = 0, e = n.length; s < e; ++s) n[s].onDeletedFromScene(this);
            this._destroy(), this._isLoaded = !1
        }
        _destroy() {
            super._destroy(), this._onceTriggers = null
        }
        _updateObjectsPreRender() {
            const t = this.getAdhocListOfAllInstances();
            for (let n = 0, s = t.length; n < s; ++n) {
                const e = t[n],
                    r = e.getRendererObject();
                r && (r.visible = !e.isHidden(), r.visible && this.getGame().getEffectsManager().updatePreRender(e.getRendererEffects(), e)), this._debugDrawEnabled && this._debuggerRenderer.renderDebugDraw(t, this._debugDrawShowHiddenInstances, this._debugDrawShowPointsNames, this._debugDrawShowCustomPoints), e.updatePreRender(this)
            }
        }
        _updateObjectsPreEvents() {
            const t = this.getAdhocListOfAllInstances();
            for (let n = 0, s = t.length; n < s; ++n) {
                const e = t[n],
                    r = e.getElapsedTime();
                if (e.hasNoForces()) e.update(this);
                else {
                    const o = e.getAverageForce(),
                        i = r / 1e3;
                    e.setX(e.getX() + o.getX() * i), e.setY(e.getY() + o.getY() * i), e.update(this), e.updateForces(i)
                }
                e.updateTimers(r), e.stepBehaviorsPreEvents(this)
            }
            this._cacheOrClearRemovedInstances()
        }
        getRenderer() {
            return this._customObject.getRenderer()
        }
        getDebuggerRenderer() {
            return this._debuggerRenderer
        }
        getGame() {
            return this._runtimeScene.getGame()
        }
        getScene() {
            return this._runtimeScene
        }
        getViewportWidth() {
            return this._customObject.getUnscaledWidth()
        }
        getViewportHeight() {
            return this._customObject.getUnscaledHeight()
        }
        getViewportOriginX() {
            return this._customObject.getUnscaledCenterX()
        }
        getViewportOriginY() {
            return this._customObject.getUnscaledCenterY()
        }
        onChildrenLocationChanged() {
            this._customObject.onChildrenLocationChanged()
        }
        convertCoords(t, n, s) {
            let e = s || [0, 0];
            return e = this._parent.getLayer(this._customObject.getLayer()).convertCoords(t, n, 0, e), this._customObject.applyObjectInverseTransformation(e[0], e[1], e), e
        }
        convertInverseCoords(t, n, s) {
            const e = s || [0, 0];
            return this._customObject.applyObjectTransformation(t, n, e), this._parent.convertInverseCoords(e[0], e[1], e)
        }
        getElapsedTime() {
            return this._parent.getElapsedTime()
        }
    }
    a.CustomRuntimeObjectInstanceContainer = h
})(gdjs || (gdjs = {}));
//# sourceMappingURL=CustomRuntimeObjectInstanceContainer.js.map
