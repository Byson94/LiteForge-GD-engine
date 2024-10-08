var gdjs;
(function(i) {
    class t {
        constructor(e) {
            this._time = 0;
            this._paused = !1;
            this._name = e
        }
        getName() {
            return this._name
        }
        getTime() {
            return this._time
        }
        updateTime(e) {
            this._paused || (this._time += e)
        }
        setTime(e) {
            this._time = e
        }
        reset() {
            this.setTime(0)
        }
        setPaused(e) {
            this._paused = e
        }
        isPaused() {
            return this._paused
        }
        getNetworkSyncData() {
            return {
                time: this._time,
                paused: this._paused
            }
        }
        updateFromNetworkSyncData(e) {
            this._time = e.time, this._paused = e.paused
        }
    }
    i.Timer = t
})(gdjs || (gdjs = {}));
//# sourceMappingURL=timer.js.map
