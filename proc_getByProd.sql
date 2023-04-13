CREATE PROCEDURE proc_getByProd
@OrderID INT
AS
BEGIN
select p.ProductName ,
p.UnitPrice ,
p.QuantityPerUnit
from [Order Details] o
inner join Products p
on p.ProductID = o.ProductID
where o.OrderID = @OrderID
END;