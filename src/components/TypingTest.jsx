import React, { useState, useEffect, useRef, useContext } from 'react'
import { RotateCcw, Loader } from 'lucide-react'
import Results from './Results'
import { saveResult } from '../utils/resultsStorage'
import { ThemeContext } from '../context/ThemeContext'

const TypingTest = ({ mode = {} }) => {
  const { currentTheme } = useContext(ThemeContext)
  const { duration = 60, wordLimit = null, difficulty = 'normal' } = mode

  const normalWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not",
    "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from",
    "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would",
    "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which",
    "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know",
    "take", "people", "into", "year", "your", "good", "some", "could", "them", "see",
    "other", "than", "then", "now", "look", "only", "come", "its", "over", "think",
    "also", "back", "after", "use", "two", "how", "our", "work", "first", "well",
    "way", "even", "new", "want", "because", "any", "these", "give", "day", "most",
    "us", "is", "was", "are", "been", "being", "having", "doing", "saying", "making",
    "find", "tell", "ask", "call", "show", "seem", "help", "talk", "turn", "feel",
    "try", "leave", "put", "mean", "keep", "let", "begin", "here", "hear", "allow",
    "watch", "follow", "stop", "play", "run", "walk", "talk", "sing", "dance", "move"
  ]

  const hardWords = [
    "juxtaposition", "serendipitous", "philosophical", "introspection", "ubiquitous",
    "technological", "paradigm", "metamorphosed", "contemporary", "societal", "structure",
    "amelioration", "systematic", "inequity", "necessitate", "multifaceted", "institutional",
    "reformation", "esoteric", "epistemological", "framework", "challenge", "conventional",
    "ontological", "presumption", "cryptocurrency", "decentralized", "architecture",
    "precipitate", "paradigmatic", "shift", "financial", "infrastructure",
    "conceptualize", "elucidate", "obfuscate", "ephemeral", "perspicacious",
    "eloquent", "magnanimous", "serendipity", "exacerbate", "ameliorate",
    "perfunctory", "fastidious", "assiduous", "meticulous", "perspicacity",
    "acerbic", "cantankerous", "convivial", "ebullient", "mellifluous",
    "sagacious", "surreptitious", "tenacious", "truculent", "verbose",
    "vitriolic", "vivacious", "voracious", "nefarious", "bellicose",
    "duplicitous", "egregious", "fecund", "gregarious", "inchoate",
    "lugubrious", "momentous", "obsequious", "pellucid", "perspicuous",
    "precipitous", "profuse", "propitious", "quotidian", "quixotic"
  ]

  const hardModeQuotes = [
    "The juxtaposition of serendipitous occurrences often elicits profound philosophical introspection.",
    "Ubiquitous technological paradigms have fundamentally metamorphosed contemporary societal structures.",
    "The amelioration of systematic inequities necessitates multifaceted institutional reformation.",
    "Esoteric epistemological frameworks challenge conventional ontological presumptions.",
    "Cryptocurrency's decentralized architecture precipitates paradigmatic shifts in financial infrastructure."
  ]

  const [testActive, setTestActive] = useState(false)
  const [testFinished, setTestFinished] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [sampleText, setSampleText] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const timerRef = useRef(null)
  const inputRef = useRef(null)
  const wordCompletionTimesRef = useRef({})
  const testStartTimeRef = useRef(null)
  const textContainerRef = useRef(null)

  // Fetch random words or quote from API
  const fetchRandomQuote = async (append = false) => {
    try {
      if (!append) setLoading(true)
      let newText = ""

      if (wordLimit) {
        // For word-limit modes, pick random words from the word list
        const wordList = difficulty === 'hard' ? hardWords : normalWords
        const randomWords = []
        for (let i = 0; i < wordLimit; i++) {
          randomWords.push(wordList[Math.floor(Math.random() * wordList.length)])
        }
        newText = randomWords.join(" ")
      } else {
        // For time-based modes, fetch from API
        const response = await fetch('https://api.quotable.io/random', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        if (!response.ok) throw new Error(`API error: ${response.status}`)
        const data = await response.json()
        newText = data.content
      }

      setSampleText(prev => append ? prev + " " + newText : newText)
      if (!append) setLoading(false)
    } catch (error) {
      console.error('Error fetching quote:', error)
      // Use fallback quotes for time-based modes
      const fallbackQuotes = difficulty === 'hard' ? hardModeQuotes : [
        "The early morning sun cast long shadows across the quiet garden.",
        "Technology has transformed the way we communicate and work together.",
        "Reading is a great way to expand your knowledge and imagination.",
        "Music has the power to inspire and lift our spirits.",
        "Nature provides us with endless sources of beauty and wonder.",
        "Learning a new skill takes practice and dedication."
      ]

      let newText = ""

      if (wordLimit) {
        // For word-limit modes with error, still use random words
        const wordList = difficulty === 'hard' ? hardWords : normalWords
        const randomWords = []
        for (let i = 0; i < wordLimit; i++) {
          randomWords.push(wordList[Math.floor(Math.random() * wordList.length)])
        }
        newText = randomWords.join(" ")
      } else {
        // For time-based modes, use fallback quotes
        newText = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
      }

      setSampleText(prev => append ? prev + " " + newText : newText)
      if (!append) setLoading(false)
    }
  }

  // Load initial quote on mount or when mode changes
  useEffect(() => {
    const loadInitial = async () => {
      await fetchRandomQuote()
      // Pre-load more text for timed tests
      if (!wordLimit) {
        await fetchRandomQuote(true)
      }
    }
    setLastScrollIndex(0)
    loadInitial()
  }, [wordLimit, difficulty])

  // Auto-focus textarea on load
  useEffect(() => {
    if (inputRef.current && !testActive && !testFinished) {
      inputRef.current.focus()
    }
  }, [sampleText, testActive, testFinished])

  // Timer effect
  useEffect(() => {
    if (testActive && duration && timeElapsed < duration) {
      timerRef.current = setTimeout(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    } else if (duration && timeElapsed >= duration && testActive) {
      finishTest()
    }

    return () => clearTimeout(timerRef.current)
  }, [testActive, timeElapsed, duration])

  // Auto-load more text when approaching end (for timed tests)
  useEffect(() => {
    if (testActive && !wordLimit && userInput.length > sampleText.length - 200) {
      fetchRandomQuote(true)
    }
  }, [userInput, testActive, wordLimit, sampleText.length])

  const [lastScrollIndex, setLastScrollIndex] = useState(0)

  // Auto-scroll text container after completing each line
  useEffect(() => {
    if (textContainerRef.current && testActive) {
      const lineHeight = 28 // approximate line height in pixels
      const avgCharsPerLine = 80 // approximate characters per line

      // Calculate which line the cursor is on based on character count
      const currentLine = Math.floor(userInput.length / avgCharsPerLine)

      // Scroll down one line when cursor explicitly moves to a new line
      if (currentLine > lastScrollIndex) {
        textContainerRef.current.scrollTop += lineHeight
        setLastScrollIndex(currentLine)
      }
    }
  }, [userInput, testActive, lastScrollIndex])

  const startTest = async () => {
    await fetchRandomQuote()
    // Pre-load more text for timed tests
    if (!wordLimit) {
      await fetchRandomQuote(true)
    }
    setUserInput('')
    setTimeElapsed(0)
    setTestActive(true)
    setTestFinished(false)
    setResults(null)
    setLastScrollIndex(0)
  }

  const finishTest = () => {
    setTestActive(false)
    setTestFinished(true)
    calculateResults()
  }

  const calculateResults = () => {
    // Calculate accuracy (percentage of correct characters)
    const correctChars = (() => {
      let count = 0
      for (let i = 0; i < Math.min(userInput.length, sampleText.length); i++) {
        if (userInput[i] === sampleText[i]) {
          count++
        }
      }
      return count
    })()

    const totalChars = sampleText.length
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0

    // Calculate word-by-word performance for graph
    const sampleWords = sampleText.split(/\s+/)
    const userWords = userInput.split(/\s+/)

    const wordMetrics = sampleWords.map((word, idx) => {
      const userWord = userWords[idx] || ''
      let wordCorrectChars = 0
      for (let i = 0; i < Math.min(userWord.length, word.length); i++) {
        if (userWord[i] === word[i]) {
          wordCorrectChars++
        }
      }

      const wordAccuracy = word.length > 0 ? Math.round((wordCorrectChars / word.length) * 100) : 0

      // Use actual tracked completion time if available (milliseconds)
      let wordWpm = 0
      if (wordCompletionTimesRef.current[idx] !== undefined) {
        const completionTime = wordCompletionTimesRef.current[idx] // milliseconds
        // Calculate time from previous word completion to this word completion
        const prevCompletionTime = idx > 0 ? (wordCompletionTimesRef.current[idx - 1] || 0) : 0
        const wordTimeSpentMs = completionTime - prevCompletionTime
        const wordTimeSpentSec = wordTimeSpentMs / 1000

        if (wordTimeSpentSec > 0) {
          const wordMinutes = wordTimeSpentSec / 60
          wordWpm = Math.round((wordCorrectChars / 5) / wordMinutes * 10) / 10
        }
      }

      return {
        wordIndex: idx + 1,
        word: word,
        correct: wordCorrectChars === word.length && userWord.length === word.length,
        accuracy: wordAccuracy,
        wpm: wordWpm,
        typed: userWord
      }
    })

    // Calculate average WPM from all words
    const wordWpms = wordMetrics.filter(m => m.wpm > 0).map(m => m.wpm)
    const wpm = wordWpms.length > 0 ? Math.round((wordWpms.reduce((a, b) => a + b, 0) / wordWpms.length) * 10) / 10 : 0

    // Count words typed correctly up to current position
    let correctWords = 0
    for (let i = 0; i < userWords.length; i++) {
      if (userWords[i] === sampleWords[i]) {
        correctWords++
      } else {
        break
      }
    }

    const resultsData = {
      wpm,
      accuracy,
      wordsTyped: userWords.filter(w => w).length,
      correctWords,
      timeElapsed,
      correctChars,
      totalChars: sampleText.length,
      userInput,
      sampleText,
      wordMetrics
    }

    setResults(resultsData)

    // Save result to localStorage
    saveResult(resultsData, mode.id)
  }

  const resetTest = () => {
    setTestActive(false)
    setTestFinished(false)
    setUserInput('')
    setTimeElapsed(0)
    setResults(null)
    wordCompletionTimesRef.current = {}
    testStartTimeRef.current = null
    setLastScrollIndex(0)
  }

  if (testFinished && results) {
    return (
      <div className="space-y-8">
        <Results results={results} />
        <div className="flex gap-4 justify-center">
          <button
            onClick={resetTest}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
          <button
            onClick={startTest}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            New Test
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg shadow-lg p-8 space-y-6" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>Start Typing</h3>

      {/* Timer and Stats */}
      {testActive && (
        <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
          <div className="text-center">
            <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Time</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-stat)' }}>{timeElapsed}s</p>
          </div>
          <div className="text-center">
            <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Words</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-stat)' }}>
              {Math.round(userInput.trim().split(/\s+/).filter(w => w).length)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>WPM (est.)</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-stat)' }}>
              {timeElapsed > 0 ? (() => {
                let correctChars = 0
                for (let i = 0; i < Math.min(userInput.length, sampleText.length); i++) {
                  if (userInput[i] === sampleText[i]) {
                    correctChars++
                  }
                }
                const minutes = timeElapsed / 60
                return Math.round((correctChars / 5) / minutes * 10) / 10
              })() : 0}
            </p>
          </div>
        </div>
      )}

      {/* Text to type */}
      {loading ? (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
          <Loader size={24} className="animate-spin text-purple-600 mr-2" />
          <p className="text-gray-600">Loading quote...</p>
        </div>
      ) : (
        <div ref={textContainerRef} className="mb-6 p-4 bg-gray-50 rounded-lg h-32 overflow-y-auto">
          <p className="text-xl text-gray-700 leading-relaxed font-mono">
            {sampleText.split('').map((char, idx) => {
              let charColor = 'text-gray-700'
              if (idx < userInput.length) {
                charColor = userInput[idx] === char ? 'text-green-600' : 'text-red-600'
              } else if (idx === userInput.length && testActive) {
                charColor = 'bg-purple-400 text-white'
              }
              return (
                <span key={idx} className={charColor}>
                  {char}
                </span>
              )
            })}
          </p>
        </div>
      )}

      {/* Input box */}
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={(e) => {
          const newInput = e.target.value
          setUserInput(newInput)

          // Auto-start test on first keystroke
          if (!testActive && newInput.length === 1) {
            setTestActive(true)
            testStartTimeRef.current = performance.now()
            wordCompletionTimesRef.current = {}
          }

          // Track word completion times with actual millisecond precision
          if (testActive && testStartTimeRef.current) {
            const currentTime = performance.now()
            const userWords = newInput.trim().split(/\s+/).filter(w => w)
            const sampleWords = sampleText.split(/\s+/)

            // Record completion time for each completed word
            for (let i = 0; i < userWords.length; i++) {
              if (!wordCompletionTimesRef.current[i] && userWords[i].length > 0) {
                if (i < sampleWords.length) {
                  const sampleWord = sampleWords[i]
                  // Word is complete when it matches the sample word length
                  if (userWords[i].length >= sampleWord.length) {
                    // Record time in milliseconds from test start
                    wordCompletionTimesRef.current[i] = currentTime - testStartTimeRef.current
                  }
                }
              }
            }
          }

          // Check for word-limit mode completion
          if (testActive && !testFinished && wordLimit) {
            const userWords = newInput.trim().split(/\s+/).filter(w => w)
            const sampleWords = sampleText.split(/\s+/)

            // If user has typed the correct number of words
            if (userWords.length >= wordLimit) {
              // Check if all typed words match the sample words
              let allWordsCorrect = true
              for (let i = 0; i < wordLimit; i++) {
                if (userWords[i] !== sampleWords[i]) {
                  allWordsCorrect = false
                  break
                }
              }

              if (allWordsCorrect) {
                // Finish test automatically
                setTestFinished(true)
                setTimeout(() => {
                  finishTest()
                }, 0)
              }
            }
          }

          // Auto-finish if final character is typed correctly (for time-based modes)
          if (testActive && !testFinished && !wordLimit && newInput.length === sampleText.length && newInput.length > 0) {
            let allCorrect = true
            for (let i = 0; i < sampleText.length; i++) {
              if (newInput[i] !== sampleText[i]) {
                allCorrect = false
                break
              }
            }
            if (allCorrect) {
              // Finish test automatically with the current input
              setTimeout(() => {
                // Calculate results with character-based WPM
                const correctChars = (() => {
                  let count = 0
                  for (let i = 0; i < Math.min(newInput.length, sampleText.length); i++) {
                    if (newInput[i] === sampleText[i]) {
                      count++
                    }
                  }
                  return count
                })()

                const accuracy = sampleText.length > 0 ? Math.round((correctChars / sampleText.length) * 100) : 0

                // Calculate word-by-word performance
                const sampleWords = sampleText.split(/\s+/)
                const userWords = newInput.split(/\s+/)

                const wordMetrics = sampleWords.map((word, idx) => {
                  const userWord = userWords[idx] || ''
                  let wordCorrectChars = 0
                  for (let i = 0; i < Math.min(userWord.length, word.length); i++) {
                    if (userWord[i] === word[i]) {
                      wordCorrectChars++
                    }
                  }

                  const wordAccuracy = word.length > 0 ? Math.round((wordCorrectChars / word.length) * 100) : 0

                  // Use actual tracked completion time if available (milliseconds)
                  let wordWpm = 0
                  if (wordCompletionTimesRef.current[idx] !== undefined) {
                    const completionTime = wordCompletionTimesRef.current[idx] // milliseconds
                    // Calculate time from previous word completion to this word completion
                    const prevCompletionTime = idx > 0 ? (wordCompletionTimesRef.current[idx - 1] || 0) : 0
                    const wordTimeSpentMs = completionTime - prevCompletionTime
                    const wordTimeSpentSec = wordTimeSpentMs / 1000

                    if (wordTimeSpentSec > 0) {
                      const wordMinutes = wordTimeSpentSec / 60
                      wordWpm = Math.round((wordCorrectChars / 5) / wordMinutes * 10) / 10
                    }
                  }

                  return {
                    wordIndex: idx + 1,
                    word: word,
                    correct: wordCorrectChars === word.length && userWord.length === word.length,
                    accuracy: wordAccuracy,
                    wpm: wordWpm,
                    typed: userWord
                  }
                })

                // Calculate average WPM from all words
                const wordWpms = wordMetrics.filter(m => m.wpm > 0).map(m => m.wpm)
                const wpm = wordWpms.length > 0 ? Math.round((wordWpms.reduce((a, b) => a + b, 0) / wordWpms.length) * 10) / 10 : 0

                let correctWords = 0
                for (let i = 0; i < userWords.length; i++) {
                  if (userWords[i] === sampleWords[i]) {
                    correctWords++
                  } else {
                    break
                  }
                }

                setResults({
                  wpm,
                  accuracy,
                  wordsTyped: userWords.filter(w => w).length,
                  correctWords,
                  timeElapsed,
                  correctChars,
                  totalChars: sampleText.length,
                  userInput: newInput,
                  sampleText,
                  wordMetrics
                })
                setTestActive(false)
                setTestFinished(true)
              }, 0)
            }
          }
        }}
        onKeyDown={(e) => {
          // Auto-finish if user presses space after completing text correctly (time-based modes only)
          if (testActive && !wordLimit && e.key === ' ' && userInput.length === sampleText.length) {
            // Check if all text is correct
            let allCorrect = true
            for (let i = 0; i < sampleText.length; i++) {
              if (userInput[i] !== sampleText[i]) {
                allCorrect = false
                break
              }
            }
            if (allCorrect) {
              e.preventDefault()
              finishTest()
            }
          }
        }}
        placeholder={testActive ? "Keep typing..." : "Start typing here..."}
        disabled={loading}
        className="w-full p-4 text-lg rounded-lg focus:outline-none disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--color-bgSecondary)',
          color: 'var(--color-text)',
          borderColor: 'var(--color-border)',
          borderWidth: '2px',
          opacity: loading ? 0.6 : 1
        }}
        rows={3}
      />
    </div>
  )
}

export default TypingTest