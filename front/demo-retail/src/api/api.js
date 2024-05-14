import axios from 'axios';
async function executeModel(body){
    return await axios.post('http://demo-api.demo-project.svc.cluster.local:8080/predict',body,{headers:{"Access-Control-Allow-Origin":"*"}});
}

export {executeModel}