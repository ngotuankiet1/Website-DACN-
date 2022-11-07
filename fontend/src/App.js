import "./App.css";
import Header from "./component/Home/Header";
import Home from "./component/Home/Home";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from "./component/Products/ProductDetails";
import LoginSignup from "./component/Authentication/LoginSignup";
import Loading from "./more/Loader";
import UserData from "./more/UserData";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import Store from "./store";
import ProtectedRoute from "./route/ProtectedRoute";
import Profile from "./component/user/Profile";
import UpdatePassword from "./component/user/UpdatePassword";
import EditProfile from "./component/user/EditProfile";
import About from "./component/about/About";
import Products from "./component/Products/Products";
import Search from "./component/Products/Search";
import Support from "./more/Support";
import Cart from "./component/cart/Cart";
import Favourite from "./component/cart/Favourites";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Payment from "./component/cart/Payment";
import Success from "./component/cart/Success";
import MoreOption from "./component/user/MoreOption";
import Dashboard from "./component/Admin/Dashboard";
import CreateProduct from "./component/Admin/CreateProduct";
import AllProducts from "./component/Admin/AllProducts";
import EditProduct from "./component/Admin/EditProduct.jsx";
import AllOrder from "./component/Admin/AllOrder";
import UpdateOrder from "./component/Admin/UpdateOrder";
import AllUsers from "./component/Admin/AllUsers";
import UpdateUser from "./component/Admin/UpdateUser";
import MyOrder from "./component/user/MyOrder";
import AllReviews from "./component/Admin/AllReviews";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import MyOrderDetails from "./component/user/MyOrderDetails";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}

       {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/about" component={About} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/favourites" component={Favourite} />
        <Route exact path="/more" component={MoreOption} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <Route exact path="/load" component={Loading} />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/me/update/info" component={EditProfile} />
        <ProtectedRoute exact path="/success" component={Success} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />
        <ProtectedRoute isAdmin={true} exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute isAdmin={true} exact path="/admin/product" component={CreateProduct} />
        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={AllProducts} />
        <ProtectedRoute isAdmin={true} exact path="/edit/product/:id" component={EditProduct} />
        <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={AllOrder} />
        <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={UpdateOrder} />
        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={AllUsers} />
        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
        <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={AllReviews} />


      </Switch>
    </Router>
  );
}

export default App;
