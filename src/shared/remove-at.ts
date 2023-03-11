/**
 * Remove and item from an array at a given index
 * 
 * @param array - source array
 * @param startIndex - starting index to remove
 * @param [endIndex] - optional ending index to remove
 * @returns new array without the item at the given index;
 *          if the index is invalid, the original array is returned
 */
function remove<T>(array: T[], startIndex: number, endIndex?: number): T[] {
  const _endIndex: number = endIndex ?? startIndex
  if (_endIndex < startIndex) throw new Error('Start index must be less than or equal to end index')
  if (startIndex < 0 || _endIndex > array.length) return array

  return [
    ...array.slice(0, startIndex),
    ...array.slice(_endIndex + 1, array.length)
  ]
}

export { remove }
