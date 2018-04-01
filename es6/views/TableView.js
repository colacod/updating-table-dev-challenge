const View = require('./View.js')

class TableView extends View {

    constructor(elemento) {
        super(elemento);
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
                    ${model.data.map(value => `
                        <tr>
                            <td>${value.name}</td>
                            <td>${value.bestBid}</td>
                            <td>${value.bestAsk}</td>
                            <td>${value.lastBid}</td>
                            <td>${value.lastAsk}</td>
                            <td><span id="${value.id}"></span></td>
                        </tr>
                    `).join('')}    
                </tbody>
            </table>
        `;
    }
}

module.exports = TableView