/* First Syntax */
create table course (s_course_id numeric ,
 s_course_name varchar(20)
);
insert into course values(1 , 'DBMS');
insert into course values(2 , 'DBMS');
insert into course values(3 , 'DBMS');
insert into course values(4 , 'DBMS');


/* Second Syntax */
create table course (s_course_id numeric ,
 s_course_name varchar(20)
);
insert into course (s_course_id , s_course_name) values (5, 'oops');
insert into course (s_course_id , s_course_name) values (6, 'oops');
