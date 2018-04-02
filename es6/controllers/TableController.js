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

        const newRowData = new RowData(
            data.name,
            data.bestBid,
            data.bestAsk,
            data.lastChangeBid,
            data.lastChangeAsk
        )

        const newDataTable = this._dataTable.filter(rowData => {
            if (rowData.id == newRowData.id) {
                newRowData.setData = rowData.data
                return false
            }
            return true
        })

        newDataTable.push(newRowData)
        newDataTable.sort(this.sortedData)
        this._dataTable = newDataTable
        this.updateGraphData(newRowData)
    }

    sortedData(a, b) {
        return b.lastBid - a.lastBid
    }

    createTable() {
        const headers = ["Name", "Best Bid", "Best Ask", "Last Bid", "Last Ask", "Spark Line"]
        this._rowView.update({ headers, data: this._dataTable })

        this._dataTable.forEach(rowData => {
            const graph = this._query(`#${rowData.id}`)
            Sparkline.draw(graph, rowData.data)
        });
    }

    updateGraph() {
        this._dataTable.forEach(rowData => {
            rowData.setData = this._graphData.get(rowData.id)
        });
    }

    updateGraphData(rowData) {
        const value = ((rowData.bestBid + rowData.bestAsk) / 2)
        const rowGraphData = this._graphData.get(rowData.id)

        if (rowGraphData) {
            this._graphData.get(rowData.id).push(value)
        } else {
            this._graphData.set(rowData.id, [value])
        }
    }
}

module.exports = Controller