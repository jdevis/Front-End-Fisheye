export class PhotographerCard {
	constructor(photographer) {
		this._photographer = photographer;
	}

	createPhotographerCard() {
		const $wrapper = document.createElement("article");

		const photographerCard = `
            <a href="photographer.html?id=${this._photographer.id}" title="page de ${this._photographer.name}">
                <div class="portrait">
                    <img
                        alt=""
                        src="/assets/photographers/${this._photographer.picture}"
                    />
                </div>
                <h2>${this._photographer.name}</h2>
            </a>
            <p class="location">
            ${this._photographer.city}, ${this._photographer.country}
            </p>
            <p>${this._photographer.tagline}</p>
            <p class="price">${this._photographer.price}</p>
        `;

		$wrapper.innerHTML = photographerCard;
		return $wrapper;
	}
}
