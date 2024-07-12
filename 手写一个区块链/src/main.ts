import { Block } from "./Block";
import { Blockchain } from "./Blockchain";

const myBlockChan = new Blockchain();
console.debug("mining block 1.....")
myBlockChan.addBlock(
     new Block(1, Date.now(), 'hello')
)

console.debug("mining block 2.....")
myBlockChan.addBlock(
     new Block(2, Date.now(), "world")
)
console.log("myBlockChan:", myBlockChan.isChainValid())