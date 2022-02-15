import React from "react";
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart-action';
import Logo from "../../assets/shopping-bag.png";
import "./cart-icon.styles.css";
import { selectCartItemCounts } from "../../redux/cart/cart.selectors";

const CartIcon = ({toggleCartHidden,itemCount}) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <img src={Logo} className="shopping-icon" />
   

            <span className='item-count'>{itemCount}
            </span>
      
    
  </div>
);
const mapStateToProps = (state) => ({
    
    itemCount: selectCartItemCounts(state)
    
})

const mapDispatchToProps=dispatch=>({
    toggleCartHidden:()=>dispatch(toggleCartHidden())
})

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);
