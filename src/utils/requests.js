/* eslint-disable indent */

const checkResponseStatus = (status, setError) => {
	switch (status) {
		case 404:
			setError('Сущность не найдена в системе. Статус код: ' + status);
			break;
		case 400:
			setError('Неверный запрос. Статус код: ' + status);
			break;
		case 500:
			setError('Ошибка сервера. Статус код: ' + status);
			break;
	}
};

export const getData = async (setError, setPersons) => {
	try {
		const response = await fetch('http://localhost:8000/api/v1/persons/');
		const data = await response.json();

		checkResponseStatus(response.status, setError);
		if (response.ok) {
			setPersons(data);
			setError('');
		}
	} catch (error) {
		console.log(error);
	}
};

export const postData = async (firstName, lastName, handleModal, setError, setPersons) => {
	try {
		const data = {
			firstName,
			lastName,
		};

		const response = await fetch('http://localhost:8000/persons/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		checkResponseStatus(response.status, setError);
		if (response.ok) {
			handleModal();
			getData(setError, setPersons);
			setError('');
		}
	} catch (error) {
		console.log(error);
	}
};

export const putData = async (id, firstName, lastName, handleModal, setError, setPersons) => {
	try {
		const data = {
			firstName,
			lastName,
		};

		const response = await fetch(`http://localhost:8000/persons/${id}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		checkResponseStatus(response.status, setError);
		if (response.ok) {
			handleModal();
			getData(setError, setPersons);
			setError('');
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteData = async (id, handleModal, setError, setPersons) => {
	try {
		const response = await fetch(`http://localhost:8000/persons/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		checkResponseStatus(response.status, setError);
		if (response.ok) {
			handleModal();
			getData(setError, setPersons);
			setError('');
		}
	} catch (error) {
		console.log(error);
	}
};
