package abstractfactory;

public class MobileFactory {

	public Mobile getInstance(String arg) {
		if (arg.equals("htc")) {
			return new HTC();
		} else {
			return new Apple();
		}
	}

}
