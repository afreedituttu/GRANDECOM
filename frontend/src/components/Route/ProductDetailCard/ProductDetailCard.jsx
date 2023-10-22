import React, { useState } from 'react'
import {RxCross1} from "react-icons/rx"
const ProductDetailCard = ({setOpen, data}) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(false);

  return (
    <div className='bg-white'>
      {
        data?(<div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
            <div className="w-[90%] 600px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
                <RxCross1 size={30} className="absolute right-3 top-3 z-50" onClick={()=>{setOpen(false)}} />
                <div className="block v-full 600px:flex">
                    <div className="w-full 800px:w-[50%]">
                        <img src={data.image_Url[0].url} alt="" />
                        <div className="flex">
                            <img src={data.shop.shop_avatar.url} className='w-[50px] h-[50px] rounded-full mr-2' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>):null
      }
    </div>
  )
}

export default ProductDetailCard
