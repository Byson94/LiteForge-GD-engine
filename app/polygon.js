var gdjs;
(function(b) {
    const D = () => ({
            collision: !1,
            move_axis: [0, 0]
        }),
        S = () => ({
            collision: !1,
            closeX: 0,
            closeY: 0,
            closeSqDist: 0,
            farX: 0,
            farY: 0,
            farSqDist: 0,
            edgeX: 0,
            edgeY: 0
        }),
        F = {
            minMaxA: [0, 0],
            minMaxB: [0, 0],
            edge: [0, 0],
            axis: [0, 0],
            move_axis: [0, 0],
            result: D()
        },
        R = {
            p: [0, 0],
            q: [0, 0],
            r: [0, 0],
            s: [0, 0],
            deltaQP: [0, 0],
            axis: [0, 0],
            result: S()
        },
        c = class {
            constructor() {
                this.vertices = [];
                this.edges = [];
                this.center = [0, 0]
            }
            move(t, e) {
                for (let o = 0, i = this.vertices.length; o < i; ++o) this.vertices[o][0] += t, this.vertices[o][1] += e
            }
            rotate(t) {
                let e = 0;
                const o = Math.cos(-t),
                    i = Math.sin(-t);
                for (let l = 0, s = this.vertices.length; l < s; ++l) e = this.vertices[l][0], this.vertices[l][0] = e * o + this.vertices[l][1] * i, this.vertices[l][1] = -e * i + this.vertices[l][1] * o
            }
            computeEdges() {
                for (; this.edges.length < this.vertices.length;) this.edges.push([0, 0]);
                this.edges.length != this.vertices.length && (this.edges.length = this.vertices.length);
                for (let t = 0, e = this.vertices.length; t < e; ++t) {
                    const o = this.vertices[t],
                        i = t + 1 >= e ? this.vertices[0] : this.vertices[t + 1];
                    this.edges[t][0] = i[0] - o[0], this.edges[t][1] = i[1] - o[1]
                }
            }
            isConvex() {
                this.computeEdges();
                const t = this.edges.length;
                if (t < 3) return !1;
                const e = this.edges[0][0] * this.edges[0 + 1][1] - this.edges[0][1] * this.edges[0 + 1][0] > 0;
                for (let i = 1; i < t - 1; ++i)
                    if (this.edges[i][0] * this.edges[i + 1][1] - this.edges[i][1] * this.edges[i + 1][0] > 0 !== e) return !1;
                return this.edges[t - 1][0] * this.edges[0][1] - this.edges[t - 1][1] * this.edges[0][0] > 0 === e
            }
            computeCenter() {
                this.center[0] = 0, this.center[1] = 0;
                const t = this.vertices.length;
                for (let e = 0; e < t; ++e) this.center[0] += this.vertices[e][0], this.center[1] += this.vertices[e][1];
                return this.center[0] /= t, this.center[1] /= t, this.center
            }
            static createRectangle(t, e) {
                const o = new b.Polygon;
                return o.vertices.push([-t / 2, -e / 2]), o.vertices.push([+t / 2, -e / 2]), o.vertices.push([+t / 2, +e / 2]), o.vertices.push([-t / 2, +e / 2]), o
            }
            static collisionTest(t, e, o) {
                t.computeEdges(), e.computeEdges();
                let i = F.edge;
                const l = F.move_axis,
                    s = F.result;
                let n = Number.MAX_VALUE;
                i[0] = 0, i[1] = 0, i[0] = 0, i[1] = 0, s.collision = !1, s.move_axis[0] = 0, s.move_axis[1] = 0;
                for (let m = 0, v = t.vertices.length, P = e.vertices.length; m < v + P; m++) {
                    m < v ? i = t.edges[m] : i = e.edges[m - v];
                    const d = F.axis;
                    d[0] = -i[1], d[1] = i[0], c.normalise(d);
                    const x = F.minMaxA,
                        M = F.minMaxB;
                    c.project(d, t, x), c.project(d, e, M);
                    const r = c.distance(x[0], x[1], M[0], M[1]);
                    if (r > 0 || r === 0 && o) return s.collision = !1, s.move_axis[0] = 0, s.move_axis[1] = 0, s;
                    const h = Math.abs(r);
                    h < n && (n = h, l[0] = d[0], l[1] = d[1])
                }
                s.collision = !0;
                const g = t.computeCenter(),
                    a = e.computeCenter(),
                    f = [g[0] - a[0], g[1] - a[1]];
                return c.dotProduct(f, l) < 0 && (l[0] = -l[0], l[1] = -l[1]), s.move_axis[0] = l[0] * n, s.move_axis[1] = l[1] * n, s
            }
            static raycastTest(t, e, o, i, l) {
                const s = R.result;
                if (s.collision = !1, t.vertices.length < 2) return s;
                t.computeEdges();
                const n = R.p,
                    g = R.q,
                    a = R.r,
                    f = R.s;
                let m = Number.MAX_VALUE;
                n[0] = e, n[1] = o, a[0] = i - e, a[1] = l - o;
                for (let v = 0; v < t.edges.length; v++) {
                    g[0] = t.vertices[v][0], g[1] = t.vertices[v][1], f[0] = t.edges[v][0], f[1] = t.edges[v][1];
                    const P = R.deltaQP;
                    P[0] = g[0] - n[0], P[1] = g[1] - n[1];
                    const d = c.crossProduct(a, f),
                        x = c.crossProduct(P, f) / d,
                        M = c.crossProduct(P, a) / d;
                    if (Math.abs(d) <= 1e-4 && Math.abs(c.crossProduct(P, a)) <= 1e-4) {
                        const r = R.axis;
                        r[0] = a[0], r[1] = a[1], c.normalise(r);
                        const h = 0,
                            u = c.dotProduct(r, a),
                            p = c.dotProduct(r, P),
                            X = c.dotProduct(r, [P[0] + f[0], P[1] + f[1]]),
                            Y = Math.max(Math.min(h, u), Math.min(p, X)),
                            y = Math.min(Math.max(h, u), Math.max(p, X));
                        if (Y > y) return s;
                        if (s.collision = !0, u === 0) return s.closeX = e, s.closeY = o, s.closeSqDist = 0, s.farX = e, s.farY = o, s.farSqDist = 0, s.edgeX = f[0], s.edgeY = f[1], s;
                        const q = Y / Math.abs(u),
                            T = y / Math.abs(u);
                        return s.closeX = e + q * a[0], s.closeY = o + q * a[1], s.closeSqDist = q * q * (a[0] * a[0] + a[1] * a[1]), s.farX = e + T * a[0], s.farY = o + T * a[1], s.farSqDist = T * T * (a[0] * a[0] + a[1] * a[1]), s.edgeX = f[0], s.edgeY = f[1], s
                    } else if (d !== 0 && 0 <= x && x <= 1 && 0 <= M && M <= 1) {
                        const r = n[0] + x * a[0],
                            h = n[1] + x * a[1],
                            u = (r - e) * (r - e) + (h - o) * (h - o);
                        u < m ? (s.collision || (s.farX = r, s.farY = h, s.farSqDist = u), m = u, s.closeX = r, s.closeY = h, s.closeSqDist = u, s.edgeX = f[0], s.edgeY = f[1], s.collision = !0) : (s.farX = r, s.farY = h, s.farSqDist = u)
                    }
                }
                return s
            }
            static normalise(t) {
                const e = Math.sqrt(t[0] * t[0] + t[1] * t[1]);
                e != 0 && (t[0] /= e, t[1] /= e)
            }
            static dotProduct(t, e) {
                return t[0] * e[0] + t[1] * e[1]
            }
            static crossProduct(t, e) {
                return t[0] * e[1] - t[1] * e[0]
            }
            static project(t, e, o) {
                let i = c.dotProduct(t, e.vertices[0]);
                o[0] = i, o[1] = i;
                for (let l = 1, s = e.vertices.length; l < s; ++l) i = c.dotProduct(t, e.vertices[l]), i < o[0] ? o[0] = i : i > o[1] && (o[1] = i)
            }
            static distance(t, e, o, i) {
                return t < o ? o - e : t - i
            }
            static isPointInside(t, e, o) {
                let i = !1;
                for (let l = 0, s = t.vertices.length - 1; l < t.vertices.length; s = l++) {
                    let n = t.vertices[l],
                        g = t.vertices[s];
                    n[1] > o != g[1] > o && e < (g[0] - n[0]) * (o - n[1]) / (g[1] - n[1]) + n[0] && (i = !i)
                }
                return i
            }
            static copyCollisionTestResult(t, e) {
                e.collision = t.collision, e.move_axis[0] = t.move_axis[0], e.move_axis[1] = t.move_axis[1]
            }
            static copyRaycastTestResult(t, e) {
                e.collision = t.collision, e.closeX = t.closeX, e.closeY = t.closeY, e.closeSqDist = t.closeSqDist, e.farX = t.farX, e.farY = t.farY, e.farSqDist = t.farSqDist, e.edgeX = t.edgeX, e.edgeY = t.edgeY
            }
        };
    let C = c;
    C.makeNewCollisionTestResult = D, C.makeNewRaycastTestResult = S, b.Polygon = C
})(gdjs || (gdjs = {}));
//# sourceMappingURL=polygon.js.map
