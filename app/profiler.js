var gdjs;
(function(m) {
    class a {
        constructor() {
            this._framesMeasures = [];
            this._currentFrameIndex = 0;
            this._currentFrameMeasure = {
                parent: null,
                time: 0,
                lastStartTime: 0,
                subsections: {}
            };
            this._currentSection = null;
            this._maxFramesCount = 600;
            this._framesCount = 0;
            for (; this._framesMeasures.length < this._maxFramesCount;) this._framesMeasures.push({
                parent: null,
                time: 0,
                lastStartTime: 0,
                subsections: {}
            });
            this._getTimeNow = window.performance && typeof window.performance.now == "function" ? window.performance.now.bind(window.performance) : Date.now
        }
        beginFrame() {
            this._currentFrameMeasure = {
                parent: null,
                time: 0,
                lastStartTime: this._getTimeNow(),
                subsections: {}
            }, this._currentSection = this._currentFrameMeasure
        }
        begin(t) {
            if (this._currentSection === null) throw new Error("Impossible to call Profiler.begin() when not profiling a frame!");
            const e = this._currentSection.subsections,
                r = e[t] = e[t] || {
                    parent: this._currentSection,
                    time: 0,
                    lastStartTime: 0,
                    subsections: {}
                };
            this._currentSection = r, this._currentSection.lastStartTime = this._getTimeNow()
        }
        end(t) {
            if (this._currentSection === null) throw new Error("Impossible to call Profiler.end() when not profiling a frame!");
            const e = this._getTimeNow() - this._currentSection.lastStartTime;
            this._currentSection.time = (this._currentSection.time || 0) + e, this._currentSection.parent !== null && (this._currentSection = this._currentSection.parent)
        }
        endFrame() {
            if (this._currentSection === null) throw new Error("Impossible to end profiling a frame when profiling has not started a frame!");
            if (this._currentSection.parent !== null) throw new Error("Mismatch in profiler, endFrame should be called on root section");
            this.end(), this._framesCount++, this._framesCount > this._maxFramesCount && (this._framesCount = this._maxFramesCount), this._framesMeasures[this._currentFrameIndex] = this._currentFrameMeasure, this._currentFrameIndex++, this._currentFrameIndex >= this._maxFramesCount && (this._currentFrameIndex = 0)
        }
        static _addAverageSectionTimes(t, e, r, o) {
            e.time = (e.time || 0) + t.time / r;
            for (const s in t.subsections)
                if (t.subsections.hasOwnProperty(s)) {
                    const n = e.subsections,
                        i = n[s] = n[s] || {
                            parent: e,
                            time: 0,
                            subsections: {}
                        };
                    a._addAverageSectionTimes(t.subsections[s], i, r, o)
                }
        }
        getFramesAverageMeasures() {
            const t = {
                parent: null,
                time: 0,
                lastStartTime: 0,
                subsections: {}
            };
            for (let e = 0; e < this._framesCount; ++e) a._addAverageSectionTimes(this._framesMeasures[e], t, this._framesCount, e);
            return t
        }
        getStats() {
            return {
                framesCount: this._framesCount
            }
        }
        static getProfilerSectionTexts(t, e, r) {
            const o = e.parent && e.parent.time !== 0 ? (e.time / e.parent.time * 100).toFixed(1) : "100%",
                s = e.time.toFixed(2);
            r.push(t + ": " + s + "ms (" + o + ")");
            const n = [];
            for (const i in e.subsections) e.subsections.hasOwnProperty(i) && a.getProfilerSectionTexts(i, e.subsections[i], n);
            r.push.apply(r, n)
        }
    }
    m.Profiler = a
})(gdjs || (gdjs = {}));
//# sourceMappingURL=profiler.js.map
