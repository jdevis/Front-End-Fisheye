import { Media } from "../models/media.js";
import { MediaCard } from "../templates/photographerMedias.js";
import { slider } from "./slider.js";
function getSumLikes(data) {
	let sumLikes = 0;
	data.forEach((element) => {
		sumLikes += element.likes;
	});
	return sumLikes + ` <i class="fa-solid fa-heart"></i>`;
}

function displaySumLikes(data) {
	const sumLikesWrapper = document.getElementById("sumLikes");
	const sumLikes = getSumLikes(data);
	sumLikesWrapper.innerHTML = "";
	sumLikesWrapper.innerHTML = sumLikes;
}

export function displaylikes(id) {
	const likes = document.querySelectorAll(".photograph_medias button");
	let medias = getMediasLS(id); // retrieve medias from local storage
	displaySumLikes(medias);
	likes.forEach((like) => {
		like.addEventListener("click", (e) => {
			let foundMedia = medias.find((m) => m.id == e.target.id);
			let newLikes = foundMedia.likes;
			// button doesn't have been already clicked
			if (!e.target.classList.contains("added")) {
				newLikes++;
				e.target.classList.add("added");
				e.target.setAttribute(
					"aria-label",
					"Like ajouté, cliquer pour le retirer"
				);
				foundMedia.class = "added";
			} else {
				newLikes--;
				e.target.classList.remove("added");
				e.target.setAttribute("aria-label", "ajouter un like");
				foundMedia.class = "";
			}
			e.target.previousElementSibling.textContent = `${newLikes} `;
			foundMedia.likes = newLikes; // save number of likes into media
			saveMediasLS(medias); // save updated media into local storage
			displaySumLikes(medias);
		});
	});
}

// localStorage for medias
export function saveMediasLS(data) {
	let photographerId = 0;
	data.forEach((pId) => {
		photographerId = pId.photographerId;
	});
	let keyExist = getMediasLS(photographerId);
	if (keyExist) {
		localStorage.removeItem(photographerId);
	}
	localStorage.setItem(photographerId, JSON.stringify(data));
	return JSON.stringify(data);
}

export function getMediasLS(key) {
	let medias = localStorage.getItem(key);
	return JSON.parse(medias);
}

// sort medias
export function sortedBy(key) {
	const mediasWrapper = document.querySelector(".photograph_medias");
	const sliderWrapper = document.getElementById("medias_slider");
	document.querySelector("#tri").addEventListener("change", function () {
		let data = getMediasLS(key);
		const defaultSorted = data.slice();
		data = defaultSorted;
		const container = document.getElementById("medias_list");
		container.innerHTML = "";
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
		mediasWrapper.innerHTML = "";
		sliderWrapper.innerHTML = "";
		data.map((media) => new Media(media)).forEach((media) => {
			const Template = new MediaCard(media);
			mediasWrapper.appendChild(Template.createMediaCard());
			const Slider = new MediaCard(media);
			sliderWrapper.appendChild(Slider.createMediaSlider());
		});
		displaylikes(key);
		slider();
		return data;
	});
}
