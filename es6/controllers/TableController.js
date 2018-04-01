const RowView = require('../views/TableView')
const RowData = require('../models/RowData')

class Controller {

    constructor() {
        this._query = document.querySelector.bind(document)
        this._dataTable = new Array()
        this._graphData = new Map()
        this._rowView = new RowView(this._query('#results'))
    }

    updateData(data) {

        const rowData = new RowData(
            data.name,
            data.bestBid,
            data.bestAsk,
            data.lastChangeBid,
            data.lastChangeAsk
        )

        const newDtaTable = this._dataTable.filter(value => {
            if(value.id != rowData.id) {
                return true
            } else {
                rowData.setData = value.data
                return false
            }
        })
        this._dataTable = newDtaTable
        this._dataTable.push(rowData)
        this._dataTable.sort(this.sortedData)
        this.updateGraphData(rowData)
    }

    sortedData(a, b) {
        return b.lastBid - a.lastBid
    }

    createTable() {
        const headers = ["Name", "Best Bid", "Best Ask", "Last Bid", "Last Ask", "Spark Line"]
        this._rowView.update({ headers, data: this._dataTable })

        this._dataTable.forEach(value => {
            const graph = this._query(`#${value.id}`)
            Sparkline.draw(graph, value.data)
        });
    }

    updateGraph() {
        this._dataTable.forEach(value => {
            value.setData = this._graphData.get(value.id)
        });
    }

    updateGraphData(rowData) {
        const data = ((rowData.bestBid + rowData.bestAsk) / 2)
        const rowGraphDate = this._graphData.get(rowData.id)

        if (rowGraphDate) {
            this._graphData.get(rowData.id).push(data)
        } else {
            this._graphData.set(rowData.id, [data])
        }
    }
}

module.exports = Controller