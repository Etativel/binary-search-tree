class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    // sort the array first
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length === 0) return null;

    let mid = Math.floor(array.length / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  deleteItem(value, root = this.root) {
    if (root === null) return root;
    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      // the value is equal to the root data
      // Case 1: Node with no child
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Case 2: Node with two children
      root.data = this.findMinValue(root.right).data;
      // Find the smallest node in the right subtree (which is guaranteed to be larger than the node to be deleted but smaller than all other nodes in the right subtree).
      // Replace the node's data with this smallest node's data.
      // Delete the smallest node from the right subtree to avoid duplicates.
      root.right = this.deleteItem(root.data, root.right);
    }
    return root;
  }

  findMinValue(root) {
    let current = root;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  find(value) {}

  levelOrder(callback) {}

  inOrder() {}
  preOrder() {}
  postOrder() {}
  height() {}
  depth() {}
  isBalance() {}
  reBalance() {}
}

const tree = new Tree([1, 2, 4, 45]);
//

tree.insert(234);
tree.insert(237);
tree.insert(236);
tree.insert(232);
tree.insert(233);
tree.insert(44);
tree.prettyPrint();
tree.deleteItem(234);
tree.prettyPrint();
