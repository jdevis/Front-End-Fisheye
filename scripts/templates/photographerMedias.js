export class MediaCard {
	constructor(media) {
		this._media = media;
	}

	createMediaCard() {
		const $wrapper = document.createElement("article");
		const likeAdded = this._media.class;
		const videoMedia = this._media.video;
		let likeIcon;
		let pictureType;
		if (likeAdded == "added") {
			likeIcon = `<button class="fa-solid fa-heart added" id="${this._media.id}" aria-label="Like ajouté, cliquer pour le retirer"></button>`;
		} else {
			likeIcon = `<button class="fa-solid fa-heart " id="${this._media.id}" aria-label="ajouter un like"></button>`;
		}
		if (videoMedia) {
			pictureType = `
                <video controls="true" alt="${this._media.title}">
                    <source 
                    src="/assets/photographers/${this._media.photographerId}/${this._media.video}" type="video/mp4">
                </video>
                `;
		} else {
			pictureType = `<img 
				src="/assets/photographers/${this._media.photographerId}/${this._media.image}" 
				alt="${this._title}">`;
		}
		const mediaCard = `
            <a href="#" title="Ouverture du carrousel" class="open">
                ${pictureType}
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
