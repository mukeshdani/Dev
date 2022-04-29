package solid;
//single responsibility principle

/*
 * A class should have one and only one reason to change,
 * meaning that a class should have only one job.
 * 
 */
public class Book {

	private String bookname;
	private String author;
	private String text;

	// duties related to book property
	public boolean findbook(String bookname) {
		return this.bookname.contains(bookname);
	}

	public boolean findauthor(String authname) {
		return author.contains(authname);
	}

	// printing it on console
	/*
	 * void printtexttoConsole(String text) {
	 * 
	 * }
	 */

}

class Printer {
	// methods for printing text to console
	void printtexttoConsole(String text) {

	}
}