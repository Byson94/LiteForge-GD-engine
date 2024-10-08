var gdjs;
(function(i) {
    const o = new i.Logger("Scene stack"),
        r = new i.Logger("Multiplayer - Debug");
    class h {
        constructor(n) {
            this._stack = [];
            this._wasFirstSceneLoaded = !1;
            this._isNextLayoutLoading = !1;
            this._sceneStackSyncDataToApply = null;
            if (!n) throw "SceneStack must be constructed with a gdjs.RuntimeGame.";
            this._runtimeGame = n
        }
        onGameResolutionResized() {
            for (let n = 0; n < this._stack.length; ++n) this._stack[n].onGameResolutionResized()
        }
        step(n) {
            if (this._isNextLayoutLoading || this._stack.length === 0) return !1;
            if (this.applyUpdateFromNetworkSyncDataIfAny()) return r.info("Scene stack has been updated from network sync data, skipping step."), !0;
            const e = this._stack[this._stack.length - 1];
            if (e.renderAndStep(n)) {
                const t = e.getRequestedChange();
                if (t === i.SceneChangeRequest.STOP_GAME) return this._runtimeGame.getRenderer().stopGame(), !0;
                t === i.SceneChangeRequest.POP_SCENE ? this.pop() : t === i.SceneChangeRequest.PUSH_SCENE ? this.push(e.getRequestedScene()) : t === i.SceneChangeRequest.REPLACE_SCENE ? this.replace(e.getRequestedScene()) : t === i.SceneChangeRequest.CLEAR_SCENES ? this.replace(e.getRequestedScene(), !0) : o.error("Unrecognized change in scene stack: " + t)
            }
            return !0
        }
        renderWithoutStep() {
            return this._stack.length === 0 ? !1 : (this._stack[this._stack.length - 1].render(), !0)
        }
        pop(n = 1) {
            let s = !1;
            for (let e = 0; e < n && !(this._stack.length <= 1); ++e) {
                s = !0;
                const t = this._stack.pop();
                if (!t) return;
                t.unloadScene()
            }
            if (s) {
                const e = this._stack[this._stack.length - 1];
                e && e.onResume()
            }
        }
        push(n, s) {
            const e = this._stack[this._stack.length - 1];
            return e && e.onPause(), this._runtimeGame.areSceneAssetsReady(n) ? this._loadNewScene(n, s) : (this._isNextLayoutLoading = !0, this._runtimeGame.loadSceneAssets(n).then(() => {
                this._loadNewScene(n), this._isNextLayoutLoading = !1
            }), null)
        }
        _loadNewScene(n, s) {
            const e = new i.RuntimeScene(this._runtimeGame);
            if (e.loadFromScene(this._runtimeGame.getSceneAndExtensionsData(n)), this._wasFirstSceneLoaded = !0, s) {
                const t = this._runtimeGame.getExternalLayoutData(s);
                t && e.createObjectsFrom(t.instances, 0, 0, 0, !0)
            }
            return this._stack.push(e), e
        }
        replace(n, s) {
            if (s)
                for (; this._stack.length !== 0;) {
                    let e = this._stack.pop();
                    e && e.unloadScene()
                } else if (this._stack.length !== 0) {
                    let e = this._stack.pop();
                    e && e.unloadScene()
                } return this.push(n)
        }
        getCurrentScene() {
            return this._stack.length === 0 ? null : this._stack[this._stack.length - 1]
        }
        wasFirstSceneLoaded() {
            return this._wasFirstSceneLoaded
        }
        getNetworkSyncData(n) {
            const s = n.playerNumber;
            if (s !== void 0 && s !== 1) return null;
            const e = [];
            for (let t = 0; t < this._stack.length; ++t) {
                const a = this._stack[t];
                e.push({
                    name: a.getName(),
                    networkId: a.getOrCreateNetworkId()
                })
            }
            return e
        }
        updateFromNetworkSyncData(n) {
            this._sceneStackSyncDataToApply = n
        }
        applyUpdateFromNetworkSyncDataIfAny() {
            const n = this._sceneStackSyncDataToApply;
            let s = !1;
            if (!n) return s;
            this._sceneStackSyncDataToApply = null;
            for (let e = 0; e < n.length; ++e) {
                const t = n[e],
                    a = this._stack[e];
                if (!a) {
                    r.info(`Scene at position ${e} with name ${t.name} is missing from the stack, adding it.`);
                    const c = this.push(t.name);
                    c && (c.networkId = t.networkId), s = !0;
                    continue
                }
                if (a.getName() !== t.name) {
                    r.info(`Scene at position ${e} and name ${a.getName()} is not the same as the expected ${t.name}, replacing.`);
                    const c = this.replace(t.name, !0);
                    c && (c.networkId = t.networkId), s = !0;
                    continue
                }
                if (!a.networkId && t.networkId && t.name === a.getName()) {
                    r.info(`Scene at position ${e} and name ${a.getName()} has no networkId, let's assume it's the right one and reconcile it with the id ${t.networkId}.`), a.networkId = t.networkId;
                    continue
                }
                if (a.networkId !== t.networkId) {
                    r.info(`Scene at position ${e} and name ${a.getName()} has a different networkId ${a.networkId} than the expected ${t.networkId}, replacing.`);
                    const c = this.replace(t.name, !1);
                    c && (c.networkId = t.networkId), s = !0;
                    continue
                }
            }
            if (this._stack.length > n.length) {
                const e = this._stack.length - n.length;
                this.pop(e), s = !0
            }
            return s
        }
    }
    i.SceneStack = h
})(gdjs || (gdjs = {}));
//# sourceMappingURL=scenestack.js.map
