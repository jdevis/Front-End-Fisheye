class App {
	constructor() {
		this.$photographersWrapper = document.querySelector(
			".photographer_section"
		);
		this.photographersApi = new PhotographerApi("/data/photographers.json");
	}

	async main() {
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
	}
}

const app = new App();
app.main();
