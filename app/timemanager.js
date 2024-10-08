var gdjs;
(function(i) {
    class r {
        constructor() {
            this._elapsedTime = 0;
            this._timeScale = 1;
            this._timeFromStart = 0;
            this._firstFrame = !0;
            this._timers = new Hashtable;
            this._firstUpdateDone = !1;
            this.reset()
        }
        reset() {
            this._elapsedTime = 0, this._timeScale = 1, this._timeFromStart = 0, this._firstFrame = !0, this._timers = new Hashtable
        }
        update(e, s) {
            this._firstUpdateDone && (this._firstFrame = !1), this._firstUpdateDone = !0, this._elapsedTime = Math.min(e, 1e3 / s), this._elapsedTime *= this._timeScale;
            for (const t in this._timers.items) this._timers.items.hasOwnProperty(t) && this._timers.items[t].updateTime(this._elapsedTime);
            this._timeFromStart += this._elapsedTime
        }
        setTimeScale(e) {
            e >= 0 && (this._timeScale = e)
        }
        getTimeScale() {
            return this._timeScale
        }
        getTimeFromStart() {
            return this._timeFromStart
        }
        isFirstFrame() {
            return this._firstFrame
        }
        getElapsedTime() {
            return this._elapsedTime
        }
        addTimer(e) {
            this._timers.put(e, new i.Timer(e))
        }
        hasTimer(e) {
            return this._timers.containsKey(e)
        }
        getTimer(e) {
            return this._timers.get(e)
        }
        removeTimer(e) {
            this._timers.containsKey(e) && this._timers.remove(e)
        }
    }
    i.TimeManager = r
})(gdjs || (gdjs = {}));
//# sourceMappingURL=timemanager.js.map
