class View {

    constructor(element) {
        this._element = element;
    }

    template(model) {
        throw new Error('You should override this method in your template');
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}

module.exports = View