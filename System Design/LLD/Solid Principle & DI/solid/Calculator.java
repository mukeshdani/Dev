package solid;
// open extension, close modification

// you should be able to extend a classes behaviour, without modifying it

/*
public class Calculator {
	
	public double calculate(double a, double b, String optype){
								
		switch(optype) {
		case "+": 
			return a+b;
		
		case "-": return a-b;
		
		case "/": return a/b;
		
		default: return 0;
		}
	}
}
*/

public interface Calculator {
	public double Calculate(double a, double b);
}

class Add implements Calculator {

	@Override
	public double Calculate(double a, double b) {
		// TODO Auto-generated method stub
		return a + b;
	}

}

class Division implements Calculator {

	@Override
	public double Calculate(double a, double b) {
		// TODO Auto-generated method stub
		return a / b;
	}

}
