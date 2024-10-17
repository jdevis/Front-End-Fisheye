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

async function init() {
	let params = new URL(document.location).searchParams;
	let id = parseInt(params.get("id"));

	const photographerInfos = await getPhotographerInfos(id);
	//console.log(photographerInfos);
}
init();
