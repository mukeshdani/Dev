package prototype;

public class ProtoMain {

	public static void main(String[] args) {
		BookShop bs = new BookShop();
		bs.shopname = "Aman book depot";
		bs.loadData();
		BookShop bs2 = (BookShop) bs.anotherclone();
		BookShop bs1 = (BookShop) bs.clone();
		bs.books.remove(2);

		System.out.println(bs);

		// shallow copy
		System.out.println(bs1);
		bs1.shopname = "A1";
		System.out.println(bs1);

		// deep copy
		// BookShop bs2 = (BookShop) bs.anotherclone();
		bs2.shopname = "A2";
		System.out.println(bs2);

	}

}
