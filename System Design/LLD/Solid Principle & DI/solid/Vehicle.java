package solid;

// listov substitution
// each of derived class's object should be able to replace the base 
// class's object.

/*
 * here, we can create separate base classes 
 * Vehicle -> vehiclewithengine and vehiclewithoutengine
 */
public class Vehicle {
	public void startEngine() {

	}
}

class Car extends Vehicle {

	public void startEngine() {

	}

}

class Bicycle extends Vehicle {

	/*
	 * public void startEngine() { throw new
	 * EngineNotFoundException("Engine Missing") }
	 */

}