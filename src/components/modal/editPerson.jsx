import React, { useState } from 'react';
import './editPerson.scss';

const editPerson = ({ id, firstNameInitial, lastNameInitial, handleModal, getData }) => {
	const [firstName, setFirstName] = useState(firstNameInitial);
	const [lastName, setLastName] = useState(lastNameInitial);

	const putData = async () => {
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
				getData();
			}
		} catch (error) {
			console.log(error);
		}
	};

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
					<button onClick={putData}>Сохранить</button>
				</div>
			</div>
		</div>
	);
};

export default editPerson;
