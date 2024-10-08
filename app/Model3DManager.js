var gdjs;
(function(t) {
    const a = new t.Logger("Model3DManager"),
        n = ["model3D"];
    class c {
        constructor(r) {
            this._loadedThreeModels = new t.ResourceCache;
            this._downloadedArrayBuffers = new t.ResourceCache;
            this._loader = null;
            this._dracoLoader = null;
            if (this._resourceLoader = r, typeof THREE != "undefined") {
                this._loader = new THREE_ADDONS.GLTFLoader, this._dracoLoader = new THREE_ADDONS.DRACOLoader, this._dracoLoader.setDecoderPath("./pixi-renderers/draco/gltf/"), this._loader.setDRACOLoader(this._dracoLoader);
                const e = new THREE.Group;
                e.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
                    color: "#ff00ff"
                }))), this._invalidModel = {
                    scene: e,
                    animations: [],
                    cameras: [],
                    scenes: [],
                    asset: {},
                    userData: {},
                    parser: null
                }
            }
        }
        getResourceKinds() {
            return n
        }
        async processResource(r) {
            const e = this._resourceLoader.getResource(r);
            if (!e) {
                a.warn('Unable to find texture for resource "' + r + '".');
                return
            }
            const d = this._loader;
            if (!d) return;
            const s = this._downloadedArrayBuffers.get(e);
            if (!!s) {
                this._downloadedArrayBuffers.delete(e);
                try {
                    const o = await d.parseAsync(s, "");
                    this._loadedThreeModels.set(e, o)
                } catch (o) {
                    a.error("Can't fetch the 3D model file " + e.file + ", error: " + o)
                }
            }
        }
        async loadResource(r) {
            const e = this._resourceLoader.getResource(r);
            if (!e) {
                a.warn('Unable to find texture for resource "' + r + '".');
                return
            }
            if (!this._loader || this._loadedThreeModels.get(e)) return;
            const s = this._resourceLoader.getFullUrl(e.file);
            try {
                const o = await fetch(s, {
                    credentials: this._resourceLoader.checkIfCredentialsRequired(s) ? "include" : "omit"
                });
                if (!o.ok) throw new Error("Network response was not ok");
                const i = await o.arrayBuffer();
                this._downloadedArrayBuffers.set(e, i)
            } catch (o) {
                a.error("Can't fetch the 3D model file " + e.file + ", error: " + o)
            }
        }
        getModel(r) {
            return this._loadedThreeModels.getFromName(r) || this._invalidModel
        }
    }
    t.Model3DManager = c
})(gdjs || (gdjs = {}));
//# sourceMappingURL=Model3DManager.js.map
