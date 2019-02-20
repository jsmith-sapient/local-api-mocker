const list = document.getElementById('list');
const log = (data, isErr) => {
	const li = document.createElement('li');
	let content = '';

	if (isErr) {
		li.classList.add('error');
		content = data.message;
	} else {
		content = JSON.stringify(data, null, 2);
	}

	li.textContent = content;

	list.appendChild(li);
};

const Accept = 'application/json';
const get = (endpoint = 'test') => fetch(
	endpoint, {
		headers: {
			Accept,
		},
		method: 'GET',
		redirect: 'follow',
	},
)
	.then(rsp => {
		const ContentType = rsp.headers.get('Content-Type');
		if (!rsp.ok) throw new Error(rsp.statusText);
		if (ContentType === Accept) return rsp.json();

		throw new TypeError(`
			Content-Type does not match accepted type.
			Content-Type: ${ContentType}
			vs.
			Accept: ${Accept}
		`);
	})
	.then(log)
	.catch((err) => log(err, true));

const fire = (evt) => {
	get(evt.target.elements['endpoint-value'].value);

	evt.preventDefault();
};

document.forms.test.addEventListener('submit', fire);