import React, { useEffect, useState } from 'react';
import './App.scss';
import Modal from './modal/modal';
import { getData } from '../utils/requests';
import PersonsList from './PersonsList';
import Header from './Header';

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
			<Header />
			{persons.length !== 0 ? (
				persons.map((person) => (
					<PersonsList
						key={person.id}
						id={person.id}
						firstName={person.firstName}
						lastName={person.lastName}
						handleModalEditPerson={handleModalEditPerson}
						handleModalDeletePerson={handleModalDeletePerson}
					/>
				))
			) : (
				<div>{error}</div>
			)}
			<button className='create-person' onClick={handleModalCreatePerson}>
				Добавить сотрудника
			</button>
			{(showModalCreatePerson || showModalEditPerson || showModalDeletePerson) && (
				<Modal
					id={personId}
					firstNameInitial={personFirstName}
					lastNameInitial={personLastName}
					handleModal={[
						handleModalCreatePerson, 
						handleModalEditPerson, 
						handleModalDeletePerson
					]}
					setError={setError}
					setPersons={setPersons}
					showModal={[showModalCreatePerson, showModalEditPerson, showModalDeletePerson]}
				/>
			)}
		</div>
	);
};

export default App;
