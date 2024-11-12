class PhotographerIntro {
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
            <buttton class="contact_button" id="openModal">Contactez-moi</buttton>
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
}
