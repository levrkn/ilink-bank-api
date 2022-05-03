import BigNumber from 'bignumber.js'

export const moneySumming = (
    walletMoney: number,
    inputMoney: number,
): number => {
    const moneySum = new BigNumber(walletMoney).plus(inputMoney)

    if (moneySum.lt(0)) {
        throw new Error('not enough money in the account')
    }

    return moneySum.toNumber()
}
