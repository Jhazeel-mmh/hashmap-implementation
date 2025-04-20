class Node {
    constructor() {
      this.data = null;
      this.next = null;
    }
  }
  /*Build the following functions in your linked list class / factory:
  
      append(value) adds a new node containing value to the end of the list
      prepend(value) adds a new node containing value to the start of the list
      size returns the total number of nodes in the list
      head returns the first node in the list
      tail returns the last node in the list
      at(index) returns the node at the given index
      pop removes the last element from the list
      contains(value) returns true if the passed in value is in the list and otherwise returns false.
      find(value) returns the index of the node containing value, or null if not found.
      toString represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
  
  Extra credit
  
      insertAt(value, index) that inserts a new node with the provided value at the given index.
      removeAt(index) that removes the node at the given index.
  
  Extra Credit Tip: When you insert or remove a node, consider how it will affect the existing nodes. Some of the nodes will need their nextNode link updated. */
  class LinkedList {
    append(value) {
      if (this.list) {
        const newNode = new Node();
        newNode.data = value;
        let tmpNode = this.list;
  
        while (true) {
          if (tmpNode.next === null) {
            tmpNode.next = newNode;
            return;
          }
  
          tmpNode = tmpNode.next;
        }
      }
      const node = new Node();
      node.data = value;
      this.list = node;
    }
  
    prepend(value) {
      const newNode = new Node();
      newNode.data = value;
  
      if (!this.list) {
        this.list = newNode;
        return;
      }
      newNode.next = this.list;
      this.list = newNode;
    }
  
    size() {
      let count = 0;
      let tmpNode = this.list;
  
      while (true) {
        if (tmpNode.next === null && tmpNode.data) {
          count++;
          break;
        }
  
        count++;
        tmpNode = tmpNode.next;
      }
      return count;
    }
  
    head() {
      return this.list;
    }
  
    tail() {
      let tmpNode = this.list;
  
      while (true) {
        if (tmpNode.next === null) {
          return tmpNode;
        }
  
        tmpNode = tmpNode.next;
      }
    }
  
    at(index) {
      let tmpNode = this.list;
  
      if (index === 0) {
        return this.head();
      }
  
      for (let i = 0; i < index; i++) {
        tmpNode = tmpNode.next;
      }
      return tmpNode;
    }
  
    pop() {
      let tmpNode = this.list;
  
      while (true) {
        if (tmpNode.next.next === null) {
          tmpNode.next = null;
          return;
        }
  
        tmpNode = tmpNode.next;
      }
    }
  
    contains(value) {
      let tmpNode = this.list;
  
      while (true) {
        if (tmpNode.data == value) {
          return true;
        }
  
        if (tmpNode.next === null) {
          return false;
        }
  
        tmpNode = tmpNode.next;
      }
    }
  
    find(value) {
      let tmpNode = this.list;
      let indexOutput = 0;
      while (true) {
        if (tmpNode.data == value) {
          return indexOutput;
        }
  
        if (tmpNode.next === null) return null;
  
        indexOutput++;
        tmpNode = tmpNode.next;
      }
    }
  
    toString() {
      let tmpNode = this.list;
      let str = "";
  
      while (true) {
        if (tmpNode.data) {
          str += `( ${tmpNode.data} )`;
        }
  
        if (tmpNode.next === null) {
          str += " -> null";
          return str;
        }
  
        str += " -> ";
        tmpNode = tmpNode.next;
      }
    }
  
    insertAt(value, index) {
      const node = this.at(index);
      let tmpPointer = node.next;
      const newNode = new Node();
      newNode.data = value;
      newNode.next = tmpPointer;
      node.next = newNode;
    }
  
    removeAt(index) {
      if (index === 0) {
        let tmpPointer = this.head();
        tmpPointer = tmpPointer.next;
        this.list = tmpPointer;
        return;
      }
  
      const node = this.at(index - 1);
      let tmpPointer = node.next.next;
      node.next = tmpPointer;
    }
  }
  
  export { LinkedList };