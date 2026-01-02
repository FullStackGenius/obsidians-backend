import app from './src/app.js'

app.listen(process.env.PORT,()=>{
    console.log(`app are running on 2001 port ${process.env.PORT}`)
})