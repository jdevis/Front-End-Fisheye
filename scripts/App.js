class App {
	constructor() {
		this.$photographersWrapper = document.querySelector(
			".photographer_section"
		);
		this.$mediasWrapper = document.querySelector(".photograph_medias");
		this.$introWrapper = document.querySelector(".photograph_header");
		this.$sliderWrapper = document.getElementById("medias_slider");
		this.$dayPriceWrapper = document.getElementById("dayPrice");

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
			const medias = await this.mediasApi.getMedias();
			const photographerMedias = medias.filter(
				(element) => element.photographerId === id
			);
			saveMediasLS(photographerMedias);
			const mediasLS = getMediasLS(id);
			// console.log(photographerMedias);
			// console.log("-----------");
			// console.log(mediasLS);
			mediasLS
				.map((media) => new MediasFactory(media))
				.forEach((media) => {
					const Template = new MediaCard(media);
					this.$mediasWrapper.appendChild(Template.createMediaCard());
					const Slider = new MediaCard(media);
					this.$sliderWrapper.appendChild(Slider.createMediaSlider());
				});
			const likes = document.querySelectorAll(
				".photograph_medias i.fa-heart"
			);
			likes.forEach((like) => {
				like.addEventListener("click", (e) => {
					const newLikes = addLike(e.target.id, id);
					e.target.parentNode.innerHTML = `${newLikes}<i class="fa-solid fa-heart" id="${e.target.id}"></i>`;
				});
			});

			const intro = await this.photographersApi.getPhotographers();
			const photographerIntro = intro.filter(
				(element) => element.id === id
			);
			const dayPrice = getPhotographerPrice(photographerIntro);
			this.$dayPriceWrapper.innerHTML = dayPrice;

			photographerIntro
				.map((photographer) => new Photographer(photographer))
				.forEach((photographer) => {
					const Template = new PhotographerIntro(photographer);
					this.$introWrapper.appendChild(
						Template.createPhotographerIntro()
					);
					Template.displayPhotographerName();
					const buttons = document.querySelectorAll(
						".contact_button"
					);
					buttons.forEach((button) => {
						button.addEventListener("click", (e) => {
							if (e.target.id === "closeModal")
								closeModal("contactModal");
							if (e.target.id === "openModal")
								displayModal("contactModal");
						});
					});
				});
			displaySumLikes(mediasLS);
			sortedBy(mediasLS);
			//saveMediasLS(photographerMedias);
			submitForm();
		}
	}
}

const app = new App();
app.main();
