const Razorpay = require("razorpay");

let instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

function createPayOrder(orderid, totamount) {
  var options = {
    amount: totamount*100,
    currency: "INR",
    receipt: orderid,
  };
  return new Promise((resolve,reject)=>{

  
  instance.orders.create(options, function (err, order) {
    if (err) {
      console.log(err);
      reject(err)
    } else {
      console.log("Order"+order);
      resolve(order)
    }
  });
})
}

module.exports = {
  createPayOrder,
};
