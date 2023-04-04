const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const BDserver = require('./db/mssql.js')

const PORT = 8080;

let app = express();
let route = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/api', route);

route.get('/', async (req, res, next) => {
    res.render('index.ejs', {})
})

route.get('/:id', async (req, res, next) => {
    try {
        let orderId = req.params.id;
        const orders = await BDserver.getOrderById(orderId);
        if (orderId.length > 0 && !isNaN(orderId)){
            res.json(orders)
        } else {
            res.send({error: "La orden realizada no existe"})
        } 
    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, () =>{console.log(`Server listening on http://localhost:${PORT}`)});
