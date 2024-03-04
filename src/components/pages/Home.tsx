import { QueryClient, useQuery } from '@tanstack/react-query'
import styles from './Home.module.css'
import axios from 'axios'
import { assert, error } from 'console';
import { useEffect, useMemo, useState } from 'react';
import { AssetService } from '../services/asset-service';
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import Modal from './Modal';

const queryClient = new QueryClient();

export default function Home(){

    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState<any>(undefined);
    const [openModal, setOpenModal] = useState(true);
    const [selectedAsset, setSelectedAsset] = useState<any>();


    const [favoritesAssets, setFavoriteAssets] = useState<string[] | []>(() => {
        const saved = localStorage.getItem("favorited_asset_coins");
        const initialValue: string[] = saved ? JSON.parse(saved) : [];
        return initialValue;
    });

    const assetService = new AssetService();
    const { data: assets, isLoading: isLoadingAssets, error: loadAssetsError, isFetching } = useQuery ({
        queryKey: ['assets'],
        queryFn: async () => {

            return await assetService.getAllCoins() ;
            
        }
    });

    const { data: assetsIcons, isLoading: isLoadingAssetsIcons, error: loadAssetsIconsError, isFetching: isLoadingIcons } = useQuery ({
        queryKey: ['assetsIcons'],
        queryFn: async () => {
            return await assetService.getAssetCoins();
            
        }
    });


    useEffect(() => {

        async function paginate(){
            if( assets !== undefined || assets !== null && assetsIcons !== undefined && assetsIcons !== null ){
                if(assets === undefined || assetsIcons === undefined ) return;
    
                const elementsPerPage: number = 10;
                const startIndex: number = ( currentPage - 1) * elementsPerPage; // 0  - Pq ? [page = 1] -> const startIndex = ( 1 - 1) * 10; = 0
                const endIndex: number = startIndex + (elementsPerPage - 1); // Pq ? [page = 1] -> const endIndex = 0 + 10 - 1;
            
                const pagination: any = [];
            
                for( var i = startIndex; i <= endIndex; i++){
                    const asset = assets[i];
                    if(asset){
            
                        const assetIcon = await assetsIcons.find((currentAssetIcon: any) => { return currentAssetIcon.asset_id === asset.asset_id; }); 
                        if(assetIcon){
                            pagination.push({...asset, url: assetIcon.url });
                        } else {
                            pagination.push(asset);
                        }
                    }
                }            
                setPage(pagination);
            }
        }
        paginate();
    }, [currentPage, assets]);


    if (isLoadingAssets || isLoadingAssetsIcons){
        return <div className='loading'>Carregando Assets...</div>
    }

    if(loadAssetsError) return <div className='loading'>{loadAssetsError.message}</div>
    

    async function handleFavoriteAsset(assetId: string): Promise<void>{

        const asset = await page.find((coin: any) => { return coin.asset_id === assetId; });
        if(asset){

            const isFavorite = favoritesAssets.find((coin) => { return coin === asset.asset_id; });
            if(isFavorite){

                const favoriteAssetsCoins: string[] = favoritesAssets.filter((coin) => coin !== asset.asset_id);
                localStorage.setItem("favorited_asset_coins", JSON.stringify(favoriteAssetsCoins));
                setFavoriteAssets(favoriteAssetsCoins);

            } else {

                const favoriteAssetsCoins: string[] = [ ...favoritesAssets, asset.asset_id ];
                localStorage.setItem("favorited_asset_coins", JSON.stringify(favoriteAssetsCoins));
                setFavoriteAssets(favoriteAssetsCoins);
            }
        }
    }

    function handleCloseModal(): void{
        setOpenModal(false);
    }

    function handleSelectAsset(asset: any): void {
        setSelectedAsset(asset);
        setOpenModal(true);
    }

    return(
        <>
            <div className={styles.home}>
                <div className={styles.style_table}>
                    <table border={1} className={styles.table}>
                        <tr>
                            <th></th>
                            <th>NAME</th>
                            <th>VALUE/DAY</th>
                            <th>VALUE/HR</th>
                            <th>ICONS</th>
                        </tr>
                        
                            {page && page.map((asset:any, index: number, ) => (
                                <tr key={index} className={styles.assets_cryptos}>
                                    <td  >{asset.url && <img onClick={() => { handleSelectAsset(asset) }} className={styles.icons} src={asset.url} />} </td>
                                    <td>{asset.name}</td>
                                    <td>{asset.volume_1day_usd}</td>
                                    <td>{asset.volume_1hrs_usd}</td>
                                    <td onClick={() => { handleFavoriteAsset(asset.asset_id) }} >{(favoritesAssets.find((favoriteAsset) => { return favoriteAsset === asset.asset_id; })) ? <IoIosStar style={{ color: '#F4D03F' }} /> : <IoIosStarOutline />}</td>
                                </tr>
                            ))}               
                    </table>
                </div>
                    
            <div className={styles.button_pagination}>
                <button
                className={styles.button_page}
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1}
                >
                Página Anterior
                </button>{" "}
                <button
                className={styles.button_page}
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                disabled={isFetching}
                >
                Próxima Página
                </button>
            </div>
            {(openModal && selectedAsset) && 
                <Modal onClose={handleCloseModal}>
                    <div className={styles.modal}>
                        <div className={styles.coin__principally__details}>
                            <img src={selectedAsset.url} alt={selectedAsset.asset_id} />
                            <label>{selectedAsset.asset_id}</label>
                        </div>
                        <div>{selectedAsset.name}</div>
                    </div>
                </Modal> 
            }
        </div>
      </>
    )
}
