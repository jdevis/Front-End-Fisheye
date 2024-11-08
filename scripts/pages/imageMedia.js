class ImageMedia {
	constructor(media) {
		this._id = media.id;
		this._photographerId = media.photographerId;
		this._likes = media.likes;
		this._date = media.date;
		this._price = media.price;
		this._title = media.title;
		this._picture = media.image;
	}

	get picture() {
		return `<img 
        src="/assets/photographers/${this._photographerId}/${this._picture}" 
        alt="${this._title}">`;
	}
	get id() {
		return this._id;
	}
	get photographerId() {
		return this._photographerId;
	}
	get likes() {
		return this._likes;
	}
	get date() {
		return this._date;
	}
	get price() {
		return this._price + `€`;
	}
	get title() {
		return this._title;
	}
}
