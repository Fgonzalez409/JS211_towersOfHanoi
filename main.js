'use strict';

const assert = require('assert');
const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

//JS object with three arrays
let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?

const movePiece = (startStack, endStack) => {
  
  
  //if the move is legal then we can make a move, otherwise do nothing
  if(isLegal(startStack, endStack)){
    //remove a piece from startStack
    let ring = stacks[startStack].pop()
    
    //add ring to other stack
    stacks[endStack].push(ring)
  }
  else{
    console.log("Illegal Move!")
    console.log("")
  }
  
}
// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack,endStack) => {

  //this function validates if a move is legal
  //create varialbes to reference the last element in the start stack and in the end stack
  const startStackTop = stacks[startStack][stacks[startStack].length-1]
  const endStackTop = stacks[endStack][stacks[endStack].length-1]

  return startStackTop < endStackTop || stacks[endStack].length === 0
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  
  //if the length of the end stack reaches 4 the game should be won
  if((stacks['b'].length == 4) || (stacks['c'].length == 4)){
    return true
  }
  else {
    return false
  }

  
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
    movePiece(startStack, endStack)
    if(checkForWin()){
      console.log("You have won!!!")
    }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
