import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContext } from "./context/AuthContext";
import { authServiceFactory } from "./services/authService";
import { gameServiceFactory } from './services/catService';

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Add } from "./components/Add";
import { CardCat } from "./components/CardCat";
import { CatDetails } from './components/CatDetails';
import { Logout } from "./components/Logout";
import { Catalog } from './components/Catalog';

function App() {
  const [cat, setCat] = useState([])
  const navigate = useNavigate()
  const [auth, setAuth] = useState({});
  const catService = gameServiceFactory(auth.accessToken)
  const authService = authServiceFactory(auth.accessToken)

  useEffect(() => {
    catService.getAll()
        .then(result => {
            setCat(result)
        })
}, []);

const onCreateGameSubmit = async (data) => {
  const newCat = await catService.create(data);

  setCat(state => [...state, newCat]);

  navigate('/catalog');
};

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data)
      setAuth(result)
      navigate('/')
    } catch (error) {
      console.log(`there is a problem`)
    }
  }

  const onRegisterSubmit = async (values) => {
    const { repeatPassword, ...registerData } = values;
    if (repeatPassword !== registerData.password) {
        return;
    }

    try {
        const result = await authService.register(registerData);

        setAuth(result);

        navigate('/catalog');
    } catch (error) {
        console.log('There is a problem');
    }
};

const onLogout = async () => {
  await authService.logout();

  setAuth({});
};

  const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
};

  return (
    <AuthContext.Provider value={contextValues}>
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/add' element={<Add onCreateGameSubmit={onCreateGameSubmit} />} />
        <Route path='/catalog' element={<Catalog cat={cat} />} />
        <Route path='/catalog/:catId' element={<CatDetails />} />
      </Routes>
      <Footer />
    </div>
    </AuthContext.Provider>
  );
}
export default App;
