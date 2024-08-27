var gdjs;
(function(n) {
    const f = new n.Logger("Filters");
    let u;
    (function(i) {
        i.clampValue = function(r, e, t) {
            return Math.max(e, Math.min(t, r))
        }, i.clampKernelSize = function(r, e, t) {
            const a = Math.round((t - e) / 2 + 1),
                s = new Array(a);
            for (let o = 0; o < a; o++) s[o] = e + 2 * o;
            return s.indexOf(r) !== -1 ? r : e
        };
        const l = {};
        i.getFilterCreator = function(r) {
            return l.hasOwnProperty(r) ? l[r] : null
        }, i.registerFilterCreator = function(r, e) {
            l.hasOwnProperty(r) && f.warn('Filter "' + r + '" was already registered in gdjs.PixiFiltersTools. Replacing it with the new one.'), l[r] = e
        }, i.rgbOrHexToHexNumber = function(r) {
            const e = r.split(";");
            return e.length === 3 ? n.rgbToHexNumber(parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)) : parseInt(r.replace("#", "0x"), 16)
        };
        class F {
            makeFilter(e, t) {
                const a = this.makePIXIFilter(e, t);
                return e.isLightingLayer && e.isLightingLayer() && (a.blendMode = PIXI.BLEND_MODES.ADD), new m(a, this)
            }
        }
        i.PixiFilterCreator = F;
        class m {
            constructor(e, t) {
                this.pixiFilter = e, this.filterCreator = t
            }
            isEnabled(e) {
                return this.pixiFilter.enabled
            }
            setEnabled(e, t) {
                return this.pixiFilter.enabled = t
            }
            applyEffect(e) {
                const t = e.getRendererObject();
                return t ? (t.filters = (t.filters || []).concat(this.pixiFilter), !0) : !1
            }
            removeEffect(e) {
                const t = e.getRendererObject();
                return t ? (t.filters = (t.filters || []).filter(a => a !== this.pixiFilter), !0) : !1
            }
            updatePreRender(e) {
                this.filterCreator.updatePreRender(this.pixiFilter, e)
            }
            updateDoubleParameter(e, t) {
                this.filterCreator.updateDoubleParameter(this.pixiFilter, e, t)
            }
            updateStringParameter(e, t) {
                this.filterCreator.updateStringParameter(this.pixiFilter, e, t)
            }
            updateBooleanParameter(e, t) {
                this.filterCreator.updateBooleanParameter(this.pixiFilter, e, t)
            }
            updateColorParameter(e, t) {
                this.filterCreator.updateColorParameter(this.pixiFilter, e, t)
            }
            getDoubleParameter(e) {
                return this.filterCreator.getDoubleParameter(this.pixiFilter, e)
            }
            getColorParameter(e) {
                return this.filterCreator.getColorParameter(this.pixiFilter, e)
            }
            getNetworkSyncData() {
                return {
                    ena: this.pixiFilter.enabled,
                    fc: this.filterCreator.getNetworkSyncData(this.pixiFilter)
                }
            }
            updateFromNetworkSyncData(e) {
                this.pixiFilter.enabled = e.ena, this.filterCreator.updateFromNetworkSyncData(this.pixiFilter, e.fc)
            }
        }
        i.PixiFilter = m;
        class P {
            isEnabled(e) {
                return !1
            }
            setEnabled(e, t) {
                return !1
            }
            applyEffect(e) {
                return !1
            }
            removeEffect(e) {
                return !1
            }
            updatePreRender(e) {}
            updateDoubleParameter(e, t) {}
            updateStringParameter(e, t) {}
            updateBooleanParameter(e, t) {}
            updateColorParameter(e, t) {}
            getDoubleParameter(e) {
                return 0
            }
            getColorParameter(e) {
                return 0
            }
            getNetworkSyncData() {
                return {}
            }
            updateFromNetworkSyncData(e) {}
        }
        i.EmptyFilter = P
    })(u = n.PixiFiltersTools || (n.PixiFiltersTools = {}))
})(gdjs || (gdjs = {}));
//# sourceMappingURL=pixi-filters-tools.js.map
