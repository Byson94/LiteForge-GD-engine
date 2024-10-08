var gdjs;
(function(a) {
    class n {
        constructor() {
            this._nameToContent = new Map;
            this._fileToContent = new Map
        }
        getFromName(e) {
            return this._nameToContent.get(e) || null
        }
        get(e) {
            let t = this._nameToContent.get(e.name);
            return t || (t = this._fileToContent.get(e.file), t ? (this._nameToContent.set(e.name, t), t) : null)
        }
        set(e, t) {
            this._nameToContent.set(e.name, t), this._fileToContent.set(e.file, t)
        }
        delete(e) {
            this._nameToContent.delete(e.name), this._fileToContent.delete(e.file)
        }
        clear() {
            this._nameToContent.clear(), this._fileToContent.clear()
        }
    }
    a.ResourceCache = n
})(gdjs || (gdjs = {}));
//# sourceMappingURL=ResourceCache.js.map
