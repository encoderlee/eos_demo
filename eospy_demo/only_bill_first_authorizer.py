# author: encoderlee
# https://github.com/encoderlee/eos_demo
import datetime
import eospy.cleos
import eospy.keys
import pytz
import webbrowser

consumer_name = "consumer1111"
consumer_private_key = eospy.keys.EOSKey("5KWxgG4rPEXzHnRBaiVRCCE6WAfnqkRpTu1uHzJoQRzixqBB1k3")
payer_name = "payer2222222"
payer_private_key = eospy.keys.EOSKey("5KAskRRbqYVCRhZxLXqeg9yvWYQQHifDtf7BPceZUDw6zybjaQh")

ce = eospy.cleos.Cleos(url="https://jungle3.greymass.com")

def main():
    print("transfer EOS token from [consumer1111] to [consumer2222] by eospy")
    print("but let [payer2222222] pay for CPU/NET resources of this transaction")
    action = {
        "account": 'eosio.token',
        "name": 'transfer',
        "authorization": [
            {
                "actor": payer_name,
                "permission": "active",
            },
            {
                "actor": consumer_name,
                "permission": "active",
            },
        ],
        "data": {
            "from": consumer_name,
            "to": "consumer2222",
            "quantity": "0.0001 EOS",
            "memo": "by eospy",
        },
    }
    data = ce.abi_json_to_bin(action['account'], action['name'], action["data"])
    action["data"] = data["binargs"]
    tx = {
        "actions": [action],
        "expiration": str((datetime.datetime.utcnow() + datetime.timedelta(seconds=90)).replace(tzinfo=pytz.UTC))
    }
    resp = ce.push_transaction(tx, [consumer_private_key, payer_private_key])
    print(resp)
    transaction_id = resp.get("transaction_id")
    if transaction_id:
        webbrowser.open("https://jungle3.bloks.io/transaction/{0}".format(transaction_id))


if __name__ == '__main__':
    main()

