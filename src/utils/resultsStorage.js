// Utility functions for managing test results in localStorage

const STORAGE_KEY = 'typingTestResults'

export const saveResult = (result, modeId) => {
  try {
    const allResults = getResults()
    const newResult = {
      id: Date.now(),
      modeId,
      date: new Date().toISOString(),
      ...result
    }
    allResults.push(newResult)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allResults))
    return newResult
  } catch (error) {
    console.error('Error saving result:', error)
  }
}

export const getResults = () => {
  try {
    const results = localStorage.getItem(STORAGE_KEY)
    return results ? JSON.parse(results) : []
  } catch (error) {
    console.error('Error retrieving results:', error)
    return []
  }
}

export const getResultsByMode = (modeId) => {
  const allResults = getResults()
  return allResults.filter(r => r.modeId === modeId).reverse()
}

export const getAllResultsGroupedByMode = () => {
  const allResults = getResults()
  const grouped = {}

  allResults.forEach(result => {
    if (!grouped[result.modeId]) {
      grouped[result.modeId] = []
    }
    grouped[result.modeId].push(result)
  })

  // Reverse each group to show newest first
  Object.keys(grouped).forEach(modeId => {
    grouped[modeId].reverse()
  })

  return grouped
}

export const deleteResult = (resultId) => {
  try {
    const allResults = getResults()
    const filtered = allResults.filter(r => r.id !== resultId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting result:', error)
  }
}

export const clearAllResults = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing results:', error)
  }
}
