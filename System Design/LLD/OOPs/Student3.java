package OOPs;


    public class Student3 {
        public static class Student {
            int age;
            String name;

            void announceYourself(){
                System.out.println(this.name + "[" + this.age + "]");
            }
        }

        public static void swap(Student s1, Student s2){
            s1 = new Student();
            s2 = new Student();
            
            int tage = s1.age;
            s1.age = s2.age;
            s2.age = tage;

            String tname = s1.name;
            s1.name = s2.name;
            s2.name = tname;
        }

        public static void main(String[] args){
            Student s1;

            s1 = new Student();
            s1.age = 10;
            s1.name = "A";

            Student s2 = new Student();
            s2.age = 20;
            s2.name = "B";


            s1.announceYourself();
            s2.announceYourself();
            swap(s1, s2);
            s1.announceYourself();
            s2.announceYourself();

            // Student s3 = s2;
            // s3.age = 30;
            // s3.name = "C";
            // s3.announceYourself();

            // s2.announceYourself();
        }
    }