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
	const likes = document.querySelectorAll(".photograph_medias i");
	likes.forEach((like) => {
		like.addEventListener("click", (e) => {
			let medias = getMediasLS(id);
			let foundMedia = medias.find((m) => m.id == e.target.id);
			let newLikes = foundMedia.likes;
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
			foundMedia.likes = newLikes;
			saveMediasLS(medias);
			displaySumLikes(medias);
		});
	});
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

function getPhotographerPrice(data) {
	let price = 0;
	data.forEach((element) => {
		price = element.price;
	});
	return price + `€/jour`;
}

function sortedBy(key) {
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
		data.map((media) => new MediasFactory(media)).forEach((media) => {
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
