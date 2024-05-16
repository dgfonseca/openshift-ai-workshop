import axios from 'axios';
async function executeModel(body){
    return await axios.post('http://demo-api-demo-project.apps.cluster-k6txc.sandbox2369.opentlc.com/predict2',body,{headers:{"Access-Control-Allow-Origin":"*"}});
}

export {executeModel}