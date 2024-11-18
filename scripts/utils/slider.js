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

const mainWrapper = document.getElementById("main");

function displayModal(id) {
	const modal = document.getElementById(id);
	mainWrapper.setAttribute("aria-hidden", "true");
	modal.style.display = "block";
	modal.setAttribute("aria-hidden", "false");
	document.body.classList.add("no-scroll");
}

function closeModal(id) {
	const modal = document.getElementById(id);
	modal.setAttribute("aria-hidden", "true");
	modal.style.display = "none";
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
			mediaIndex = [...medias].indexOf(media);
			slides[mediaIndex].classList.add("active");
			buttons.forEach((button) => {
				button.addEventListener("click", (e) => {
					if (e.target.id === "close") closeModal("lightbox");
					const calcMoveIndex = e.target.id === "next" ? 1 : -1;
					const slideActive = document.querySelector(".active");

					newIndex = calcMoveIndex + [...slides].indexOf(slideActive);
					if (newIndex < 0) newIndex = [...slides].length - 1;
					if (newIndex >= [...slides].length) newIndex = 0;
					slides[newIndex].classList.add("active");
					slideActive.classList.remove("active");
				});
			});
		});
	});
}
function submitForm() {
	document.getElementById("contactForm").addEventListener("submit", (e) => {
		e.preventDefault();
		const firstName = document.getElementById("firstName");
		const lastName = document.getElementById("lastName");
		const email = document.getElementById("email");
		const message = document.getElementById("message");

		console.log("Prénom : " + firstName.value);
		console.log("Nom : " + lastName.value);
		console.log("Email : " + email.value);
		console.log("Message : " + message.value);
	});
}
