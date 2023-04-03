import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";

export const Login = () => {
  const {onLoginSubmit} = useContext(AuthContext)
  const {values, changeHandler, onSubmit} = useForm({
    email: '',
    password: ''
  }, onLoginSubmit)

  return (
    <form method="POST" onSubmit={onSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor='username'>Username:</label>
        <input type='text' id='email' name='email' value={values.email} onChange={changeHandler} required />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' value={values.password} onChange={changeHandler} required />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};
