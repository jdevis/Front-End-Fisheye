class MediaCard {
	constructor(media) {
		this._media = media;
	}

	createMediaCard() {
		const $wrapper = document.createElement("article");

		const mediaCard = `
            <a href="#" title="Ouverture du carrousel" id="${this._media.id}">
                ${this._media.picture}
            </a>
            <p class="title">${this._media.title}
                <span class="likes">
                    ${this._media.likes}<i class="fa-solid fa-heart"></i>
                </span>
            </p>    
        `;

		$wrapper.innerHTML = mediaCard;
		return $wrapper;
	}

	createMediaSlider() {
		const $wrapper = document.createElement("li");
		$wrapper.classList.add("slide");

		const mediaSlide = this._media.picture;
		$wrapper.innerHTML = mediaSlide;
		return $wrapper;
	}
}
