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
    Mutation: {
        createTransaction: async(_, {input}, context)=>{
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id,
                });

                await newTransaction.save();
                return newTransaction;
            } catch (err) {
                console.error("Something went wrong in createTransaction", err);
                throw new Error(err.message || "Inernal server error")
            }
        },
        updateTransaction: async(_, [input])=>{
            try {
                const updatedTransaction = await Transaction.findById(input.transactionId, {new:true});

                return updatedTransaction;
            } catch (err) {
                console.error("Something went wrong in updateTransaction", err);
                throw new Error(err.message || "Inernal server error")
            }
        },
        deleteTransaction: async(_, {transactionId})=>{
            try {
                const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);

                return deleteTransaction;
            } catch (err) {
                console.error("Something went wrong in deleteTransaction", err);
                throw new Error(err.message || "Inernal server error")
            }
        },
    },
    // todo add transaction and user relationship
}

export default transactionResolver;