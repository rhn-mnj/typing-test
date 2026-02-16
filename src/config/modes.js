import { Clock, Zap, Flame, Brain, FileText } from 'lucide-react'

export const TYPING_MODES = [
  {
    id: 'extended',
    name: 'Extended',
    duration: 120,
    wordLimit: null,
    icon: Clock,
    description: 'Relaxed 2-minute test',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'standard',
    name: 'Standard',
    duration: 60,
    wordLimit: null,
    icon: FileText,
    description: 'Classic 1-minute test',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'sprint',
    name: 'Sprint',
    duration: 30,
    wordLimit: null,
    icon: Zap,
    description: 'Quick 30-second challenge',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'hard',
    name: 'Hard Mode',
    duration: 60,
    wordLimit: null,
    difficulty: 'hard',
    icon: Flame,
    description: 'Advanced vocabulary',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'words-10',
    name: '10 Words',
    duration: null,
    wordLimit: 10,
    icon: Brain,
    description: 'Type 10 words',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'words-25',
    name: '25 Words',
    duration: null,
    wordLimit: 25,
    icon: Brain,
    description: 'Type 25 words',
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 'words-50',
    name: '50 Words',
    duration: null,
    wordLimit: 50,
    icon: Brain,
    description: 'Type 50 words',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'words-100',
    name: '100 Words',
    duration: null,
    wordLimit: 100,
    icon: Brain,
    description: 'Type 100 words',
    color: 'from-indigo-500 to-indigo-600'
  }
]
