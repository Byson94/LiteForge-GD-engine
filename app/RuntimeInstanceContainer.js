var gdjs;
(function(l) {
    const d = new l.Logger("RuntimeInstanceContainer");
    class u {
        constructor() {
            this._allInstancesList = [];
            this._allInstancesListIsUpToDate = !0;
            this._instancesRemoved = [];
            this._layersCameraCoordinates = {};
            this._debugDrawEnabled = !1;
            this._debugDrawShowHiddenInstances = !1;
            this._debugDrawShowPointsNames = !1;
            this._debugDrawShowCustomPoints = !1;
            this._initialBehaviorSharedData = new Hashtable, this._instances = new Hashtable, this._instancesCache = new Hashtable, this._objects = new Hashtable, this._objectsCtor = new Hashtable, this._layers = new Hashtable, this._orderedLayers = []
        }
        enableDebugDraw(e, t, s, a) {
            this._debugDrawEnabled && !e && this.getDebuggerRenderer().clearDebugDraw(), this._debugDrawEnabled = e, this._debugDrawShowHiddenInstances = t, this._debugDrawShowPointsNames = s, this._debugDrawShowCustomPoints = a
        }
        isObjectRegistered(e) {
            return this._objects.containsKey(e) && this._instances.containsKey(e) && this._objectsCtor.containsKey(e)
        }
        registerObject(e) {
            this._objects.put(e.name, e), this._instances.put(e.name, []);
            const t = l.getObjectConstructor(e.type);
            this._objectsCtor.put(e.name, t), t.supportsReinitialization && this._instancesCache.put(e.name, [])
        }
        updateObject(e) {
            this.isObjectRegistered(e.name) || d.warn("Tried to call updateObject for an object that was not registered (" + e.name + "). Call registerObject first."), this._objects.put(e.name, e)
        }
        unregisterObject(e) {
            const t = this._instances.get(e);
            if (t) {
                const s = t.slice();
                for (let a = 0; a < s.length; a++) this.markObjectForDeletion(s[a]);
                this._cacheOrClearRemovedInstances()
            }
            this._objects.remove(e), this._instances.remove(e), this._instancesCache.remove(e), this._objectsCtor.remove(e)
        }
        createObjectsFrom(e, t, s, a, n) {
            let i, o;
            arguments.length === 5 ? (i = a, o = n) : (i = 0, o = arguments[3]);
            for (let h = 0, g = e.length; h < g; ++h) {
                const r = e[h],
                    _ = r.name,
                    c = this.createObject(_);
                c !== null && (o && (c.persistentUuid = r.persistentUuid || null), c.setPosition(r.x + t, r.y + s), c.setAngle(r.angle), l.Base3DHandler && l.Base3DHandler.is3D(c) && (r.z !== void 0 && c.setZ(r.z + i), r.rotationX !== void 0 && c.setRotationX(r.rotationX), r.rotationY !== void 0 && c.setRotationY(r.rotationY)), c.setZOrder(r.zOrder), c.setLayer(r.layer), c.getVariables().initFrom(r.initialVariables, !0), c.extraInitializationFromInitialInstance(r))
            }
        }
        getInitialSharedDataForBehavior(e) {
            return this._initialBehaviorSharedData.get(e)
        }
        setInitialSharedDataForBehavior(e, t) {
            this._initialBehaviorSharedData.put(e, t)
        }
        _setLayerDefaultZOrders() {
            if (this.getGame().getGameData().properties.useDeprecatedZeroAsDefaultZOrder) return;
            const e = {},
                t = this.getAdhocListOfAllInstances();
            for (let s = 0, a = t.length; s < a; ++s) {
                const n = t[s];
                let i = n.getLayer();
                const o = n.getZOrder();
                (e[i] === void 0 || e[i] < o) && (e[i] = o)
            }
            for (let s in e) this.getLayer(s).setDefaultZOrder(e[s] + 1)
        }
        _updateLayersCameraCoordinates(e) {
            this._layersCameraCoordinates = this._layersCameraCoordinates || {};
            for (const t in this._layers.items)
                if (this._layers.items.hasOwnProperty(t)) {
                    const s = this._layers.items[t];
                    this._layersCameraCoordinates[t] = this._layersCameraCoordinates[t] || [0, 0, 0, 0], this._layersCameraCoordinates[t][0] = s.getCameraX() - s.getCameraWidth() / 2 * e, this._layersCameraCoordinates[t][1] = s.getCameraY() - s.getCameraHeight() / 2 * e, this._layersCameraCoordinates[t][2] = s.getCameraX() + s.getCameraWidth() / 2 * e, this._layersCameraCoordinates[t][3] = s.getCameraY() + s.getCameraHeight() / 2 * e
                }
        }
        _updateLayersPreRender() {
            for (const e of this._orderedLayers) e.updatePreRender(this)
        }
        _updateObjectsPreRender() {
            const e = this.getAdhocListOfAllInstances();
            for (let t = 0, s = e.length; t < s; ++t) {
                const a = e[t],
                    n = a.getRendererObject();
                n && (n.visible = !a.isHidden(), n.visible && this.getGame().getEffectsManager().updatePreRender(a.getRendererEffects(), a)), a.updatePreRender(this)
            }
        }
        _cacheOrClearRemovedInstances() {
            for (let e = 0, t = this._instancesRemoved.length; e < t; ++e) {
                const s = this._instancesRemoved[e],
                    a = this._instancesCache.get(s.getName());
                a && a.length < 128 && a.push(s), s.onDestroyed()
            }
            this._instancesRemoved.length = 0
        }
        _constructListOfAllInstances() {
            let e = 0;
            for (const t in this._instances.items)
                if (this._instances.items.hasOwnProperty(t)) {
                    const s = this._instances.items[t],
                        a = e;
                    e += s.length;
                    for (let n = 0, i = s.length; n < i; ++n) a + n < this._allInstancesList.length ? this._allInstancesList[a + n] = s[n] : this._allInstancesList.push(s[n])
                } this._allInstancesList.length = e, this._allInstancesListIsUpToDate = !0
        }
        getInstancesOf(e) {
            return this._instances.items[e]
        }
        getAdhocListOfAllInstances() {
            return this._allInstancesListIsUpToDate || this._constructListOfAllInstances(), this._allInstancesList
        }
        _updateObjectsPreEvents() {
            const e = this.getAdhocListOfAllInstances();
            for (let t = 0, s = e.length; t < s; ++t) {
                const a = e[t],
                    n = a.getElapsedTime();
                if (a.hasNoForces()) a.update(this);
                else {
                    const i = a.getAverageForce(),
                        o = n / 1e3;
                    a.setX(a.getX() + i.getX() * o), a.setY(a.getY() + i.getY() * o), a.update(this), a.updateForces(o)
                }
                a.updateTimers(n), e[t].stepBehaviorsPreEvents(this)
            }
            this._cacheOrClearRemovedInstances()
        }
        _updateObjectsPostEvents() {
            this._cacheOrClearRemovedInstances();
            const e = this.getAdhocListOfAllInstances();
            for (let t = 0, s = e.length; t < s; ++t) e[t].stepBehaviorsPostEvents(this);
            this._cacheOrClearRemovedInstances()
        }
        addObject(e) {
            this._instances.containsKey(e.name) || this._instances.put(e.name, []), this._instances.get(e.name).push(e), this._allInstancesListIsUpToDate = !1
        }
        getObjects(e) {
            return this._instances.containsKey(e) || (d.info('RuntimeScene.getObjects: No instances called "' + e + '"! Adding it.'), this._instances.put(e, [])), this._instances.get(e)
        }
        createObject(e) {
            if (!this._objectsCtor.containsKey(e) || !this._objects.containsKey(e)) return null;
            const t = this._instancesCache.get(e),
                s = this._objectsCtor.get(e);
            let a;
            return !t || t.length === 0 ? a = new s(this, this._objects.get(e)) : (a = t.pop(), a.reinitialize(this._objects.get(e))), this.addObject(a), a
        }
        markObjectForDeletion(e) {
            if (this._instancesRemoved.indexOf(e) === -1 && this._instancesRemoved.push(e), this._instances.containsKey(e.getName())) {
                const t = e.id,
                    s = this._instances.get(e.getName());
                for (let a = 0, n = s.length; a < n; ++a)
                    if (s[a].id == t) {
                        s.splice(a, 1), this._allInstancesListIsUpToDate = !1;
                        break
                    }
            }
            e.onDeletedFromScene(this);
            for (let t = 0; t < l.callbacksObjectDeletedFromScene.length; ++t) l.callbacksObjectDeletedFromScene[t](this, e)
        }
        getLayer(e) {
            return this._layers.containsKey(e) ? this._layers.get(e) : this._layers.get("")
        }
        hasLayer(e) {
            return this._layers.containsKey(e)
        }
        removeLayer(e) {
            const t = this._layers.get(e);
            if (!t) return;
            const s = this.getAdhocListOfAllInstances();
            for (let n = 0; n < s.length; ++n) {
                const i = s[n];
                i.getLayer() === e && i.setLayer("")
            }
            this._layers.remove(e);
            const a = this._orderedLayers.indexOf(t);
            this._orderedLayers.splice(a, 1)
        }
        setLayerIndex(e, t) {
            const s = this._layers.get(e);
            if (!s) return;
            const a = this._orderedLayers.indexOf(s);
            a !== t && (this._orderedLayers.splice(a, 1), this._orderedLayers.splice(t, 0, s), this.getRenderer().setLayerIndex(s, t))
        }
        getAllLayerNames(e) {
            this._layers.keys(e)
        }
        getInstancesCountOnScene(e) {
            const t = this._instances.get(e);
            return t ? t.length : 0
        }
        updateObjectsForces() {
            for (const e in this._instances.items)
                if (this._instances.items.hasOwnProperty(e)) {
                    const t = this._instances.items[e];
                    for (let s = 0, a = t.length; s < a; ++s) {
                        const n = t[s];
                        if (!n.hasNoForces()) {
                            const i = n.getAverageForce(),
                                o = n.getElapsedTime() / 1e3;
                            n.setX(n.getX() + i.getX() * o), n.setY(n.getY() + i.getY() * o), n.updateForces(o)
                        }
                    }
                }
        }
        _destroy() {
            this._layers = new Hashtable, this._orderedLayers = [], this._objects = new Hashtable, this._instances = new Hashtable, this._instancesCache = new Hashtable, this._objectsCtor = new Hashtable, this._allInstancesList = [], this._instancesRemoved = []
        }
    }
    l.RuntimeInstanceContainer = u
})(gdjs || (gdjs = {}));
//# sourceMappingURL=RuntimeInstanceContainer.js.map
