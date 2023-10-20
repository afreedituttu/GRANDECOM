import React from 'react'
import { brandingData, categoriesData } from '../../../static/data'
import styles from '../../../styles/style'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const Navigate = useNavigate();
  return (
    <>
    <div className={`${styles.section} hidden sm:block`}>
      <div className={"branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md"}>
        {
            brandingData && brandingData.map((i, index)=>{
                return(
                    <div className="flex items-start" key={index}>
                        {i.icon}
                        <div className="px-3">
                            <h3 className="font-bold text-sm md:text-base">
                                {i.title}
                            </h3>
                            <p className='text-xs md:text-sm'>{i.Description}</p>
                        </div>
                    </div>
                )
            })
        }
      </div>
    </div>

    <div className={`${styles.section} bg-white p-6 rounded md-12`} id="categories">
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:gap-[30px]">
            {
                categoriesData && categoriesData.map((i, index)=>{
                    const handleSubmit = (i) => {
                        Navigate(`/products?category=${i.title}`);
                        window.location.reload();
                    }
                    return(
                        <div className="w-full h-[100px] flex item-center justify-between cursor-pointer overflow-hidden"
                            key={index}
                            onClick={()=>{ handleSubmit(i) }}
                        >
                            <h5 className={'text-[10px] leading-[1.3]'}>{i.title}</h5>
                            <img src={i.image_Url} className='w-[120px] object-cover' alt="" />
                        </div>
                    )
                })
            }
        </div>
    </div>
    </>
  )
}

export default Categories
