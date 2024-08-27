var gdjs;

(function (a) {
    class o extends a.RuntimeObject {
        constructor(t, e) {
            super(t, e);
            this._isUntransformedHitBoxesDirty = true;
            this._untransformedHitBoxes = [];
            this._unrotatedAABB = { min: [0, 0], max: [0, 0] };
            this._forcedDefaultSize = null;
            this._scaleX = 1;
            this._scaleY = 1;
            this._flippedX = false;
            this._flippedY = false;
            this.opacity = 255;
            this._customCenter = null;
            this._localTransformation = new a.AffineTransformation();
            this._localInverseTransformation = new a.AffineTransformation();
            this._isLocalTransformationDirty = true;
            this._instanceContainer = new a.CustomRuntimeObjectInstanceContainer(t, this);
            this._renderer = this._createRender();
            this._createDefaultSizeIfNeeded(e);
            this._instanceContainer.loadFrom(e);
        }

        reinitialize(t) {
            super.reinitialize(t);
            this._createDefaultSizeIfNeeded(t);
            this._instanceContainer.loadFrom(t);
            this._reinitializeRenderer();
            this.onCreated();
        }

        _createDefaultSizeIfNeeded(t) {
            if (t.instances.length > 0) {
                if (!t.defaultSize) {
                    t.defaultSize = {
                        min: [t.areaMinX, t.areaMinY, t.areaMinZ],
                        max: [t.areaMaxX, t.areaMaxY, t.areaMaxZ]
                    };
                }
                this._forcedDefaultSize = t.defaultSize;
            }
        }

        updateFromObjectData(t, e) {
            const i = this.getAnimator();
            if (i) {
                i.updateFromObjectData(t.animatable || [], e.animatable || []);
            }
            return this._instanceContainer.updateFrom(t, e);
        }

        extraInitializationFromInitialInstance(t) {
            const e = this.getAnimator();
            if (t.numberProperties) {
                for (let i = 0, s = t.numberProperties.length; i < s; ++i) {
                    const n = t.numberProperties[i];
                    if (e && n.name === "animation") {
                        e.setAnimationIndex(n.value);
                    }
                }
            }
            if (t.customSize) {
                this.setWidth(t.width);
                this.setHeight(t.height);
            }
        }

        onDeletedFromScene(t) {
            this.onDestroy(t);
            super.onDeletedFromScene(t);
            this._instanceContainer.onDestroyFromScene(t);
        }

        update(t) {
            this._instanceContainer._updateObjectsPreEvents();
            this.doStepPreEvents(this._instanceContainer);
            const e = this.getRuntimeScene().getProfiler();
            if (e) {
                e.begin(this.type);
            }
            this.doStepPostEvents(this._instanceContainer);
            if (e) {
                e.end(this.type);
            }
            this._instanceContainer._updateObjectsPostEvents();
        }

        onHotReloading(t) {}

        doStepPreEvents(t) {}

        doStepPostEvents(t) {}

        onDestroy(t) {}

        updatePreRender(t) {
            this._instanceContainer._updateObjectsPreRender();
            this.getRenderer().ensureUpToDate();
        }

        getRenderer() {
            return this._renderer;
        }

        onChildrenLocationChanged() {
            this._isUntransformedHitBoxesDirty = true;
            this.invalidateHitboxes();
            this.getRenderer().update();
        }

        updateHitBoxes() {
            if (this._isUntransformedHitBoxesDirty) {
                this._updateUntransformedHitBoxes();
            }
            const t = this.getLocalTransformation();
            for (let e = 0; e < this._untransformedHitBoxes.length; ++e) {
                if (e >= this.hitBoxes.length) {
                    this.hitBoxes.push(new a.Polygon());
                }
                for (let i = 0; i < this._untransformedHitBoxes[e].vertices.length; ++i) {
                    if (i >= this.hitBoxes[e].vertices.length) {
                        this.hitBoxes[e].vertices.push([0, 0]);
                    }
                    t.transform(this._untransformedHitBoxes[e].vertices[i], this.hitBoxes[e].vertices[i]);
                }
                this.hitBoxes[e].vertices.length = this._untransformedHitBoxes[e].vertices.length;
            }
        }

        _updateUntransformedHitBoxes() {
            this._isUntransformedHitBoxesDirty = false;
            this._untransformedHitBoxes.length = 0;
            let t = Number.MAX_VALUE;
            let e = Number.MAX_VALUE;
            let i = -Number.MAX_VALUE;
            let s = -Number.MAX_VALUE;
            for (const n of this._instanceContainer.getAdhocListOfAllInstances()) {
                if (!n.isIncludedInParentCollisionMask()) {
                    continue;
                }
                Array.prototype.push.apply(this._untransformedHitBoxes, n.getHitBoxes());
                const r = n.getAABB();
                t = Math.min(t, r.min[0]);
                e = Math.min(e, r.min[1]);
                i = Math.max(i, r.max[0]);
                s = Math.max(s, r.max[1]);
            }
            if (t === Number.MAX_VALUE) {
                t = 0;
                e = 0;
                i = 1;
                s = 1;
            }
            this._unrotatedAABB.min[0] = t;
            this._unrotatedAABB.min[1] = e;
            this._unrotatedAABB.max[0] = i;
            this._unrotatedAABB.max[1] = s;
            while (this.hitBoxes.length < this._untransformedHitBoxes.length) {
                this.hitBoxes.push(new a.Polygon());
            }
            this.hitBoxes.length = this._untransformedHitBoxes.length;
        }

        applyObjectTransformation(t, e, i) {
            const s = i;
            s[0] = t;
            s[1] = e;
            this.getLocalTransformation().transform(s, i);
        }

        getLocalTransformation() {
            if (this._isLocalTransformationDirty) {
                this._updateLocalTransformation();
            }
            return this._localTransformation;
        }

        getLocalInverseTransformation() {
            if (this._isLocalTransformationDirty) {
                this._updateLocalTransformation();
            }
            return this._localInverseTransformation;
        }

        _updateLocalTransformation() {
            const t = Math.abs(this._scaleX);
            const e = Math.abs(this._scaleY);
            const i = this.getUnscaledCenterX() * t;
            const s = this.getUnscaledCenterY() * e;
            const n = this.angle * Math.PI / 180;
            this._localTransformation.setToTranslation(this.x, this.y);
            this._localTransformation.rotateAround(n, i, s);
            if (this._flippedX) {
                this._localTransformation.flipX(i);
            }
            if (this._flippedY) {
                this._localTransformation.flipY(s);
            }
            this._localTransformation.scale(t, e);
            this._localInverseTransformation.copyFrom(this._localTransformation);
            this._localInverseTransformation.invert();
            this._isLocalTransformationDirty = false;
        }

        applyObjectInverseTransformation(t, e, i) {
            const s = i;
            s[0] = t;
            s[1] = e;
            this.getLocalInverseTransformation().transform(s, i);
        }

        getDrawableX() {
            let t = 0;
            if (this._forcedDefaultSize) {
                t = this._forcedDefaultSize.min[0];
            } else {
                if (this._isUntransformedHitBoxesDirty) {
                    this._updateUntransformedHitBoxes();
                }
                t = this._unrotatedAABB.min[0];
            }
            const e = this.getScaleX();
            return this._flippedX ? this.x + (-t - this.getUnscaledWidth() + 2 * this.getUnscaledCenterX()) * e : this.x + t * e;
        }

        getDrawableY() {
            let t = 0;
            if (this._forcedDefaultSize) {
                t = this._forcedDefaultSize.min[1];
            } else {
                if (this._isUntransformedHitBoxesDirty) {
                    this._updateUntransformedHitBoxes();
                }
                t = this._unrotatedAABB.min[1];
            }
            const e = this.getScaleY();
            return this._flippedY ? this.y + (-t - this.getUnscaledHeight() + 2 * this.getUnscaledCenterY()) * e : this.y + t * e;
        }

        getUnscaledWidth() {
            return this._forcedDefaultSize ? this._forcedDefaultSize.max[0] - this._forcedDefaultSize.min[0] : (this._isUntransformedHitBoxesDirty && this._updateUntransformedHitBoxes(), this._unrotatedAABB.max[0] - this._unrotatedAABB.min[0]);
        }

        getUnscaledHeight() {
            return this._forcedDefaultSize ? this._forcedDefaultSize.max[1] - this._forcedDefaultSize.min[1] : (this._isUntransformedHitBoxesDirty && this._updateUntransformedHitBoxes(), this._unrotatedAABB.max[1] - this._unrotatedAABB.min[1]);
        }

        getUnscaledCenterX() {
            return this._customCenter ? this._customCenter[0] : this._forcedDefaultSize ? (this._forcedDefaultSize.min[0] + this._forcedDefaultSize.max[0]) / 2 : (this._isUntransformedHitBoxesDirty && this._updateUntransformedHitBoxes(), (this._unrotatedAABB.min[0] + this._unrotatedAABB.max[0]) / 2);
        }

        getUnscaledCenterY() {
            return this._customCenter ? this._customCenter[1] : this._forcedDefaultSize ? (this._forcedDefaultSize.min[1] + this._forcedDefaultSize.max[1]) / 2 : (this._isUntransformedHitBoxesDirty && this._updateUntransformedHitBoxes(), (this._unrotatedAABB.min[1] + this._unrotatedAABB.max[1]) / 2);
        }

        setRotationCenter(t, e) {
            if (!this._customCenter) {
                this._customCenter = [0, 0];
            }
            this._customCenter[0] = t;
            this._customCenter[1] = e;
            this._isLocalTransformationDirty = true;
            this.invalidateHitboxes();
        }

        hasCustomRotationCenter() {
            return !!this._customCenter;
        }

        getCenterX() {
            return (this.getUnscaledCenterX() - this._unrotatedAABB.min[0]) * this.getScaleX();
        }

        getCenterY() {
            return (this.getUnscaledCenterY() - this._unrotatedAABB.min[1]) * this.getScaleY();
        }

        getWidth() {
            return this.getUnscaledWidth() * this.getScaleX();
        }

        getHeight() {
            return this.getUnscaledHeight() * this.getScaleY();
        }

        setWidth(t) {
            const e = this.getUnscaledWidth();
            if (e !== 0) {
                this.setScaleX(t / e);
            }
        }

        setHeight(t) {
            const e = this.getUnscaledHeight();
            if (e !== 0) {
                this.setScaleY(t / e);
            }
        }

        setSize(t, e) {
            this.setWidth(t);
            this.setHeight(e);
        }

        setX(t) {
            if (t !== this.x) {
                this.x = t;
                this._isLocalTransformationDirty = true;
                this.invalidateHitboxes();
                this.getRenderer().updateX();
            }
        }

        setY(t) {
            if (t !== this.y) {
                this.y = t;
                this._isLocalTransformationDirty = true;
                this.invalidateHitboxes();
                this.getRenderer().updateY();
            }
        }

        setAngle(t) {
            if (this.angle !== t) {
                this.angle = t;
                this._isLocalTransformationDirty = true;
                this.invalidateHitboxes();
                this.getRenderer().updateAngle();
            }
        }

        setScale(t) {
            if (t < 0) {
                t = 0;
            }
            if (!(t === Math.abs(this._scaleX) && t === Math.abs(this._scaleY))) {
                this._scaleX = t * (this._flippedX ? -1 : 1);
                this._scaleY = t * (this._flippedY ? -1 : 1);
                this._isLocalTransformationDirty = true;
                this.invalidateHitboxes();
                this.getRenderer().update();
            }
        }

        setScaleX(t) {
            if (t < 0) {
                t = 0;
            }
            if (t !== Math.abs(this._scaleX)) {
                this._scaleX = t * (this._flippedX ? -1 : 1);
                this._isLocalTransformationDirty = true;
                this.invalidateHitboxes();
                this.getRenderer().update();
            }
        }

        setScaleY(t) {
            if (t < 0) {
                t = 0;
            }
            if (t !== Math.abs(this._scaleY)) {
                this._scaleY = t * (this._flippedY ? -1 : 1);
                this.invalidateHitboxes();
                this.getRenderer().update();
            }
        }

        getScaleMean() {
            return (Math.abs(this._scaleX) + Math.abs(this._scaleY)) / 2;
        }

        getScale() {
            const t = Math.abs(this._scaleX);
            const e = Math.abs(this._scaleY);
            return t === e ? t : Math.sqrt(t * e);
        }

        getScaleY() {
            return Math.abs(this._scaleY);
        }

        getScaleX() {
            return Math.abs(this._scaleX);
        }

        setOpacity(t) {
            if (t < 0) {
                t = 0;
            }
            if (t > 255) {
                t = 255;
            }
            this.opacity = t;
            this.getRenderer().updateOpacity();
        }

        getOpacity() {
            return this.opacity;
        }

        hide(t) {
            if (t === undefined) {
                t = true;
            }
            this.hidden = t;
            this.getRenderer().updateVisibility();
        }

        flipX(t) {
            if (t !== this._flippedX) {
                this._scaleX *= -1;
                this._flippedX = t;
                this.invalidateHitboxes();
                this.getRenderer().update();
            }
        }

        flipY(t) {
            if (t !== this._flippedY) {
                this._scaleY *= -1;
                this._flippedY = t;
                this.invalidateHitboxes();
                this.getRenderer().update();
            }
        }

        isFlippedX() {
            return this._flippedX;
        }

        isFlippedY() {
            return this._flippedY;
        }

        getAnimator() {
            return null;
        }
    }

    a.CustomRuntimeObject = o;
    o.supportsReinitialization = false;
})(gdjs || (gdjs = {}));
