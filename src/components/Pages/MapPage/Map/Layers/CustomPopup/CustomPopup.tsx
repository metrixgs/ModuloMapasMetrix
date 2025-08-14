"use client"
import classNames from "classnames"
import type { Popup } from "leaflet"
import { BiX } from "react-icons/bi"
import {
  HiArrowUpRight,
  HiPencil,
  HiUser,
  HiCamera,
  HiClock,
  HiEllipsisVertical,
  HiMapPin,
  HiShare,
  HiArrowDownTray,
  HiPrinter,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"

interface MetrixPopupProps {
  data: Record<string, any> | null
  popup: Popup
}

type TabType = "details" | "edit" | "user" | "photos" | "activities"

const MetrixPopup = ({ data, popup }: MetrixPopupProps) => {
  const { t } = useTranslation("global")
  const tref = "body.custom-popup"
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("details")
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const mockPhotos = ["/street-pothole-cars.png", "/road-damage-closeup.png", "/street-repair.png"]

  const mockActivities = [
    {
      time: "24/07: 10:51am",
      description: "Se reporta un bache en la Calle Eucaliptos 25",
    },
    {
      time: "24/07: 11:56am",
      description: "El área encargada se comunica con el ciudadano afectado para obtener más información",
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleViewInMaps = () => {
    if (data?.latitud && data?.longitud) {
      const url = `https://www.google.com/maps?q=${data.latitud},${data.longitud}`
      window.open(url, "_blank")
    }
    setShowDropdown(false)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Reporte de Bache",
        text: `Ticket #${data?.identificador || "N/A"}: ${data?.titulo || "Reporte de Bache"}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
    setShowDropdown(false)
  }

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...")
    setShowDropdown(false)
  }

  const handlePrintPDF = () => {
    window.print()
    setShowDropdown(false)
  }

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "N/A") return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getSimpleViewData = () => {
    if (!data) return {}
    return {
      "Fecha de creación": formatDate(data.fecha_creacion),
      Clasificación: data.titulo || "N/A",
      Prioridad: data.prioridad || "N/A",
      Estatus: data.estado || "Activo",
    }
  }

  const getDetailedViewData = () => {
    if (!data) return { ticketId: "N/A", leftColumn: {}, rightColumn: {}, observations: {} }

    return {
      ticketId: data.identificador || "N/A",
      leftColumn: {
        "Fecha de creación": "28 de mayo de 2024",
        Clasificación: "Bomba de agua averiada",
        Prioridad: "Media",
        Estatus: "Activo",
      },
      rightColumn: {
        Gobierno: "Coatzacoalcos, Veracruz",
        Dependencia: "LIMPIA",
        "Área Responsable": "CLIENTE DE PRUEBA",
        Dirección: "Av. Universidad #654, Centro",
      },
      observations: {
        "Observaciones (Operador)": "Fallos en estación de bombeo",
        "Comentarios (Área Responsable)": "Calle Zaragoza #321, Puerto",
      },
    }
  }

  const renderTabContent = () => {
    const detailedData = getDetailedViewData()

    switch (activeTab) {
      case "details":
        return (
          <div>
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                {Object.entries(detailedData.leftColumn).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-green-600 dark:text-green-400 font-medium text-sm">{key}:</div>
                    <div className={classNames("text-sm", "text-gray-800 dark:text-gray-200")}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {Object.entries(detailedData.rightColumn).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-green-600 dark:text-green-400 font-medium text-sm">{key}:</div>
                    <div className={classNames("text-sm", "text-gray-800 dark:text-gray-200")}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Observations Section */}
            <div className="space-y-4">
              {Object.entries(detailedData.observations).map(([key, value]) => (
                <div key={key}>
                  <div className="text-green-600 dark:text-green-400 font-medium text-sm mb-2">{key}:</div>
                  <div className={classNames("text-sm leading-relaxed", "text-gray-800 dark:text-gray-200")}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )

      case "activities":
        return (
          <div className="space-y-6">
            <h3 className={classNames("text-lg font-semibold text-center mb-6", "text-gray-800 dark:text-white")}>
              Actividades
            </h3>
            <div className="space-y-4">
              {mockActivities.map((activity, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-green-600 dark:text-green-400 font-medium text-sm">{activity.time}</div>
                  <div className={classNames("text-sm leading-relaxed", "text-gray-800 dark:text-gray-200")}>
                    {activity.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "user":
        return (
          <div className="flex items-center justify-center h-40">
            <div className={classNames("text-sm text-center", "text-gray-500 dark:text-gray-400")}>
              Información del usuario
            </div>
          </div>
        )

      case "photos":
        return (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={mockPhotos[currentPhotoIndex] || "/placeholder.svg"}
                alt={`Foto ${currentPhotoIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Navigation arrows */}
              {mockPhotos.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : mockPhotos.length - 1))}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-colors"
                  >
                    <HiChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => setCurrentPhotoIndex((prev) => (prev < mockPhotos.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-colors"
                  >
                    <HiChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Photo counter */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              {currentPhotoIndex + 1} de {mockPhotos.length}
            </div>
          </div>
        )

      case "edit":
        return (
          <div>
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                {Object.entries(detailedData.leftColumn).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-green-600 dark:text-green-400 font-medium text-sm">{key}:</div>
                    <div className={classNames("text-sm", "text-gray-800 dark:text-gray-200")}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {Object.entries(detailedData.rightColumn).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-green-600 dark:text-green-400 font-medium text-sm">{key}:</div>
                    <div className={classNames("text-sm", "text-gray-800 dark:text-gray-200")}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Observations Section */}
            <div className="space-y-4">
              {Object.entries(detailedData.observations).map(([key, value]) => (
                <div key={key}>
                  <div className="text-green-600 dark:text-green-400 font-medium text-sm mb-2">{key}:</div>
                  <div className={classNames("text-sm leading-relaxed", "text-gray-800 dark:text-gray-200")}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const simpleData = getSimpleViewData()
  const detailedData = getDetailedViewData()

  if (showDetailedView) {
    return (
      <div className={classNames("w-2xl rounded-2xl shadow-lg overflow-hidden", "bg-white dark:bg-metrixblack-800")}>
        {/* Detailed Header */}
        <div className="flex items-center justify-between p-4 pb-2 bg-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.webp" alt="" />

            </div>
              <img className="w-16 h-4" src="/logo-alt.webp" alt="" />
          </div>

          <div className="flex items-center gap-2">
            <span className={classNames("text-sm font-medium", "text-gray-600 dark:text-gray-300")}>
              ID Ticket: {detailedData.ticketId}
            </span>
            <button
              onClick={() => setShowDetailedView(false)}
              className="w-8 h-8 bg-[#cee4b8] hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"


            >
              <BiX className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Title and Action Icons */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mt-4 mb-6">
            <h2 className={classNames("text-xl font-semibold", "text-gray-800 dark:text-white")}>Reporte de Bache</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("edit")}
                className={classNames(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors relative",
                  activeTab === "edit"
                    ? "bg-gray-200 dark:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
                )}
              >
                <HiPencil className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                {activeTab === "edit" && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("user")}
                className={classNames(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors relative",
                  activeTab === "user"
                    ? "bg-gray-200 dark:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
                )}
              >
                <HiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                {activeTab === "user" && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("photos")}
                className={classNames(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors relative",
                  activeTab === "photos"
                    ? "bg-gray-200 dark:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
                )}
              >
                <HiCamera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{mockPhotos.length}</span>
                </div>
                {activeTab === "photos" && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("activities")}
                className={classNames(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors relative",
                  activeTab === "activities"
                    ? "bg-gray-200 dark:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
                )}
              >
                <HiClock className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                {activeTab === "activities" && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                )}
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <HiEllipsisVertical className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <button
                      onClick={handleViewInMaps}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                    >
                      Ver en Google Maps
                      <HiMapPin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                    >
                      Compartir
                      <HiShare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                    >
                      Descargar PDF
                      <HiArrowDownTray className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handlePrintPDF}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                    >
                      Imprimir PDF
                      <HiPrinter className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="min-h-[200px]">{renderTabContent()}</div>

        </div>
      </div>
    )
  }

  return (
    <div className={classNames("w-80 rounded-2xl shadow-lg overflow-hidden", "bg-white dark:bg-metrixblack-800")}>
      {/* Header with logo and action buttons */}
      <div className="flex items-center justify-between p-4 pb-2 bg-gray-100 dark:bg-gray-800">

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/logo.webp" alt="" />

          </div>
          <img className="w-16 h-4" src="/logo-alt.webp" alt="" />

        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowDetailedView(true)
              setActiveTab("details")
            }}
            className="w-8 h-8 bg-[#cee4b8] hover:bg-gray-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-full flex items-center justify-center transition-colors"

          >
            <HiArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
          </button>

          {/* Close button - preserved original functionality */}
          <button
            onClick={() => popup.close()}
            className="w-8 h-8 bg-[#cee4b8] hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"

          >
            <BiX className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 pt-4">
        <h2 className={classNames("text-xl font-semibold mb-6", "text-gray-800 dark:text-white")}>Reporte de Bache</h2>

        {data ? (
          <div className="space-y-4">
            {Object.entries(simpleData).map(([key, value]) => (
              <div key={key}>
                <span className="text-green-600 dark:text-green-400 font-medium text-sm">{key}:</span>
                <span className={classNames("text-sm ml-1", "text-gray-800 dark:text-gray-200")}>{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={classNames("text-sm font-semibold text-center", "text-gray-800 dark:text-white")}>
            {t(tref + ".empty")}
          </div>
        )}
      </div>
    </div>
  )
}

export default MetrixPopup
