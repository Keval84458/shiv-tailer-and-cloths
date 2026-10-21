import React, { useEffect } from 'react'
import { FaTimes, FaUser, FaRulerCombined } from 'react-icons/fa'

interface MeasurementModalProps {
    isOpen: boolean
    onClose: () => void
    customerName: string
    measurement?: string
}

const MeasurementModal: React.FC<MeasurementModalProps> = ({
    isOpen,
    onClose,
    customerName,
    measurement,
}) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-md w-full p-6 relative overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-2 text-purple-700 font-bold text-base">
                        <FaRulerCombined />
                        <span>માપની વિગતો</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <FaTimes size={16} />
                    </button>
                </div>

                <div className="overflow-y-auto my-4 pr-1 space-y-4">
                    <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-600/20 flex-shrink-0">
                            <FaUser size={16} />
                        </div>
                        <div>
                            <span className="text-[11px] text-purple-600 font-semibold uppercase tracking-wider block">
                                ગ્રાહકનું નામ (Customer Name)
                            </span>
                            <h3 className="font-bold text-gray-900 text-base leading-tight">
                                {customerName || 'ગ્રાહક'}
                            </h3>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            માપ (Measurement Details):
                        </label>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 text-gray-800 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                            {measurement ? measurement : 'કોઈ માપ ઉપલબ્ધ નથી (No measurements recorded)'}
                        </div>
                    </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-end flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all active:scale-95"
                    >
                        બંધ કરો (Close)
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MeasurementModal