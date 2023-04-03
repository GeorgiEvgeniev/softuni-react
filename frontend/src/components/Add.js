import { useForm } from "../hooks/useForm";

export const Add = ({ 
  onCreateGameSubmit 
}) => {
  const { values, changeHandler, onSubmit } = useForm({
    name: "",
    breed: "",
    age: "",
    imageUrl: "",
    description: "",
  }, onCreateGameSubmit);
  
  return (
    <form className='add-pet-form' method="POST" onSubmit={onSubmit}>
      <h2>Add Pet</h2>
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
        Add Pet
      </button>
    </form>
  );
};
