import React, { useEffect, useState } from 'react'
import { productData } from '../../../static/data';
import styles from '../../../styles/style';
import ProductCard from '../ProductCard/ProductCard.jsx'

const BestDeals = () => {
    const [data, setData] = useState();

    useEffect(()=>{
        const d = productData && productData.sort((a,b) => b.total_sell - a.total_sell);
        const firstFive = d.slice(0, 5);
        setData(firstFive);
    }, [])
  return (
    <div>
      <div className={`${styles.section}`} >
        <div className={`${styles.heading}`}>
            <h1>Best deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:gap-[30px]">
            {
                data && data.map((i, index)=>{
                    return(
                        <ProductCard data={i} key={index} />
                    )
                })
            }
        </div>
      </div>
    </div>
  )
}

export default BestDeals
