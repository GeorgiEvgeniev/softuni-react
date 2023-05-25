import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { catServiceFactory } from "../services/catService";
import { useService } from "../hooks/userService";
import { AuthContext } from "../context/AuthContext";

export const CatDetails = ({ stateManager }) => {
  const { userId } = useContext(AuthContext);
  const { catId } = useParams();
  const [cat, setCat] = useState({});
  const catService = useService(catServiceFactory);
  const navigate = useNavigate();

  useEffect(() => {
    catService.getOne(catId).then((result) => {
      setCat(result);
    });
  }, [catId]);

  const isOwner = cat._ownerId === userId;

  const onDeleteClick = async (_id) => {
    console.log(1)
    await catService.delete(_id);
    console.log(2)
   await stateManager.updateCats();
   console.log(3)

    navigate("/catalog");
   console.log(4)

  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant='top' src={cat.imageUrl} />
      <Card.Body>
        <Card.Title>{cat.name}</Card.Title>
        <Card.Title>{cat.age}</Card.Title>
        <Card.Text>{cat.breed}</Card.Text>
        <Card.Text>{cat.description}</Card.Text>
        {isOwner && (
          <>
            <Button as={Link} to={`/catalog/${cat._id}/edit`} variant='primary' style={{marginRight: "10px"}}>
              Edit
            </Button>
            <Button
              variant='primary'
              onClick={async () => {
                await onDeleteClick(cat._id);
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
