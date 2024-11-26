class VideoMedia {
	constructor(media) {
		this._id = media.id;
		this._photographerId = media.photographerId;
		this._likes = media.likes;
		this._date = media.date;
		this._price = media.price;
		this._title = media.title;
		this._picture = media.video;
		this._class = media.class;
	}

	get picture() {
		return `
                <video controls="true" alt="${this._title}">
                    <source 
                    src="/assets/photographers/${this._photographerId}/${this._picture}" type="video/mp4">
                </video>
                `;
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
	get class() {
		return this._class;
	}
}
