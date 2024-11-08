function slider() {
	const buttons = document.querySelectorAll(".btn");
	const slides = document.querySelectorAll(".slide");
	const medias = document.querySelectorAll(".open");
	console.log("dans slider");
	console.log(medias);
	medias.forEach((media) => {
		media.addEventListener("click", () => {
			mediaIndex = [...medias].indexOf(media);
			slides[mediaIndex].classList.add("active");
			buttons.forEach((button) => {
				button.addEventListener("click", (e) => {
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
