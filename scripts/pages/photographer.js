import { getJson } from "../utils/utils.js";
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
	photographers.photographerMedias.forEach((photographer) => {
		const photographerModel = photographerMedias(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	let params = new URL(document.location).searchParams;
	let id = parseInt(params.get("id"));

	const photographerInfos = await getPhotographerInfos(id);
	displayData(photographerInfos);
}
init();
