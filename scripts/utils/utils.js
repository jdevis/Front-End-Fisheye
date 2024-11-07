// sum of likes for all photographer medias
function getSumLikes(data) {
	let sumLikes = 0;
	data.forEach((element) => {
		sumLikes += element.likes;
	});
	return sumLikes + ` <i class="fa-solid fa-heart"></i>`;
}

function getPhotographerPrice(data) {
	let price = 0;
	data.forEach((element) => {
		price = element.price;
	});
	return price + `€/jour`;
}

function sortedBy(data) {
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
