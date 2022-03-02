create database pep

create table gradeT (
gname char,
gid numeric,
);


create table student (
sid numeric ,
sname varchar(30),
grade char,
);

insert into gradeT values('A',1),('B',2),('C' , 3);
insert into student values (1,'abc' , 'A'),(2 , 'bfc' , 'B'),(3,'cdf' , 'C');

drop table if exists gradeT ;
drop table if exists student ;