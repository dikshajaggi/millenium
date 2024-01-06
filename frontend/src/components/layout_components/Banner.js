import React, { Suspense, lazy } from 'react'
const CarouselDisp = lazy(() => import('./Carousel'))


const Banner = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarouselDisp />
    </Suspense>
  )
}

export default Banner
