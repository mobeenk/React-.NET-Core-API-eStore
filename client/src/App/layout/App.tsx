
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";


import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";

import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css'
import ServerError from "../Errors/ServerError";
import NotFound from "../Errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import RouterOutlet from "../router/Router";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const buyerId = getCookie('buyerId')
    if(buyerId){
      agent.Basket.get()
        .then(basket=> setBasket(basket))
        .catch(err => console.log(err))
        .finally(()=> setLoading(false))
    }
    else{
      setLoading(false)
    }
  },[setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode:paletteType,
      background: {
        default: paletteType === 'light'? '#eaeaea': '#121212',
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message="Initializing App..."/>

  return (
    <> 
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" theme="colored"  autoClose={1000}  hideProgressBar/>
      <CssBaseline  />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />  
     <Container>
        <RouterOutlet/>
      </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
