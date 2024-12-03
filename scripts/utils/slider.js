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

function displayModal(id) {
	const modal = document.getElementById(id);
	let focusBeforeModal = document.activeElement;
	const elFocusable = modal.querySelectorAll(
		"[tabindex], a, button, input, textarea, select"
	);
	const firstElement = elFocusable[0];
	const lastElement = elFocusable[elFocusable.length - 1];
	modal.addEventListener("keydown", trapKey);
	modal.style.display = "block";
	document.body.classList.add("no-scroll");
	firstElement.focus();
	function trapKey(e) {
		if (e.key === "Tab") {
			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		}
		if (e.key === "Escape") {
			modal.style.display = "none";
			document.body.classList.remove("no-scroll");
			focusBeforeModal.focus();
		}
	}
}
function closeModal(id) {
	const modal = document.getElementById(id);
	modal.style.display = "none";
	document.body.classList.remove("no-scroll");
}

export function toggleModals() {
	const openContactModal = document.getElementById("openModal");
	const closeContactModal = document.getElementById("closeContactModal");

	openContactModal.addEventListener("click", () => {
		displayModal("contactModal");
		submitForm();
	});
	closeContactModal.addEventListener("click", () => {
		closeModal("contactModal");
	});
}

export function slider() {
	const buttons = document.querySelectorAll(".btn");
	const slides = document.querySelectorAll(".slide");
	const medias = document.querySelectorAll(".open");
	medias.forEach((media) => {
		media.addEventListener("click", () => {
			displayModal("lightbox");
			let mediaIndex = [...medias].indexOf(media);
			slides[mediaIndex].classList.add("active");
			buttons.forEach((button) => {
				button.addEventListener("click", (e) => {
					const calcMoveIndex = e.target.id === "next" ? 1 : -1;
					const slideActive = document.querySelector(".active");
					if (e.target.id === "close") {
						slideActive.classList.remove("active");
						closeModal("lightbox");
					} else {
						let newIndex =
							calcMoveIndex + [...slides].indexOf(slideActive);
						if (newIndex < 0) newIndex = [...slides].length - 1;
						if (newIndex >= [...slides].length) newIndex = 0;
						slides[newIndex].classList.add("active");
						slideActive.classList.remove("active");
					}
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
