import React from 'react'

const RelatedProducts = () => {
    // fetch 4 random products from the db of the same category 
    return (
        <div className="d-flex justify-content-between align-items-center flex-column width100" >
            <h1>Related Products</h1>
            <div className='d-flex flex-sm-row flex-column align-items-center justify-content-space-between  rel-products'>
            </div>
        </div>
    )
}

export default RelatedProducts
