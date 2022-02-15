//this component is for distinguish categories like hat ,sneekersS
import React from 'react';
import './collection.overview.styles.css';
import {createStructuredSelector} from 'reselect';
import { selectCollectionForPreview } from "../../redux/shop/shop.selector";
import { connect } from "react-redux";

import CollectionPreview from '../collection-preview/collection-preview.component';

const CollecionOverview =({collections})=>(
    <div className='collection-overview'>
         {collections.map(({ id, ...otherCollectionsProps }) => (
      <CollectionPreview key={id} {...otherCollectionsProps} />
    ))}
    </div>
)
const mapStateToProps = createStructuredSelector({
    collections:selectCollectionForPreview
}) 

export default connect(mapStateToProps)(CollecionOverview);