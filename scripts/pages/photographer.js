import {
	getJson,
	writeURL,
	getSumLikes,
	getPhotographerPrice,
} from "../utils/utils.js";
async function getPhotographerInfos(id) {
	const data = await getJson();
	const photographerMedias = data.media.filter(
		(element) => element.photographerId === id
	);
	const photographerCard = data.photographers.filter(
		(element) => element.id === id
	);
	return { photographerCard, photographerMedias };
}
async function displayData(photographers) {
	const photographersHeader = document.querySelector(".photograph_header");
	const photographersSection = document.querySelector(".photograph_medias");
	photographers.photographerCard.forEach((photographer) => {
		const photographerModel = photographerPage(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersHeader.appendChild(userCardDOM);
	});
	// const mediasSorted = sortedBy(photographers.photographerMedias);
	// mediasSorted.forEach((photographer) => {
	// 	const photographerModel = photographerMedias(photographer);
	// 	const userCardDOM = photographerModel.getUserCardDOM();
	// 	photographersSection.appendChild(userCardDOM);
	// });
	photographers.photographerMedias.forEach((photographer) => {
		const photographerModel = photographerMedias(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}
function createPhotographerBanner(data) {
	const photographerBanner = document.querySelector(".sum_likes");
	const heart = document.createElement("i");
	heart.setAttribute("class", "fa-solid fa-heart");
	const photographerLikes = document.createElement("span");
	photographerLikes.setAttribute("class", "likes");
	photographerLikes.textContent = getSumLikes(data);
	photographerLikes.appendChild(heart);
	const photographerDayPrice = document.createElement("span");
	photographerDayPrice.setAttribute("class", "price");
	photographerDayPrice.textContent = getPhotographerPrice(data) + "€/jour";
	appendChilds(photographerBanner, {
		photographerLikes,
		photographerDayPrice,
	});
}
function sortedBy(data) {
	const defaultSorted = data.slice();
	data = defaultSorted;
	document.querySelector("#tri").addEventListener("change", function () {
		if (this.value === "default") {
			data = defaultSorted;
		}
		if (this.value === "popularity") {
			const mediasSorted = data.slice().sort((a, b) => b.likes - a.likes);
			data = mediasSorted;
		}
		if (this.value === "date") {
			const mediasSorted = data
				.slice()
				.sort((a, b) => new Date(b.date) - new Date(a.date));
			data = mediasSorted;
		}
		if (this.value === "title") {
			const mediasSorted = data
				.slice()
				.sort((a, b) => a.title.localeCompare(b.title));
			data = mediasSorted;
		}
		console.log(data);
		return data;
	});
}
async function init() {
	let params = new URL(document.location).searchParams;
	let id = parseInt(params.get("id"));

	const photographerInfos = await getPhotographerInfos(id);
	displayData(photographerInfos);
	createPhotographerBanner(photographerInfos);
	sortedBy(photographerInfos.photographerMedias);
}
init();
