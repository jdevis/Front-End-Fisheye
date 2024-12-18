import { PhotographerApi, MediaApi } from "./utils/Api.js";
import { Media } from "./models/media.js";
import { Photographer } from "./models/photographer.js";
import { MediaCard } from "./templates/photographerMedias.js";
import { PhotographerIntro } from "./templates/photographerIntro.js";
import { PhotographerCard } from "./templates/photographerCard.js";
import { slider, toggleModals } from "./utils/slider.js";
import {
	displaylikes,
	sortedBy,
	saveMediasLS,
	getMediasLS,
} from "./utils/utils.js";

class App {
	constructor() {
		this.$photographersWrapper = document.querySelector(
			".photographer_section"
		);
		this.$mediasWrapper = document.querySelector(".photograph_medias");
		this.$introWrapper = document.querySelector(".photograph_header");
		this.$sliderWrapper = document.getElementById("medias_slider");

		this.photographersApi = new PhotographerApi("/data/photographers.json");
		this.mediasApi = new MediaApi("/data/photographers.json");
	}

	async main() {
		// get photographerId from URL
		let params = new URL(document.location).searchParams;
		let id = parseInt(params.get("id"));

		// id doesn't exist so we're on homepage
		if (!id) {
			// Retrieve photographers from JSON
			const photographersData = await this.photographersApi.getPhotographers();

			photographersData
				// transform data into photographer class
				.map((photographer) => new Photographer(photographer))
				.forEach((photographer) => {
					const Template = new PhotographerCard(photographer);
					this.$photographersWrapper.appendChild(
						Template.createPhotographerCard()
					);
				});
		} else if (id) {
			// id exist so we're on photographer detail page
			const intro = await this.photographersApi.getPhotographers();
			const photographerIntro = intro.filter(
				(element) => element.id === id
			);
			photographerIntro
				.map((photographer) => new Photographer(photographer))
				.forEach((photographer) => {
					const Template = new PhotographerIntro(photographer);
					this.$introWrapper.innerHTML = "";
					this.$introWrapper.appendChild(
						Template.createPhotographerIntro()
					);
					Template.displayPhotographerName();
					Template.displayPhotographerPrice();
				});

			const medias = await this.mediasApi.getMedias();
			const photographerMedias = medias.filter(
				(element) => element.photographerId === id
			);
			saveMediasLS(photographerMedias);
			const mediasLS = getMediasLS(id);
			mediasLS
				.map((media) => new Media(media))
				.forEach((media) => {
					const Template = new MediaCard(media);
					this.$mediasWrapper.appendChild(Template.createMediaCard());
					const Slider = new MediaCard(media);
					this.$sliderWrapper.appendChild(Slider.createMediaSlider());
				});

			sortedBy(id);
			displaylikes(id);
			slider();
			toggleModals();
		}
	}
}

const app = new App();
app.main();
