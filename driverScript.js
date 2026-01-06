import { Tree } from "./script.js";

let array = [];
for (let i = 0; i < 100; i++) {
	array.push(Math.floor(Math.random() * 100));
}

function printTree(balancedBST) {
	let arrayLevel = [],
		arrayInOrder = [],
		arrayPostOrder = [],
		arrayPreOrder = [];
	balancedBST.levelOrderForEach((node) => arrayLevel.push(node.data));
	balancedBST.inOrderForEach((node) => arrayInOrder.push(node.data));
	balancedBST.postOrderForEach((node) => arrayPostOrder.push(node.data));
	balancedBST.preOrderForEach((node) => arrayPreOrder.push(node.data));
	console.log(`Level Order: ${arrayLevel}`);
	console.log(`In Order: ${arrayInOrder}`);
	console.log(`Post Order: ${arrayPostOrder}`);
	console.log(`Pre Order: ${arrayPreOrder}`);
}

const balancedBST = new Tree(array);
console.log(balancedBST.isBalanced());
printTree(balancedBST);
for (let i = 0; i < 250; i++) {
	let value = Math.floor(Math.random() * 250);
	if (!balancedBST.find(value)) balancedBST.insert(value);
}
console.log(balancedBST.isBalanced());
balancedBST.rebalance();
console.log(balancedBST.isBalanced());
printTree(balancedBST);
