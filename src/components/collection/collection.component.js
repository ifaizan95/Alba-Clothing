import React from 'react';
import './collection.styles.css';
import { selectCollection } from '../../redux/shop/shop.selector';
import { connect } from 'react-redux';
import CollectionItem from '../collection-item/collection-item.component';

const collectionPage=({collection})=>{
const {title,items}= collection

return(
    <div className='collection-page'>
         <h2 className='title'>{title}</h2>
         <div className='items'>
             {
                 items.map(item=>(
                     <CollectionItem key={item.id} item={item}/>
                 ))
             }
         </div>
    </div>
)
}
const mapStateToProps = (state, ownProps) => ({
 collection:selectCollection(ownProps.match.params.collectionId)(state)   
 //data has come from input hats,sneakers in ownProps.match.params.collectionId just like hats etc.
 //data goes to selectCollection and stored in collection
 //now move to selectCollection in shop.selector page
})
export default connect(mapStateToProps)(collectionPage);