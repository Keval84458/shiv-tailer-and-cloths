import React, { useState, useMemo, useEffect } from 'react'
import PageHeader from '#/components/PageHeader'
import { ThemeInput } from '#/utils'
import { PAGE_PATH_KEYS } from '#/utils/constant'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import Swal from 'sweetalert2'
import {
    FaPhone,
    FaRulerCombined,
    FaUserPlus,
    FaChevronRight,
    FaEdit,
    FaTrash
} from 'react-icons/fa'
import { supabase } from '#/lib/supabaseClient'
import MeasurementModal from '#/components/AppModal'

export const Route = createFileRoute('/cutomer-list/')({
    component: RouteComponent,
})

interface Customer {
    id: string | number
    customer_name: string
    phone: string
    city?: string
    measurement?: string
    created_at?: string
}

function RouteComponent() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [customers, setCustomers] = useState<Customer[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // State to track which customer's measurement modal is open by their ID
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | number | null>(null)

    const fetchCustomers = async () => {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('customers')
                .select('*')
                .order('id', { ascending: true })

            if (error) {
                console.error('Error fetching customers:', error)
            } else if (data) {
                setCustomers(data as Customer[])
            }
        } catch (error) {
            console.error('Error fetching customers:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredCustomers = useMemo(() => {
        if (!searchQuery.trim()) return customers
        const query = searchQuery.toLowerCase()
        return customers.filter(
            (c) =>
                c.customer_name?.toLowerCase().includes(query) ||
                c.phone?.includes(query) ||
                (c.city && c.city.toLowerCase().includes(query))
        )
    }, [searchQuery, customers])

    const handleDelete = async (id: string | number, name: string) => {
        const result = await Swal.fire({
            title: `શું તમે "${name}" ને ડિલીટ કરવા માંગો છો?`,
            text: "આ ક્રિયા પાછી ખેંચી શકાતી નથી!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#9333ea',
            confirmButtonText: 'હા, ડિલીટ કરો',
            cancelButtonText: 'ના (Cancel)',
        })

        if (result.isConfirmed) {
            const { error } = await supabase.from('customers').delete().eq('id', id)

            if (error) {
                Swal.fire({
                    title: 'ભૂલ!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'બરાબર',
                    confirmButtonColor: '#9333ea',
                })
                return
            }
            setCustomers((prev) => prev.filter((c) => c.id !== id))

            Swal.fire({
                title: 'ડિલીટ થઈ ગયું!',
                text: 'ગ્રાહકની માહિતી સફળતાપૂર્વક દૂર કરવામાં આવી છે.',
                icon: 'success',
                confirmButtonText: 'બરાબર',
                confirmButtonColor: '#9333ea',
            })
        }
    }

    const handleEdit = (customer: Customer) => {
        navigate({
            to: PAGE_PATH_KEYS.NEW_CUSTOMER,
        })
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    // Find the currently active customer object for the modal
    const activeCustomer = customers.find((c) => c.id === selectedCustomerId)

    return (
        <div className="min-h-screen bg-slate-50 pb-20 mt-[3.4rem]">
            {/* Header */}
            <PageHeader
                title="ગ્રાહકોની યાદી"
                onBack={PAGE_PATH_KEYS.HOME}
            />
            <div className="p-4 bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <ThemeInput
                        className="h-[44px] w-full border-gray-200 focus:border-purple-600 focus:ring-purple-200 rounded-xl px-3"
                        placeholder="ગ્રાહક શોધો (નામ અથવા ફોન નંબર)..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchQuery(e.target.value)
                        }
                    />
                </div>

                <div className="max-w-7xl mx-auto flex items-center justify-between mt-3 text-xs text-gray-500 font-medium px-1">
                    <span>કુલ ગ્રાહકો: {filteredCustomers.length}</span>
                    <span className="text-purple-600 font-semibold">
                        {searchQuery ? `પરિણામો: ${filteredCustomers.length}` : ''}
                    </span>
                </div>
            </div>

            <div className="p-4 max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="text-center py-12 text-gray-400 text-sm font-medium">
                        ડેટા લોડ થઈ રહ્યો છે...
                    </div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <p className="text-gray-400 text-sm font-medium">કોઈ ગ્રાહક મળ્યા નથી</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCustomers.map((customer: any) => (
                            <div
                                key={customer.id}
                                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-bold text-gray-900 text-base leading-tight">
                                            {customer.customer_name}
                                        </h3>

                                        <div className="flex items-center gap-1">
                                            <Link
                                                to={PAGE_PATH_KEYS.UPDATE_CUSTOMER}
                                                search={{
                                                    id: customer.id,
                                                }}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="એડિટ કરો (Edit)"
                                            >
                                                <FaEdit size={14} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(customer.id, customer.customer_name)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="ડિલીટ કરો (Delete)"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 space-y-1.5 mb-4">
                                        <p className="flex items-center gap-1.5 font-medium text-gray-700">
                                            <FaPhone className="text-purple-500 text-xs" />
                                            {customer.phone}
                                        </p>
                                        {customer.city && <p className="text-gray-600">📍 {customer.city}</p>}
                                        <p className="text-[11px] text-gray-400">
                                            નોંધણી તારીખ:{' '}
                                            {customer.created_at
                                                ? new Date(customer.created_at).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })
                                                : 'ન તાજેતરની'}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                                    <a
                                        href={`tel:${customer.phone?.replace(/\s+/g, '')}`}
                                        className="flex-1 py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                    >
                                        <FaPhone size={12} />
                                        કોલ કરો
                                    </a>

                                    <button
                                        onClick={() => setSelectedCustomerId(customer.id)}
                                        className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                    >
                                        <FaRulerCombined size={12} />
                                        માપ જુઓ
                                        <FaChevronRight size={10} className="ml-auto opacity-70" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {activeCustomer && (
                <MeasurementModal
                    isOpen={Boolean(selectedCustomerId)}
                    onClose={() => setSelectedCustomerId(null)}
                    customerName={activeCustomer.customer_name}
                    measurement={activeCustomer.measurement}
                />
            )}

            <button
                onClick={() => navigate({ to: PAGE_PATH_KEYS.NEW_CUSTOMER })}
                className="fixed bottom-5 right-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-semibold text-sm z-40"
            >
                <FaUserPlus size={18} />
                <span className="hidden sm:inline">નવો ગ્રાહક ઉમેરો</span>
            </button>
        </div>
    )
}