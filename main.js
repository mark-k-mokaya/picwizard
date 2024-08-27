import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
	showSpinner();
	event.preventDefault();
	const data = new FormData(form);
	const response = await fetch('http://localhost:8080/picwizard', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({prompt: data.get('prompt')}),
	})
		.then((data) => data.json())
		.catch((error) => {
			alert('Something went wrong. Please try again later.');
			hideSpinner();
			return;
		});

	if (response?.image) {
		const result = document.querySelector('#result');
		result.innerHTML = `<img src="${response.image}" width=512 />`;
	} else if (response?.error) {
		alert(response.error);
	}
	hideSpinner();
});

function showSpinner() {
	const button = document.querySelector('button');
	button.disabled = true;
	button.innerHTML = 'Generating image... <span class="spinner">⭐</span>';
}

function hideSpinner() {
	const button = document.querySelector('button');
	button.disabled = false;
	button.innerHTML = 'Generate';
}
