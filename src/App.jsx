import React, { useEffect, useState } from 'react';
import './App.scss';
import ProfileIcon from './assets/images/ProfileAvatarMale.svg';
import EditIcon from './assets/images/EditIcon.svg';
import DeleteIcon from './assets/images/DeleteIcon.svg';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [error, setError] = useState('');

	const getData = async () => {
		try {
			const response = await fetch('http://localhost:8000/api/v1/persons/');
			const data = await response.json();
			if (response.status === 404)
				setError('Не существует такого адреса. Ошибка ' + response.status);
			if (response.ok) setPersons(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log(persons);
		console.log(error);
	}, [persons]);

	return (
		<div className='container'>
			<div className='container__header'>
				<span />
				<span>Имя</span>
				<span>Фамилия</span>
			</div>
			{persons.length !== 0 ? (
				persons.map((person) => (
					<div key={person.id} className='persons-list'>
						<img src={ProfileIcon} alt='' className='persons-list__profile-icon' />
						<p>{person.firstName}</p>
						<p>{person.lastName}</p>
						<div className='persons-list__edit-del-btn'>
							<img src={EditIcon} alt='' />
							<img src={DeleteIcon} alt='' />
						</div>
					</div>
				))
			) : (
				<div>{error}</div>
			)}
			<button className='create-person'>Добавить сотрудника</button>
		</div>
	);
};

export default App;
