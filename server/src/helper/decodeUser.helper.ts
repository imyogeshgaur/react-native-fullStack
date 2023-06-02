import { decode} from "jsonwebtoken"


const decodeUser = (token:any):string|undefined=>{
    try {
        const decodedVal: any = decode(token, { complete: true });
        return decodedVal?.payload.id;
    } catch (error) {
        console.log("Decoding Error : "+error);
    }
}

export default decodeUser;