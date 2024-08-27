var gdjs;
(function(i) {
    const o = class {
        constructor() {
            this._lastPressedKey = 0;
            this._cursorX = 0;
            this._cursorY = 0;
            this._mouseX = 0;
            this._mouseY = 0;
            this._isMouseInsideCanvas = !0;
            this._mouseWheelDelta = 0;
            this._touches = {
                firstKey: () => {
                    for (const e in this._mouseOrTouches.items)
                        if (e !== "1") return e;
                    return null
                }
            };
            this._startedTouches = [];
            this._endedTouches = [];
            this._touchSimulateMouse = !0;
            this._lastStartedTouchIndex = 0;
            this._lastEndedTouchIndex = 0;
            this._pressedKeys = new Hashtable, this._releasedKeys = new Hashtable, this._pressedMouseButtons = new Array(5), this._releasedMouseButtons = new Array(5), this._mouseOrTouches = new Hashtable
        }
        _getLocationAwareKeyCode(e, s) {
            return s ? 96 <= e && e <= 105 ? e : e + 1e3 * s : o._DEFAULT_LEFT_VARIANT_KEYS.indexOf(e) !== -1 ? e + 1e3 : e
        }
        onKeyPressed(e, s) {
            const t = this._getLocationAwareKeyCode(e, s);
            this._pressedKeys.put(t, !0), this._lastPressedKey = t
        }
        onKeyReleased(e, s) {
            const t = this._getLocationAwareKeyCode(e, s);
            this._pressedKeys.put(t, !1), this._releasedKeys.put(t, !0)
        }
        getLastPressedKey() {
            return this._lastPressedKey
        }
        isKeyPressed(e) {
            return this._pressedKeys.containsKey(e) && this._pressedKeys.get(e)
        }
        wasKeyReleased(e) {
            return this._releasedKeys.containsKey(e) && this._releasedKeys.get(e)
        }
        anyKeyPressed() {
            for (const e in this._pressedKeys.items)
                if (this._pressedKeys.items.hasOwnProperty(e) && this._pressedKeys.items[e]) return !0;
            return !1
        }
        anyKeyReleased() {
            for (const e in this._releasedKeys.items)
                if (this._releasedKeys.items.hasOwnProperty(e) && this._releasedKeys.items[e]) return !0;
            return !1
        }
        onMouseMove(e, s) {
            this._setCursorPosition(e, s), this._mouseX = e, this._mouseY = s, this.isMouseButtonPressed(o.MOUSE_LEFT_BUTTON) && this._moveTouch(o.MOUSE_TOUCH_ID, this.getCursorX(), this.getCursorY())
        }
        _setCursorPosition(e, s) {
            this._cursorX = e, this._cursorY = s
        }
        getCursorX() {
            return this._cursorX
        }
        getCursorY() {
            return this._cursorY
        }
        getMouseX() {
            return this._mouseX
        }
        getMouseY() {
            return this._mouseY
        }
        onMouseLeave() {
            this._isMouseInsideCanvas = !1
        }
        onMouseEnter() {
            this._isMouseInsideCanvas = !0
        }
        isMouseInsideCanvas() {
            return this._isMouseInsideCanvas
        }
        onMouseButtonPressed(e) {
            this._setMouseButtonPressed(e), e === o.MOUSE_LEFT_BUTTON && this._addTouch(o.MOUSE_TOUCH_ID, this.getCursorX(), this.getCursorY())
        }
        _setMouseButtonPressed(e) {
            this._pressedMouseButtons[e] = !0, this._releasedMouseButtons[e] = !1
        }
        onMouseButtonReleased(e) {
            this._setMouseButtonReleased(e), e === o.MOUSE_LEFT_BUTTON && this._removeTouch(o.MOUSE_TOUCH_ID)
        }
        _setMouseButtonReleased(e) {
            this._pressedMouseButtons[e] = !1, this._releasedMouseButtons[e] = !0
        }
        isMouseButtonPressed(e) {
            return this._pressedMouseButtons[e] !== void 0 && this._pressedMouseButtons[e]
        }
        isMouseButtonReleased(e) {
            return this._releasedMouseButtons[e] !== void 0 && this._releasedMouseButtons[e]
        }
        onMouseWheel(e) {
            this._mouseWheelDelta = e
        }
        getMouseWheelDelta() {
            return this._mouseWheelDelta
        }
        getTouchX(e) {
            return this._mouseOrTouches.containsKey(e) ? this._mouseOrTouches.get(e).x : 0
        }
        getTouchY(e) {
            return this._mouseOrTouches.containsKey(e) ? this._mouseOrTouches.get(e).y : 0
        }
        hasTouchEnded(e) {
            return this._endedTouches.includes(e) && this._mouseOrTouches.get(e).justEnded
        }
        getAllTouchIdentifiers() {
            o._allTouchIds.length = 0;
            for (const e in this._mouseOrTouches.items) this._mouseOrTouches.items.hasOwnProperty(e) && o._allTouchIds.push(parseInt(e, 10));
            return o._allTouchIds
        }
        onTouchStart(e, s, t) {
            this._addTouch(this.getPublicTouchIdentifier(e), s, t), this._touchSimulateMouse && (this._setCursorPosition(s, t), this._setMouseButtonPressed(o.MOUSE_LEFT_BUTTON))
        }
        _addTouch(e, s, t) {
            this._endedTouches.includes(e) || (this._startedTouches.push(e), this._mouseOrTouches.put(e, {
                x: s,
                y: t,
                justEnded: !1
            }))
        }
        onTouchMove(e, s, t) {
            this._moveTouch(this.getPublicTouchIdentifier(e), s, t), this._touchSimulateMouse && this._setCursorPosition(s, t)
        }
        _moveTouch(e, s, t) {
            const r = this._mouseOrTouches.get(e);
            !r || (r.x = s, r.y = t)
        }
        onTouchEnd(e) {
            this._removeTouch(this.getPublicTouchIdentifier(e)), this._touchSimulateMouse && this._setMouseButtonReleased(o.MOUSE_LEFT_BUTTON)
        }
        onTouchCancel(e) {
            this.onTouchEnd(e)
        }
        _removeTouch(e) {
            this._endedTouches.push(e), this._mouseOrTouches.containsKey(e) && (this._mouseOrTouches.get(e).justEnded = !0)
        }
        getPublicTouchIdentifier(e) {
            return e + 2
        }
        getStartedTouchIdentifiers() {
            return this._startedTouches
        }
        popStartedTouch() {
            const e = this._startedTouches[this._lastStartedTouchIndex];
            return this._lastStartedTouchIndex++, e
        }
        popEndedTouch() {
            const e = this._endedTouches[this._lastEndedTouchIndex];
            return this._lastEndedTouchIndex++, e
        }
        touchSimulateMouse(e) {
            e === void 0 && (e = !0), this._touchSimulateMouse = e
        }
        isSimulatingMouseWithTouch() {
            return this._touchSimulateMouse
        }
        onFrameEnded() {
            for (const e in this._mouseOrTouches.items) this._mouseOrTouches.items.hasOwnProperty(e) && this._mouseOrTouches.items[e].justEnded && this._mouseOrTouches.remove(e);
            this._startedTouches.length = 0, this._endedTouches.length = 0, this._releasedKeys.clear(), this._releasedMouseButtons.length = 0, this._mouseWheelDelta = 0, this._lastStartedTouchIndex = 0, this._lastEndedTouchIndex = 0
        }
        isScrollingUp() {
            return this.getMouseWheelDelta() > 0
        }
        isScrollingDown() {
            return this.getMouseWheelDelta() < 0
        }
    };
    let u = o;
    u.MOUSE_LEFT_BUTTON = 0, u.MOUSE_RIGHT_BUTTON = 1, u.MOUSE_MIDDLE_BUTTON = 2, u.MOUSE_BACK_BUTTON = 3, u.MOUSE_FORWARD_BUTTON = 4, u.MOUSE_TOUCH_ID = 1, u._DEFAULT_LEFT_VARIANT_KEYS = [16, 17, 18, 91], u._allTouchIds = [], i.InputManager = u
})(gdjs || (gdjs = {}));
//# sourceMappingURL=inputmanager.js.map
