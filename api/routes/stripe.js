const router = require("express").Router();
// const stripe = require("stripe")(
//   "sk_test_51K7N0cFdTBZ0dAku4TbC4mRL9IYzNPkgKkHAEob3BVH20IY4t9MPdRtB9sUDHsoAVJAGrNlNNKJ2dfNgZhaEsVzN00vQnqM8Y2")
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
