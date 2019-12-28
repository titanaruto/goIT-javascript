
declare @tbl table (ID int IDENTITY(1,1),TableSCHEMA varchar(20), TABLEName varchar(50))
Insert @tbl
SELECT [TABLE_SCHEMA], [TABLE_NAME]
FROM [INFORMATION_SCHEMA].[TABLES]
WHERE [TABLE_TYPE] = 'BASE TABLE'
declare @countTable int;
declare @i int;
declare @name varchar(256);
set @i = 1;
set @countTable = (SELECT  count(*) FROM @tbl);

WHILE @i <= @countTable
BEGIN
set @name = (SELECT TABLEName FROM @tbl WHERE @i = @tbl.ID);
print @name;
/*DBCC DBREINDEX(@nam,' ');*/
END