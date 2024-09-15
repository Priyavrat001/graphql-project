import {users} from "../dummyData/data.js"

const userResolver = {
    Query: {
        users: ()=>{
            return users
        },
        user: (_, {userId})=>{
            const user = users.find(user=>user._id === userId);

            return user
        }
    },
    Mutation: {}
}

export default userResolver;