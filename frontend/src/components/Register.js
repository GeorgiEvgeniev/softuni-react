import { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../context/AuthContext";

export const Register = () => {
  const { onRegisterSubmit } = useContext(AuthContext);
  const { values, changeHandler, onSubmit } = useForm(
    {
      email: "",
      password: "",
      repeatPassword: "",
    },
    onRegisterSubmit
  );
  return (
    <form method='POST' onSubmit={onSubmit}>
      <h2>Register</h2>
      <div>
        <label htmlFor='username'>Username:</label>
        <input type='text' id='email' name='email' value={values.email} onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' value={values.password} onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor='repeatPassword'>Repeat Password:</label>
        <input type='password' id='repeatPassword' name='repeatPassword' value={values.repeatPassword} onChange={changeHandler} required />
      </div>
      <button type='submit'>Register</button>
    </form>
  );
};
