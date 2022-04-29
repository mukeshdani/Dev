package abstractfactory;

public class OSFactory {

	public OS getInstance(String arg) {
		if (arg.equals("And")) {
			return new Android();
		} else if (arg.equals("IOS")) {
			return new IOS();
		} else if (arg.equals("Win")) {
			return new Windows(10);
		} else {
			return new Windows();
		}
	}
}
