import { createFileRoute, Link } from '@tanstack/react-router'
import { PAGE_PATH_KEYS } from '@/utils/constant'
import { FaUserPlus, FaUsers, FaArrowRight, FaClipboardList, FaCalculator } from 'react-icons/fa'

export const Route = createFileRoute('/')({ component: Home })

interface GridMenuItem {
  title: string
  subtitle?: string
  img?: string
  icon?: React.ReactNode
  link: string
  color: string
}

function Home() {
  // Configurable Grid Dashboard Items
  const gridItems: GridMenuItem[] = [
    {
      title: 'નવા ગ્રાહક',
      subtitle: 'Add New Customer',
      img: 'cutomer.png',
      icon: <FaUserPlus size={28} className="text-purple-600" />,
      link: PAGE_PATH_KEYS.NEW_CUSTOMER,
      color: 'from-purple-500/10 to-indigo-500/10 border-purple-200 hover:border-purple-400',
    },
    {
      title: 'ગ્રાહકોની યાદી',
      subtitle: 'Customer List',
      img: 'list.png',
      icon: <FaUsers size={28} className="text-purple-600" />,
      link: PAGE_PATH_KEYS.LIST,
      color: 'from-indigo-500/10 to-blue-500/10 border-indigo-200 hover:border-indigo-400',
    },
    // Optional additional menu items for expansion:
    {
      title: 'ઓર્ડરની યાદી',
      subtitle: 'All Orders',
      icon: <FaClipboardList size={28} className="text-purple-600" />,
      link: PAGE_PATH_KEYS.LIST || '/cutomer-list/',
      color: 'from-amber-500/10 to-orange-500/10 border-amber-200 hover:border-amber-400',
    },
    {
      title: 'હિસાબ કીતાબ',
      subtitle: 'Accounts & Bills',
      icon: <FaCalculator size={28} className="text-purple-600" />,
      link: PAGE_PATH_KEYS.LIST || '/cutomer-list/',
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 hover:border-emerald-400',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 pb-20">



      {/* Grid Dashboard */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 px-1">
          ઝડપી સેવાઓ (Quick Actions)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {gridItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`group bg-white bg-gradient-to-br ${item.color} border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between relative overflow-hidden active:scale-95`}
            >
              {/* Image / Icon Box */}
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.img ? (
                  <img
                    src={`/logos/${item.img}`}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  item.icon
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Hover Indicator Icon */}
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>ખોલો</span>
                <FaArrowRight size={10} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home