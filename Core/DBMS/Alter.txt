
// 01 == add
create table irctc (
 t_id numeric primary key ,
 t_name varchar(30),
 t_dep varchar(30),
 t_arrival varchar(30)
);
select * from irctc ;

alter table irctc add operator_name varchar(30);

//02== Drop 

create table irctc (
 t_id numeric primary key ,
 t_name varchar(30),
 t_dep varchar(30),
 t_arrival varchar(30)
);
select * from irctc ;

alter table irctc add operator_name varchar(30);


alter table irctc drop operator_name ;


-------------------------
create database pep                                              
                                                                 
create table irctc (                                             
 t_id numeric primary key ,                                      
 t_name varchar(30),                                             
 t_dep varchar(30),                                              
 t_arrival varchar(30)                                           
);                                                               
select * from irctc ;                                            
                                                                 
/* ADD*/                                                         
alter table irctc add operator_name varchar(30);                 
                                                                 
/* DROP */                                                       
alter table irctc drop operator_name ;                           
                                                                 
---create table----> adhar card u_id , u_name , u_address        
                                                                 
create table adhar_card (                                        
u_id numeric primary key ,                                       
u_name varchar ( 30 ),                                           
u_address varchar(30)                                            
);                                                               
                                                                 
select * from adhar_card ;                                       
alter table adhar_card add account_number numeric ;              
alter table adhar_card drop u_address;                           
alter table adhar_card add u_address varchar(30) ;               
                                                                 
  ///-------------------Rename -----------------------
  create table adhar_card (                                        
u_id numeric primary key ,                                       
u_name varchar ( 30 ),                                           
u_address varchar(30)                                            
);                                                               
                                                                 
select * from adhar_card ;                                       
alter table adhar_card add account_number numeric ;              
alter table adhar_card drop u_address;                           
alter table adhar_card add u_address varchar(30) ;     

  alter table adhar_card rename account_number to acc_num;    



  --------------------------Change Data Type  using alter table -----------------------                                
                                                                 
create database pep                                                    
                                                                       
create table irctc (                                                   
 t_id numeric primary key ,                                            
 t_name varchar(30),                                                   
 t_dep varchar(30),                                                    
 t_arrival varchar(30)                                                 
);                                                                     
select * from irctc ;                                                  
                                                                       
/* ADD*/                                                               
alter table irctc add operator_name varchar(30);                       
                                                                       
/* DROP */                                                             
alter table irctc drop operator_name ;                                 
                                                                       
---create table----> adhar card u_id , u_name , u_address              
                                                                       
create table adhar_card (                                              
u_id numeric primary key ,                                             
u_name varchar ( 30 ),                                                 
u_address varchar(30)                                                  
);                                                                     
                                                                       
select * from adhar_card ;                                             
alter table adhar_card add account_number numeric ;                    
alter table adhar_card drop u_address;                                 
alter table adhar_card add u_address varchar(30) ;                     
                                                                       
alter table adhar_card rename account_number to acc_num;               
select * from information_schema.tables where table_schema = 'company';
                                                                       
alter table adhar_card alter u_id type text;                           
                                                                       
     -----------------------------------------------------------------------------------------------------------------

     create database pep                                                    
                                                                       
create table irctc (                                                   
 t_id numeric primary key ,                                            
 t_name varchar(30),                                                   
 t_dep varchar(30),                                                    
 t_arrival varchar(30)                                                 
);                                                                     
select * from irctc ;                                                  
                                                                       
/* ADD*/                                                               
alter table irctc add operator_name varchar(30);                       
                                                                       
/* DROP */                                                             
alter table irctc drop operator_name ;                                 
                                                                       
---create table----> adhar card u_id , u_name , u_address              
                                                                       
create table adhar_card (                                              
u_id numeric primary key ,                                             
u_name varchar ( 30 ),                                                 
u_address varchar(30)                                                  
);                                                                     
                                                                       
select * from adhar_card ;                                             
alter table adhar_card add account_number numeric ;                    
alter table adhar_card drop u_address;                                 
alter table adhar_card add u_address varchar(30) ;                     
                                                                       
alter table adhar_card rename account_number to acc_num;               
select * from information_schema.tables where table_schema = 'company';
                                                                       
alter table adhar_card alter u_id type text;                           
insert into adhar_card(u_id)  values('abc123');                        
                                                                       
                                                                       
                                                                       


                                                     ------------------------------------

                                                     create database pep                                                
                                                                   
create table irctc (                                               
 t_id numeric primary key ,                                        
 t_name varchar(30),                                               
 t_dep varchar(30),                                                
 t_arrival varchar(30)                                             
);                                                                 
select * from irctc ;                                              
                                                                   
/* ADD*/                                                           
alter table irctc add operator_name varchar(30);                   
                                                                   
/* DROP */                                                         
alter table irctc drop operator_name ;                             
                                                                   
---create table----> adhar card u_id , u_name , u_address          
                                                                   
create table adhar_card (                                          
u_id numeric primary key ,                                         
u_name varchar ( 30 ),                                             
u_address varchar(30)                                              
);                                                                 
                                                                   
select * from adhar_card ;                                         
alter table adhar_card drop u_name ;                               
                                                                   
drop table if exists adhar_card  ;                                 
alter table adhar_card add u_name text;                            
 delete from adhar_card ;                                          
alter table adhar_card alter u_name set not null;                  
insert into adhar_card values( 3 ,'dd', 'cdf' );                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                   
                                                                                     
                                                                       
                                                                       
                                                                       
                                                                       
                                                                                                                                         
                                                                       
                                                                       
                                                                       
                                                                       
                                                                       
                                                                       
                                                                       


                                                                 
                                                                 
                                                                 
                                                                 
                                                                 
                                                                 
                                                                 
                                                                 
                                                                 
                                                                 