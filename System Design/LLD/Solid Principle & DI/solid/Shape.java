package solid;

// interface segregation
// make fine grained interfaces which are specific to client demands
public interface Shape {

	public double calculatearea();

	public double calculatevolume();

}

/*
 * class Square implements Shape{
 * 
 * @Override public double calculatearea() { // TODO Auto-generated method stub
 * return 0; }
 * 
 * @Override public double calculatevolume() { // TODO Auto-generated method
 * stub return 0; }
 * 
 * }
 * 
 * class Cuboid implements Shape{
 * 
 * @Override public double calculatearea() { // TODO Auto-generated method stub
 * return 0; }
 * 
 * @Override public double calculatevolume() { // TODO Auto-generated method
 * stub return 0; }
 * 
 * }
 */

interface Shape_twoD {

	public double calculatearea();

}

interface Shape_3D {

	public double calculatevolume();

}

class Square implements Shape_twoD {

	@Override
	public double calculatearea() {
		// TODO Auto-generated method stub
		return 0;
	}

}

class Cuboid implements Shape_3D, Shape_twoD {

	@Override
	public double calculatearea() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public double calculatevolume() {
		// TODO Auto-generated method stub
		return 0;
	}

}