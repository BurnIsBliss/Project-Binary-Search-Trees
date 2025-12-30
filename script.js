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

	buildTree() {
		console.log(this.arr);
	}
}

treeTest = new Tree([1, 2, 4, 5, 11, 0, 0, 12, 13, 5]);
treeTest.buildTree();
