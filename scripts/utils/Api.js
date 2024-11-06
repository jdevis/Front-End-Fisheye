class Api {
	/**
	 *
	 * @param {string} url
	 */
	constructor(url) {
		this._url = url;
	}

	async getC() {
		return fetch(this._url)
			.then((res) => res.json())
			.then((res) => res.photographers)
			.catch((err) => console.log("an error occurs", err));
	}
	async getM() {
		return fetch(this._url)
			.then((res) => res.json())
			.then((res) => res.media)
			.catch((err) => console.log("an error occurs", err));
	}
}

class PhotographerApi extends Api {
	/**
	 *
	 * @param {string} url
	 */
	constructor(url) {
		super(url);
	}

	async getPhotographers() {
		return await this.getC();
	}
}
class MediaApi extends Api {
	/**
	 *
	 * @param {string} url
	 */
	constructor(url) {
		super(url);
	}

	async getMedias() {
		return await this.getM();
	}
}
