package factory;

public class FactoryMain {

	public static void main(String[] args) {

		OSFactory osf = new OSFactory();
		OS os = osf.getInstance("IOS");
		os.show();

	}

}
