class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(data) {
    return this.searchNode(this.root, data);
  }

  searchNode(node, data) {
    if (!node) {
      return false;
    }

    if (node.data === data) {
      return true;
    } else if (data < node.data) {
      return this.searchNode(node.left, data);
    } else {
      return this.searchNode(node.right, data);
    }
  }
}

export class TreeManager {
  constructor() {
    this.tree = new BinaryTree();
  }

  setData(data) {
    this.tree.insert(data);
  }

  search(data) {
    return this.tree.search(data);
  }
}

// Example usage:
const treeManager = new TreeManager();

treeManager.setData(10);
treeManager.setData(5);
treeManager.setData(15);

console.log(treeManager.search(5)); // Output: true
console.log(treeManager.search(20)); // Output: false
