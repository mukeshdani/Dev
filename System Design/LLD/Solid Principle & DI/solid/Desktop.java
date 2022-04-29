
package solid;

// dependency inversion
// high level modules should not depend on low level details
// high level modules should depend on abstractions
/*
public class Desktop {
	private Monitor monitor;
	private QwertyKeyboard keyboard;
	
	public Desktop() {
		this.monitor = new Monitor();
		this.keyboard = new QwertyKeyboard();
	}
}

class Monitor{
	
}

class QwertyKeyboard{
	
}
*/

public class Desktop {
	private Monitor monitor;
	private Keyboard keyboard;

	// create a parameterised constructor
	// to remove the dependency of creation of objects

	// pass object of interface
	// we may even have object of gaming keyboard now
	public Desktop(Monitor monitor, Keyboard keyboard) {
		this.monitor = monitor;
		this.keyboard = keyboard;
	}
}

interface Keyboard {

}

class Monitor {

}

class QwertyKeyboard implements Keyboard {

}