import { Transaction } from "../models/transaction.model.js";

const transactionResolver = {
    Query: {
        transactions: async (_, args, context) => {
            try {

                if (!context.getUser) throw new Error("Unautherized");

                const userId = await context.getUser()._id;

                const transactions = await Transaction.find({ userId });

                return transactions;

            } catch (err) {
                console.error("Something went wrong in transactions", err);

                throw new Error(err.message || "Internal server error");

            }
        },
        transaction:async(_, {transactionId})=>{
            try {
                const transaction = await Transaction.findById(transactionId);

                return transaction;
            } catch (err) {

                console.error("Something went wrong in transaction", err);

                throw new Error(err.message || "Internal server error");
                
            }

        }
        // todo add category statics
    },
    Mutation: {}
}

export default transactionResolver;