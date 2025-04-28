export const states = {
    Initial: "initial",
    Loading: "loading",
    Done: "done",
}

export class VariantFormController {
    constructor(element) {
        this.form = element;
        this.input = element.querySelector("input");
        this.button = element.querySelector("button");

        this.state = states.Initial;
        if (element.hasAttribute("data-state")) {
            this.state = element.getAttribute("data-state")
        }

        this._init();
    }

    reset() {
        this.input.value = "";
        this._resetState();
    }

    _init() {
        this.form.addEventListener('submit', this._handleSubmit.bind(this));
        this.input.addEventListener('input', this._handleInputChange.bind(this));
    }

    _handleError(error) {
        this.form.dispatchEvent(new CustomEvent('submit-error', {
            detail: {error: error}
        }));
    }

    _notify(variant) {
        this.form.dispatchEvent(new CustomEvent('submit-success', {
            detail: {variant}
        }));
    }

    _validateInput() {
        const value = this.input.value.trim();

        for (let i = 0; i < value.length; i++) {
            if (value[i] < "0" || value[i] > "9") {
                return false;
            }
        }

        return true;
    }

    _handleInputChange() {
        if (this.state !== states.Initial) {
            this._resetState();
        }
    }

    _setStateLoading() {
        this.state = states.Loading;
        this.form.setAttribute("data-state", states.Loading);
        this.form.disable = true;
    }

    _setStateDone() {
        this.state = states.Done;
        this.form.setAttribute("data-state", states.Done);
        this.form.disable = false;
    }

    _resetState() {
        this.state = states.Initial;
        this.form.setAttribute("data-state", states.Initial);
        this.form.disable = false;
    }

    async _handleSubmit(evt) {
        evt.preventDefault()

        if (this.state === states.Loading) return;
        if (this.state === states.Done) {
            this._resetState();
            return
        }

        if (!this._validateInput()) {
            this._handleError("Invalid input")
            return null;
        }

        const variantID = Number(this.input.value.trim())

        this._setStateLoading();
        const variant = await this._fetchVariant(variantID);
        this._setStateDone();

        this._notify(variant);
    }

    async _fetchVariant(id) {
        const url = `https://kompege.ru/api/v1/variant/kim/${id}`;

        try {
            const response = await fetch(url, {
                headers: {
                    "Accept": "application/json",
                }
            });

            if (!response.ok) {
                this._handleError(`RequestError. Status ${response.statusText}`);
                return null;
            }

            return await response.json();
        } catch (e) {
            this._handleError(`APIError: ${e.toString()}`);
        }

        return null;
    }
}