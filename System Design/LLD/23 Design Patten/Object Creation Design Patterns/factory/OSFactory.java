package factory;

public class OSFactory {

	public OS getInstance(String arg) {
		if (arg.equals("Android")) {
			return new Android();
		} else if (arg.equals("IOS")) {
			return new IOS();
		} else {
			return new Windows(10);
		}
	}
}
