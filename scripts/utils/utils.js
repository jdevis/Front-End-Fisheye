// sum of likes for all photographer medias
export function getSumLikes(data) {
	let sumLikes = 0;
	data.photographerMedias.forEach((element) => {
		sumLikes += element.likes;
	});
	return sumLikes;
}
export function getPhotographerPrice(data) {
	let price = 0;
	data.photographerCard.forEach((element) => {
		price = element.price;
	});
	return price;
}
// getting the JSON data
export async function getJson() {
	try {
		const response = await fetch("data/photographers.json");
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("erreur de chargement du JSON : " + error);
	}
}
// catching 404
async function reponseStatus(url) {
	try {
		const reponse = await fetch(url);
		console.log("réponse :" + reponse.status);
		return reponse;
	} catch (error) {
		console.log("erreur : " + error);
	}
}
// media types url
export async function writeURL(medias, id) {
	let url;
	if (medias.image) {
		url = `assets/photographers/${id}/${medias.image}`;
		reponseStatus(url);
	}
	if (medias.video) {
		url = `assets/photographers/${id}/${medias.video}`;
		reponseStatus(url);
	}
	return url;
}
