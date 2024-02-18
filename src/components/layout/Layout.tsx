import styles from './Layout.module.css';
import { IoHomeOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Home from '../pages/Home';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';


export default function Layout (){
    return(
        <div className={styles.layout}>
            <div className={styles.side_nav}>
                <span>COINAPI.IO</span>
                <div className={styles.options_menu}>
                    <div className={styles.option}><div className={styles.icon_menu}><IoHomeOutline /></div>  HOME</div>
                    <div className={styles.option}><div className={styles.icon_menu}><IoIosStarOutline /></div> FAVORITOS</div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.top_nav}>
                    <div className={styles.search_area}>
                        <CiSearch />
                        <input type='text'  />
                    </div>  
                </div>
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}