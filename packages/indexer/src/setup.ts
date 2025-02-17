import { OpStackChain as OpStackChainModel, ponder } from '@/generated'
import { Model } from '@ponder/core'
import { OpStackChain, opStackChains } from '@superchain-testnet-tools/chains'

const createOpStackChain = async (
  model: Model<OpStackChainModel>,
  opStackChain: OpStackChain,
) => {
  return await model.create({
    id: opStackChain.l2Chain.id,
    data: {
      l1ChainId: opStackChain.l1Chain.id,
      l2ChainId: opStackChain.l2Chain.id,
    },
  })
}

ponder.on('setup', async ({ context }) => {
  const { entities } = context
  console.log('Setting up...')

  const { OpStackChain } = entities

  await Promise.all([
    opStackChains.map(async (opStackChain) =>
      createOpStackChain(OpStackChain, opStackChain),
    ),
  ])
})
