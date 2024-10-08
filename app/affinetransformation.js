var gdjs;
(function(c) {
    class y {
        constructor() {
            this.matrix = new Float32Array([1, 0, 0, 1, 0, 0])
        }
        setToIdentity() {
            const o = this.matrix;
            o[0] = 1, o[1] = 0, o[2] = 0, o[3] = 1, o[4] = 0, o[5] = 0
        }
        isIdentity() {
            const o = this.matrix;
            return o[0] === 1 && o[1] === 0 && o[2] === 0 && o[3] === 1 && o[4] === 0 && o[5] === 0
        }
        equals(o) {
            const t = this.matrix,
                a = o.matrix;
            return this === o || t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5]
        }
        nearlyEquals(o, t) {
            const a = this.matrix,
                s = o.matrix;
            return this === o || c.nearlyEqual(a[0], s[0], t) && c.nearlyEqual(a[1], s[1], t) && c.nearlyEqual(a[2], s[2], t) && c.nearlyEqual(a[3], s[3], t) && c.nearlyEqual(a[4], s[4], t) && c.nearlyEqual(a[5], s[5], t)
        }
        copyFrom(o) {
            const t = this.matrix,
                a = o.matrix;
            return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], this
        }
        setToTranslation(o, t) {
            const a = this.matrix;
            a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 1, a[4] = o, a[5] = t
        }
        translate(o, t) {
            var a = this.matrix;
            a[4] = a[0] * o + a[2] * t + a[4], a[5] = a[1] * o + a[3] * t + a[5]
        }
        setToScale(o, t) {
            const a = this.matrix;
            a[0] = o, a[1] = 0, a[2] = 0, a[3] = t, a[4] = 0, a[5] = 0
        }
        scale(o, t) {
            const a = this.matrix;
            a[0] *= o, a[1] *= o, a[2] *= t, a[3] *= t
        }
        setToRotation(o) {
            const t = this.matrix;
            let a = Math.cos(o),
                s = Math.sin(o);
            (a === -1 || a === 1) && (s = 0), (s === -1 || s === 1) && (a = 0), t[0] = a, t[1] = s, t[2] = -s, t[3] = a, t[4] = 0, t[5] = 0
        }
        rotate(o) {
            const t = this.matrix;
            let a = Math.cos(o),
                s = Math.sin(o);
            (a === -1 || a === 1) && (s = 0), (s === -1 || s === 1) && (a = 0);
            const i = t[0],
                n = t[1],
                m = t[2],
                r = t[3];
            t[0] = i * a + m * s, t[1] = n * a + r * s, t[2] = i * -s + m * a, t[3] = n * -s + r * a
        }
        setToRotationAround(o, t, a) {
            const s = this.matrix;
            let i = Math.cos(o),
                n = Math.sin(o);
            (i === -1 || i === 1) && (n = 0), (n === -1 || n === 1) && (i = 0), s[0] = i, s[1] = n, s[2] = -n, s[3] = i, s[4] = t - t * i + a * n, s[5] = a - t * n + a * i
        }
        rotateAround(o, t, a) {
            this.translate(t, a), this.rotate(o), this.translate(-t, -a)
        }
        setToFlipX(o) {
            const t = this.matrix;
            t[0] = -1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 2 * o, t[5] = 0
        }
        flipX(o) {
            this.translate(o, 0), this.scale(-1, 1), this.translate(-o, 0)
        }
        setToFlipY(o) {
            const t = this.matrix;
            t[0] = -1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 2 * o
        }
        flipY(o) {
            this.translate(0, o), this.scale(1, -1), this.translate(0, -o)
        }
        concatenate(o) {
            const t = this.matrix,
                a = o.matrix,
                s = t[0],
                i = t[1],
                n = t[2],
                m = t[3],
                r = t[4],
                h = t[5],
                l = a[0],
                e = a[1],
                x = a[2],
                f = a[3],
                u = a[4],
                T = a[5];
            t[0] = l * s + e * n, t[1] = l * i + e * m, t[2] = x * s + f * n, t[3] = x * i + f * m, t[4] = u * s + T * n + r, t[5] = u * i + T * m + h
        }
        preConcatenate(o) {
            const t = this.matrix,
                a = o.matrix,
                s = t[0],
                i = t[1],
                n = t[2],
                m = t[3],
                r = t[4],
                h = t[5],
                l = a[0],
                e = a[1],
                x = a[2],
                f = a[3],
                u = a[4],
                T = a[5];
            t[0] = s * l + i * x, t[1] = s * e + i * f, t[2] = n * l + m * x, t[3] = n * e + m * f, t[4] = r * l + h * x + u, t[5] = r * e + h * f + T
        }
        transform(o, t) {
            const a = this.matrix,
                s = a[0] * o[0] + a[2] * o[1] + a[4],
                i = a[1] * o[0] + a[3] * o[1] + a[5];
            t[0] = s, t[1] = i
        }
        invert() {
            const o = this.matrix,
                t = o[0],
                a = o[1],
                s = o[2],
                i = o[3],
                n = o[4],
                m = o[5],
                r = t * i - a * s;
            return o[0] = i / r, o[1] = -a / r, o[2] = -s / r, o[3] = t / r, o[4] = (s * m - i * n) / r, o[5] = -(t * m - a * n) / r, this
        }
        toString() {
            const o = this.matrix;
            return `[[${o[0]} ${o[1]}] [${o[2]} ${o[3]}] [${o[4]} ${o[5]}]]`
        }
    }
    c.AffineTransformation = y
})(gdjs || (gdjs = {}));
//# sourceMappingURL=affinetransformation.js.map
