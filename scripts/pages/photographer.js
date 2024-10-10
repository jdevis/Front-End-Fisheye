// retrieve photographer ID from URL
async function getPhotographerId() {
	let params = new URLSearchParams(document.location.search);
	let photographerId = params.get("id");
	getPhotographerJson(photographerId);
}
async function getPhotographerCard(card) {}
async function getPhotographerJson(Id) {
	console.log("id: " + Id);
	const response = await fetch("data/photographers.json");
	const photographerJson = await response.json();
	const { media } = photographerJson;
	media.forEach((elm) => {
		const { id, photographerId, title, image, likes, date, price } = elm;
		console.log(photographerId === Id);
	});
}
getPhotographerId();
