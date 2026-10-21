import { useState } from 'react'
import PageHeader from '#/components/PageHeader'
import { supabase } from '#/lib/supabaseClient'
import { ThemeButton, ThemeInput, ThemeTextarea } from '#/utils'
import { PAGE_PATH_KEYS } from '#/utils/constant'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Swal from 'sweetalert2'
import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaRulerCombined,
    FaSave,
    FaSpinner
} from 'react-icons/fa'

export const Route = createFileRoute('/new-customer/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    const initialData = {
        customer_name: '',
        phone: '',
        city: '',
        measurement: '',
    }

    const [formData, setFormData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    const HandleSubmit = async () => {
        if (!formData.customer_name.trim()) {
            await Swal.fire({
                title: 'કૃપા કરીને ગ્રાહકનું નામ ભરો.',
                icon: 'warning',
                confirmButtonText: 'બરાબર',
                confirmButtonColor: '#9333ea',
            })
            return
        } else if (!formData.phone.trim()) {
            await Swal.fire({
                title: 'કૃપા કરીને ફોન નંબર ભરો.',
                icon: 'warning',
                confirmButtonText: 'બરાબર',
                confirmButtonColor: '#9333ea',
            })
            return
        } else if (!formData.city.trim()) {
            await Swal.fire({
                title: 'કૃપા કરીને ગામનું નામ ભરો.',
                icon: 'warning',
                confirmButtonText: 'બરાબર',
                confirmButtonColor: '#9333ea',
            })
            return
        } else if (!formData.measurement.trim()) {
            await Swal.fire({
                title: 'કૃપા કરીને માપ ભરો.',
                icon: 'warning',
                confirmButtonText: 'બરાબર',
                confirmButtonColor: '#9333ea',
            })
            return
        }

        setIsLoading(true)

        try {
            const { error } = await supabase
                .from('customers')
                .insert([formData])

            if (error) {
                await Swal.fire({
                    title: 'ભૂલ!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'બરાબર',
                    confirmButtonColor: '#9333ea',
                })
                return
            }

            setFormData(initialData)

            await Swal.fire({
                title: 'ગ્રાહકની વિગતો સફળતાપૂર્વક સેવ થઈ ગઈ છે.',
                icon: 'success',
                confirmButtonText: 'બરાબર',
                confirmButtonColor: '#9333ea',
            })

            // Optionally navigate to customer list after saving
            navigate({ to: PAGE_PATH_KEYS.CUSTOMER_LIST || '/cutomer-list' })

        } catch {
            await Swal.fire({
                title: 'કંઈક ખોટું થયું. ફરીથી પ્રયાસ કરો.',
                icon: 'error',
                confirmButtonText: 'બરાબર',
                confirmButtonColor: '#9333ea',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12 mt-[3.4rem]">
            <PageHeader
                title="ગ્રાહકોની યાદી"
                onBack={PAGE_PATH_KEYS.HOME}
            />

            <div className="max-w-xl mx-auto p-4 sm:p-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">
                    <div className="mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-600" />
                            ગ્રાહકની માહિતી (Customer Details)
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            નવા ગ્રાહકની વિગતો અને માપ ઉમેરો
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <FaUser className="text-purple-600" />
                                ગ્રાહકનું નામ *
                            </label>
                            <ThemeInput
                                type="text"
                                placeholder="દા.ત. કેવલ મકવાણા"
                                className="w-full h-[44px] px-3.5 border-gray-200 focus:border-purple-600 focus:ring-purple-200 rounded-xl transition-all"
                                value={formData.customer_name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    onChange('customer_name', e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <FaPhone className="text-purple-600" />
                                ફોન નંબર *
                            </label>
                            <ThemeInput
                                type="tel"
                                placeholder="દા.ત. 1234567890"
                                className="w-full h-[44px] px-3.5 border-gray-200 focus:border-purple-600 focus:ring-purple-200 rounded-xl transition-all"
                                value={formData.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    onChange('phone', e.target.value)
                                }
                            />
                        </div>

                        {/* City / Village Field */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-purple-600" />
                                ગામ / શહેર *
                            </label>
                            <ThemeInput
                                type="text"
                                placeholder="દા.ત. અમદાવાદ"
                                className="w-full h-[44px] px-3.5 border-gray-200 focus:border-purple-600 focus:ring-purple-200 rounded-xl transition-all"
                                value={formData.city}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    onChange('city', e.target.value)
                                }
                            />
                        </div>

                        {/* Measurement Field */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <FaRulerCombined className="text-purple-600" />
                                માપ (Measurement Details) *
                            </label>
                            <ThemeTextarea
                                placeholder="લંબાઈ, છાતી, કમર, શોલ્ડર વગેરે માપ અહી લખો..."
                                className="w-full h-[110px] p-3.5 border-gray-200 focus:border-purple-600 focus:ring-purple-200 rounded-xl transition-all resize-none text-sm"
                                value={formData.measurement}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    onChange('measurement', e.target.value)
                                }
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={HandleSubmit}
                                className="w-full h-[46px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-purple-600/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin text-lg" />
                                        <span>સેવ થઈ રહ્યું છે...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="text-base" />
                                        <span>સેવ કરો (Save Customer)</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}