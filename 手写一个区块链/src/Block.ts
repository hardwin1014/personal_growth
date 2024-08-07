import crypto from 'crypto'

export class Block {
  index: number; // 区块索引
  timestamp: number; // 时间戳
  data: string; // 区块数据
  previousHash: string; // 前一个区块的哈希值
  hash: string; // 当前区块的哈希值
  nonce: number; // 随机数
  
  constructor(index: number, timestamp: number, data: string, previousHash: string = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0
  }

  // 计算区块哈希值
  calculateHash() {
    const hash = crypto.createHash("sha256");
    hash
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data)
      )
      .end();
    return hash.digest("hex");
  }
  
  // 挖掘新区块
  mineBlock(difficulty: number) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash(); // 计算新区块的hash
    }
    console.log("Block mined: " + this.hash);
  }
}
