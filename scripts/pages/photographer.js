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
async function displayData(photographers, id) {
	const photographersHeader = document.querySelector(".photograph_header");
	const photographersSection = document.querySelector(".photograph_medias");
	photographers.photographerCard.forEach((photographer) => {
		const photographerModel = photographerPage(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersHeader.appendChild(userCardDOM);
	});
	photographers.photographerMedias.forEach((photographer) => {
		writeURL(photographer, id);
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
async function init() {
	let params = new URL(document.location).searchParams;
	let id = parseInt(params.get("id"));

	const photographerInfos = await getPhotographerInfos(id);
	displayData(photographerInfos, id);
	createPhotographerBanner(photographerInfos);
}
init();
