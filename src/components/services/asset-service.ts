import axios from "axios";

export class AssetService {

    async getAllCoins(): Promise<any> {

        const authorization = {
            headers : {
                'Accept': 'text/plain', 
                'X-CoinAPI-Key': 'B71E8343-1787-4928-853B-5C4373542567'
            }
        };


        const { data } = await axios.get('https://rest.coinapi.io/v1/assets', { ...authorization });

        const cryptoCoins = data.filter((asset: any) => asset.type_is_crypto === 1);

        return cryptoCoins;
    }


    async getAssetCoins(): Promise<any> {
        const authorization = {
            headers : {
                'Accept': 'application/json', 
                'X-CoinAPI-Key': 'B71E8343-1787-4928-853B-5C4373542567'
            }
        };

        const { data } = await axios.get('https://rest.coinapi.io/v1/assets/icons/1', { ...authorization });
        return data;
    }
}