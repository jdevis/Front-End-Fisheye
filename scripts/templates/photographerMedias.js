class MediaCard {
	constructor(media) {
		this._media = media;
	}

	createMediaCard() {
		const $wrapper = document.createElement("article");
		const mediaCard = `
            <a href="#" title="Ouverture du carrousel" class="open">
                ${this._media.picture}
            </a>
            <p class="title">${this._media.title}
                <span class="likes" aria-label="nombre de likes">
                    ${this._media.likes}<button class="no-btn" aria-label="ajouter un like"><i class="fa-solid fa-heart" id="${this._media.id}"></i></button>
                </span>
            </p>    
        `;

		$wrapper.innerHTML = mediaCard;
		return $wrapper;
	}

	createMediaSlider() {
		const $wrapper = document.createElement("li");
		$wrapper.classList.add("slide");
		$wrapper.setAttribute("tabindex", "-1");

		const mediaSlide = `${this._media.picture}<p class="title">${this._media.title}</p>`;
		$wrapper.innerHTML = mediaSlide;
		return $wrapper;
	}
}
