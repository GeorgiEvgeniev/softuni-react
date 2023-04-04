import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { gameServiceFactory } from '../services/catService';
import { useService } from '../hooks/userService';
import { AuthContext } from '../context/AuthContext';

export const CatDetails = () => {
  const { userId } = useContext(AuthContext)
  const { catId } = useParams()
    const [cat, setCat] = useState({});
    const catService = useService(gameServiceFactory)
    const navigate = useNavigate();

  useEffect(() => {
    catService.getOne(catId)
        .then(result => {
            setCat(result);
        })
}, [catId]);

const isOwner = cat._ownerId === userId;

const onDeleteClick = async () => {
  await catService.delete(cat._id);

  // TODO: delete from state

  navigate('/catalog');
};

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant='top' src={cat.imageUrl} />
      <Card.Body>
        <Card.Title>{cat.name}</Card.Title>
        <Card.Text>{cat.description}</Card.Text>
        {isOwner && (
          
          <>
        <Button as={Link} to={`/catalog/${cat._id}/edit`}variant='primary'>Edit</Button>
        <Button variant='primary' onClick={onDeleteClick}>Delete</Button>
        </>
          )}
      </Card.Body>
    </Card>
  );
};
