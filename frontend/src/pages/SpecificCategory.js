/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles.scss";
import SearchCategoryHeader from '../components/SearchCategoryHeader'
import { categoryWiseProducts } from '../apis';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';

const SpecificCategory = () => {
  const params = useParams()
  const [route, setRoute] = useState(params.category)
  console.log(params.category, "check params")
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const response = await categoryWiseProducts(params.category)
    setProducts(response.data)
  }
  useEffect(() => {
    // remove underscore
    let formattedStr = params.category.replace(/_/g, ' ')
    // replace and with &
    formattedStr = formattedStr.replace(/ and /gi, ' & ');
    setRoute(formattedStr)
    fetchProducts()
  }, [params.category])

  return (
    <div className='specific-cat-wrapper'>
      <h4>{route}</h4>
      <Banner />
      {/* <SearchCategoryHeader category={route} /> */}
      <div className="products-section-wrapper">
        {products.map((item, index) => {
          return (
            <ProductCard key={item.id || index} data={item} />
          )
        })}
      </div>
    </div>
  )
}

export default SpecificCategory
