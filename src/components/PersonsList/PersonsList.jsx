import React from 'react';
import ProfileIcon from '../../assets/images/ProfileAvatarMale.svg';
import EditIcon from '../../assets/images/EditIcon.svg';
import DeleteIcon from '../../assets/images/DeleteIcon.svg';
import './styles.scss';

const personsList = ({
	id,
	firstName,
	lastName,
	handleModalEditPerson,
	handleModalDeletePerson,
}) => {
	return (
		<div key={id} className='persons-list'>
			<img src={ProfileIcon} alt='' className='persons-list__profile-icon' />
			<p className='persons-list__first-name'>{firstName}</p>
			<p className='persons-list__last-name'>{lastName}</p>
			<div className='persons-list__edit-del-btn'>
				<img 
					src={EditIcon} 
					alt='' 
					onClick={() => handleModalEditPerson(id, firstName, lastName)} 
				/>
				<img
					src={DeleteIcon}
					alt=''
					onClick={() => handleModalDeletePerson(id, firstName, lastName)}
				/>
			</div>
		</div>
	);
};

export default personsList;
