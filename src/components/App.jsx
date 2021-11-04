import React, { useEffect, useState } from 'react';
import './App.scss';
import ProfileIcon from '../assets/images/ProfileAvatarMale.svg';
import EditIcon from '../assets/images/EditIcon.svg';
import DeleteIcon from '../assets/images/DeleteIcon.svg';
import CreatePerson from './modal/createPerson';
import EditPerson from './modal/editPerson';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [error, setError] = useState('');
	const [showModalCreatePerson, setShowModalCreatePerson] = useState(false);
	const [showModalEditPerson, setShowModalEditPerson] = useState(false);

	const [personId, setPersonId] = useState(0);
	const [personFirstName, setPersonFirstName] = useState('');
	const [personLastName, setPersonLastName] = useState('');

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

	const handleModalCreatePerson = () => {
		if (!showModalCreatePerson) setShowModalCreatePerson(true);
		else setShowModalCreatePerson(false);
	};

	const handleModalEditPerson = (id, firstName, lastName) => {
		setPersonId(id);
		setPersonFirstName(firstName);
		setPersonLastName(lastName);
		console.log(id, firstName, lastName);
		if (!showModalEditPerson) {
			setShowModalEditPerson(true);
		} else setShowModalEditPerson(false);
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
							<img
								src={EditIcon}
								alt=''
								onClick={() => handleModalEditPerson(
									person.id, person.firstName, person.lastName)}
							/>
							<img src={DeleteIcon} alt='' />
						</div>
					</div>
				))
			) : (
				<div>{error}</div>
			)}
			<button className='create-person' onClick={handleModalCreatePerson}>
				Добавить сотрудника
			</button>
			{showModalCreatePerson && (
				<CreatePerson
					id={persons.length + 1}
					handleModal={handleModalCreatePerson}
					getData={getData}
				/>
			)}
			{showModalEditPerson && (
				<EditPerson
					id={personId}
					firstNameInitial={personFirstName}
					lastNameInitial={personLastName}
					handleModal={handleModalEditPerson}
					getData={getData}
				/>
			)}
		</div>
	);
};

export default App;
