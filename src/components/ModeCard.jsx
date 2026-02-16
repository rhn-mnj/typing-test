const ModeCard = ({ mode, onSelect }) => {
  const Icon = mode.icon
  return (
    <button
      onClick={() => onSelect(mode.id)}
      className={`bg-gradient-to-br ${mode.color} p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 text-white group`}
    >
      <Icon size={32} className="mb-3 group-hover:scale-110 transition" />
      <h3 className="text-xl font-bold mb-1">{mode.name}</h3>
      <p className="text-sm text-white/90">{mode.description}</p>
    </button>
  )
}

export default ModeCard
