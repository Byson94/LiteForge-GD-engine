var gdjs;
(function(e) {
    class s {
        constructor(t, i, h) {
            this._dirty = !1;
            this._x = t || 0, this._y = i || 0, this._angle = Math.atan2(i, t) * 180 / Math.PI, this._length = Math.sqrt(t * t + i * i), this._multiplier = h
        }
        getX() {
            return this._x
        }
        getY() {
            return this._y
        }
        setX(t) {
            this._x = t, this._dirty = !0
        }
        setY(t) {
            this._y = t, this._dirty = !0
        }
        clear() {
            this._x = 0, this._y = 0, this._length = 0, this._dirty = !1
        }
        addForce(t) {
            this._x += t._x, this._y += t._y, this._dirty = !0
        }
        add(t, i) {
            this._x += t, this._y += i, this._dirty = !0
        }
        setAngle(t) {
            this._dirty && (this._length = Math.sqrt(this._x * this._x + this._y * this._y), this._dirty = !1), this._angle = t;
            const i = t / 180 * Math.PI;
            this._x = Math.cos(i) * this._length, this._y = Math.sin(i) * this._length
        }
        setLength(t) {
            this._dirty && (this._angle = Math.atan2(this._y, this._x) * 180 / Math.PI, this._dirty = !1), this._length = t;
            const i = this._angle / 180 * Math.PI;
            this._x = Math.cos(i) * this._length, this._y = Math.sin(i) * this._length
        }
        getAngle() {
            return this._dirty && (this._angle = Math.atan2(this._y, this._x) * 180 / Math.PI, this._length = Math.sqrt(this._x * this._x + this._y * this._y), this._dirty = !1), this._angle
        }
        getLength() {
            return this._dirty && (this._angle = Math.atan2(this._y, this._x) * 180 / Math.PI, this._length = Math.sqrt(this._x * this._x + this._y * this._y), this._dirty = !1), this._length
        }
        getMultiplier() {
            return this._multiplier
        }
        setMultiplier(t) {
            this._multiplier = t
        }
        getNetworkSyncData() {
            return {
                x: this._x,
                y: this._y,
                a: this._angle,
                l: this._length,
                m: this._multiplier
            }
        }
        updateFromNetworkSyncData(t) {
            this._x = t.x, this._y = t.y, this._angle = t.a, this._length = t.l, this._multiplier = t.m
        }
    }
    e.Force = s
})(gdjs || (gdjs = {}));
//# sourceMappingURL=force.js.map
