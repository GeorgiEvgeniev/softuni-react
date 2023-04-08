import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContext } from "./context/AuthContext";
import { authServiceFactory } from "./services/authService";
import { catServiceFactory } from "./services/catService";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Add } from "./components/Add";
import { CatDetails } from "./components/CatDetails";
import { Logout } from "./components/Logout";
import { Catalog } from "./components/Catalog";
import { Edit } from "./components/Edit";

function App() {
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const catService = catServiceFactory(auth.accessToken);
  const authService = authServiceFactory(auth.accessToken);

  const stateManager = {
    updateCats: async () => {
      await catService.getAll().then((result) => {
        setCat(result);
      });
    },
  };

  useEffect(() => {
    stateManager.updateCats();
  }, []);

  const onCreateCatSubmit = async (data) => {
    const newCat = await catService.create(data);

    setCat((state) => [...state, newCat]);

    navigate("/catalog");
  };

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data);
      setAuth(result);
      navigate("/");
    } catch (error) {
      console.log(`there is a problem`);
    }
  };

  const onRegisterSubmit = async (values) => {
    const { repeatPassword, ...registerData } = values;
    if (repeatPassword !== registerData.password) {
      return;
    }

    try {
      const result = await authService.register(registerData);

      setAuth(result);

      navigate("/catalog");
    } catch (error) {
      console.log("There is a problem");
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setAuth({});
  };

  const onCatEditSubmit = async (values) => {
    const result = await catService.edit(values._id, values);

    setCat((state) => state.map((x) => (x._id === values._id ? result : x)));

    navigate(`/catalog/${values._id}`);
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
          <Route path='/' element={<Home cat={cat} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/add' element={<Add onCreateCatSubmit={onCreateCatSubmit} />} />
          <Route path='/catalog' element={<Catalog cat={cat} />} />
          <Route path='/catalog/:catId' element={<CatDetails stateManager={stateManager} />} />
          <Route path='/catalog/:catId/edit' element={<Edit onCatEditSubmit={onCatEditSubmit} />} />
        </Routes>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
export default App;
