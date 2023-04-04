const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const BDserver = require('./db/mssql.js')
const connection = require('./config/connection.js');
const sql = require('mssql');

const PORT = 8080;

let app = express();
let route = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.set('views', './views');
app.set('view engine', 'ejs');



app.get('/', async (req, res, next) => {
    res.render('index.ejs', {})
})

app.use('/api', route)


route.get('/', async (req, res, next) => {
    res.render('order.ejs', {})
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

route.get('/prods/:prod', async (req, res, next) => {
    let prodId = req.params.id;
    const results= await BDserver.getOrderByProd(prodId);
        if(results){
            res.render('prods.ejs', {results: results})
            /* res.render('prods.ejs', {results: results}) */
        } else {
            res.send({error: "no se puede acceder"})
        }
    })


app.listen(PORT, () =>{console.log(`Server listening on http://localhost:${PORT}`)});
