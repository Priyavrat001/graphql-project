import bcrypt from "bcryptjs";
import passport from "passport";
import {User} from "../models/user.model.js";
import {GraphQLLocalStrategy} from "graphql-passport";

export const configurePassport = async()=>{
    passport.serializeUser((user, done)=>{
        console.log("Serializing the user");
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done)=>{
        consolelog("Deserializing user");
        try {
            const user = await User.findById(id);

            done(null, user);
        } catch (error) {
            done(error);
        }
    });
    // Todo to give this passport.use some options 
    passport.use(
        new GraphQLLocalStrategy(async(username, password, done)=>{
            try {
                const user = await User.findOne({username}).select("+password");

                if(!user) throw new Error("Invalid username or password");
                
                const validPassword = await bcrypt.compare(password, user.password);
                if(!validPassword) throw new Error("Invalid username or password");

                return done(null, user);

            } catch (err) {
                done(err)
            }
        })
    );
}