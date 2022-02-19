# author: encoderlee
# https://github.com/encoderlee/eos_demo
import datetime
import eospy.cleos
import eospy.keys
from eospy.types import EOSEncoder, Transaction
from eospy.utils import sig_digest
import pytz
import json
import webbrowser

ce = eospy.cleos.Cleos(url="https://jungle3.greymass.com")

payer_name = "payer2222222"
consumer_name = "consumer1111"

# different from only_bill_first_authorizer.py
# this version, the transaction is signed in two places with two private keys
# function server_sign may run on server, It only provides signature services without exposing the private key

def server_sign(digest):
    payer_private_key = eospy.keys.EOSKey("5KAskRRbqYVCRhZxLXqeg9yvWYQQHifDtf7BPceZUDw6zybjaQh")
    return payer_private_key.sign(digest)

def client_sign(digest):
    consumer_private_key = eospy.keys.EOSKey("5KWxgG4rPEXzHnRBaiVRCCE6WAfnqkRpTu1uHzJoQRzixqBB1k3")
    return consumer_private_key.sign(digest)


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

    chain_info, lib_info = ce.get_chain_lib_info()
    transaction = Transaction(tx, chain_info, lib_info)
    hash_tx = sig_digest(transaction.encode(), chain_info["chain_id"])

    consumer_sign = client_sign(hash_tx)
    payer_sign = server_sign(hash_tx)
    signatures = [payer_sign, consumer_sign]

    final_tx = {
        'compression': 'none',
        'transaction': transaction.__dict__,
        'signatures': signatures
    }
    post_data = json.dumps(final_tx, cls=EOSEncoder)

    resp = ce.post('chain.push_transaction', data = post_data)
    print(resp)
    transaction_id = resp.get("transaction_id")
    if transaction_id:
        webbrowser.open("https://jungle3.bloks.io/transaction/{0}".format(transaction_id))


if __name__ == '__main__':
    main()

