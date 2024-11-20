/* KeyCode
	9	Tab	
	13	Enter
	27	Escape
	32	Spacebar
	37	ArrowLeft
	38	ArrowUp
	39	ArrowRight
	40	ArrowDown
*/

function listenKeyboard(id) {
	const modalWrapper = document.getElementById(id);
	const elFocusable = modalWrapper.querySelectorAll(
		"[tabindex], a, button, input, textarea, select"
	);
	let firstFocus = elFocusable[0];
	let lastFocus = elFocusable[elFocusable.length - 1];

	document.addEventListener("keydown", (event) => {
		console.log(`touche  : ${event.key}`);
		if (event.key === "Tab") {
			elFocusable.focus();
		}
		if (event.key === "Escape") {
			closeModal(id);
			elFocusable.blur();
		}
	});
}

const mainWrapper = document.getElementById("main");

function displayModal(id) {
	const modal = document.getElementById(id);
	modal.focus();
	mainWrapper.setAttribute("aria-hidden", "true");
	modal.style.display = "block";
	modal.setAttribute("aria-hidden", "false");
	console.log(document.activeElement);
	document.body.classList.add("no-scroll");
}

function closeModal(id) {
	const modal = document.getElementById(id);
	modal.blur();
	modal.style.display = "none";
	modal.setAttribute("aria-hidden", "true");
	mainWrapper.setAttribute("aria-hidden", "false");
	document.body.classList.remove("no-scroll");
}

function slider() {
	const buttons = document.querySelectorAll(".btn");
	const slides = document.querySelectorAll(".slide");
	const medias = document.querySelectorAll(".open");
	medias.forEach((media) => {
		media.addEventListener("click", () => {
			displayModal("lightbox");
			let mediaIndex = [...medias].indexOf(media);
			slides[mediaIndex].classList.add("active");
			slides[mediaIndex].setAttribute("tabindex", "1");
			buttons.forEach((button) => {
				button.addEventListener("click", (e) => {
					if (e.target.id === "close") closeModal("lightbox");
					const calcMoveIndex = e.target.id === "next" ? 1 : -1;
					const slideActive = document.querySelector(".active");

					let newIndex =
						calcMoveIndex + [...slides].indexOf(slideActive);
					if (newIndex < 0) newIndex = [...slides].length - 1;
					if (newIndex >= [...slides].length) newIndex = 0;
					slides[newIndex].classList.add("active");
					slides[newIndex].setAttribute("tabindex", "1");
					slideActive.classList.remove("active");
					slideActive.setAttribute("tabindex", "-1");
				});
			});
		});
	});
}
function submitForm() {
	const formWrapper = document.getElementById("contactForm");
	formWrapper.addEventListener("submit", (e) => {
		e.preventDefault();
		const firstName = document.getElementById("firstName");
		const lastName = document.getElementById("lastName");
		const email = document.getElementById("email");
		const message = document.getElementById("message");

		console.log("Prénom : " + firstName.value);
		console.log("Nom : " + lastName.value);
		console.log("Email : " + email.value);
		console.log("Message : " + message.value);
		closeModal("contactModal");
	});
}
function testBouh() {
	const buttons = document.querySelectorAll(".intro button");
	console.log(buttons);
	buttons.forEach((button) => {
		button.addEventListener("click", (e) => {
			if (e.target.id === "closeContactModal") closeModal("contactModal");
			if (e.target.id === "openModal") displayModal("contactModal");
		});
	});
}
