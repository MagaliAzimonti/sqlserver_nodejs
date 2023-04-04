CREATE PROCEDURE proc_getById 
@OrderID INT
AS
BEGIN
select c.CompanyName , 
c.Address 
from Orders o 
inner join  Customers c 
on c.CustomerID = o.CustomerID 
where o.OrderID = @OrderID
END;
