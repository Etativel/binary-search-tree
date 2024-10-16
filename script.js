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

  find(value, root = this.root) {
    if (root === null || root.data === value) {
      return root;
    }
    if (value < root.data) {
      return this.find(value, root.left);
    }
    return this.find(value, root.right);
  }

  levelOrder(callback) {
    if (!callback) throw new Error("A callback is required.");
    const queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("A callback is required");
    if (node !== null) {
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  }
  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("A callback is required");
    if (node !== null) {
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  }
  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("A callback is required");
    if (node !== null) {
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  }
  depth(node, root = this.root, depth = 0) {
    if (root === null) return -1;
    if (node.data === root.data) return depth;

    if (node.data < root.data) {
      return this.depth(node, root.left, depth + 1);
    }
    return this.depth(node, root.right, depth + 1);
  }

  height(node = this.root) {
    if (node === null) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }
  isBalanced(node = this.root) {
    if (node === null) return true;
    const heightDiff = Math.abs(
      this.height(node.left) - this.height(node.right)
    );
    if (heightDiff > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  rebalance() {
    const nodes = [];
    this.inOrder((node) => nodes.push(node.data)); // Get sorted values
    this.root = this.buildTree(nodes); // Build balanced tree
  }
}

const tree = new Tree([1, 2, 4, 45]);
//

tree.insert(234);
tree.insert(237);
tree.insert(236);
tree.insert(232);
tree.insert(233);
// tree.insert(44);
tree.prettyPrint();
tree.deleteItem(234);
tree.prettyPrint();

// let find = tree.find(2);
console.log(find);

console.log("This is levelOrder");
tree.levelOrder((node) => console.log(node));
console.log("This is inOrder");
tree.inOrder((node) => console.log(node));
console.log("This is preOrder");
tree.preOrder((node) => console.log(node));
console.log("This is postOrder");
tree.postOrder((node) => console.log(node));

const node = tree.find(1);
const depthOfNode = tree.depth(node);
console.log(depthOfNode);

console.log(tree.height());
console.log(tree.isBalanced());
tree.rebalance();

console.log("Tree after rebalancing:");
tree.prettyPrint();
