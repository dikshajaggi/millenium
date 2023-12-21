import React, { useEffect, useState } from 'react'
import productimg from "../../assests/products/product.png"
import { Link } from 'react-router-dom'
import "../styles.scss"

const SpecificProductCard = ({ data }) => {
    const [info, setInfo] = useState()
    const getdata = async () => {
        const detail = await fetch(`http://localhost:8000/api/products/${data.id}/${data.product}`)
        const jsondata = await detail.json()
        setInfo(jsondata)
        console.log(jsondata, "specific data")
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <div>
            <div class="card mb-3" style={{ maxWidth: "1200px", minHeight: "400px" }}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src={info?.cloudinaryImage} class="img-fluid rounded-start" alt="productimg" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{info?.name}</h5>
                            <p class="card-text">{info?.description}.</p>
                            {/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
                            <h5 class="card-title">Rs.{info?.price}</h5>
                            <Link to="/cart">
                                <button type="button" class="btn btn-primary btn-sm btn-color">Add to Cart</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecificProductCard
