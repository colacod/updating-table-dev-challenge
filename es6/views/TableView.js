const View = require('./View.js')

class TableView extends View {

    constructor(element) {
        super(element);
    }

    template(model) {
        return `
            <table>
                <thead>
                    <tr>
                        ${model.headers.map(header => `
                            <th>${header}</th>
                        `).join('')} 
                    </tr>
                </thead>
                <tbody>
                    ${model.data.map(rowData => `
                        <tr>
                            <td>${rowData.name}</td>
                            <td>${rowData.bestBid}</td>
                            <td>${rowData.bestAsk}</td>
                            <td>${rowData.lastBid}</td>
                            <td>${rowData.lastAsk}</td>
                            <td><span id="${rowData.id}"></span></td>
                        </tr>
                    `).join('')}    
                </tbody>
            </table>
        `;
    }
}

module.exports = TableView