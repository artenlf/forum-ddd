import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('Watched List', () => {
  it('should be able to create a watched list with a number of items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    expect(list.currentItems).toHaveLength(3)
  })

  it('should be able to add new items to the watched list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4])
  })

  it('should be able to remove items from the watched list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(1)

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([1])
  })

  it('should be able to add an item even if it was removed from the watched list previously', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(1)
    list.add(1)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  it('should be able to remove an item even if it was added to the watched list previously', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)
    list.remove(4)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  it('should be able to update the watched list items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.update([1, 3, 7])

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([2])
    expect(list.getNewItems()).toEqual([7])
  })
})
