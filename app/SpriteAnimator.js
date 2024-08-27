var gdjs;
(function(a) {
    class u {
        constructor(t, i) {
            this.center = {
                x: 0,
                y: 0
            };
            this.origin = {
                x: 0,
                y: 0
            };
            this.hasCustomHitBoxes = !1;
            this.customHitBoxes = [];
            this.image = t ? t.image : "", this.texture = i.getAnimationFrameTexture(this.image), this.points = new Hashtable, this.reinitialize(t, i)
        }
        reinitialize(t, i) {
            this.points.clear();
            for (let n = 0, o = t.points.length; n < o; ++n) {
                const m = t.points[n],
                    s = {
                        x: m.x,
                        y: m.y
                    };
                this.points.put(m.name, s)
            }
            const e = t.originPoint;
            this.origin.x = e.x, this.origin.y = e.y;
            const r = t.centerPoint;
            if (r.automatic !== !0 ? (this.center.x = r.x, this.center.y = r.y) : (this.center.x = i.getAnimationFrameWidth(this.texture) / 2, this.center.y = i.getAnimationFrameHeight(this.texture) / 2), t.hasCustomCollisionMask) {
                this.hasCustomHitBoxes = !0;
                let n = 0;
                for (let o = t.customCollisionMask.length; n < o; ++n) {
                    const m = t.customCollisionMask[n];
                    n >= this.customHitBoxes.length && this.customHitBoxes.push(new a.Polygon);
                    let s = 0;
                    for (const c = m.length; s < c; ++s) {
                        const l = m[s];
                        s >= this.customHitBoxes[n].vertices.length && this.customHitBoxes[n].vertices.push([0, 0]), this.customHitBoxes[n].vertices[s][0] = l.x, this.customHitBoxes[n].vertices[s][1] = l.y
                    }
                    this.customHitBoxes[n].vertices.length = s
                }
                this.customHitBoxes.length = n
            } else this.customHitBoxes.length = 0
        }
        getPoint(t) {
            return t === "Centre" || t === "Center" ? this.center : t === "Origin" ? this.origin : this.points.containsKey(t) ? this.points.get(t) : this.origin
        }
    }
    a.SpriteAnimationFrame = u;
    class _ {
        constructor(t, i) {
            this.frames = [];
            this.timeBetweenFrames = t ? t.timeBetweenFrames : 1, this.loop = !!t.looping, this.reinitialize(t, i)
        }
        reinitialize(t, i) {
            this.timeBetweenFrames = t ? t.timeBetweenFrames : 1, this.loop = !!t.looping;
            let e = 0;
            for (const r = t.sprites.length; e < r; ++e) {
                const n = t.sprites[e];
                e < this.frames.length ? this.frames[e].reinitialize(n, i) : this.frames.push(new a.SpriteAnimationFrame(n, i))
            }
            this.frames.length = e
        }
    }
    a.SpriteAnimationDirection = _;
    class p {
        constructor(t, i) {
            this.directions = [];
            this.hasMultipleDirections = !!t.useMultipleDirections, this.name = t.name || "", this.reinitialize(t, i)
        }
        reinitialize(t, i) {
            this.hasMultipleDirections = !!t.useMultipleDirections, this.name = t.name || "";
            let e = 0;
            for (const r = t.directions.length; e < r; ++e) {
                const n = t.directions[e];
                e < this.directions.length ? this.directions[e].reinitialize(n, i) : this.directions.push(new a.SpriteAnimationDirection(n, i))
            }
            this.directions.length = e
        }
    }
    a.SpriteAnimation = p;
    class g {
        constructor(t, i) {
            this._animations = [];
            this._animationFrame = null;
            this._animationFrameDirty = !0;
            this._currentAnimation = 0;
            this._currentDirection = 0;
            this._currentFrameIndex = 0;
            this._animationElapsedTime = 0;
            this._animationSpeedScale = 1;
            this._animationPaused = !1;
            this._onFrameChange = null;
            this._textureManager = i;
            for (let e = 0, r = t.length; e < r; ++e) this._animations.push(new a.SpriteAnimation(t[e], i))
        }
        invalidateFrame() {
            this._animationFrameDirty = !0, this._onFrameChange && this._onFrameChange()
        }
        reinitialize(t) {
            this._currentAnimation = 0, this._currentDirection = 0, this._currentFrameIndex = 0, this._animationElapsedTime = 0, this._animationSpeedScale = 1, this._animationPaused = !1;
            let i = 0;
            for (const e = t.length; i < e; ++i) {
                const r = t[i];
                i < this._animations.length ? this._animations[i].reinitialize(r, this._textureManager) : this._animations.push(new a.SpriteAnimation(r, this._textureManager))
            }
            this._animations.length = i, this._animationFrame = null, this.invalidateFrame()
        }
        updateFromObjectData(t, i) {
            let e = 0;
            for (const n = i.length; e < n; ++e) {
                const o = i[e];
                e < this._animations.length ? this._animations[e].reinitialize(o, this._textureManager) : this._animations.push(new a.SpriteAnimation(o, this._textureManager))
            }
            return this._animations.length = e, this.invalidateFrame(), this.getCurrentFrame() || this.setAnimationIndex(0), !0
        }
        getNetworkSyncData() {
            return {
                an: this._currentAnimation,
                di: this._currentDirection,
                fr: this._currentFrameIndex,
                et: this._animationElapsedTime,
                ss: this._animationSpeedScale,
                pa: this._animationPaused
            }
        }
        updateFromNetworkSyncData(t) {
            this._currentAnimation = t.an, this._currentDirection = t.di, this._currentFrameIndex = t.fr, this._animationElapsedTime = t.et, this._animationSpeedScale = t.ss, this._animationPaused = t.pa, this.invalidateFrame()
        }
        getCurrentFrame() {
            if (!this._animationFrameDirty) return this._animationFrame;
            if (this._animationFrameDirty = !1, this._currentAnimation < this._animations.length && this._currentDirection < this._animations[this._currentAnimation].directions.length) {
                const t = this._animations[this._currentAnimation].directions[this._currentDirection];
                if (this._currentFrameIndex < t.frames.length) return this._animationFrame = t.frames[this._currentFrameIndex], this._animationFrame
            }
            return this._animationFrame = null, this._animationFrame
        }
        step(t) {
            if (this._currentAnimation >= this._animations.length || this._currentDirection >= this._animations[this._currentAnimation].directions.length) return !1;
            const i = this._animations[this._currentAnimation].directions[this._currentDirection],
                e = this.getAnimationDuration();
            if (!this._animationPaused && (i.loop || this._animationElapsedTime !== e) && i.timeBetweenFrames) {
                const r = this._animationElapsedTime + t * this._animationSpeedScale;
                return this.setAnimationElapsedTime(i.loop ? a.evtTools.common.mod(r, e) : a.evtTools.common.clamp(r, 0, e))
            }
            return !1
        }
        setOnFrameChangeCallback(t) {
            this._onFrameChange = t
        }
        getAnimationIndex() {
            return this._currentAnimation
        }
        setAnimationIndex(t) {
            return t = t | 0, t < this._animations.length && this._currentAnimation !== t && t >= 0 ? (this._currentAnimation = t, this._currentFrameIndex = 0, this._animationElapsedTime = 0, this.invalidateFrame(), !0) : !1
        }
        getAnimationName() {
            return this._currentAnimation >= this._animations.length ? "" : this._animations[this._currentAnimation].name
        }
        setAnimationName(t) {
            if (!t) return !1;
            for (let i = 0; i < this._animations.length; ++i)
                if (this._animations[i].name === t) return this.setAnimationIndex(i), !0;
            return !1
        }
        hasAnimationEnded() {
            if (this._currentAnimation >= this._animations.length || this._currentDirection >= this._animations[this._currentAnimation].directions.length) return !0;
            const t = this._animations[this._currentAnimation].directions[this._currentDirection];
            return t.loop ? !1 : this._currentFrameIndex === t.frames.length - 1 && this._animationElapsedTime === t.frames.length * t.timeBetweenFrames
        }
        isAnimationPaused() {
            return this._animationPaused
        }
        pauseAnimation() {
            this._animationPaused = !0
        }
        resumeAnimation() {
            this._animationPaused = !1
        }
        getAnimationSpeedScale() {
            return this._animationSpeedScale
        }
        setAnimationSpeedScale(t) {
            this._animationSpeedScale = t
        }
        setAnimationFrameIndex(t) {
            if (this._currentAnimation >= this._animations.length || this._currentDirection >= this._animations[this._currentAnimation].directions.length) return !1;
            const i = this._animations[this._currentAnimation].directions[this._currentDirection];
            return t >= 0 && t < i.frames.length && t !== this._currentFrameIndex ? (this._currentFrameIndex = t, this._animationElapsedTime = t * i.timeBetweenFrames, this.invalidateFrame(), !0) : !1
        }
        getAnimationFrameIndex() {
            return this._currentFrameIndex
        }
        getAnimationElapsedTime() {
            return this._animationElapsedTime
        }
        setAnimationElapsedTime(t) {
            const i = this._animations[this._currentAnimation].directions[this._currentDirection];
            this._animationElapsedTime = a.evtTools.common.clamp(t, 0, this.getAnimationDuration());
            const e = this._currentFrameIndex;
            return this._currentFrameIndex = Math.min(Math.floor(this._animationElapsedTime / i.timeBetweenFrames), i.frames.length - 1), e !== this._currentFrameIndex ? (this.invalidateFrame(), !0) : !1
        }
        getAnimationDuration() {
            const t = this._animations[this._currentAnimation].directions[this._currentDirection];
            return t.frames.length * t.timeBetweenFrames
        }
        getAnimationFrameCount() {
            if (this._currentAnimation >= this._animations.length) return 0;
            const t = this._animations[this._currentAnimation];
            return this._currentDirection >= t.directions.length ? 0 : t.directions[this._currentDirection].frames.length
        }
        setDirectionOrAngle(t, i) {
            if (this._currentAnimation >= this._animations.length) return null;
            const e = this._animations[this._currentAnimation];
            return e.hasMultipleDirections ? (i = i | 0, i === this._currentDirection || i >= e.directions.length || e.directions[i].frames.length === 0 ? null : (this._currentDirection = i, this._currentFrameIndex = 0, this._animationElapsedTime = 0, this.invalidateFrame(), 0)) : t === i ? null : i
        }
        getDirectionOrAngle(t) {
            return this._currentAnimation >= this._animations.length ? 0 : this._animations[this._currentAnimation].hasMultipleDirections ? this._currentDirection : t
        }
        getAngle(t) {
            return this._currentAnimation >= this._animations.length ? 0 : this._animations[this._currentAnimation].hasMultipleDirections ? this._currentDirection * 45 : t
        }
        setAngle(t, i) {
            return this._currentAnimation >= this._animations.length ? null : this._animations[this._currentAnimation].hasMultipleDirections ? (i = i % 360, i < 0 && (i += 360), this.setDirectionOrAngle(t, Math.round(i / 45) % 8)) : t === i ? null : i
        }
        hasAnimationEndedLegacy() {
            if (this._currentAnimation >= this._animations.length || this._currentDirection >= this._animations[this._currentAnimation].directions.length) return !0;
            const t = this._animations[this._currentAnimation].directions[this._currentDirection];
            return t.loop ? !1 : this._currentFrameIndex === t.frames.length - 1
        }
    }
    a.SpriteAnimator = g
})(gdjs || (gdjs = {}));
//# sourceMappingURL=SpriteAnimator.js.map
