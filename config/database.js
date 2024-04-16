import { connect } from 'mongoose'

const connectDB = async ()=>{
    try {
        const conn = await connect(process.env.MONGO_URL,{
            // useNewURLParser: true,
            // useUnifiedTopology: true,
        })
        console.log(`connected to ${conn.connection.host}`)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB