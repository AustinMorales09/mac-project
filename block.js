const hexToBinary = require('hex-to-binary')
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty
  }

// factory method creates instance of the class
  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({lastBlock, data}){
    const lastHash = lastBlock.hash;
    let hash, timestamp;
    let { difficulty } = lastBlock;
    let nonce = 0;


do{
  nonce++;
  timestamp = Date.now();
  difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp});
  hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
} while(hexToBinary(hash).substring(0,difficulty) !== '0'.repeat(difficulty))


    return new this({ timestamp, lastHash, data, difficulty, nonce, hash });
  } 
  static adjustDifficulty({originalBlock, timestamp}){
    const { difficulty } = originalBlock;

      if(difficulty < 1)  return 1;

    // if the difference is greater than the MINE_RATE it means the block was mined too slow, lower the difficulty
    if ((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}

module.exports = Block;