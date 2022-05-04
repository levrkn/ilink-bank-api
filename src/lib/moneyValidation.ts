export const moneyValidation = (money: number): void => {
    if (money < 0) {
        throw new Error('Invalid input')
    }
}
