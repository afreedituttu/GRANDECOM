import React, { useState } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/tinkerhubLogo.jpeg";
import { categoriesData, productData } from "../../static/data";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import {BiMenuAltLeft} from 'react-icons/bi'
import DropDown from './DropDown.jsx';
import Navbar from './Navbar.jsx';
import {CgProfile} from 'react-icons/cg'
import { useSelector } from 'react-redux'
import {backend_url} from '../../server';

const Header = ({activeHeading}) => {
  const {isAuthenticated, user} = useSelector((state)=>state.user);
  const [searchTerm, setSearchTerm] = useState();
  const [searchData, setSearchDatat] = useState(null);
  const [active, setActive] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  console.log("User", user);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData && productData.filter((product) => {
      const p = product.name.toLowerCase()
      if(p.includes(term.toLowerCase())){
        return product
      }
    });
    setSearchDatat(filteredProducts);
  };

  window.addEventListener("scroll", ()=>{
    if(window.scrollY > 70){
      setActive(true)
    }else{
      setActive(false)
    }
  })
  console.log(searchData);
  console.log(searchData && searchData.length);
  return (
    <>
    <div className={`${styles.section}`}>
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div className="">
          <Link to="/">
            <img className="w-[50px]" src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="w-[50%] relative">
          <input
            type="text"
            className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            placeholder="Search product"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <AiOutlineSearch size={30} className="absolute right-2 top-1.5" />
          {
            searchData && searchData.length !== 0? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {
                        searchData && searchData.map((i, index)=>{
                            const d = i.name;
                            const Product_name = d.replace(/\s+/g,"-");
                            console.log(index, i.name)
                            return(
                                <Link key={index} to={`/product/${Product_name}`}>
                                    <div className="w-full flex items-start-py-3">
                                        <img src={i.image_Url[0].url} alt="product photo" className="w-[40px] h-[40px] mr-[10px]" />
                                        <h1>{i.name}</h1>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            ):null
          }
        </div>
        <div className={`${styles.button}`}>
          <Link to="/seller">
            <h1 className="text-[#fff] flex items-center">
              Become Seller <IoIosArrowForward className="ml-1" />
            </h1>
          </Link>
        </div>
      </div>
    </div>
    <div className={`${active === true?"shadow-sm fixed top-0 left-0 z-10":null} transition hidden 800px:flex items-center justify-between w-full bg-[#3321c0] h-[70px]`}>
      <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
        <div onClick={()=>{setDropdown(!dropdown)}} className="relative h-[60px] w-[270px] hidden 1000px:block">
          <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
          <button className={'h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md'}>
            All categories
          </button>
          <IoIosArrowDown size={20} className="absolute right-2 top-4 cursor-pointer" />
          {
            dropdown ? (
              <DropDown categoriesData={categoriesData} setDropdown={setDropdown} />
            ):null
          }
        </div>
        <div className={`${styles.noramlFlex}`}>
        <Navbar active={activeHeading} />
        </div>
        <div className="flex">
          <div className={`${styles.noramlFlex}`}>
            <div className="relative cursor-pointer mr-[50px]">
              <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                e
              </span>
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <div className="relative cursor-pointer mr-[50px]">
              <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                e
              </span>
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <div className="relative cursor-pointer mr-[50px]">
            {isAuthenticated ? (
              <Link to="/profile"><img className="w-[40px] h-[30px] rounded-full object-cover" src={`${backend_url}/${user.avatar}`} alt="" /></Link>
            ):(
              <Link to="/login"><CgProfile size={30} color="rgb(255 255 255 / 83%)" /></Link>
            )}
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                e
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;
