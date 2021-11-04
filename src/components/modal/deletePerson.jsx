import React from 'react';
import './deletePerson.scss';

const deletePerson = ({ id, firstNameInitial, lastNameInitial, handleModal, getData }) => {
	const deleteData = async () => {
		try {
			const response = await fetch(`http://localhost:8000/persons/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
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
					<span>Удаление сотрудника</span>
				</div>
				<div className='modal__content__body'>
					<button onClick={handleModal}>Назад к списку</button>
					<input readOnly value={firstNameInitial} />
					<input readOnly value={lastNameInitial} />
				</div>
				<div className='modal__content__footer'>
					<button onClick={deleteData}>Удалить</button>
				</div>
			</div>
		</div>
	);
};

export default deletePerson;
