import axios from "axios";

export class AssetService {

    async getAllCoins(): Promise<any> {

        const authorization = {
            headers : {
                'Accept': 'text/plain', 
                'X-CoinAPI-Key': 'BB0285F9-649D-495C-AB2B-BBDE537367D0'
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
                'X-CoinAPI-Key': 'BB0285F9-649D-495C-AB2B-BBDE537367D0'
            }
        };

        const { data } = await axios.get('https://rest.coinapi.io/v1/assets/icons/1', { ...authorization });
        return data;
    }
}