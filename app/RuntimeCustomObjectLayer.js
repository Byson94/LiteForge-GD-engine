var gdjs;
(function(o) {
    class n extends o.RuntimeLayer {
        constructor(e, a) {
            super(e, a);
            this._renderer.onCreated()
        }
        onGameResolutionResized(e, a) {}
        getCameraX(e) {
            return 0
        }
        getCameraY(e) {
            return 0
        }
        setCameraX(e, a) {}
        setCameraY(e, a) {}
        getCameraWidth(e) {
            return 0
        }
        getCameraHeight(e) {
            return 0
        }
        setCameraZoom(e, a) {}
        getCameraZoom(e) {
            return 1
        }
        setCameraZ(e, a, r) {}
        getCameraZ(e, a) {
            return 0
        }
        getCameraRotation(e) {
            return 0
        }
        setCameraRotation(e, a) {}
        convertCoords(e, a, r, t) {
            return this._runtimeScene.convertCoords(e, a, t || [0, 0])
        }
        convertInverseCoords(e, a, r, t) {
            return this._runtimeScene.convertInverseCoords(e, a, t || [0, 0])
        }
        applyLayerInverseTransformation(e, a, r, t) {
            return t[0] = e, t[1] = a, t
        }
        applyLayerTransformation(e, a, r, t) {
            return t[0] = e, t[1] = a, t
        }
    }
    o.RuntimeCustomObjectLayer = n
})(gdjs || (gdjs = {}));
//# sourceMappingURL=RuntimeCustomObjectLayer.js.map
