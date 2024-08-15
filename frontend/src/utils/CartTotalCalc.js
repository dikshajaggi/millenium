export const calculateCartTotal = (cartItemsArray) => {
    const deliveryCharge = 50;
    const couponDiscount = 0;

    const totalPrice = cartItemsArray.reduce((acc, item) => acc + item.price * item.qty, 0);
    const finalAmount = totalPrice + deliveryCharge - couponDiscount;

    return { totalPrice, deliveryCharge, couponDiscount, finalAmount }
}