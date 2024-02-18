import { QueryClient, useQuery } from '@tanstack/react-query'
import styles from './Home.module.css'
import axios from 'axios'
import { assert, error } from 'console';
import { useEffect, useMemo, useState } from 'react';

const queryClient = new QueryClient();

export default function Home(){
const [currentPage, setCurrentPage] = useState(1);
const [page, setPage] = useState<any>(undefined);

const { data: assets, isLoading: isLoadingAssets, error: loadAssetsError, isFetching } = useQuery ({
    queryKey: ['asets'],
    queryFn: async () => {

        const authorization = {
            headers : {
                'Accept': 'text/plain', 
                'X-CoinAPI-Key': 'B71E8343-1787-4928-853B-5C4373542567'
            }

        };

        var result = null;

        try {
            const { data } = await axios.get('https://rest.coinapi.io/v1/assets', {
                ...authorization,

        });
            //throw new Error('Error de teste');
            
            result = data.filter((asset: any) => asset.type_is_crypto === 1);
        } catch (errorMessage: any) {
            throw new Error(errorMessage);
        }
        return result;

    }
    
}

);

useEffect(() => {
    if( assets !== undefined || assets !== null ){
        if(assets === undefined ) return;

        const elementsPerPage: number = 10;
        const startIndex: number = ( currentPage - 1) * elementsPerPage; // 0  - Pq ? [page = 1] -> const startIndex = ( 1 - 1) * 10; = 0
        const endIndex: number = startIndex + (elementsPerPage - 1); // Pq ? [page = 1] -> const endIndex = 0 + 10 - 1;
    
        const pagination = [];
    
        for( var i = startIndex; i <= endIndex; i++){
            const asset = assets[i];
            if(asset){
    
                pagination.push(asset);
            }
        }
    
        setPage(pagination);
    }
}, [currentPage, assets]);


if (isLoadingAssets){
    return <div className='loading'>Carregando Assets...</div>
}

    if(loadAssetsError) return <div className='loading'>{loadAssetsError.message}</div>


    return(
        <div className={styles.home}>
            <div className={styles.style_table}>
                <table border={1} className={styles.table}>
                    <tr>
                        <th>NAME</th>
                        <th>VALUE/DAY</th>
                        <th>VALUE/HR</th>
                        <th>VALUE/MTH</th>
                    </tr>
                    
                        {page && page.map((asset:any, index: number) => (
                            <tr key={index} className={styles.assets_cryptos}>
                                <td>{asset.name}</td>
                                <td>{asset.volume_1day_usd}</td>
                                <td>{asset.volume_1hrs_usd}</td>
                                <td>{asset.voleme_1mth_usd}</td>
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
        </div>
        
    )
}
