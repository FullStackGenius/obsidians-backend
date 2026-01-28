import app from './src/app.js'

app.listen(process.env.PORT,()=>{
    console.log(`app are running on port ${process.env.PORT}`)
})