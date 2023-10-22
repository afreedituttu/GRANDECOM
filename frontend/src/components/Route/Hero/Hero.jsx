import React from 'react'
import styles from '../../../styles/style'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className={`relative min-h-[70-vh] 800px:min-h-[80vh] v-full bg-no-repeat ${styles.noramlFlex}`}
        style={{
            backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)"
        }}
    >
      <div className={`${styles.section} w-[50%] 800px:w-[60%]`}>
        <h1 className='text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize'>
            Best collection for <br /> Home decoration
        </h1>
        <p className='pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ut saepe vel ipsam recusandae animi officia fugiat voluptatum incidunt sit explicabo eligendi sunt cum veniam, maiores illum dolor similique possimus.</p>
        <Link to="/products" className='inline-block'>
            <div className={`${styles.button} mt-5`}>
                <span className='text-[#ffff] font-[Poppins] font-[400] text-[10px]'>Shop now</span>
            </div>
        </Link>
      </div>
    </div>
  )
}

export default Hero
