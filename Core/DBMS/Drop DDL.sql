create database pep

drop table if exists student;
drop table if exists course cascade ;

create table course (s_course_id numeric primary key ,
 s_course_name varchar(20)
);

create table student(sid numeric references course(s_course_id ), 
sname varchar(30) 
);


select * from information_schema.referential_constraints where constraint_schema = 'public';




/*  -------------------- Truncate ----------------- */
create database pep

drop table if exists student;
drop table if exists course cascade ;

create table course (s_course_id numeric primary key ,
 s_course_name varchar(20)
);

create table student(sid numeric references course(s_course_id ), 
sname varchar(30) 
);


select * from information_schema.referential_constraints where constraint_schema = 'public';


insert into course values(1 , 'DBMS');
insert into course values(2 , 'DBMS');
insert into course values(3 , 'DBMS');
insert into course values(4 , 'DBMS');
truncate table course ;

select * from course ;