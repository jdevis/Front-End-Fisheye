// getting the JSON data
export async function getJson() {
	const response = await fetch("data/photographers.json");
	const data = await response.json();
	return data;
}
// setting multiples attributes
export function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}
// setting multiples appendchild
export function appendChilds(el, attrs) {
	for (var key in attrs) {
		el.appendChild(attrs[key]);
	}
}
