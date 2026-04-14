export default function SongMenu() {   
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/80 via-pink-500/60 to-blue-500/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
                {['funny', 'nature', 'objects', 'people', 'animals'].map((category, index) => (
                    <button key={category} className={`flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r ${getButtonGradient(index)} text-white rounded-full text-xs sm:text-sm font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 border border-white/20`}>
                        <span className="capitalize">{category}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// Helper function for dynamic gradients
function getButtonGradient(index: number) {
    const gradients = [
        'from-yellow-400 to-orange-500',
        'from-green-400 to-blue-500',
        'from-red-400 to-pink-500',
        'from-indigo-400 to-purple-500',
        'from-teal-400 to-cyan-500'
    ];
    return gradients[index % gradients.length];
}