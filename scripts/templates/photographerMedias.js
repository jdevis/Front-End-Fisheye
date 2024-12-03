export class MediaCard {
	constructor(media) {
		this._media = media;
	}

	toggleLikes() {
		const likeAdded = this._media.class;
		let likeIcon;
		if (likeAdded == "added") {
			likeIcon = `<button class="fa-solid fa-heart added" id="${this._media.id}" aria-label="Like ajouté, cliquer pour le retirer"></button>`;
		} else {
			likeIcon = `<button class="fa-solid fa-heart " id="${this._media.id}" aria-label="ajouter un like"></button>`;
		}
		return likeIcon;
	}

	toggleMedias() {
		const videoMedia = this._media.video;
		let mediaType;
		if (videoMedia) {
			mediaType = `
                <video controls="true" alt="${this._media.title}">
                    <source 
                    src="/assets/photographers/${this._media.photographerId}/${this._media.video}" type="video/mp4">
                </video>
                `;
		} else {
			mediaType = `<img 
				src="/assets/photographers/${this._media.photographerId}/${this._media.image}" 
				alt="${this._title}">`;
		}
		return mediaType;
	}

	createMediaCard() {
		const $wrapper = document.createElement("article");
		const likeIcon = this.toggleLikes();
		const mediaType = this.toggleMedias();
		const mediaCard = `
            <a href="#" title="Ouverture du carrousel" class="open">
                ${mediaType}
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
		const mediaType = this.toggleMedias();

		const mediaSlide = `${mediaType}<p class="title">${this._media.title}</p>`;
		$wrapper.innerHTML = mediaSlide;
		return $wrapper;
	}
}
