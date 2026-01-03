class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(arr) {
		this.arr = Array.from(new Set(arr)).sort((a, b) => a - b); // Takes the array and converts it into a Set then converts it back to an Array and sorts it in ascending order
		this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
	}

	// The below function build a Balanced BST from the array, the tree is build recursively
	buildTree(treeArr, start, end) {
		// console.log(treeArr);
		if (start > end) return null;

		let mid = start + Math.floor((end - start) / 2);
		let rootNode = new Node(treeArr[mid]);

		rootNode.left = this.buildTree(treeArr, start, mid - 1);
		rootNode.right = this.buildTree(treeArr, mid + 1, end);

		return rootNode;
	}

	// The below function/code was taken from the BST project page on https://www.theodinproject.com
	prettyPrint(node, prefix = "", isLeft = true) {
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
			this.prettyPrint(
				node.left,
				`${prefix}${isLeft ? "    " : "│   "}`,
				true
			);
		}
	}

	// This function adds the provided value to the tree
	insert(value, flag = 0, rootNode = this.root) {
		if (flag == 0) {
			if (this.find(value)) {
				console.log(
					`The number ${value}, is already present in the tree, unable to perform the INSERT action!`
				);
				return;
			}
		}
		if (rootNode === null) return new Node(value);

		if (value < rootNode.data)
			rootNode.left = this.insert(value, 1, rootNode.left);
		else rootNode.right = this.insert(value, 1, rootNode.right);

		return rootNode;
	}

	// Function to delete items from the tree
	deleteItem(value, flag = 0, rootNode = this.root) {
		// getSuccessor helps find the in-order successor for the node that we are removing, if both it's left and right nodes are occupied
		function getSuccessor(curr) {
			curr = curr.right;
			while (curr.left !== null) curr = curr.left;
			return curr;
		}
		// The below check is for identifying if the value is present in the tree
		if (flag == 0) {
			if (!this.find(value)) {
				console.log(
					`The number ${value}, is not present in the tree. Unable to perform the DELETE action!`
				);
				return;
			}
		}
		if (rootNode === null) return rootNode;

		if (rootNode.data > value)
			rootNode.left = this.deleteItem(value, 1, rootNode.left);
		else if (rootNode.data < value)
			rootNode.right = this.deleteItem(value, 1, rootNode.right);
		else {
			if (rootNode.left === null) return rootNode.right;
			if (rootNode.right === null) return rootNode.left;

			const successor = getSuccessor(rootNode);
			rootNode.data = successor.data;
			rootNode.right = this.deleteItem(successor.data, 1, rootNode.right);
		}
		return rootNode;
	}

	// This function checks for the provided value within the tree
	find(value, rootNode = this.root) {
		let returnValue;
		if (rootNode === null) return 0;
		else if (value == rootNode.data) return rootNode;
		else if (value < rootNode.data)
			returnValue = this.find(value, rootNode.left);
		else returnValue = this.find(value, rootNode.right);
		return returnValue;
	}

	levelOrderForEach(callback) {
		if (callback === null || callback === undefined) {
			throw new Error("The callback function is required!");
		}

		let rootNode = this.root;
		let queue = [];

		if (rootNode === null) {
			console.log("The array is empty! Unable to perform this action.");
			return;
		} else queue.push(rootNode);

		while (queue.length) {
			try {
				callback(queue[0]);
				if (queue[0].left !== null) queue.push(queue[0].left);
				if (queue[0].right !== null) queue.push(queue[0].right);
				queue.shift();
			} catch (error) {
				console.error(error);
			}
		}
	}
	inOrderForEach(callback) {
		if (callback === null || callback === undefined) {
			throw new Error("The callback function is required!!!");
		}
	}
	preOrderForEach(callback, rootNode = this.root) {
		if (callback === null || callback === undefined) {
			throw new Error("The callback function is required!!!");
		}
		if (rootNode === null) return;
		try {
			callback(rootNode);
		} catch (error) {
			console.error(error);
		}
		this.preOrderForEach(callback, rootNode.left);
		this.preOrderForEach(callback, rootNode.right);
	}

	postOrderForEach(callback) {
		if (callback === null || callback === undefined) {
			throw new Error("The callback function is required!!!");
		}
	}
}

const balancedBST = new Tree([1, 2, 4, 5, 11, 0, 0, 12]);
balancedBST.prettyPrint(balancedBST.root);
balancedBST.insert(2.5);
balancedBST.insert(2.3);
balancedBST.insert(7);
balancedBST.insert(11.5);
balancedBST.prettyPrint(balancedBST.root);
balancedBST.deleteItem(2);
balancedBST.prettyPrint(balancedBST.root);
balancedBST.deleteItem(11);
balancedBST.deleteItem(4);
balancedBST.preOrderForEach((a) => (a.data *= 3));
balancedBST.prettyPrint(balancedBST.root);
