var gdjs;
(function(t) {
    class n extends t.CustomRuntimeObject {
        constructor(e, r) {
            super(e, r);
            this.getRenderer().reinitialize(this, e)
        }
        _createRender() {
            const e = this._runtimeScene;
            return new t.CustomRuntimeObject2DRenderer(this, this._instanceContainer, e)
        }
        _reinitializeRenderer() {
            this.getRenderer().reinitialize(this, this.getParent())
        }
        getRenderer() {
            return super.getRenderer()
        }
        getRendererObject() {
            return this.getRenderer().getRendererObject()
        }
    }
    t.CustomRuntimeObject2D = n
})(gdjs || (gdjs = {}));
//# sourceMappingURL=CustomRuntimeObject2D.js.map
