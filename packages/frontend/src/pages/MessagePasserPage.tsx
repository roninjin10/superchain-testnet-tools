import {
  Address,
  Hex,
  concat,
  encodeAbiParameters,
  getFunctionSelector,
  keccak256,
  parseEther,
  toHex,
} from 'viem'

const calculateMsgHash = ({
  nonce,
  sender,
  target,
  value,
  gasLimit,
  data,
}: {
  nonce: bigint
  sender: Address
  target: Address
  value: bigint
  gasLimit: bigint
  data: Hex
}) => {
  const functionSignature = getFunctionSelector(
    'relayMessage(uint256,address,address,uint256,uint256,bytes)',
  )

  const result = encodeAbiParameters(
    [
      {
        type: 'uint256',
      },
      {
        type: 'address',
      },
      {
        type: 'address',
      },
      {
        type: 'uint256',
      },
      {
        type: 'uint256',
      },
      {
        type: 'bytes',
      },
    ],
    [nonce, sender, target, value, gasLimit, data],
  )

  const encodedWithSignature = concat([functionSignature, result])
  return keccak256(encodedWithSignature)
}

export const MessagePasserPage = () => {
  console.log(
    calculateMsgHash({
      nonce: BigInt(
        '1766847064778384329583297500742918515827483896875618958121606201292619822',
      ),
      sender: '0xcA11bde05977b3631167028862bE2a173976CA11',
      target: '0x8a986CE389686dd140a5FD834B8B25d9d053D0fe',
      value: parseEther('0.01'),
      gasLimit: BigInt('1000000'),
      data: toHex(''),
    }),
  )
  return <div>Coming soon</div>
}
