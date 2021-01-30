class TouchMoveItem {
    _staticHeight = 0
    _clientY = 0
    newHeight = 0
    _temp = 0
    _diff = 0
    _step = 80
    max = 630
    min = 480
    setBlockHeight(_staticHeight) {
        this._staticHeight = _staticHeight
        this.newHeight = _staticHeight
    }
    setMaxHeight(val) {
        this.max = val
    }
    setMinHeight(val) {
        this.min = val
    }
    // touch start
    initTouchY(clientY) {
        this._clientY = clientY
    }
    // touch move计算差值
    diff(clientY) {
        return clientY - this._clientY
    }
    // get new block hight
    updateHeight(clientY) {
        let diff = this.diff(clientY)
        this._diff = diff
        if (this.newHeight - diff >= this.min && this.newHeight - diff <= this.max) {
            this._temp = this.newHeight - diff
        } else {
            if (this.newHeight - diff < this.min) {
                this._temp = this.min
            }
            if (this.newHeight - diff > this.max) {
                this._temp = this.max

            }
        }

        return this._temp
    }
    // touch end
    touchEnd() {
        if (Math.abs(this._diff) > this._step) {
            if (this._diff > 0) {
                this.newHeight = this.min
            } else {
                this.newHeight = this.max
            }
        } else {
            this.newHeight = this.newHeight
        }
    }
    getStaticHeight() {
        return this._staticHeight
    }


}

export default TouchMoveItem