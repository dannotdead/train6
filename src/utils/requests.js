export const getData = async (setError, setPersons) => {
	try {
		const response = await fetch('http://localhost:8000/api/v1/persons/');
		const data = await response.json();
		if (response.status === 404) {
			setError('Не существует такого адреса. Ошибка ' + response.status);
		}
		if (response.ok) setPersons(data);
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
		console.log(data);
		const response = await fetch('http://localhost:8000/persons/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		console.log(response);
		if (response.ok) {
			handleModal();
			getData(setError, setPersons);
		}
		if (response.status === 500) {
			setError('Ошибка сервера ' + response.status);
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
		console.log(response);
		if (response.ok) {
			handleModal();
			getData(setError, setPersons);
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
		if (response.ok) {
			handleModal();
			getData(setError, setPersons);
		}
	} catch (error) {
		console.log(error);
	}
};
