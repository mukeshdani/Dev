package prototype;

import java.util.ArrayList;
import java.util.List;

public class BookShop implements Cloneable {

	String shopname;
	List<Book> books = new ArrayList<>();

	public void loadData() {
		for (int i = 0; i < 10; i++) {
			Book b = new Book();
			b.id = i;
			b.bname = "Book " + i;
			books.add(b);
		}
	}

	public String toString() {
		String str = this.shopname + " ";
		for (Book b : books) {
			str += b.bname + " " + b.id + " ";
		}
		return str;
	}

	public Object clone() {
		Object clone = null;

		try {
			clone = super.clone();

		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}

		return clone;
	}

	public BookShop anotherclone() {
		BookShop shop = new BookShop();
		for (Book b : books) {
			shop.books.add(b);
		}

		return shop;
	}

}
