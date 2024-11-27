class MediaCard {
	constructor(media) {
		this._media = media;
	}

	createMediaCard() {
		const $wrapper = document.createElement("article");
		const likeAdded = this._media.class;
		let likeIcon;
		if (likeAdded == "added") {
			likeIcon = `<button class="fa-solid fa-heart added" id="${this._media.id}" aria-label="Like ajouté, cliquer pour le retirer"></button>`;
		} else {
			likeIcon = `<button class="fa-solid fa-heart " id="${this._media.id}" aria-label="ajouter un like"></button>`;
		}
		const mediaCard = `
            <a href="#" title="Ouverture du carrousel" class="open">
                ${this._media.picture}
            </a>
            <p class="title">${this._media.title}</p>
			<p class="likes" >
                <span class="cible" aria-label="nombre de likes">${this._media.likes} </span>
				${likeIcon}
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
