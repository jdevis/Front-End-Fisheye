async function getPhotographerInfos(id) {
	const response = await fetch("data/photographers.json");
	const data = await response.json();
	const photographerMedias = data.media.filter(
		(element) => element.photographerId === id
	);
	const photographerCard = data.photographers.filter(
		(element) => element.id === id
	);
	console.log(photographerCard);
	console.log(photographerMedias);
	return { photographerCard, photographerMedias };
}

async function init() {
	let params = new URL(document.location).searchParams;
	let id = parseInt(params.get("id"));

	const photographerInfos = await getPhotographerInfos(id);
	console.log(photographerInfos);
}
init();
