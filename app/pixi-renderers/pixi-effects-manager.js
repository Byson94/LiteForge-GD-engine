var gdjs;
(function(i) {
    class f {
        initializeEffect(e, t, n) {
            const r = i.PixiFiltersTools.getFilterCreator(e.effectType);
            return r ? (t[e.name] = r.makeFilter(n, e), !0) : (console.warn(`Effect: "${e.name}", on layer: "${n.getName()}", has an unknown effect type: "${e.effectType}". Was it registered properly? Is the effect type correct?`), !1)
        }
        updatePreRender(e, t) {
            for (const n in e) e[n].updatePreRender(t)
        }
        addEffect(e, t, n) {
            let r = !0;
            return r = this.initializeEffect(e, t, n) && r, r = this.updateAllEffectParameters(t, e) && r, t[e.name] && (r = t[e.name].applyEffect(n) && r), r
        }
        removeEffect(e, t, n) {
            const r = e[n];
            return r ? (r.removeEffect(t), delete e[n], !0) : !1
        }
        clearEffects(e) {
            return e && (e.filters = []), !0
        }
        setEffectDoubleParameter(e, t, n, r) {
            const a = e[t];
            return a ? (a.updateDoubleParameter(n, r), !0) : !1
        }
        setEffectStringParameter(e, t, n, r) {
            const a = e[t];
            return a ? (a.updateStringParameter(n, r), !0) : !1
        }
        setEffectBooleanParameter(e, t, n, r) {
            const a = e[t];
            return a ? (a.updateBooleanParameter(n, r), !0) : !1
        }
        updateAllEffectParameters(e, t) {
            let n = !0,
                r = !0,
                a = !0;
            for (let s in t.doubleParameters) n = this.setEffectDoubleParameter(e, t.name, s, t.doubleParameters[s]) && n;
            for (let s in t.stringParameters) r = this.setEffectStringParameter(e, t.name, s, t.stringParameters[s]) && r;
            for (let s in t.booleanParameters) a = this.setEffectBooleanParameter(e, t.name, s, t.booleanParameters[s]) && a;
            return n && r && a
        }
        hasEffect(e, t) {
            return !!e[t]
        }
        enableEffect(e, t, n, r) {
            const a = e[n];
            !a || a.setEnabled(t, r)
        }
        isEffectEnabled(e, t, n) {
            const r = e[n];
            return r ? r.isEnabled(t) : !1
        }
    }
    i.EffectsManager = f
})(gdjs || (gdjs = {}));
//# sourceMappingURL=pixi-effects-manager.js.map
