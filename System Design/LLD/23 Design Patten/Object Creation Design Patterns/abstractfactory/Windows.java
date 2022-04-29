package abstractfactory;

public class Windows implements OS {
	private int version;

	public Windows(int version) {
		this.version = version;
	}

	public Windows() {

	}

	public void show() {
		System.out.println("Most Popular OS");
	}

}
