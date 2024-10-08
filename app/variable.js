var gdjs;
(function(i) {
    const n = new i.Logger("Variables");
    class l {
        constructor(e) {
            this._type = "number";
            this._value = 0;
            this._str = "0";
            this._bool = !1;
            this._children = {};
            this._childrenArray = [];
            this._undefinedInContainer = !1;
            this._playerNumber = 0;
            this.reinitialize(e)
        }
        reinitialize(e) {
            if (this._type = "number", this._value = 0, this._str = "0", this._bool = !1, this._children = {}, this._childrenArray = [], this._undefinedInContainer = !1, e !== void 0) {
                if (this._type = e.type || "number", this._type === "number") this._value = parseFloat(e.value || "0"), this._value !== this._value && (this._value = 0);
                else if (this._type === "string") this._str = "" + e.value || "0";
                else if (this._type === "boolean") this._bool = !!e.value;
                else if (this._type === "structure") {
                    if (e.children !== void 0)
                        for (var t = 0, r = e.children.length; t < r; ++t) {
                            var s = e.children[t];
                            s.name !== void 0 && (this._children[s.name] = new i.Variable(s))
                        }
                } else if (this._type === "array" && e.children)
                    for (const a of e.children) this._childrenArray.push(new i.Variable(a))
            }
        }
        static isPrimitive(e) {
            return e === "string" || e === "number" || e === "boolean"
        }
        static copy(e, t, r) {
            if (r || t.clearChildren(), t.castTo(e.getType()), e.isPrimitive()) t.setValue(e.getValue());
            else if (e.getType() === "structure") {
                const s = e.getAllChildren();
                for (const a in s) s.hasOwnProperty(a) && t.addChild(a, s[a].clone())
            } else if (e.getType() === "array")
                for (const s of e.getAllChildrenArray()) t.pushVariableCopy(s);
            return t
        }
        fromJSObject(e) {
            if (e === null) this.setString("null");
            else if (typeof e == "number") Number.isNaN(e) ? (n.warn("Variables cannot be set to NaN, setting it to 0."), this.setNumber(0)) : this.setNumber(e);
            else if (typeof e == "string") this.setString(e);
            else if (typeof e != "undefined")
                if (typeof e == "boolean") this.setBoolean(e);
                else if (Array.isArray(e)) {
                this.castTo("array"), this.clearChildren();
                for (const r in e) this.getChild(r).fromJSObject(e[r])
            } else if (typeof e == "object") {
                this.castTo("structure"), this.clearChildren();
                for (var t in e) e.hasOwnProperty(t) && this.getChild(t).fromJSObject(e[t])
            } else typeof e == "symbol" ? this.setString(e.toString()) : typeof e == "bigint" ? (e > Number.MAX_SAFE_INTEGER && n.warn("Error while converting JS variable to GDevelop variable: Integers bigger than " + Number.MAX_SAFE_INTEGER + " aren't supported by GDevelop variables, it will be reduced to that size."), variable.setNumber(parseInt(e, 10))) : typeof e == "function" ? n.error("Error while converting JS variable to GDevelop variable: Impossible to set variable value to a function.") : n.error("Error while converting JS variable to GDevelop variable: Cannot identify type of object " + e);
            return this
        }
        fromJSON(e) {
            try {
                var t = JSON.parse(e)
            } catch (r) {
                return n.error("Unable to parse JSON: " + e + r), this
            }
            return this.fromJSObject(t), this
        }
        toJSObject() {
            switch (this._type) {
                case "string":
                    return this.getAsString();
                case "number":
                    return this.getAsNumber();
                case "boolean":
                    return this.getAsBoolean();
                case "structure":
                    const e = {};
                    for (const r in this._children) e[r] = this._children[r].toJSObject();
                    return e;
                case "array":
                    const t = [];
                    for (const r of this._childrenArray) t.push(r === void 0 ? void 0 : r.toJSObject());
                    return t
            }
        }
        isPrimitive() {
            return i.Variable.isPrimitive(this._type)
        }
        clone() {
            return i.Variable.copy(this, new i.Variable)
        }
        setUndefinedInContainer() {
            this._undefinedInContainer = !0
        }
        isUndefinedInContainer() {
            return this._undefinedInContainer
        }
        castTo(e) {
            if (e === "string") this.setString(this.getAsString());
            else if (e === "number") this.setNumber(this.getAsNumber());
            else if (e === "boolean") this.setBoolean(this.getAsBoolean());
            else if (e === "structure") {
                if (this._type === "structure") return;
                this._children = this.getAllChildren(), this._type = "structure"
            } else if (e === "array") {
                if (this._type === "array") return;
                this._childrenArray = this.getAllChildrenArray(), this._type = "array"
            }
        }
        getChild(e) {
            return this._type === "array" ? this.getChildAt(Number.isInteger(e) ? e : parseInt(e, 10) || 0) : (this._type !== "structure" && this.castTo("structure"), this.getChildNamed("" + e))
        }
        getChildNamed(e) {
            const t = this._children[e];
            return t ?? (this._children[e] = new i.Variable)
        }
        addChild(e, t) {
            return this._type !== "structure" && this.castTo("structure"), this._children[e] = t, this
        }
        hasChild(e) {
            return this._type === "structure" && this._children.hasOwnProperty(e)
        }
        removeChild(e) {
            this._type === "structure" && delete this._children[e]
        }
        clearChildren() {
            this._children = {}, this._childrenArray = []
        }
        replaceChildren(e) {
            this._type = "structure", this._children = e
        }
        replaceChildrenArray(e) {
            this._type = "array", this._childrenArray = e
        }
        getAsNumber() {
            if (this._type !== "number") {
                let e = 0;
                return this._type === "string" ? e = parseFloat(this._str) : this._type === "boolean" && (e = this._bool ? 1 : 0), e === e ? e : 0
            }
            return this._value
        }
        setNumber(e) {
            this._type = "number", e = parseFloat(e), this._value = e === e ? e : 0
        }
        getAsString() {
            return this._type !== "string" ? this._type === "number" ? this._value.toString() : this._type === "boolean" ? this._bool ? "true" : "false" : this._type === "structure" ? "[Structure]" : this._type === "array" ? "[Array]" : "" : this._str
        }
        setString(e) {
            this._type = "string", this._str = "" + e
        }
        getAsNumberOrString() {
            return this._type === "number" ? this._value : this.getAsString()
        }
        getAsBoolean() {
            return this._type !== "boolean" ? this._type === "number" ? this._value !== 0 : this._type === "string" ? this._str !== "0" && this._str !== "" && this._str !== "false" : !0 : this._bool
        }
        setBoolean(e) {
            this._type = "boolean", this._bool = !!e
        }
        toggle() {
            this.setBoolean(!this.getAsBoolean())
        }
        setValue(e) {
            this._type === "string" ? this.setString(e) : this._type === "number" ? this.setNumber(e) : this._type === "boolean" && this.setBoolean(e)
        }
        getValue() {
            return this._type === "number" ? this.getAsNumber() : this._type === "boolean" ? this.getAsBoolean() : this.getAsString()
        }
        isStructure() {
            return this._type === "structure"
        }
        isNumber() {
            return this._type === "number"
        }
        getType() {
            return this._type
        }
        getAllChildren() {
            return this._type === "structure" ? this._children : this._type === "array" ? Object.assign({}, this._childrenArray) : {}
        }
        getAllChildrenArray() {
            return this._type === "structure" ? Object.values(this._children) : this._type === "array" ? this._childrenArray : []
        }
        getChildrenCount() {
            return this._type === "structure" ? Object.keys(this._children).length : this._type === "array" ? this._childrenArray.length : 0
        }
        add(e) {
            this.setNumber(this.getAsNumber() + e)
        }
        sub(e) {
            this.setNumber(this.getAsNumber() - e)
        }
        mul(e) {
            this.setNumber(this.getAsNumber() * e)
        }
        div(e) {
            this.setNumber(this.getAsNumber() / e)
        }
        concatenateString(e) {
            this.setString(this.getAsString() + e)
        }
        concatenate(e) {
            this.setString(this.getAsString() + e)
        }
        getChildAt(e) {
            return this._type !== "array" && this.castTo("array"), (this._childrenArray[e] === void 0 || this._childrenArray[e] === null) && (this._childrenArray[e] = new i.Variable), this._childrenArray[e]
        }
        removeAtIndex(e) {
            this._type === "array" && this._childrenArray.splice(e, 1)
        }
        pushVariableCopy(e) {
            this._type !== "array" && this.castTo("array"), this._childrenArray.push(e.clone())
        }
        _pushVariable(e) {
            this._type !== "array" && this.castTo("array"), this._childrenArray.push(e)
        }
        pushValue(e) {
            this._type !== "array" && this.castTo("array"), this._childrenArray.push(new i.Variable({
                type: typeof e,
                value: e
            }))
        }
        getPlayerOwnership() {
            return this._playerNumber
        }
        setPlayerOwnership(e) {
            this._playerNumber = e
        }
        disableSynchronization() {
            this._playerNumber = null
        }
    }
    i.Variable = l
})(gdjs || (gdjs = {}));
//# sourceMappingURL=variable.js.map
