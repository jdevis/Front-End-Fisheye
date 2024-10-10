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
