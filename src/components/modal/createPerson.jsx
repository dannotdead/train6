import React, { useState } from 'react';
import { postData } from '../../utils/requests';
import './createPerson.scss';

const createPerson = ({ handleModal, setError, setPersons }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	return (
		<div className='modal'>
			<div className='modal__content'>
				<div className='modal__content__header'>
					<span>Создание сотрудника</span>
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
						onClick={() => postData(
							firstName, lastName, handleModal, setError, setPersons
						)}
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	);
};

export default createPerson;
