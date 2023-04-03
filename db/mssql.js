const connection = require('../config/connection.js');
const sql = require('mssql');



async function getOrderById (OrderID) {
    try {
        let getConnection = await sql.connect(connection);
        let getList = await getConnection.request()
        .input('OrderID', sql.Int, OrderID)
        .query('select c.CompanyName , c.Address from Orders o inner join  Customers c on c.CustomerID = o.CustomerID where o.OrderID = @OrderID')
        return getList.recordset
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getOrderById : getOrderById
}