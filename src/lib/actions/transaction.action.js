"use server";

const { redirect } = require('next/navigation');
const Stripe = require("stripe");
const { handleError } = require('../utils');
const { connectToDatabase } = require('../database/mongoose');
const Transaction = require('../database/models/transaction.model');
const { updateCredits } = require('./user.actions');

async function checkoutCredits(transaction) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          }
        },
        quantity: 1
      }
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  redirect(session.url);
}

async function createTransaction(transaction) {
  try {
    await connectToDatabase();

    // Create a new transaction with a buyerId
    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId
    });

    await updateCredits(transaction.buyerId, transaction.credits);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}

module.exports = {
  checkoutCredits,
  createTransaction
};
