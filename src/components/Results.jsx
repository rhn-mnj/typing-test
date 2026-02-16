import React from 'react'
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
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Test Results</h2>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Words Per Minute</p>
          <p className="text-4xl font-bold text-purple-600">{wpm}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Accuracy</p>
          <p className="text-4xl font-bold text-blue-600">{accuracy}%</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Words Typed</p>
          <p className="text-4xl font-bold text-green-600">{wordsTyped}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Time</p>
          <p className="text-4xl font-bold text-orange-600">{timeElapsed}s</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Accuracy Pie Chart */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Character Accuracy</h3>
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
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics</h3>
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
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">WPM Trend Throughout Test</h3>
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
                      <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
                        <p className="font-semibold text-gray-800">{data.word}</p>
                        <p className="text-purple-600">WPM: {data.wpm}</p>
                        <p className="text-blue-600">Accuracy: {data.accuracy}%</p>
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
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Character-by-Character Analysis (First 30)</h3>
        <div className="flex flex-wrap gap-2">
          {charData.map((char, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded ${
                char.correct === 1
                  ? 'bg-green-200 text-green-800'
                  : userInput[idx] !== undefined
                  ? 'bg-red-200 text-red-800'
                  : 'bg-gray-200 text-gray-800'
              }`}
              title={`Position ${char.position}: "${char.label}"`}
            >
              {char.label}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-lg">
        <div>
          <p className="text-sm text-gray-600">Correct Characters</p>
          <p className="text-2xl font-bold text-green-600">{correctChars}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Incorrect Characters</p>
          <p className="text-2xl font-bold text-red-600">{totalChars - correctChars}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Characters</p>
          <p className="text-2xl font-bold text-gray-600">{totalChars}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Characters Typed</p>
          <p className="text-2xl font-bold text-blue-600">{userInput.length}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Average WPM</p>
          <p className="text-2xl font-bold text-purple-600">{wpm}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Test Duration</p>
          <p className="text-2xl font-bold text-orange-600">{timeElapsed}s</p>
        </div>
      </div>
    </div>
  )
}

export default Results
