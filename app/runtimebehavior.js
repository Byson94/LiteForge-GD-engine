var gdjs;
(function(i) {
    class n {
        constructor(e) {
            this.minX = 0;
            this.minY = 0;
            this.maxX = 0;
            this.maxY = 0;
            this.behavior = e, this.updateAABBFromOwner()
        }
        updateAABBFromOwner() {
            this.minX = this.behavior.owner.getAABB().min[0], this.minY = this.behavior.owner.getAABB().min[1], this.maxX = this.behavior.owner.getAABB().max[0], this.maxY = this.behavior.owner.getAABB().max[1]
        }
    }
    i.BehaviorRBushAABB = n;
    class o {
        constructor(e, t, r) {
            this.owner = r;
            this._activated = !0;
            this._syncOverNetwork = !0;
            this.name = t.name || "", this.type = t.type || "", this._nameId = i.RuntimeObject.getNameIdentifier(this.name)
        }
        updateFromBehaviorData(e, t) {
            return !1
        }
        getNetworkSyncData() {
            return {
                act: this._activated,
                props: {}
            }
        }
        updateFromNetworkSyncData(e) {
            e.act !== this._activated && this.activate(e.act)
        }
        getName() {
            return this.name
        }
        getNameId() {
            return this._nameId
        }
        stepPreEvents(e) {
            if (this._activated) {
                const t = e.getScene().getProfiler();
                t && t.begin(this.name), this.doStepPreEvents(e), t && t.end(this.name)
            }
        }
        stepPostEvents(e) {
            if (this._activated) {
                const t = e.getScene().getProfiler();
                t && t.begin(this.name), this.doStepPostEvents(e), t && t.end(this.name)
            }
        }
        activate(e) {
            e === void 0 && (e = !0), !this._activated && e ? (this._activated = !0, this.onActivate()) : this._activated && !e && (this._activated = !1, this.onDeActivate())
        }
        onCreated() {}
        activated() {
            return this._activated
        }
        onActivate() {}
        onDeActivate() {}
        doStepPreEvents(e) {}
        doStepPostEvents(e) {}
        onDestroy() {}
        onObjectHotReloaded() {}
        usesLifecycleFunction() {
            return !0
        }
        enableSynchronization(e) {
            this._syncOverNetwork = e
        }
        isSyncedOverNetwork() {
            return this._syncOverNetwork
        }
    }
    i.RuntimeBehavior = o, i.registerBehavior("", i.RuntimeBehavior)
})(gdjs || (gdjs = {}));
//# sourceMappingURL=runtimebehavior.js.map
