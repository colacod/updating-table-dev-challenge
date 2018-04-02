class RowData {

    constructor(name, bestBid, bestAsk, lastBid, lastAsk) {
        this._name = name
        this._bestBid = bestBid
        this._bestAsk = bestAsk
        this._lastBid = lastBid
        this._lastAsk = lastAsk
    }

    get id() {
        return this._name
    }

    get name() {
        return (this._name.slice(0, 3) + "/" + this._name.slice(3 + Math.abs(0))).toUpperCase()
    }

    get bestBid() {
        return this._bestBid
    }

    get bestAsk() {
        return this._bestAsk
    }

    get lastBid() {
        return this._lastBid
    }

    get lastAsk() {
        return this._lastAsk
    }

    get data() {
        return this._data
    }

    set setData(newData) {
        this._data = newData
    }
}

module.exports = RowData