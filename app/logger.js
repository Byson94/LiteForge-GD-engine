var gdjs;
(function(l) {
    const g = {
        info: console.log,
        warning: console.warn,
        error: console.error
    };
    class i {
        constructor() {
            this.discardedConsoleGroups = new Set
        }
        discardGroup(o) {
            this.discardedConsoleGroups.add(o)
        }
        enableGroup(o) {
            this.discardedConsoleGroups.delete(o)
        }
        log(o, n, u = "info", p = !0) {
            if (this.discardedConsoleGroups.has(o)) return;
            (g[u] || g.info)(`[${o}] ${n}`)
        }
    }
    const s = new i;
    let r = s;

    function t(e) {
        return e.reduce((o, n) => o + n.toString(), "")
    }
    class a {
        constructor(o) {
            this.group = o
        }
        log(...o) {
            r.log(this.group, t(o), "info")
        }
        info(...o) {
            r.log(this.group, t(o), "info")
        }
        warn(...o) {
            r.log(this.group, t(o), "warning")
        }
        error(...o) {
            r.log(this.group, t(o), "error")
        }
        static getDefaultConsoleLoggerOutput() {
            return s
        }
        static getLoggerOutput() {
            return r
        }
        static setLoggerOutput(o) {
            r = o
        }
    }
    l.Logger = a
})(gdjs || (gdjs = {}));
//# sourceMappingURL=logger.js.map
