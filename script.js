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
		this.root = null;
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
}

balancedBST = new Tree([1, 2, 4, 5, 11, 0, 0, 12, 13, 5, 9]);
balancedBST.root = balancedBST.buildTree(
	balancedBST.arr,
	0,
	balancedBST.arr.length - 1
);
balancedBST.prettyPrint(balancedBST.root);
