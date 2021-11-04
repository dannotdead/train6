import React, { useState } from 'react';
import { postData, putData, deleteData } from '../../utils/requests';
import './modal.scss';

const modal = ({
	id,
	firstNameInitial,
	lastNameInitial,
	handleModal,
	setError,
	setPersons,
	showModal,
}) => {
	const [firstName, setFirstName] = useState(showModal[0] ? '' : firstNameInitial);
	const [lastName, setLastName] = useState(showModal[0] ? '' : lastNameInitial);

	return (
		<div className='modal'>
			<div className='modal__content'>
				<div className='modal__content__header'>
					{(showModal[0] && <span>Создание сотрудника</span>) ||
						(showModal[1] && <span>Редактирование сотрудника</span>) ||
						(showModal[2] && <span>Удаление сотрудника</span>)}
				</div>
				<div className='modal__content__body'>
					<button
						onClick={
							(showModal[0] && handleModal[0]) ||
							(showModal[1] && handleModal[1]) ||
							(showModal[2] && handleModal[2])
						}
					>
						Назад к списку
					</button>
					<input
						readOnly={showModal[2]}
						placeholder='Введите имя сотрудника'
						value={firstName}
						onChange={(event) => setFirstName(event.target.value)}
					/>
					<input
						readOnly={showModal[2]}
						placeholder='Введите фамилию сотрудника'
						value={lastName}
						onChange={(event) => setLastName(event.target.value)}
					/>
				</div>
				<div className='modal__content__footer'>
					<button
						onClick={() => {
							showModal[0] && postData(
								firstName, lastName, handleModal[0], setError, setPersons
							) ||
							showModal[1] && putData(
								id, firstName, lastName, handleModal[1], setError, setPersons
							) ||
							showModal[2] && deleteData(id, handleModal[2], setError, setPersons)
						}}
					>
						{showModal[2] ? 'Удалить' : 'Сохранить'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default modal;
