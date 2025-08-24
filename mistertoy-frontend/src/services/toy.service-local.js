import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getFilterFromSearchParams,
  getImportanceStats,
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
  var sortDir = 1
  return storageService.query(TOY_KEY).then((toys) => {
    if (filterBy.name) {
      const regExp = new RegExp(filterBy.name, 'i')
      toys = toys.filter((toy) => regExp.test(toy.name))
    }

    // if (filterBy.importance) {
    //   toys = toys.filter((toy) => toy.importance >= filterBy.importance)
    // }

    if (filterBy.inStock === 'true') {
      toys = toys.filter((toy) => toy.inStock === true)
    }

    if (filterBy.inStock === 'false') {
      toys = toys.filter((toy) => toy.inStock === false)
    }

    // sort

    if (filterBy.sortDir === 'Desc') {
      sortDir = -1
    }

    if (filterBy.sortBy === 'name') {
      toys = toys.sort((a, b) => a.name.localeCompare(b.name) * sortDir)
    }

    if (filterBy.sortBy === 'price') {
      toys = toys.sort((a, b) => (a.price - b.price) * sortDir)
    }

    if (filterBy.sortBy === 'createdAt') {
      toys = toys.sort((a, b) => (a.createdAt - b.createdAt) * sortDir)
    }

    console.log(sortDir)

    return toys
  })
}

function get(toyId) {
  return storageService.get(TOY_KEY, toyId).then((toy) => {
    toy = _setNextPrevToyId(toy)
    return toy
  })
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    // TOY - updatable fields
    toy.updatedAt = Date.now()
    return storageService.put(TOY_KEY, toy)
  } else {
    toy.createdAt = toy.updatedAt = Date.now()

    return storageService.post(TOY_KEY, toy)
  }
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

function getImportanceStats() {
  return storageService.query(TOY_KEY).then((toys) => {
    const toyCountByImportanceMap = _getToyCountByImportanceMap(toys)
    const data = Object.keys(toyCountByImportanceMap).map((speedName) => ({
      title: speedName,
      value: toyCountByImportanceMap[speedName],
    }))
    return data
  })
}

function _createToys() {
  let toys = utilService.loadFromStorage(TOY_KEY)
  if (!toys || !toys.length) {
    toys = []
    const toysNames = [
      'Doll',
      'Toy Car',
      'Action Figure',
      'Lego',
      'Puzzle',
      'Teddy Bear',
      'Yo-Yo',
      'Kite',
      'Rubber Duck',
      'Train Set',
    ]
    var labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    for (let i = 0; i < 10; i++) {
      var toy = _createToy()
      toy.name = toysNames[utilService.getRandomIntInclusive(0, toysNames.length - 1)]
      var emptyArr = []
      for (let j = 0; j < 3; j++) {
        if (emptyArr.includes(labels[utilService.getRandomIntInclusive(0, labels.length - 1)])) {
          continue
        }
        emptyArr.push(labels[utilService.getRandomIntInclusive(0, labels.length - 1)])
      }
      toy.labels = emptyArr
      toys.push(toy)
    }
    utilService.saveToStorage(TOY_KEY, toys)
  }
}

function getEmptyToy(name = '', imgUrl = '', price = 100, inStock = true) {
  return { name, imgUrl, price, inStock }
}

function getDefaultFilter() {
  return { txt: '', importance: 0 }
}

function _createToy(name, imgUrl, price, inStock) {
  const toy = getEmptyToy(name, imgUrl, price, inStock)
  toy._id = utilService.makeId()
  toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
  return toy
}

function _setNextPrevToyId(toy) {
  return storageService.query(TOY_KEY).then((toys) => {
    const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
    const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
    const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
    toy.nextToyId = nextToy._id
    toy.prevToyId = prevToy._id
    return toy
  })
}

function _getToyCountByImportanceMap(toys) {
  const toyCountByImportanceMap = toys.reduce(
    (map, toy) => {
      if (toy.importance < 3) map.low++
      else if (toy.importance < 7) map.normal++
      else map.urgent++
      return map
    },
    { low: 0, normal: 0, urgent: 0 }
  )
  return toyCountByImportanceMap
}

// Data Model:
// const toy = {
//     _id: "gZ6Nvy",
//     txt: "Master Redux",
//     importance: 9,
//     isDone: false,
//     createdAt: 1711472269690,
//     updatedAt: 1711472269690
// }
