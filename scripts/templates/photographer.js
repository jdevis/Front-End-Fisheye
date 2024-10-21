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
function photographerPage(data) {
	const { name, portrait, tagline, city, country, price } = data;
	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const h2 = document.createElement("h2");
		h2.textContent = name;
		const location = document.createElement("p");
		location.setAttribute("class", "location");
		location.textContent = city + ", " + country;
		const intro = document.createElement("p");
		intro.textContent = tagline;
		const divIntro = document.createElement("div");
		appendChilds(divIntro, { h2, location, intro });
		const button = document.createElement("buttton");
		button.textContent = "Contactez-moi";
		setAttributes(button, {
			class: "contact_button",
			onClick: "displayModal()",
		});
		// const dayPrice = document.createElement("p");
		// dayPrice.setAttribute("class", "price");
		// dayPrice.textContent = price + "€/jour";
		const img = document.createElement("img");
		setAttributes(img, { src: picture, alt: "portrait de " + name });
		const divimg = document.createElement("div");
		divimg.setAttribute("class", "portrait");
		divimg.appendChild(img);
		const div2 = document.createElement("div");
		div2.setAttribute("class", "intro");
		appendChilds(div2, { divIntro, button, divimg });
		return div2;
	}
	return { getUserCardDOM };
}

function photographerMedias(data) {
	const { date, id, photographerId, image, likes, price, title } = data;
	const picture = `assets/photographers/${photographerId}/${image}`;
	function getUserCardDOM() {
		const article = document.createElement("article");
		const img = document.createElement("img");
		setAttributes(img, { src: picture, alt: title });
		const link = document.createElement("a");
		link.appendChild(img);
		const mediaTitle = document.createElement("p");
		mediaTitle.textContent = title;
		mediaTitle.setAttribute("class", "title");
		setAttributes(link, { href: "#", title: "Ouverture du carousel" });
		const nbreLikes = document.createElement("span");
		nbreLikes.textContent = likes;
		setAttributes(nbreLikes, { class: "likes" });
		appendChilds(article, { link, mediaTitle, nbreLikes });
		return article;
	}
	return { getUserCardDOM };
}

function photographerTemplate(data) {
	const { name, portrait, tagline, city, country, price, id } = data;
	const picture = `assets/photographers/${portrait}`;
	const href = `photographer.html?id=${id}`;

	function getUserCardDOM() {
		const article = document.createElement("article");
		const img = document.createElement("img");
		setAttributes(img, { src: picture, alt: "portrait de " + name });
		const div = document.createElement("div");
		div.setAttribute("class", "portrait");
		div.appendChild(img);
		const h2 = document.createElement("h2");
		h2.textContent = name;
		const link = document.createElement("a");
		setAttributes(link, { href: href, title: "page détail de " + name });
		appendChilds(link, { div, h2 });
		const location = document.createElement("p");
		location.setAttribute("class", "location");
		location.textContent = city + ", " + country;
		const intro = document.createElement("p");
		intro.textContent = tagline;
		const dayPrice = document.createElement("p");
		dayPrice.setAttribute("class", "price");
		dayPrice.textContent = price + "€/jour";
		appendChilds(article, { link, location, intro, dayPrice });
		return article;
	}
	return { getUserCardDOM };
}
