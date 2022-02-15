import React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.action';
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selector";

import CheckoutPage from "./pages/checkout/checkout.component";




class App extends React.Component {

  unsubscribeFromAuth=null;
  componentDidMount(){
    const {setCurrentUser} =this.props;
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef=await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
          setCurrentUser({
             id:snapShot.id,
             ...snapShot.data()
           })  
        })
      }
      else{
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
  return (
    <div className='app'>
        <Header/>
        <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />

        <Route exact path="/signin" render={()=> this.props.status ? (<Redirect to='/'/>):<SignInAndSignUp/>} />
      </Switch>
    </div>
  );
}
}

const  mapStateToProps = (state) => ({
 
    currentUser: selectCurrentUser(state)
})
const mapDispatchToProps = (dispatch) =>( {
  setCurrentUser: user => {
      dispatch(setCurrentUser(user))
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
