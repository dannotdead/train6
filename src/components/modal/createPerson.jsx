import React from 'react';
import { useState } from 'react/cjs/react.development';
import './createPerson.scss';

const createPerson = ({ id, handleModal, getData }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const postData = async () => {
		try {
			const data = {
				id,
				firstName,
				lastName,
			};
			const response = await fetch('http://localhost:8000/persons/', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
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
					<button onClick={postData}>Сохранить</button>
				</div>
			</div>
		</div>
	);
};

export default createPerson;
