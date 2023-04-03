import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { gameServiceFactory } from '../services/catService';
import { useService } from '../hooks/userService';

export const CatDetails = () => {
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

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant='top' src={cat.imageUrl} />
      <Card.Body>
        <Card.Title>{cat.name}</Card.Title>
        <Card.Text>{cat.description}</Card.Text>
        <Button variant='primary'>Details</Button>
      </Card.Body>
    </Card>
  );
};
