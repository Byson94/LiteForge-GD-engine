var gdjs;
(function(c) {
    const l = new c.Logger("JSON Manager"),
        u = ["json", "tilemap", "tileset"];
    class i {
        constructor(r) {
            this._loadedJsons = new c.ResourceCache;
            this._callbacks = new c.ResourceCache;
            this._getJsonResource = r => {
                const s = this._resourceLoader.getResource(r);
                return s && this.getResourceKinds().includes(s.kind) ? s : null
            };
            this._resourceLoader = r
        }
        getResourceKinds() {
            return u
        }
        async loadResource(r) {
            const s = this._resourceLoader.getResource(r);
            if (!s) {
                l.warn('Unable to find json for resource "' + r + '".');
                return
            }
            if (!s.disablePreload) try {
                await this.loadJsonAsync(s.name)
            } catch (e) {
                l.error(`Error while preloading json resource ${s.name}:`, e)
            }
        }
        loadJsonAsync(r) {
            const s = this;
            return new Promise((e, t) => {
                s.loadJson(r, (o, n) => {
                    o && t(o.message), e(n)
                })
            })
        }
        async processResource(r) {}
        loadJson(r, s) {
            const e = this._getJsonResource(r);
            if (!e) {
                s(new Error(`Can't find resource with name: "` + r + '" (or is not a json resource).'), null);
                return
            }
            if (this._loadedJsons.get(e)) {
                s(null, this._loadedJsons.get(e));
                return
            } {
                const n = this._callbacks.get(e);
                if (n) {
                    n.push(s);
                    return
                } else this._callbacks.set(e, [s])
            }
            const t = this,
                o = new XMLHttpRequest;
            o.responseType = "json", o.withCredentials = this._resourceLoader.checkIfCredentialsRequired(e.file), o.open("GET", this._resourceLoader.getFullUrl(e.file)), o.onload = function() {
                const n = t._callbacks.get(e);
                if (!!n) {
                    if (o.status !== 200) {
                        for (const a of n) a(new Error("HTTP error: " + o.status + "(" + o.statusText + ")"), null);
                        t._callbacks.delete(e);
                        return
                    }
                    t._loadedJsons.set(e, o.response);
                    for (const a of n) a(null, o.response);
                    t._callbacks.delete(e)
                }
            }, o.onerror = function() {
                const n = t._callbacks.get(e);
                if (!!n) {
                    for (const a of n) a(new Error("Network error"), null);
                    t._callbacks.delete(e)
                }
            }, o.onabort = function() {
                const n = t._callbacks.get(e);
                if (!!n) {
                    for (const a of n) a(new Error("Request aborted"), null);
                    t._callbacks.delete(e)
                }
            }, o.send()
        }
        isJsonLoaded(r) {
            return !!this._loadedJsons.getFromName(r)
        }
        getLoadedJson(r) {
            return this._loadedJsons.getFromName(r) || null
        }
    }
    c.JsonManager = i
})(gdjs || (gdjs = {}));
//# sourceMappingURL=jsonmanager.js.map
