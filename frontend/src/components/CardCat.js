import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export const CardCat = ({
  name, breed, age, imageUrl, description, _id
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant='top' src='./cat-hero.jpg' />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button as={Link} to={`/catalog/${_id}`} variant='primary'>Details</Button>
      </Card.Body>
    </Card>
  );
};
