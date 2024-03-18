import axios from "axios";


const authorization = {
    headers : {
        'Accept': 'text/plain', 
        'X-CoinAPI-Key': 'BB0285F9-649D-495C-AB2B-BBDE537367D0'
    }
}; 

export class AssetService {

    async getAllCoins(): Promise<any> {

        const { data } = await axios.get('https://rest.coinapi.io/v1/assets', { ...authorization });

        const cryptoCoins = data.filter((asset: any) => asset.type_is_crypto === 1);

        console.log(cryptoCoins)
        return cryptoCoins;
    }


    async getAssetCoins(): Promise<any> {

        const { data } = await axios.get('https://rest.coinapi.io/v1/assets/icons/1', { ...authorization });
        return data;
    }

    async findAssetById(assetId: string): Promise<any>{

        const { data } = await axios.get(`https://rest.coinapi.io/v1/assets/${assetId}`, { ...authorization });
        return data;
    }


    async getAssetHistory(): Promise<any> {

        const { data } = await axios.get('https://rest.coinapi.io/v1/exchangerate/:asset_id_base', { ...authorization });
        console.log(data)
        return data;
        
    }
} 