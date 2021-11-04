import React, { useState } from 'react';
import { putData } from '../../utils/requests';
import './editPerson.scss';

const editPerson = ({
	id,
	firstNameInitial,
	lastNameInitial,
	handleModal,
	setError,
	setPersons,
}) => {
	const [firstName, setFirstName] = useState(firstNameInitial);
	const [lastName, setLastName] = useState(lastNameInitial);

	return (
		<div className='modal'>
			<div className='modal__content'>
				<div className='modal__content__header'>
					<span>Редактирование сотрудника</span>
				</div>
				<div className='modal__content__body'>
					<button onClick={handleModal}>Назад к списку</button>
					<input
						placeholder='Введите имя сотрудника'
						value={firstName}
						onChange={(event) => setFirstName(event.target.value)}
					/>
					<input
						placeholder='Введите фамилию сотрудника'
						value={lastName}
						onChange={(event) => setLastName(event.target.value)}
					/>
				</div>
				<div className='modal__content__footer'>
					<button
						onClick={() => putData(
							id, firstName, lastName, handleModal, setError, setPersons
						)}
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	);
};

export default editPerson;
