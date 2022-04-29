package factory;

public class Windows implements OS {
	private int version;

	public Windows(int version) {
		this.version = version;
	}

	public void show() {
		System.out.println("Most Popular OS");
	}

}
