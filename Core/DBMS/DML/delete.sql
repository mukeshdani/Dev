drop table if exists student;
drop table if exists course cascade ;

create table course (s_course_id numeric primary key ,
 s_course_name varchar(20)
);


insert into course values(1 , 'DBMS');
insert into course values(2 , 'DBMS');
insert into course values(3 , 'DBMS');
insert into course values(4 , 'DBMS');
insert into course (s_course_id , s_course_name) values (5, 'oops');
insert into course (s_course_id , s_course_name) values (6, 'oops');


delete from course where s_course_id %2=0;

select * from course ;



/* --------------------- */
create database pep

drop table if exists student;
drop table if exists course cascade ;

create table course (s_course_id numeric primary key ,
 s_course_name varchar(20)
);
create table student (sid numeric references course(s_course_id ) on delete cascade ,
 sname varchar(20)
);


insert into course values(1 , 'DBMS');
insert into course values(2 , 'DBMS');
insert into course values(3 , 'DBMS');
insert into course values(4 , 'DBMS');


insert into student  values(1 , 'DBMS');
insert into student  values(2 , 'DBMS');
insert into student  values(3 , 'DBMS');
insert into student  values(4 , 'DBMS');

delete from course where s_course_id %2=0;

select * from course ;


/* ------------------------- On delete set null ------------------ */

create database pep

drop table if exists student;
drop table if exists course cascade ;

create table course (s_course_id numeric primary key ,
 s_course_name varchar(20)
);
create table student (sid numeric references course(s_course_id ) on delete set null ,
 sname varchar(20)
);


insert into course values(1 , 'DBMS');
insert into course values(2 , 'DBMS');
insert into course values(3 , 'DBMS');
insert into course values(4 , 'DBMS');


insert into student  values(1 , 'DBMS');
insert into student  values(2 , 'DBMS');
insert into student  values(3 , 'DBMS');
insert into student  values(4 , 'DBMS');

delete from course where s_course_id %2=0;

select * from course ;
select * from student ;


/* -------------------Set Default ---------------- */