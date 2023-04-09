import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	InputSearchContainer,
	Header,
	ListHeader,
	Card,
} from './style';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
	const [contacts, setContacts] = useState([]);
	const [orderBy, setOrderBy] = useState('asc');
	const [searchTerm, setSearchTerm] = useState('');

	const filteredContacts = useMemo(() => contacts.filter((contact) => (
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	)), [contacts, searchTerm]);

	// const filteredContacts = contacts.filter((contact) => (
	// 	contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
	// ));

	useEffect(() => {
		fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
			.then(async (response) => {
				const json = await response.json();
				setContacts(json);
			})
			.catch((error) => {
				console.log('error', error);
			});
	}, [orderBy]);

	function handleToggleOrderBy() {
		setOrderBy(
			(prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
		);
	}

	function handleChangeSearchTerm(event) {
		setSearchTerm(event.target.value);
	}

	return (
		<Container>
			<InputSearchContainer>
				<input
					value={searchTerm}
					type="text"
					placeholder="Pesquise pelo nome..."
					onChange={handleChangeSearchTerm}
				/>
			</InputSearchContainer>
			<Header>
				<strong>
					{filteredContacts.length}
					{filteredContacts.length === 1 ? ' contatos' : ' contato'}
				</strong>
				<Link to="/new">
					Novo contato
				</Link>
			</Header>

			{filteredContacts.length > 0 && (
					<ListHeader orderBy={orderBy}>
						<button type="button" onClick={handleToggleOrderBy}>
							<span>Nome</span>
							<img src={arrow} alt="Arrow" />
						</button>
					</ListHeader>
			)}

			{filteredContacts.map((contact) => (
				<Card key={contact.id}>
					<div className="info">
						<div className="contact-name">
							<strong>{contact.name}</strong>
							{contact.category_name && (
								<small>{contact.category_name}</small>
							)}
						</div>
						<span>{contact.email}</span>
						<span>{contact.phone}</span>
					</div>

					<div className="actions">
						<Link to={`/edit/${contact.id}`}>
							<img src={edit} alt="Edit" />
						</Link>
						<button type="button">
							<img src={trash} alt="Trash" />
						</button>
					</div>
				</Card>
			))}
		</Container>
	);
}

// SOP -> Same Origin Policy -> Política de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origens diferentes
// Origem: protocolo://domínio:porta

//  Saída : http://http://localhost:3000
// Destino: http://http://localhost:3001

// Preflight -> Pré-voô
// OPTIONS http://localhost:3001/contacts
// -> Verifica se a origem e os headers que estamos tentando enviar são permitidos
