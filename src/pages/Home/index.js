import { Link } from 'react-router-dom';
import {
	Container,
	InputSearchContainer,
	Header,
	ListContainer,
	Card,
} from './style';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
// import Modal from '../../components/Modal';
// import Loader from '../../components/Loader';

export default function Home() {
	return (
		<Container>
			{/* <Modal danger /> */}
			{/* <Loader /> */}

			<InputSearchContainer>
				<input type="text" placeholder="Pesquise pelo nome..." />
			</InputSearchContainer>
			<Header>
				<strong>3 contatos</strong>
				<Link to="/new">
					Novo contato
				</Link>
			</Header>
			<ListContainer>
				<header>
					<button type="button">
						<span>Nome</span>
						<img src={arrow} alt="Arrow" />
					</button>
				</header>

				<Card>
					<div className="info">
						<div className="contact-name">
							<strong>Mateus Silva</strong>
							<small>instagram</small>
						</div>
						<span>matues@devacademy.com.br</span>
						<span>(41) 09999-9999</span>
					</div>

					<div className="actions">
						<Link to="/edit/123">
							<img src={edit} alt="Edit" />
						</Link>
						<button type="button">
							<img src={trash} alt="Trash" />
						</button>
					</div>
				</Card>

			</ListContainer>
		</Container>
	);
}

// fetch('http://localhost:3000')
// 	.then((response) => {
// 		console.log('response', response);
// 	})
// 	.catch((error) => {
// 		console.log('error', error);
// 	});
