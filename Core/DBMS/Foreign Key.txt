create database pep

create table gradeT (
gname char,
gid numeric,
primary key (gname)
);
drop table if exists gradeT ;
drop table if exists student ;

create table student (
sid numeric ,
sname varchar(30),
grade char,
foreign key (grade) references gradeT(gname) on delete set null
);

insert into gradeT values('A',1),('B',2),('C' , 3);
insert into student values (1,'abc' , 'A'),(2 , 'bfc' , 'B'),(3,'cdf' , 'C');

select * from student ;
select * from gradeT ;

delete from gradeT where gid =2;

---------------------------------------------------

create database pep

create table gradeT (
gname char,
gid numeric,
primary key (gname)
);
drop table if exists gradeT ;
drop table if exists student ;

create table student (
sid numeric ,
sname varchar(30),
grade char,
foreign key (grade) references gradeT(gname) on delete cascade
);

insert into gradeT values('A',1),('B',2),('C' , 3);
insert into student values (1,'abc' , 'A'),(2 , 'bfc' , 'B'),(3,'cdf' , 'C');

select * from student ;
select * from gradeT ;

delete from gradeT where gid =2;





