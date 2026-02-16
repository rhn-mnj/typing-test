import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const Results = ({ results }) => {
  const { currentTheme } = useContext(ThemeContext)
  const { wpm, accuracy, wordsTyped, timeElapsed, correctChars, totalChars, userInput, sampleText, wordMetrics = [] } = results

  // Data for accuracy visualization
  const accuracyData = [
    { name: 'Correct', value: correctChars, unit: 'chars' },
    { name: 'Incorrect', value: totalChars - correctChars, unit: 'chars' }
  ]

  // Data for character-by-character analysis
  const charData = sampleText.split('').slice(0, 30).map((char, idx) => ({
    position: idx + 1,
    correct: userInput[idx] === char ? 1 : 0,
    label: char === ' ' ? '·' : char
  }))

  // Word-by-word accuracy data for graph
  const wordAccuracyData = wordMetrics.map(metric => ({
    word: metric.word.substring(0, 8), // Truncate long words
    accuracy: metric.accuracy,
    wpm: metric.wpm,
    wordIndex: metric.wordIndex
  }))

  const COLORS = ['#10b981', '#ef4444']

  return (
    <div className="rounded-lg shadow-lg p-8 space-y-8" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Test Results</h2>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)', borderLeft: `4px solid var(--color-stat)` }}>
          <p className="text-sm mb-2" style={{ color: 'var(--color-textSecondary)' }}>Words Per Minute</p>
          <p className="text-4xl font-bold" style={{ color: 'var(--color-stat)' }}>{wpm}</p>
        </div>
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)', borderLeft: `4px solid var(--color-accent)` }}>
          <p className="text-sm mb-2" style={{ color: 'var(--color-textSecondary)' }}>Accuracy</p>
          <p className="text-4xl font-bold" style={{ color: 'var(--color-accent)' }}>{accuracy}%</p>
        </div>
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)', borderLeft: `4px solid var(--color-correct)` }}>
          <p className="text-sm mb-2" style={{ color: 'var(--color-textSecondary)' }}>Words Typed</p>
          <p className="text-4xl font-bold" style={{ color: 'var(--color-correct)' }}>{wordsTyped}</p>
        </div>
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)', borderLeft: `4px solid var(--color-accent)` }}>
          <p className="text-sm mb-2" style={{ color: 'var(--color-textSecondary)' }}>Time</p>
          <p className="text-4xl font-bold" style={{ color: 'var(--color-accent)' }}>{timeElapsed}s</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Accuracy Pie Chart */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Character Accuracy</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={accuracyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Comparison Bar Chart */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: 'WPM', value: wpm, fill: '#9333ea' },
                { name: 'Accuracy %', value: accuracy, fill: '#3b82f6' }
              ]}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]}>
                {[{ name: 'WPM', value: wpm, fill: '#9333ea' }, { name: 'Accuracy %', value: accuracy, fill: '#3b82f6' }].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Word-by-Word WPM Trend - Full Width */}
      {wordAccuracyData.length > 0 && (
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>WPM Trend Throughout Test</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={wordAccuracyData}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="word"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis yAxisId="left" label={{ value: 'WPM', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} label={{ value: 'Accuracy %', angle: 90, position: 'insideRight' }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="p-3 rounded shadow-lg" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', border: `1px solid var(--color-border)` }}>
                        <p className="font-semibold">{data.word}</p>
                        <p style={{ color: 'var(--color-stat)' }}>WPM: {data.wpm}</p>
                        <p style={{ color: 'var(--color-accent)' }}>Accuracy: {data.accuracy}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="wpm"
                stroke="#9333ea"
                strokeWidth={3}
                dot={{ fill: '#9333ea', r: 5 }}
                activeDot={{ r: 7 }}
                name="WPM"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="accuracy"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Accuracy %"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Character-by-Character Analysis */}
      <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Character-by-Character Analysis (First 30)</h3>
        <div className="flex flex-wrap gap-2">
          {charData.map((char, idx) => {
            let bgColor, textColor
            if (char.correct === 1) {
              bgColor = 'var(--color-correct)'
              textColor = currentTheme === 'light' ? '#000' : '#fff'
            } else if (userInput[idx] !== undefined) {
              bgColor = 'var(--color-incorrect)'
              textColor = currentTheme === 'light' ? '#fff' : '#fff'
            } else {
              bgColor = 'var(--color-bgSecondary)'
              textColor = 'var(--color-text)'
            }
            return (
              <div
                key={idx}
                className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded"
                style={{ backgroundColor: bgColor, color: textColor }}
                title={`Position ${char.position}: "${char.label}"`}
              >
                {char.label}
              </div>
            )
          })}
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 rounded-lg" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
        <div>
          <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Correct Characters</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-correct)' }}>{correctChars}</p>
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Incorrect Characters</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-incorrect)' }}>{totalChars - correctChars}</p>
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Total Characters</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{totalChars}</p>
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Characters Typed</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{userInput.length}</p>
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Average WPM</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-stat)' }}>{wpm}</p>
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Test Duration</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{timeElapsed}s</p>
        </div>
      </div>
    </div>
  )
}

export default Results
