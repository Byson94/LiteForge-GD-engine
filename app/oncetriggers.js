var gdjs;
(function(i) {
    class r {
        constructor() {
            this._onceTriggers = {};
            this._lastFrameOnceTrigger = {}
        }
        startNewFrame() {
            for (const e in this._lastFrameOnceTrigger) this._lastFrameOnceTrigger.hasOwnProperty(e) && delete this._lastFrameOnceTrigger[e];
            for (const e in this._onceTriggers) this._onceTriggers.hasOwnProperty(e) && (this._lastFrameOnceTrigger[e] = this._onceTriggers[e], delete this._onceTriggers[e])
        }
        triggerOnce(e) {
            return this._onceTriggers[e] = !0, !this._lastFrameOnceTrigger.hasOwnProperty(e)
        }
    }
    i.OnceTriggers = r
})(gdjs || (gdjs = {}));
//# sourceMappingURL=oncetriggers.js.map
