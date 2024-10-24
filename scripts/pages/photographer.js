import { getJson, getSumLikes, getPhotographerPrice } from "../utils/utils.js";
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
async function displayCard(data, elmId) {
	const container = document.querySelector(elmId);
	data.forEach((element) => {
		const photographerModel = photographerPage(element);
		const userCardDOM = photographerModel.getUserCardDOM();
		container.appendChild(userCardDOM);
	});
}
async function displayMedias(data, elmId) {
	const container = document.querySelector(elmId);
	console.log("dans displaymedias");
	data.forEach((element) => {
		const photographerModel = photographerMedias(element);
		const userCardDOM = photographerModel.getUserCardDOM();
		container.appendChild(userCardDOM);
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

function sortedBy(data, elmId) {
	const defaultSorted = data.slice();
	data = defaultSorted;
	console.log("dans sortedby");
	document.querySelector("#tri").addEventListener("change", function () {
		const container = document.querySelector(elmId);
		console.log(container.childNodes);
		container.childNodes.forEach((el) => el.remove());
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
		//displayMedias(data, elmId);
	});
}

async function init() {
	let params = new URL(document.location).searchParams;
	let id = parseInt(params.get("id"));

	const photographerInfos = await getPhotographerInfos(id);
	displayCard(photographerInfos.photographerCard, ".photograph_header");
	displayMedias(photographerInfos.photographerMedias, ".photograph_medias");
	createPhotographerBanner(photographerInfos);
	sortedBy(photographerInfos.photographerMedias, ".photograph_medias");
}
init();
