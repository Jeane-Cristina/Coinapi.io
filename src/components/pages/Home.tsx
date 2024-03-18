import styles from './Home.module.css'
import { useEffect, useState } from 'react';
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { AssetService } from '../services/asset-service';
import { setAssets } from '../features/coinAPI/coinAPISlice';

export default function Home(){

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState<any>(undefined);
    const [openModal, setOpenModal] = useState(true);
    const [selectedAsset, setSelectedAsset] = useState<any>();


    const [favoritesAssets, setFavoriteAssets] = useState<string[] | []>(() => {
        const saved = localStorage.getItem("favorited_asset_coins");
        const initialValue: string[] = saved ? JSON.parse(saved) : [];
        return initialValue;
    });

    
    const assets = useSelector((state: RootState) => state.coinAPI.assets);
    const assetsIcons = useSelector((state: RootState) => state.coinAPI.assetsIcons);
    //const assetHistory = useSelector((state: RootState) => state.coinAPI.assetHistory);



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


    if (!assets){
        return <div className='loading'>Carregando Assets...</div>
    }
    

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

    async function handleSelectCoinMetric(value: string): Promise<void>{

        const assetService = new AssetService();
        const response = await assetService.findAssetById(value);

        const payload = {
            assets: response
        };

        dispatch(setAssets(payload))
    }

    return(
        <>
            <div className={styles.all__metrics}>
                <div className={styles.metrics__container}>
                    <label>Coins: </label>
                    <div className={styles.metric} onClick={() => { handleSelectCoinMetric('EUR') }}>EUR</div>
                    <div className={styles.metric} onClick={() => { handleSelectCoinMetric('BRL') }}>BRL</div>
                    <div className={styles.metric} onClick={() => { handleSelectCoinMetric('USD') }}>USD</div>
                </div>
                <div className={styles.metrics__container}>
                    <label>Others: </label>
                    <div className={styles.metric} onClick={() => { handleSelectCoinMetric('BTC') }}>BTC</div>
                    <div className={styles.metric} onClick={() => { handleSelectCoinMetric('ETH') }}>ETH</div>
                </div>
            </div>
            <br />
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
                >
                Próxima Página
                </button>
            </div>
            {(openModal && selectedAsset ) && 
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

