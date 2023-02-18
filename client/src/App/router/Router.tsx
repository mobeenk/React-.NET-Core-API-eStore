import { ContactPage } from "@mui/icons-material";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import HomePage from "../../features/home/HomePage";
import NotFound from "../Errors/NotFound";
import ServerError from "../Errors/ServerError";

export default function RouterOutlet() {
    return (
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/catalog' component={Catalog} />
            <Route path='/catalog/:id' component={ProductDetails} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/server-error' component={ServerError} />
            <Route path='/basket' component={BasketPage} />
            <Route path='/checkout' component={CheckoutPage} />
            <Route component={NotFound} />
      </Switch>
    )
}