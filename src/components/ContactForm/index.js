import { useState } from 'react';
import PropTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';
import useErros from '../../hooks/useErrors';

import { Form, ButtonContainer } from './style';
import FormGroup from '../FormGroup';

import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [category, setCategory] = useState('');

	const { setError, removeError, getErrorMessageByFieldName } = useErros();

	function handleNameChange(event) {
		setName(event.target.value);

		if (!event.target.value) {
			setError({ field: 'name', message: 'Nome é obrigatório.' });
		} else {
			removeError('name');
		}
	}

	function handleEmailChange(event) {
		setEmail(event.target.value);

		if (event.target.value && !isEmailValid(event.target.value)) {
			setError({ field: 'email', message: 'E-mail inválido.' });
		} else {
			removeError('email');
		}
	}

	function handlePhoneChange(event) {
		setPhone(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		// console.log({
		// 	name, email, phone, category,
		// });
	}

	return (
		// eslint-disable-next-line
		<Form onSubmit={handleSubmit} noValidate>
			<FormGroup error={getErrorMessageByFieldName('name')}>
				<Input
					placeholder="Nome"
					value={name}
					onChange={handleNameChange}
					error={getErrorMessageByFieldName('name')}
				/>
			</FormGroup>

			<FormGroup error={getErrorMessageByFieldName('email')}>
				<Input
					type="email"
					error={getErrorMessageByFieldName('email')}
					placeholder="E-mail"
					value={email}
					onChange={handleEmailChange}
				/>
			</FormGroup>

			<FormGroup>
				<Input
					placeholder="Telefone"
					value={phone}
					onChange={handlePhoneChange}
				/>
			</FormGroup>

			<FormGroup>
				<Select
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				>
					<option value="">Categoria</option>
					<option value="instagram">Instagram</option>
					<option value="discord">Discord</option>
				</Select>
			</FormGroup>

			<ButtonContainer>
				<Button type="submit">
					{ buttonLabel }
				</Button>
			</ButtonContainer>
		</Form>
	);
}

ContactForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};
