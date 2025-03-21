let activeLetters = new Set();

function renderText() {
	let input = document.getElementById("textInput").value;
	let output = document.getElementById("output");
	output.innerHTML = "";

	input.split("").forEach((char, i) => {
		let span = document.createElement("span");
		span.textContent = char;
		span.classList.add("letter");
		span.dataset.index = i;

		span.addEventListener("click", (e) => toggleHighlight(e, span));
		span.draggable = true;
		span.addEventListener("dragstart", startDrag);
		span.addEventListener("dragover", allowDrop);
		span.addEventListener("drop", swapLetters);

		output.appendChild(span);
	});
}

function toggleHighlight(e, elem) {
	if (e.ctrlKey) {
		if (activeLetters.has(elem)) {
			elem.classList.remove("highlighted");
			activeLetters.delete(elem);
		} else {
			elem.classList.add("highlighted");
			activeLetters.add(elem);
		}
	} else {
		activeLetters.forEach((el) => el.classList.remove("highlighted"));
		activeLetters.clear();
		elem.classList.add("highlighted");
		activeLetters.add(elem);
	}
}

function startDrag(e) {
	e.dataTransfer.setData("text", e.target.dataset.index);
}

function allowDrop(e) {
	e.preventDefault();
}

function swapLetters(e) {
	e.preventDefault();
	let fromIndex = e.dataTransfer.getData("text");
	let toElem = e.target;

	if (toElem.classList.contains("letter")) {
		let parent = toElem.parentElement;
		let fromElem = parent.querySelector(`[data-index='${fromIndex}']`);

		if (fromElem && fromElem !== toElem) {
			let temp = fromElem.textContent;
			fromElem.textContent = toElem.textContent;
			toElem.textContent = temp;
		}
	}
}
