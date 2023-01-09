//LinkedList



import java.io.*;
import java.util.*;

// No probelm in this code
class Main {
  public static void main(String[] args) throws NumberFormatException, IOException {
    MyLinkedList list = new MyLinkedList();
    list.addLast(10);
    list.addLast(20);
    list.addLast(30);
    list.addLast(40);

    for(int val: list){
      System.out.print(val + " -> ");
    }
    
    System.out.println(".");
    
    // the above code is syntatical sugar for the following code
    Iterator<Integer> itr = list.iterator();
    while(itr.hasNext() == true){
        int val = itr.next();
        System.out.print(val + " -> ");    
    }
    
    System.out.println(".");
  }

  static class MyLinkedList implements Iterable<Integer> {
    static class Node {
      int data;
      Node next;
    }

    Node head;
    Node tail;
    int size;

    void addLast(int data){
      Node node = new Node();
      node.data = data;
      node.next = null;

      if(size == 0){
        head = tail = node;
      } else {
        tail.next = node;
        tail = node;
      }

      size++;
    }

    int size(){
      return size;
    }
    
    public Iterator<Integer> iterator(){
        return new LinkedListIterator(head);
    }
    
    static class LinkedListIterator implements Iterator<Integer> {
        Node temp;
        LinkedListIterator(Node temp){
            this.temp = temp;
        }
        
        public boolean hasNext(){
            if(temp == null){
                return false;
            } else {
                return true;
            }
        }
        
        public Integer next(){
            int rv = temp.data;
            
            temp = temp.next;
            
            return rv;
        }
    } 
  }
}