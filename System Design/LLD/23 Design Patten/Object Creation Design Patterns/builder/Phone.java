package builder;

public class Phone {

	private String os;
	private int ram;
	private int battery;
	private int price;
	private String processor;

	public Phone(String os, int ram, int battery, int price, String processor) {
		this.os = os;
		this.ram = ram;
		this.processor = processor;
		this.battery = battery;
		this.price = price;
	}

}
