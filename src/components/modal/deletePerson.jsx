import React from 'react';
import { deleteData } from '../../utils/requests';
import './deletePerson.scss';

const deletePerson = ({
	id,
	firstNameInitial,
	lastNameInitial,
	handleModal,
	setError,
	setPersons,
}) => {
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
					<button onClick={() => deleteData(
						id, handleModal, setError, setPersons
					)}>Удалить</button>
				</div>
			</div>
		</div>
	);
};

export default deletePerson;
