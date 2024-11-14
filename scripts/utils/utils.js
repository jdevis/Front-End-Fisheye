// sum of likes for all photographer medias
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

function displaylikes(id) {
	const wrapper = element;
}

// localStorage for medias
function saveMediasLS(data) {
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

function getMediasLS(key) {
	let medias = localStorage.getItem(key);
	return JSON.parse(medias);
}

function addLike(id, key) {
	let medias = getMediasLS(key);
	let foundMedia = medias.find((m) => m.id == id);
	let likes = foundMedia.likes;
	likes++;
	foundMedia.likes = likes;
	saveMediasLS(medias);
	displaySumLikes(medias);
	return likes;
}

function getPhotographerPrice(data) {
	let price = 0;
	data.forEach((element) => {
		price = element.price;
	});
	return price + `€/jour`;
}

function sortedBy(data) {
	const mediasWrapper = document.querySelector(".photograph_medias");
	const sliderWrapper = document.getElementById("medias_slider");

	const defaultSorted = data.slice();
	data = defaultSorted;
	document.querySelector("#tri").addEventListener("change", function () {
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
		data.map((media) => new MediasFactory(media)).forEach((media) => {
			const Template = new MediaCard(media);
			mediasWrapper.appendChild(Template.createMediaCard());
			const Slider = new MediaCard(media);
			sliderWrapper.appendChild(Slider.createMediaSlider());
		});
		slider();
		return data;
	});
}

function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

function appendChilds(el, attrs) {
	for (var key in attrs) {
		el.appendChild(attrs[key]);
	}
}
