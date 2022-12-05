//----------- TODO: FUNCTION %

//----------- TODO: FUNCTION %
const cards = document.querySelector(".concept__cards");

const downloadFile = async (fileUrl, fileName) => {
	const response = await fetch(fileUrl, {
		headers: {
			// Authorization: localStorage.getItem("token")
		}
	})

	if (response.status === 200) {
		const blob = await response.blob()
		const downloadUrl = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = downloadUrl
		link.download = fileName
		document.querySelector('p').appendChild(link)
		link.click()
		link.remove()
	}
}

const getCards = async () => {
	const json = await fetch('http://139.28.37.111:8080/v1/api/file/projects', {
		method: 'GET'
	});
	const data = await json.json();

	if (data.length % 2 === 0) {
		data.forEach(el => {
			const cardStr = `
							<div class="concept__card card d-flex flex-column" data-original="${el.pdf?.originalName}" data-file="${el.pdf?.name}">
									<div class="concept__image">
											<img src="http://139.28.37.111:8080/v1/api/file/${el?.image?.name}" alt="">
									</div>
									<div class="card__title d-flex align-center">
											<p class="card__desc">${el.title}</p>
									</div>
							</div>`;

			cards.innerHTML = `${cards.innerHTML}${cardStr}`;
		});
	} else {
		data.forEach((el, idx) => {
			const cardStr = `
							<div class="concept__card card d-flex flex-column" data-original="${el.pdf?.originalName}" data-file="${el.pdf?.name}">
									<div class="concept__image">
											<img src="http://139.28.37.111:8080/v1/api/file/${el?.image?.name}" alt="">
									</div>
									<div class="card__title d-flex align-center">
											<p class="card__desc">${el.title}</p>
									</div>
							</div>`;

			if (idx < data.length - 1) {
				cards.innerHTML = `${cards.innerHTML}${cardStr}`;
			} else {
				const div = document.querySelector(".concept__div");
				div.innerHTML = cardStr;
			}
		})
	}

	const cardsAll = document.querySelectorAll(".concept__card");
	cardsAll.forEach(el => {
		el.addEventListener('click', () => {
			downloadFile(`http://139.28.37.111:8080/v1/api/file/${el.dataset.file}`, el.dataset.original)
		})
	})
}

getCards();