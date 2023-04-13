const connection = require("../config/connection.js");
const sql = require("mssql");

async function getOrderById(OrderID) {
  try {
    let getConnection = await sql.connect(connection);
    let getList = await getConnection
      .request()
      .input("OrderID", sql.Int, OrderID)
      .execute("proc_getById");
    return getList.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getOrderByProd(OrderID) {
    try {
        let getConnection = await sql.connect(connection);
        let getList = await getConnection
        .request()
        .input('OrderID', sql.Int, OrderID)
        .execute('proc_getByProd')
        return getList.recordset
    } catch (error) {
        console.log(error)
    }
} 

module.exports = {
  getOrderById: getOrderById,
  getOrderByProd: getOrderByProd
};
