import { toyService } from '../../services/toy.service.js'
import { showSuccessMsg } from '../../services/event-bus.service.js'
import {
  ADD_TOY,
  TOY_UNDO,
  REMOVE_TOY,
  SET_TOYS,
  SET_FILTER_BY,
  SET_IS_LOADING,
  UPDATE_TOY,
  SET_LABELS,
} from '../reducers/toy.reducer.js'
import { store } from '../store.js'

// work with async,try,catch,finally

export async function loadToys() {
  const filterBy = store.getState().toyModule.filterBy
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })

  try {
    const toys = await toyService.query(filterBy)
    // console.log(toys)
    store.dispatch({ type: SET_TOYS, toys })

  } catch (err) {
    console.log('toy action -> Cannot load toys', err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }

  // return toyService.query(filterBy)
  //     .then(toys => {
  //         store.dispatch({ type: SET_TOYS, toys })
  //     })
  //     .catch(err => {
  //         console.log('toy action -> Cannot load toys', err)
  //         throw err
  //     })
  //     .finally(() => {
  //         store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  //     })
}

export async function removeToy(toyId) {
  try {
    const toyIdToRemove = await toyService.remove(toyId)
     store.dispatch({ type: REMOVE_TOY, toyIdToRemove })
  } catch (err) {
    console.log('toy action -> Cannot remove toy', err)
      throw err
  }
  

}

// export function removeToyOptimistic(toyId) {
//   store.dispatch({ type: REMOVE_TOY, toyId })
//   return toyService
//     .remove(toyId)
//     .then(() => {
//       showSuccessMsg('Removed Toy!')
//     })
//     .catch((err) => {
//       store.dispatch({ type: TOY_UNDO })
//       console.log('toy action -> Cannot remove toy', err)
//       throw err
//     })
// }

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  try {
     const savedToy = await toyService.save(toy)
      store.dispatch({ type, toy: savedToy })
      return savedToy
  } catch (err) {
     console.log('toy action -> Cannot save toy', err)
      throw err
  }
}

export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setLabels(labels) {
  store.dispatch({ type: SET_LABELS, labels })
}
