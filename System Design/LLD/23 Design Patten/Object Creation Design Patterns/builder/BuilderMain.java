package builder;

public class BuilderMain {

	public static void main(String[] args) {
		// Phone p = new Phone("abc", 8, 3000, 40000, "xyz");

		PhoneBuilder p = new PhoneBuilder();
		p.setOS("Android");
		p.setprice(20000);
		Phone ph = p.getPhone();

		System.out.println(ph);
	}

}
