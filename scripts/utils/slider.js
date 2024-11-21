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
	modal.style.display = "block";
	modal.setAttribute("aria-hidden", "false");
	mainWrapper.setAttribute("aria-hidden", "true");
	modal.focus();
	document.body.classList.add("no-scroll");
}

function closeModal(id) {
	const modal = document.getElementById(id);
	modal.style.display = "none";
	modal.setAttribute("aria-hidden", "true");
	mainWrapper.setAttribute("aria-hidden", "false");
	modal.blur();
	document.body.classList.remove("no-scroll");
}

function toggleModals() {
	const openContactModal = document.getElementById("openModal");
	const closeContactModal = document.getElementById("closeContactModal");
	const buttons = document.querySelectorAll(".btn");
	const medias = document.querySelectorAll(".open");

	openContactModal.addEventListener("click", () => {
		displayModal("contactModal");
	});
	closeContactModal.addEventListener("click", () => {
		closeModal("contactModal");
	});
	openContactModal.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			displayModal("contactModal");
		}
	});
	closeContactModal.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			closeModal("contactModal");
		}
	});
	medias.forEach((media) => {
		media.addEventListener("click", () => {
			let i = [...medias].indexOf(media);
			console.log(i);
			slider(i, "");
			displayModal("lightbox");
		});
		media.addEventListener("keydown", (event) => {
			console.log("touche : " + event.key);
			let i = [...medias].indexOf(media);
			if (event.key === "Enter") {
				slider(i, "");
				displayModal("lightbox");
			}
		});
	});
	buttons.forEach((button) => {
		button.addEventListener("click", (e) => slider("", e));
		button.addEventListener("keydown", (e) => {
			console.log("touche : " + e.key);
			if (e.key === "Enter") {
				slider("", e);
			}
		});
	});
}

function slider(i, e) {
	const slides = document.querySelectorAll(".slide");
	console.log("i vaut: " + i);
	console.log("e vaut: " + e.target);

	if (e.target != undefined) {
		console.log("je suis dans e.");
		const calcMoveIndex = e.target.id === "next" ? 1 : -1;
		const slideActive = document.querySelector(".active");
		if (e.target.id === "close") {
			slideActive.classList.remove("active");
			slideActive.setAttribute("tabindex", "-1");
			closeModal("lightbox");
		} else {
			let newIndex = calcMoveIndex + [...slides].indexOf(slideActive);
			if (newIndex < 0) newIndex = [...slides].length - 1;
			if (newIndex >= [...slides].length) newIndex = 0;
			slides[newIndex].classList.add("active");
			slides[newIndex].setAttribute("tabindex", "1");
			slideActive.classList.remove("active");
			slideActive.setAttribute("tabindex", "-1");
		}
	} else {
		console.log("je suis dans i.");
		console.log(slides);
		let mediaIndex = i;
		slides[mediaIndex].classList.add("active");
		slides[mediaIndex].setAttribute("tabindex", "1");
	}
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
