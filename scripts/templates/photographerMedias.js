class MediaCard {
	constructor(media) {
		this._media = media;
	}

	createMediaCard() {
		const $wrapper = document.createElement("article");

		const mediaCard = `
            <a href="#" title="Ouverture du carrousel" class="open" aria-label="image closeup view">
                ${this._media.picture}
            </a>
            <p class="title">${this._media.title}
                <span class="likes">
                    ${this._media.likes}<i class="fa-solid fa-heart" id="${this._media.id}"></i>
                </span>
            </p>    
        `;

		$wrapper.innerHTML = mediaCard;
		return $wrapper;
	}

	createMediaSlider() {
		const $wrapper = document.createElement("li");
		$wrapper.classList.add("slide");

		const mediaSlide = `${this._media.picture}<p class="title">${this._media.title}</p>`;
		$wrapper.innerHTML = mediaSlide;
		return $wrapper;
	}
}
