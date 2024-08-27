var gdjs;
(function(l) {
    const n = new l.Logger("PIXI Image manager"),
        c = (o, e) => {
            n.error("Unable to load file " + o + " with error:", e || "(unknown error)")
        },
        d = (o, e) => {
            !o || e.smoothed || (o.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST)
        },
        g = (o, e) => {
            e && !e.smoothed && (o.magFilter = THREE.NearestFilter, o.minFilter = THREE.NearestFilter)
        },
        x = ["image", "video"];
    class h {
        constructor(e) {
            this._loadedTextures = new l.ResourceCache;
            this._diskTextures = new Map;
            this._rectangleTextures = new Map;
            this._scaledTextures = new Map;
            this._getImageResource = e => {
                const r = this._resourceLoader.getResource(e);
                return r && this.getResourceKinds().includes(r.kind) ? r : null
            };
            this._resourceLoader = e, this._invalidTexture = PIXI.Texture.from("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFElEQVQoU2P8z/D/PwMewDgyFAAApMMX8Zi0uXAAAAAASUVORK5CYIIA"), this._loadedThreeTextures = new Hashtable, this._loadedThreeMaterials = new Hashtable
        }
        getResourceKinds() {
            return x
        }
        getPIXITexture(e) {
            const r = this._getImageResource(e);
            if (!r) return n.warn('Unable to find texture for resource "' + e + '".'), this._invalidTexture;
            const i = this._loadedTextures.get(r);
            return i ? i.valid ? i : (n.error("Texture for " + e + " is not valid anymore (or never was)."), this._invalidTexture) : this._invalidTexture
        }
        getOrLoadPIXITexture(e) {
            const r = this._getImageResource(e);
            if (!r) return n.warn('Unable to find texture for resource "' + e + '".'), this._invalidTexture;
            const i = this._loadedTextures.get(r);
            if (i) return i.valid ? i : (n.error("Texture for " + e + " is not valid anymore (or never was)."), this._invalidTexture);
            n.log('Loading texture for resource "' + e + '"...');
            const s = r.file,
                a = this._resourceLoader.getFullUrl(s),
                t = PIXI.Texture.from(a, {
                    resourceOptions: {
                        crossorigin: this._resourceLoader.checkIfCredentialsRequired(s) ? "use-credentials" : "anonymous"
                    }
                }).on("error", u => {
                    c(s, u)
                });
            if (!t) throw new Error("Texture loading by PIXI returned nothing for file " + s + " behind url " + a);
            return d(t, r), this._loadedTextures.set(r, t), t
        }
        getThreeTexture(e) {
            const r = this._loadedThreeTextures.get(e);
            if (r) return r;
            const i = this.getPIXITexture(e);
            if (!this._resourceLoader._runtimeGame.getRenderer().getPIXIRenderer()) throw new Error("No PIXI renderer was found.");
            const a = i.baseTexture.resource.source;
            if (!(a instanceof HTMLImageElement)) throw new Error(`Can't load texture for resource "${e}" as it's not an image.`);
            const t = new THREE.Texture(a);
            t.magFilter = THREE.LinearFilter, t.minFilter = THREE.LinearFilter, t.wrapS = THREE.RepeatWrapping, t.wrapT = THREE.RepeatWrapping, t.colorSpace = THREE.SRGBColorSpace, t.needsUpdate = !0;
            const u = this._getImageResource(e);
            return g(t, u), this._loadedThreeTextures.put(e, t), t
        }
        getThreeMaterial(e, {
            useTransparentTexture: r,
            forceBasicMaterial: i
        }) {
            const s = `${e}|${r?1:0}|${i?1:0}`,
                a = this._loadedThreeMaterials.get(s);
            if (a) return a;
            const t = i ? new THREE.MeshBasicMaterial({
                map: this.getThreeTexture(e),
                side: r ? THREE.DoubleSide : THREE.FrontSide,
                transparent: r
            }) : new THREE.MeshStandardMaterial({
                map: this.getThreeTexture(e),
                side: r ? THREE.DoubleSide : THREE.FrontSide,
                transparent: r,
                metalness: 0
            });
            return this._loadedThreeMaterials.put(s, t), t
        }
        getPIXIVideoTexture(e) {
            if (e === "") return this._invalidTexture;
            const r = this._getImageResource(e);
            if (!r) return n.warn('Unable to find video texture for resource "' + e + '".'), this._invalidTexture;
            const i = this._loadedTextures.get(r);
            return i || this._invalidTexture
        }
        getInvalidPIXITexture() {
            return this._invalidTexture
        }
        async loadResource(e) {
            const r = this._resourceLoader.getResource(e);
            if (!r) {
                n.warn('Unable to find texture for resource "' + e + '".');
                return
            }
            await this._loadTexture(r)
        }
        async processResource(e) {}
        async _loadTexture(e) {
            if (!this._loadedTextures.get(e)) try {
                if (e.kind === "video") await new Promise((r, i) => {
                    const s = PIXI.Texture.from(this._resourceLoader.getFullUrl(e.file), {
                        resourceOptions: {
                            crossorigin: this._resourceLoader.checkIfCredentialsRequired(e.file) ? "use-credentials" : "anonymous",
                            autoPlay: !1
                        }
                    }).on("error", t => {
                        i(t)
                    });
                    s.baseTexture.on("loaded", () => {
                        this._loadedTextures.set(e, s), d(s, e), r()
                    }).on("error", t => {
                        i(t)
                    })
                });
                else {
                    const r = PIXI.Texture.from(this._resourceLoader.getFullUrl(e.file), {
                        resourceOptions: {
                            autoLoad: !1,
                            crossorigin: this._resourceLoader.checkIfCredentialsRequired(e.file) ? "use-credentials" : "anonymous"
                        }
                    });
                    await r.baseTexture.resource.load(), this._loadedTextures.set(e, r), d(r, e)
                }
            } catch (r) {
                c(e.file, r)
            }
        }
        getOrCreateDiskTexture(e, r) {
            let i = this._diskTextures.get(e);
            if (!i) {
                const s = new PIXI.Graphics;
                s.lineStyle(0, 0, 0), s.beginFill(l.rgbToHexNumber(255, 255, 255), 1), s.drawCircle(0, 0, e), s.endFill(), i = r.generateTexture(s), s.destroy(), this._diskTextures.set(e, i)
            }
            return i
        }
        getOrCreateRectangleTexture(e, r, i) {
            const s = `${e}_${r}`;
            let a = this._rectangleTextures.get(s);
            if (!a) {
                const t = new PIXI.Graphics;
                t.lineStyle(0, 0, 0), t.beginFill(l.rgbToHexNumber(255, 255, 255), 1), t.drawRect(0, 0, e, r), t.endFill(), a = i.generateTexture(t), t.destroy(), this._rectangleTextures.set(s, a)
            }
            return a
        }
        getOrCreateScaledTexture(e, r, i, s) {
            const a = `${e}_${r}_${i}`;
            let t = this._scaledTextures.get(a);
            if (!t) {
                const u = new PIXI.Graphics,
                    T = new PIXI.Sprite(this.getPIXITexture(e));
                T.width = r, T.height = i, u.addChild(T), t = s.generateTexture(u), u.destroy(), this._scaledTextures.set(a, t)
            }
            return t
        }
    }
    l.PixiImageManager = h, l.ImageManager = l.PixiImageManager
})(gdjs || (gdjs = {}));
//# sourceMappingURL=pixi-image-manager.js.map
