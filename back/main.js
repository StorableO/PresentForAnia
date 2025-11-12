const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const path = require('path')

const buildPath = path.join(__dirname, '..', 'Front', 'dist')

app.use(express.static(buildPath))

app.use(express.json())

app.get('/', (req,res)=>{
    res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(PORT, ()=>{
    console.log(`serveris running on port: ${PORT}`)
})

module.express = app;