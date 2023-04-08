import { useForm } from "../hooks/useForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useService } from "../hooks/userService";
import { catServiceFactory } from "../services/catService";

export const Edit = ({ 
  onCatEditSubmit 
}) => {
  const { catId } = useParams();
  const catService = useService(catServiceFactory);
  const { values, changeHandler, onSubmit, changeValues } = useForm({
    name: "",
    breed: "",
    age: "",
    imageUrl: "",
    description: "",
    _id: "",
  }, onCatEditSubmit);

  useEffect(() => {
    catService.getOne(catId)
        .then(result => {
            changeValues(result);
        });
}, [catId]);

  return (
    <form className='add-pet-form' method="POST" onSubmit={onSubmit}>
      <h2>Edit Pet</h2>
      <div className='form-group'>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' name='name' className='form-control' value={values.name} onChange={changeHandler} required />
      </div>
      <div className='form-group'>
        <label htmlFor='breed'>Breed:</label>
        <input type='text' id='breed' name='breed' className='form-control' value={values.breed} onChange={changeHandler} required />
      </div>
      <div className='form-group'>
        <label htmlFor='age'>Age:</label>
        <input type='number' id='age' name='age' className='form-control' value={values.age} onChange={changeHandler} required />
      </div>
      <div className='form-group'>
        <label htmlFor='image-url'>Image URL:</label>
        <input type='url' id='image-url' name='imageUrl' className='form-control' value={values.imageUrl} onChange={changeHandler} required />
      </div>
      <div className='form-group'>
        <label htmlFor='description'>Description:</label>
        <textarea id='description' name='description' className='form-control' value={values.description} onChange={changeHandler} required></textarea>
      </div>
      <button type='submit' className='btn-submit'>
        Edit Pet
      </button>
    </form>
  )
}