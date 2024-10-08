var gdjs;
(function(o) {
    const u = class {
        constructor(r) {
            this._variablesArray = [];
            this._variables = new Hashtable, r !== void 0 && this.initFrom(r)
        }
        initFrom(r, e) {
            e === void 0 && (e = !1), e || (u._deletedVars = u._deletedVars || [], this._variables.keys(u._deletedVars));
            const n = this;
            let i = 0;
            for (let a = 0; a < r.length; ++a) {
                const t = r[a];
                if (!t.name) continue;
                const l = n.get(t.name);
                if (l.reinitialize(t), !e) {
                    i < n._variablesArray.length ? n._variablesArray[i] = l : n._variablesArray.push(l), ++i;
                    const s = u._deletedVars.indexOf(t.name);
                    s !== -1 && (u._deletedVars[s] = void 0)
                }
            }
            if (!e) {
                this._variablesArray.length = i;
                for (let a = 0, t = u._deletedVars.length; a < t; ++a) {
                    const l = u._deletedVars[a];
                    l !== void 0 && this._variables.get(l).setUndefinedInContainer()
                }
            }
        }
        _declare(r, e) {
            this._variables.put(r, e), this._variablesArray.push(e)
        }
        add(r, e) {
            const n = this._variables.get(r);
            if (this._variables.put(r, e), n) {
                const i = this._variablesArray.indexOf(n);
                i !== -1 && (this._variablesArray[i] = e)
            }
        }
        remove(r) {
            const e = this._variables.get(r);
            e && e.setUndefinedInContainer()
        }
        get(r) {
            let e = this._variables.get(r);
            return e ? e.isUndefinedInContainer() && e.reinitialize() : (e = new o.Variable, this._variables.put(r, e)), e
        }
        getFromIndex(r) {
            if (r >= this._variablesArray.length) {
                let e = new o.Variable;
                return this._variables.put("", e), e
            } else {
                let e = this._variablesArray[r];
                return e.isUndefinedInContainer() && e.reinitialize(), e
            }
        }
        has(r) {
            const e = this._variables.get(r);
            return !!e && !e.isUndefinedInContainer()
        }
        hasVariable(r) {
            const e = this._variablesArray.find(n => n === r);
            return !!e && !e.isUndefinedInContainer()
        }
        getVariableNameInContainerByLoopingThroughAllVariables(r) {
            const e = this._variables.items;
            for (const n in e)
                if (e.hasOwnProperty(n) && e[n] === r) return n;
            return null
        }
        getNetworkSyncData(r) {
            const e = r.playerNumber,
                n = [],
                i = [];
            return this._variables.keys(i), i.forEach(a => {
                const t = this._variables.get(a),
                    l = t.getPlayerOwnership();
                if (t.isUndefinedInContainer() || l === null || e !== void 0 && l === 0 && e !== 1 || l !== 0 && e !== l) return;
                const s = t.getType(),
                    b = s === "structure" || s === "array" ? "" : t.getValue();
                n.push({
                    name: a,
                    value: b,
                    type: s,
                    children: this.getStructureNetworkSyncData(t),
                    owner: l
                })
            }), n
        }
        getStructureNetworkSyncData(r) {
            if (r.getType() === "array") {
                const e = [];
                return r.getAllChildrenArray().forEach(n => {
                    const i = n.getType(),
                        a = i === "structure" || i === "array" ? "" : n.getValue(),
                        t = n.getPlayerOwnership();
                    n.isUndefinedInContainer() || t === null || e.push({
                        name: "",
                        value: a,
                        type: i,
                        children: this.getStructureNetworkSyncData(n),
                        owner: t
                    })
                }), e
            }
            if (r.getType() === "structure") {
                const e = r.getAllChildren();
                if (!e) return;
                const n = [];
                return Object.entries(e).forEach(([i, a]) => {
                    const t = a.getType(),
                        l = t === "structure" || t === "array" ? "" : a.getValue(),
                        s = a.getPlayerOwnership();
                    a.isUndefinedInContainer() || s === null || n.push({
                        name: i,
                        value: l,
                        type: t,
                        children: this.getStructureNetworkSyncData(a),
                        owner: s
                    })
                }), n
            }
        }
        updateFromNetworkSyncData(r) {
            const e = this;
            for (let n = 0; n < r.length; ++n) {
                const i = r[n],
                    a = e._getVariableDataFromNetworkSyncData(i),
                    t = a.name;
                if (!t) continue;
                const l = e.get(t),
                    s = i.owner,
                    b = o.multiplayer.getCurrentPlayerNumber(),
                    d = l.getPlayerOwnership();
                if (b === d) {
                    console.info(`Variable ${t} is owned by us ${o.multiplayer.playerNumber}, ignoring update message from ${s}.`);
                    return
                }
                s !== d && (console.info(`Variable ${t} is owned by ${d} on our game, changing ownership to ${s} as part of the update event.`), l.setPlayerOwnership(s)), l.reinitialize(a)
            }
        }
        _getVariableDataFromNetworkSyncData(r) {
            return {
                name: r.name,
                value: r.value,
                type: r.type,
                children: r.children ? r.children.map(e => this._getVariableDataFromNetworkSyncData(e)) : void 0
            }
        }
    };
    let c = u;
    c._deletedVars = [], c.badVariablesContainer = {
        _variables: new Hashtable,
        _variablesArray: [],
        has: function() {
            return !1
        },
        getFromIndex: function() {
            return u.badVariable
        },
        get: function() {
            return u.badVariable
        },
        remove: function() {},
        add: function() {},
        _declare: function() {},
        initFrom: function() {},
        getNetworkSyncData: function() {
            return []
        },
        updateFromNetworkSyncData: function() {},
        getStructureNetworkSyncData: function() {},
        _getVariableDataFromNetworkSyncData: function() {
            return {}
        },
        hasVariable: function() {
            return !1
        },
        getVariableNameInContainerByLoopingThroughAllVariables: function() {
            return ""
        }
    }, c.badVariable = {
        _type: "number",
        _bool: !1,
        _children: {},
        _childrenArray: [],
        _str: "",
        _undefinedInContainer: !0,
        _value: 0,
        _playerNumber: 0,
        fromJSON: () => o.VariablesContainer.badVariable,
        toJSObject: () => 0,
        fromJSObject: () => o.VariablesContainer.badVariable,
        reinitialize: () => {},
        addChild: () => o.VariablesContainer.badVariable,
        castTo: () => {},
        clearChildren: () => {},
        clone: () => o.VariablesContainer.badVariable,
        getChildrenCount: () => 0,
        replaceChildren: () => {},
        replaceChildrenArray: () => {},
        getType: function() {
            return "number"
        },
        isPrimitive: function() {
            return !0
        },
        setValue: () => {},
        toggle: () => {},
        getValue: () => 0,
        getChild: () => o.VariablesContainer.badVariable,
        getChildAt: () => o.VariablesContainer.badVariable,
        getChildNamed: () => o.VariablesContainer.badVariable,
        hasChild: function() {
            return !1
        },
        isStructure: function() {
            return !1
        },
        isNumber: function() {
            return !0
        },
        removeChild: function() {},
        setNumber: function() {},
        setString: function() {},
        setBoolean: function() {},
        getAsString: function() {
            return "0"
        },
        getAsNumber: function() {
            return 0
        },
        getAsNumberOrString: function() {
            return 0
        },
        getAsBoolean: function() {
            return !1
        },
        getAllChildren: function() {
            return {}
        },
        getAllChildrenArray: function() {
            return []
        },
        pushVariableCopy: () => {},
        _pushVariable: () => {},
        pushValue: () => {},
        removeAtIndex: function() {},
        add: function() {},
        sub: function() {},
        mul: function() {},
        div: function() {},
        concatenate: function() {},
        concatenateString: function() {},
        setUndefinedInContainer: function() {},
        isUndefinedInContainer: function() {
            return !0
        },
        getPlayerOwnership: function() {
            return 0
        },
        setPlayerOwnership: function() {},
        disableSynchronization: function() {}
    }, o.VariablesContainer = c
})(gdjs || (gdjs = {}));
//# sourceMappingURL=variablescontainer.js.map
