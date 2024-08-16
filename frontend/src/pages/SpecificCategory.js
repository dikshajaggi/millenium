/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles.scss";
import SearchCategoryHeader from '../components/SearchCategoryHeader'
import { categoryWiseProducts } from '../apis';
import ProductCard from '../components/ProductCard';

const SpecificCategory = () => {
    const params = useParams()
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
      const response = await categoryWiseProducts(params.category)
      setProducts(response.data)
    }
    useEffect(() => {
        fetchProducts()
    }, [params.category])

  return (
    <div className='specific-cat-wrapper'>
      <SearchCategoryHeader category={params.category}/>
      <div className="products-section-wrapper">
        {products.map(item => {
          return(
            <ProductCard key={item.id} data={item} />
          )
        })}
      </div>
    </div>
  )
}

export default SpecificCategory
