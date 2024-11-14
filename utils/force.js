/**
 * Force function used to calculate the force between two particles
 * @param {number} r 
 * @param {number} matrixValue 
 * @returns {number}
 */
function force(r, matrixValue) {
  if (r < beta){
    return r/beta - 1;
  } else if( beta < r && r < 1){
    return matrixValue * (1 - Math.abs(2 * r - 1 - beta)/ (1 - beta));
  } else {
    return 0;
  }
}

export { force };