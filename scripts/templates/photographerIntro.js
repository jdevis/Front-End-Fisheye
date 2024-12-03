export class PhotographerIntro {
	constructor(photographer) {
		this._photographer = photographer;
	}

	createPhotographerIntro() {
		const $wrapper = document.createElement("div");
		$wrapper.classList.add("intro");

		const photographerIntro = `
            <div>
                <h2>${this._photographer.name}</h2>
                <p class="location">${this._photographer.city}, 
                ${this._photographer.country}</p>
                <p>${this._photographer.tagline}</p>
            </div>
            <button class="contact_button" aria-label="Open contact form" id="openModal">Contactez-moi</button>
            <div class="portrait">
                <img src="${this._photographer.picture}" alt="portrait de ${this._photographer.name}">
            </div>
        `;
		$wrapper.innerHTML = photographerIntro;
		return $wrapper;
	}

	displayPhotographerName() {
		const $wrapper = document.querySelector(".modal h2");
		const photographerContact = `Contactez-moi <br/>${this._photographer.name}`;
		$wrapper.innerHTML = photographerContact;
		return $wrapper;
	}

	displayPhotographerPrice() {
		const $wrapper = document.getElementById("dayPrice");
		const photographerPrice = `${this._photographer.price} €/jour`;
		$wrapper.textContent = photographerPrice;
		return $wrapper;
	}
}
