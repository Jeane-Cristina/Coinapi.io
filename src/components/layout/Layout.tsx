import styles from './Layout.module.css';
import { IoHomeOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Home from '../pages/Home';
import { ReactNode, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllData } from '../features/coinAPI/coinAPISlice';
import { AssetService } from '../services/asset-service';
import { RootState } from '../features/store';


export default function Layout (){

    const dispatch = useDispatch();

    useEffect(() => {

        async function fetchAllDataFunction(): Promise<void>{

            const assetService = new AssetService()

            const dataAssets = await assetService.getAllCoins();
            const dataAssetsCoins = await assetService.getAssetCoins();
           // const dataAssetHistory = await assetService.getAssetHistory();
            const option = await assetService.getAssetHistory();
            const dataFavoritedAssets = await getFavoritedAssetsFromLocalStorage();

            const payload = {
                assets: dataAssets,
                assetsIcons: dataAssetsCoins,
                favoritedAssets: dataFavoritedAssets,
                //assetHistory: dataAssetHistory,
            };

            
            dispatch(setAllData(payload));
        }
        
        async function getFavoritedAssetsFromLocalStorage() {
            const saved = localStorage.getItem("favorited_asset_coins");
            const initialValue: string[] = saved ? JSON.parse(saved) : [];
            return initialValue;
        }


        fetchAllDataFunction();

    }, []);

    return(
        <div className={styles.layout}>
            <div className={styles.side_nav}>
                <span>COINAPI.IO</span>
                <div className={styles.options_menu}>
                    <a href='/home'><div className={styles.option}><div className={styles.icon_menu}><IoHomeOutline /></div>  HOME</div></a>
                    <a href= '/favorites'><div className={styles.option}><div className={styles.icon_menu}><IoIosStarOutline /></div> FAVORITOS</div></a>
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