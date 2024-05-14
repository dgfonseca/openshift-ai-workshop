import axios from 'axios';
async function executeModel(body){
    return await axios.post(process.env.MODEL || 'http://localhost:8081/predict',body,{headers:{"Access-Control-Allow-Origin":"*"}});
}

export {executeModel}