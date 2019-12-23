import { TezosMessageCodec } from '../src/chain/tezos/TezosMessageCodec'
import { TezosNodeWriter } from '../src/chain/tezos/TezosNodeWriter'

const forgedTx = 'a927482997e77daecbba8dbe4f4b9840bd97dfeadb7533e946411adbe95aff406b00bf97f5f1dbfd6ada0cf986d0a812f1bf0a572abc940ae407904e0000444e1f4ab90c304a5ac003d367747aab63815f583ff2330ce159d12c1ecceba16c00bf97f5f1dbfd6ada0cf986d0a812f1bf0a572abc80f104e507bc5000a0c21e000012548f71994cb2ce18072d0dcb568fe35fb7493000'

const unforged = TezosMessageCodec.parseOperationGroup(forgedTx)

console.log(unforged)

// TezosNodeWriter.forgeOperations('xxx', )

const forged = TezosMessageCodec.encodeTransaction({
    kind: 'transaction',
    source: 'tz1d75oB6T4zUMexzkr5WscGktZ1Nss1JrT7',
    destination: 'tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ',
    amount: '500000',
    fee: '80000',
    gas_limit: '10300',
    storage_limit: '0',
    counter: '997',
    parameters: ''
})

const locallyForged = TezosNodeWriter.forgeOperations('BLzn8gmnhn1YYQb3GCuLgEgSLV8YJykcBCJFPc3ydaSV3BHj3UK', [{
    kind: 'transaction',
    source: 'tz1d75oB6T4zUMexzkr5WscGktZ1Nss1JrT7',
    destination: 'tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ',
    amount: '500000',
    fee: '80000',
    gas_limit: '10300',
    storage_limit: '0',
    counter: '997',
    parameters: ''
}])

TezosNodeWriter.forgeOperationsRemotely('https://tezos-mainnet-node-1.kubernetes.papers.tech', {
    hash: 'BLzn8gmnhn1YYQb3GCuLgEgSLV8YJykcBCJFPc3ydaSV3BHj3UK',
} as any, [{
    kind: 'transaction',
    source: 'tz1d75oB6T4zUMexzkr5WscGktZ1Nss1JrT7',
    destination: 'tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ',
    amount: '500000',
    fee: '80000',
    gas_limit: '10300',
    storage_limit: '0',
    counter: '997'
}]).then(remotelyForged => {
    console.log('locallyForged', locallyForged)
    console.log('remotelyForged', remotelyForged)
})

console.log(forged)