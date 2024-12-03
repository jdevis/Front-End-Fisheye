export class Photographer {
	constructor(photographers) {
		this._name = photographers.name;
		this._picture = photographers.portrait;
		this._id = photographers.id;
		this._city = photographers.city;
		this._country = photographers.country;
		this._price = photographers.price;
		this._tagline = photographers.tagline;
	}

	get name() {
		return this._name;
	}
	get picture() {
		return `/assets/photographers/${this._picture}`;
	}
	get id() {
		return this._id;
	}
	get city() {
		return this._city;
	}
	get country() {
		return this._country;
	}
	get price() {
		return this._price;
	}
	get tagline() {
		return this._tagline;
	}
}
