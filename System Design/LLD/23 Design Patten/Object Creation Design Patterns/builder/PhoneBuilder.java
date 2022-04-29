package builder;

public class PhoneBuilder {
	private String os;
	private int ram;
	private int battery;
	private int price;
	private String processor;

	public PhoneBuilder setOS(String os) {
		this.os = os;
		return this;
	}

	public PhoneBuilder setbattery(int battery) {
		this.battery = battery;
		return this;
	}

	public PhoneBuilder setram(int ram) {
		this.ram = ram;
		return this;
	}

	public PhoneBuilder setprocessor(String processor) {
		this.processor = processor;
		return this;
	}

	public PhoneBuilder setprice(int price) {
		this.price = price;
		return this;
	}

	public Phone getPhone() {
		return new Phone(os, ram, battery, price, processor);
	}

}
