// set multiples attributes
function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}
// write multiples elements
function appendChilds(el, attrs) {
	for (var key in attrs) {
		el.appendChild(attrs[key]);
	}
}
async function reponseStatus(url) {
	try {
		const reponse = await fetch(url);
		return reponse;
	} catch (error) {
		//console.log(error);
	}
}
// create medias types
function createMedias(elm) {
	if (elm.image) {
		const mediaType = document.createElement("img");
		const picture = `assets/photographers/${elm.photographerId}/${elm.image}`;
		const reponse = reponseStatus(picture);
		console.log("reponse nok : " + !reponse);
		setAttributes(mediaType, { src: picture, alt: elm.title });
		return mediaType;
	}
	if (elm.video) {
		const mediaType = document.createElement("video");
		setAttributes(mediaType, { controls: true });
		const source = document.createElement("source");
		const picture = `assets/photographers/${elm.photographerId}/${elm.video}`;
		const reponse = reponseStatus(picture);
		console.log("reponse : " + reponse);
		setAttributes(source, { src: picture, type: "video/mp4" });
		mediaType.appendChild(source);
		return mediaType;
	}
}
// header for photographer detail page
function photographerPage(data) {
	const { name, portrait, tagline, city, country } = data;
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
// medias for photographer detail page
function photographerMedias(data) {
	const { likes, title } = data;
	function getUserCardDOM() {
		const article = document.createElement("article");
		const mediaType = createMedias(data);
		//console.log(mediaType);
		const link = document.createElement("a");
		link.appendChild(mediaType);
		setAttributes(link, { href: "#", title: "Ouverture du carrousel" });
		const heart = document.createElement("i");
		heart.setAttribute("class", "fa-solid fa-heart");
		const nbreLikes = document.createElement("span");
		nbreLikes.textContent = likes;
		setAttributes(nbreLikes, { class: "likes" });
		nbreLikes.appendChild(heart);
		const mediaTitle = document.createElement("p");
		mediaTitle.textContent = title;
		mediaTitle.setAttribute("class", "title");
		mediaTitle.appendChild(nbreLikes);
		appendChilds(article, { link, mediaTitle });
		return article;
	}
	return { getUserCardDOM };
}
// construct photographers card for homepage
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
