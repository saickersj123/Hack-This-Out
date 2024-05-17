const express = require('express')
const cors = require ('cors')
const InstanceController = require('./Controllers/InstanceController')
const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.get('/',(req,res) => {
    res.send('Express Test\n')
})

app.post('/startvm', InstanceController.startInstance);
app.post('/stopvm', InstanceController.stopInstance);

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})