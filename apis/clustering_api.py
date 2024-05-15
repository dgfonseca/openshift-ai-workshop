
# importing the libraries
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS,cross_origin
import pandas as pd
import json

import boto3, os

# these are the env variable injected by Red Hat Data Science based on your Data Connection settings. 
# env variables injected
# AWS_S3_ENDPOINT=http://minio-ml-workshop.ml-workshop.svc.cluster.local
# AWS_DEFAULT_REGION=us-east-1
# AWS_SECRET_ACCESS_KEY=minio123
# AWS_S3_BUCKET=demo-project
# AWS_ACCESS_KEY_ID=minio
 
# BUCKET = "demo-files" 
BUCKET = os.getenv("AWS_S3_BUCKET")
HTTP = 'http://'
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
REGIONNAME = os.getenv("AWS_DEFAULT_REGION")
AWS_S3_ENDPOINT = os.getenv("AWS_S3_ENDPOINT")

#Creating our FlaskAPP
app = Flask(__name__)
CORS(app)
# Load the model

s3 = boto3.resource('s3',endpoint_url = AWS_S3_ENDPOINT +":9000",aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

s3.Bucket(BUCKET).download_file('kmeansModel.pkl','./s3_model/kmeansModel.pkl')
s3.Bucket(BUCKET).download_file('classificationTree.pkl','./s3_model/classificationTree.pkl')

MODEL = joblib.load("./s3_model/kmeansModel.pkl")
MODEL2 = joblib.load("./s3_model/classificationTree.pkl")


@app.route('/predict', methods = {'POST'})
def predict():
    print("Inicia prediccion")
    clients = list(request.json['clients'])
    features = []
    for client in clients:
        features.append([client['Annual_Income'],client['Spending_Score_(1-100)']])
    
    clusters = list(MODEL.predict(features))
    
    for i in range(0,len(clusters)):
        clients[i]['Cluster']=int(clusters[i])
    res=jsonify(request.json)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

def json_to_dataframe(json_data):
    """
    Convert JSON data to a pandas DataFrame.

    Args:
    json_data (dict): JSON data.

    Returns:
    pandas.DataFrame: DataFrame containing the JSON data.
    """
    try:
        # Convert to DataFrame
        df = pd.DataFrame(json_data,columns=['proto', 'state', 'dur', 'sbytes', 'dbytes', 'sttl', 'dttl', 'sloss', 'dloss', 'service', 'sload', 'dload', 'spkts', 'dpkts', 'swin', 'dwin', 'stcpb', 'dtcpb', 'smean', 'dmean', 'trans_depth', 'response_body_len', 'sjit', 'djit', 'sinpkt', 'dinpkt', 'tcprtt', 'synack', 'ackdat', 'is_sm_ips_ports', 'ct_state_ttl', 'ct_flw_http_mthd', 'is_ftp_login', 'ct_ftp_cmd', 'ct_srv_src', 'ct_srv_dst', 'ct_dst_ltm', 'ct_src_ltm', 'ct_src_dport_ltm', 'st_dst_sport_ltm', 'ct_dst_src_ltm', 'label'])
        
        return df
    except Exception as e:
        print("Error:", e)
        return None

def categoric_to_numeric(data_set):
    arr = ['udp', 'arp', 'tcp', 'ospf', 'icmp', 'igmp', 'sctp', 'udt', 'sep',
       'swipe', 'sun-nd', 'mobile', 'pim', 'rtp', 'ip', 'ipnip', 'ggp',
       'st2', 'egp', 'cbt', 'emcon', 'igp', 'xnet', 'nvp', 'argus',
       'bbn-rcc', 'chaos', 'pup', 'hmp', 'mux', 'dcn', 'prm', 'trunk-1',
       'xns-idp', 'trunk-2', 'leaf-1', 'leaf-2', 'irtp', 'rdp', 'iso-tp4',
       'netblt', 'mfe-nsp', 'merit-inp', '3pc', 'idpr', 'xtp', 'tp++',
       'ddp', 'idpr-cmtp', 'ipv6', 'il', 'idrp', 'ipv6-frag', 'sdrp',
       'ipv6-route', 'gre', 'rsvp', 'mhrp', 'bna', 'esp', 'i-nlsp',
       'narp', 'ipv6-no', 'tlsp', 'skip', 'ipv6-opts', 'any', 'cftp',
       'sat-expak', 'kryptolan', 'rvd', 'ippc', 'sat-mon', 'ipcv', 'visa',
       'cpnx', 'cphb', 'wsn', 'pvp', 'br-sat-mon', 'wb-mon', 'wb-expak',
       'iso-ip', 'secure-vmtp', 'vmtp', 'vines', 'ttp', 'nsfnet-igp',
       'dgp', 'tcf', 'eigrp', 'sprite-rpc', 'larp', 'mtp', 'ax.25',
       'ipip', 'micp', 'aes-sp3-d', 'encap', 'etherip', 'pri-enc', 'gmtp',
       'pnni', 'ifmp', 'aris', 'qnx', 'a/n', 'scps', 'compaq-peer',
       'ipcomp', 'snp', 'ipx-n-ip', 'vrrp', 'zero', 'pgm', 'iatp', 'ddx',
       'l2tp', 'srp', 'stp', 'smp', 'uti', 'sm', 'ptp', 'crtp', 'isis',
       'fire', 'crudp', 'sccopmce', 'pipe', 'sps', 'iplt', 'unas', 'fc',
       'ib']
    arr2 = []
    for i in range(0,135):
        arr2.append(i)
        
    data_set['proto'] = data_set['proto'].replace(arr,arr2)

    data_set["state"].unique()
    arr = ['CON', 'INT', 'FIN', 'URH', 'REQ', 'ECO', 'RST', 'CLO', 'TXD',
        'URN', 'no', 'ACC', 'PAR', 'MAS', 'TST', 'ECR']
    arr2 = []

    for i in range(0,len(arr)):
        arr2.append(i)
    data_set["state"] = data_set['state'].replace(arr,arr2)

    arr = ['dns', '-', 'http', 'smtp', 'ftp-data', 'ftp', 'ssh', 'pop3',
        'snmp', 'ssl', 'irc', 'radius', 'dhcp']

    arr2=[]
    for i in range(0,len(arr)):
        arr2.append(i)
    data_set["service"] = data_set['service'].replace(arr,arr2)
    return data_set

def convert_to_float(number_str):
    if isinstance(number_str, str):
        return pd.to_numeric(number_str.replace('.', ''), errors='coerce')
    else:
        return number_str

def convert_labels(df):
    for column in df:
        df[column]=df[column].apply(convert_to_float)
    return df


@app.route('/predict2', methods = {'POST'})
def predict2():

    try:
        print(request.json)
        data = request.json["packets"]
        df = json_to_dataframe(data)
        df = categoric_to_numeric(df)
        df = convert_labels(df)
        scaler_steps = MODEL2.named_steps['scaler']
        scaled_data = scaler_steps.transform(df)
        data_set = pd.DataFrame(data=scaled_data, columns=['proto', 'state', 'dur', 'sbytes', 'dbytes', 'sttl', 'dttl', 'sloss', 'dloss', 'service', 'sload', 'dload', 'spkts', 'dpkts', 'swin', 'dwin', 'stcpb', 'dtcpb', 'smean', 'dmean', 'trans_depth', 'response_body_len', 'sjit', 'djit', 'sinpkt', 'inpkt', 'tcprtt', 'synack', 'ackdat', 'is_sm_ips_ports', 'ct_state_ttl', 'ct_flw_http_mthd', 'is_ftp_login', 'ct_ftp_cmd', 'ct_srv_src', 'ct_srv_dst', 'ct_dst_ltm', 'ct_src_ltm', 'ct_src_dport_ltm', 'st_dst_sport_ltm', 'ct_dst_src_ltm', 'label'])
        X = data_set.drop(columns=["label"])
        result = MODEL2.named_steps['tree'].predict(X)
        df["label"]=(pd.Series(result, name='prediction'))
        json_response = json.loads(df.to_json(orient='records'))
        request.json["packets"]=json_response
        res=jsonify(request.json)
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res
    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": str(e)})



if __name__ == '__main__':
    app.run(debug=True,port=8081)

