import { QueryClient, useQuery } from '@tanstack/react-query'
import styles from './Favorite.module.css';
import { useEffect, useState } from 'react';
import { AssetService } from '../services/asset-service';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

const queryClient = new QueryClient();


export default function Favorite (){

    const [favoritesAssetsId] = useState<string[] | []>(() => {
        const saved = localStorage.getItem("favorited_asset_coins");
        const initialValue: string[] = saved ? JSON.parse(saved) : [];
        return initialValue;
    });

    const [favoritedAssets, setFavoritedAssets] = useState<any[]>();

    const assets = useSelector((state: RootState) => state.coinAPI.assets);
    const assetsIcons = useSelector((state: RootState) => state.coinAPI.assetsIcons);

    useEffect(() => {

        async function handleListFavoriteAssets(){
            if( assets && favoritesAssetsId && assetsIcons ){

                const favoritedAssetsIdList: any[] = favoritesAssetsId;
                const favoritedAssetsList: any[] = [];
                assets.map( async (asset: any) => {
                    
                    if(favoritedAssetsIdList.includes(asset.asset_id)){
                        
                        const assetIcon = await assetsIcons.find((currentAssetIcon: any) => { return currentAssetIcon.asset_id === asset.asset_id; }); 
                        if(assetIcon){
                            return favoritedAssetsList.push({...asset, url: assetIcon.url });
                        } else {
                            return favoritedAssetsList.push(asset);
                        }
                    }
                });

                setFavoritedAssets(favoritedAssetsList);

            }
        }
        handleListFavoriteAssets();
    }, [assets, favoritesAssetsId])

    return(
        <div className={styles.favorites}>
            {favoritedAssets && (
                favoritedAssets.map((favoritedAsset, index) => (
                    <div key={index} className={styles.coin}>
                        <img src={favoritedAsset.url} />
                        <label>{favoritedAsset.name}</label>
                    </div>
                ))
            )}
        </div>
    )
}