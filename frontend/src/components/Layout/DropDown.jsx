import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/style';

const DropDown = ({categoriesData, setDropDown}) => {
    const navigate = useNavigate();
    const submitHandler = (i) => {
        navigate(`/products?category=${i.title}`);
        window.location.reload();
    }
    console.log(categoriesData);
    return (
    <div>
      <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
        {
            categoriesData && categoriesData.map((i, index)=>{
                return(<div key={index} className={`${styles.noramlFlex}`} onClick={()=>{submitHandler(i)}}>
                    <img src={i.image_Url} style={{width:"25px", height:"25px", objectFit:"contain", marginLeft:"10px", userSelect:"none"}} alt="" />
                    <h3 className='m-3 cursor-pointer select-none'>{i.title}</h3>
                </div>)
            })
        }
      </div>
    </div>
  )
}

export default DropDown
