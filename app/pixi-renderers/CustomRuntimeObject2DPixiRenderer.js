var gdjs;
(function(r) {
    class a {
        constructor(e, t, i) {
            this._isContainerDirty = !0;
            this._debugDraw = null;
            this._debugDrawContainer = null;
            this._object = e, this._instanceContainer = t, this._pixiContainer = new PIXI.Container, this._debugDrawRenderedObjectsPoints = {}, this._pixiContainer.sortableChildren = !0, this._debugDraw = null;
            const n = i.getLayer("");
            n && n.getRenderer().addRendererObject(this._pixiContainer, e.getZOrder())
        }
        reinitialize(e, t) {
            this._object = e, this._isContainerDirty = !0;
            const i = t.getLayer("");
            i && i.getRenderer().addRendererObject(this._pixiContainer, e.getZOrder())
        }
        getRendererObject() {
            return this._pixiContainer
        }
        get3DRendererObject() {
            return null
        }
        _updatePIXIContainer() {
            const e = this._object.getScaleX(),
                t = this._object.getScaleY(),
                i = this._object.getOpacity();
            this._pixiContainer.pivot.x = this._object.getUnscaledCenterX(), this._pixiContainer.pivot.y = this._object.getUnscaledCenterY(), this._pixiContainer.position.x = this._object.getX() + this._pixiContainer.pivot.x * Math.abs(e), this._pixiContainer.position.y = this._object.getY() + this._pixiContainer.pivot.y * Math.abs(t), this._pixiContainer.rotation = r.toRad(this._object.angle), this._pixiContainer.scale.x = e, this._pixiContainer.scale.y = t, this._pixiContainer.visible = !this._object.hidden, this._pixiContainer.alpha = i / 255, this._isContainerDirty = !1
        }
        ensureUpToDate() {
            this._isContainerDirty && this._updatePIXIContainer()
        }
        update() {
            this._isContainerDirty = !0
        }
        updateX() {
            const e = this._object.getScaleX();
            this._pixiContainer.position.x = this._object.x + this._pixiContainer.pivot.x * Math.abs(e)
        }
        updateY() {
            const e = this._object.getScaleY();
            this._pixiContainer.position.y = this._object.y + this._pixiContainer.pivot.y * Math.abs(e)
        }
        updateAngle() {
            this._pixiContainer.rotation = r.toRad(this._object.angle)
        }
        updateOpacity() {
            const e = this._object.getOpacity();
            this._pixiContainer.alpha = e / 255
        }
        updateVisibility() {
            this._pixiContainer.visible = !this._object.hidden
        }
        getPIXIContainer() {
            return this._pixiContainer
        }
        getPIXIRenderer() {
            return null
        }
        setLayerIndex(e, t) {
            const i = e.getRenderer();
            let n = i.getRendererObject();
            e.isLightingLayer() && (n = i.getLightingSprite()), !!n && this._pixiContainer.children.indexOf(n) !== t && (this._pixiContainer.removeChild(n), this._pixiContainer.addChildAt(n, t))
        }
        static getAnimationFrameTextureManager(e) {
            return r.SpriteRuntimeObjectPixiRenderer.getAnimationFrameTextureManager(e)
        }
    }
    r.CustomRuntimeObject2DPixiRenderer = a, r.CustomRuntimeObject2DRenderer = r.CustomRuntimeObject2DPixiRenderer
})(gdjs || (gdjs = {}));
//# sourceMappingURL=CustomRuntimeObject2DPixiRenderer.js.map
