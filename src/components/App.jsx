import React, { useEffect, useState } from 'react';
import './App.scss';
import ProfileIcon from '../assets/images/ProfileAvatarMale.svg';
import EditIcon from '../assets/images/EditIcon.svg';
import DeleteIcon from '../assets/images/DeleteIcon.svg';
import CreatePerson from './modal/createPerson';
import EditPerson from './modal/editPerson';
import DeletePerson from './modal/deletePerson';
import { getData } from '../utils/requests';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [error, setError] = useState('');
	const [showModalCreatePerson, setShowModalCreatePerson] = useState(false);
	const [showModalEditPerson, setShowModalEditPerson] = useState(false);
	const [showModalDeletePerson, setShowModalDeletePerson] = useState(false);

	const [personId, setPersonId] = useState(0);
	const [personFirstName, setPersonFirstName] = useState('');
	const [personLastName, setPersonLastName] = useState('');

	const handleModalCreatePerson = () => {
		if (!showModalCreatePerson) setShowModalCreatePerson(true);
		else setShowModalCreatePerson(false);
	};

	const handleModalEditPerson = (id, firstName, lastName) => {
		setPersonId(id);
		setPersonFirstName(firstName);
		setPersonLastName(lastName);
		if (!showModalEditPerson) {
			setShowModalEditPerson(true);
		} else setShowModalEditPerson(false);
	};

	const handleModalDeletePerson = (id, firstName, lastName) => {
		setPersonId(id);
		setPersonFirstName(firstName);
		setPersonLastName(lastName);
		if (!showModalDeletePerson) {
			setShowModalDeletePerson(true);
		} else setShowModalDeletePerson(false);
	};

	useEffect(() => {
		getData(setError, setPersons);
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
							<img
								src={DeleteIcon}
								alt=''
								onClick={() =>
									handleModalDeletePerson(
										person.id, person.firstName, person.lastName)
								}
							/>
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
					handleModal={handleModalCreatePerson}
					setError={setError}
					setPersons={setPersons}
				/>
			)}
			{showModalEditPerson && (
				<EditPerson
					id={personId}
					firstNameInitial={personFirstName}
					lastNameInitial={personLastName}
					handleModal={handleModalEditPerson}
					setError={setError}
					setPersons={setPersons}
				/>
			)}
			{showModalDeletePerson && (
				<DeletePerson
					id={personId}
					firstNameInitial={personFirstName}
					lastNameInitial={personLastName}
					handleModal={handleModalDeletePerson}
					setError={setError}
					setPersons={setPersons}
				/>
			)}
		</div>
	);
};

export default App;
