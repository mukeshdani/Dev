package abstractfactory;

import java.util.Scanner;

public class FactoryMain {

	public static void main(String[] args) {

		Scanner scn = new Scanner(System.in);
		if (scn.next().equals("OS")) {
			OSFactory osf = new OSFactory();
			OS os = osf.getInstance("Anmd csdd");
			os.show();
		} else {
			MobileFactory mobile_f = new MobileFactory();
			Mobile m = mobile_f.getInstance("Anmd csdd");
			m.specs();
		}

	}

}
