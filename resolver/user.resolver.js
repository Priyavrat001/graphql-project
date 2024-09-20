import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs";

const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, password, gender } = input;

                if (!username || !password || !gender) {
                    throw new Error("All fields are required");
                };

                const existingUser = await User.findOne({ username });
                if (existingUser) throw new Error("User already existed");

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const user = await User.create({
                    username,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic
                });

                await user.save();

                await context.login(user);

                return user;

            } catch (err) {
                console.error("Something went wrong in signup", err);

                throw new Error(err.message || "Internal server error");
            }
        },

        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;

                if (!username || !password) throw new Error("Invalid username or password");

                const { user } = await context.authenticate("graphql-local", username, password);

                await context.login(user);

                return user;
            } catch (err) {
                console.error("Something went wrong in login", err);

                throw new Error(err.message || "Internal server error");
            }
        },

        logout: async (_, args, context) => {
            try {
                await context.logout();

                req.session.destroy((err) => {
                    if (err) throw err;
                });

                res.clearCookie("connect.sid");

                return { message: "logout successfully" };
            } catch (err) {
                console.error("Something went wrong in logout", err);

                throw new Error(err.message || "Internal server error");

            }
        }
    },
    Query: {
        authUser: async (_, args, context) => {
            try {
                const user = await context.getUser();
                return user;
            } catch (err) {
                console.error("Something went wrong in authUser", err);

                throw new Error(err.message || "Internal server error");

            }
        },
        user: async (_, { userId }) => {
            try {
                const user = users.findById(userId);

                return user
            } catch (err) {
                console.error("Something went wrong in user query", err);

                throw new Error(err.message || "Internal server error");
            }
        }

    },

    // todo user/transaction realation

}

export default userResolver;