"use client"
import classNames from "classnames"
import type React from "react"
import type { CustomPopupProps } from "@/types/Layers"

import { BiX } from "react-icons/bi"
import {
  HiArrowUpRight,
  HiTicket,
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
  HiPlay,
  HiPause,
  HiSpeakerWave,
  HiSpeakerXMark,
} from "react-icons/hi2"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"

interface MediaFile {
  id: string
  url: string
  type: "image" | "video" | "audio"
  mimeType: string
  description: string
  size?: string
  uploadDate?: string
}

type TabType = "details" | "edit" | "user" | "photos" | "activities"

const MetrixPopup = ({ data, popup, root }: CustomPopupProps) => {
  const { t } = useTranslation("global")
  const tref = "body.custom-popup"
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("details")
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)


  // Estados para reproducción de video/audio
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "N/A") return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const formatFileSize = (bytes: string | number) => {
    const size = typeof bytes === "string" ? Number.parseInt(bytes) : bytes
    if (isNaN(size)) return ""

    const units = ["B", "KB", "MB", "GB"]
    let unitIndex = 0
    let fileSize = size

    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024
      unitIndex++
    }

    return `${fileSize.toFixed(1)} ${units[unitIndex]}`
  }

  // Función para determinar el tipo de archivo basado en el MIME type
  const getFileType = (mimeType: string): "image" | "video" | "audio" => {
    if (mimeType.startsWith("image/")) return "image"
    if (mimeType.startsWith("video/")) return "video"
    if (mimeType.startsWith("audio/")) return "audio"
    return "image" // default fallback
  }



  // Obtener archivos multimedia de los datos
  const getMediaFiles = (): MediaFile[] => {
    const sourceData = data

    if (sourceData?.archivos && Array.isArray(sourceData.archivos) && sourceData.archivos.length > 0) {
      return sourceData.archivos
        .filter(
          (archivo: any) =>
            archivo.tipo_mime &&
            (archivo.tipo_mime.startsWith("image/") ||
              archivo.tipo_mime.startsWith("video/") ||
              archivo.tipo_mime.startsWith("audio/")),
        )
        .map((archivo: any) => ({
          id: archivo.id,
          url: archivo.ruta_firmada || archivo.ruta || "",
          type: getFileType(archivo.tipo_mime),
          mimeType: archivo.tipo_mime,
          description: archivo.descripcion,
          size: archivo.tamano,
          uploadDate: archivo.fecha_subida,
        }))
        .filter((file: MediaFile) => file.url && file.url.trim() !== "")
    }

    // Fallback a la URL básica si existe
    if (sourceData?.url && sourceData.url !== "") {
      return [
        {
          id: "main",
          url: sourceData.url,
          type: "image",
          mimeType: "image/jpeg",
          description: sourceData.descripcion || "",
          size: undefined,
          uploadDate: sourceData.fecha_creacion,
        },
      ]
    }

    return []
  }

  const mediaFiles = getMediaFiles()
  const currentMedia = mediaFiles[currentMediaIndex]

  // Resetear el índice cuando cambien los archivos
  useEffect(() => {
    setCurrentMediaIndex(0)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [mediaFiles.length])

  // Manejar reproducción de video/audio
  const togglePlayPause = () => {
    const mediaElement = currentMedia?.type === "video" ? videoRef.current : audioRef.current
    if (!mediaElement) return

    if (isPlaying) {
      mediaElement.pause()
    } else {
      mediaElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const mediaElement = currentMedia?.type === "video" ? videoRef.current : audioRef.current
    if (!mediaElement) return

    mediaElement.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    const mediaElement = currentMedia?.type === "video" ? videoRef.current : audioRef.current
    if (!mediaElement) return

    setCurrentTime(mediaElement.currentTime)
    setDuration(mediaElement.duration || 0)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mediaElement = currentMedia?.type === "video" ? videoRef.current : audioRef.current
    if (!mediaElement) return

    const newTime = Number.parseFloat(e.target.value)
    mediaElement.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Navegación entre archivos multimedia
  const goToPrevious = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : mediaFiles.length - 1))
    setIsPlaying(false)
  }

  const goToNext = () => {
    setCurrentMediaIndex((prev) => (prev < mediaFiles.length - 1 ? prev + 1 : 0))
    setIsPlaying(false)
  }

  const mockActivities = [
    {
      time: data?.fecha_creacion ? formatDate(data.fecha_creacion) : "",
      description: "Se reporta: " + (data?.titulo || ""),
    },
    {
      time: data?.fecha_modificacion ? formatDate(data.fecha_modificacion) : "",
      description: data?.descripcion || "",
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
      const url = "https://www.google.com/maps?q=" + data.latitud + "," + data.longitud
      window.open(url, "_blank")
    }
    setShowDropdown(false)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.titulo || "",
        text: "Ticket #" + (data?.identificador || "") + ": " + (data?.titulo || ""),
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

  const getSimpleViewData = () => {
    if (!data) return {}
    return {
      "Fecha de creación": formatDate(data.fecha_creacion),
      Clasificación: data.titulo,
      Prioridad: data.prioridad,
      Estatus: data.estado,
      Descripción: data.descripcion,
    }
  }

  const getDetailedViewData = () => {
    const sourceData = data
    if (!sourceData) return { ticketId: "", leftColumn: {}, rightColumn: {}, bottomSection: {} }

    return {
      ticketId: sourceData.identificador,
      leftColumn: {
        "Fecha de creación": formatDate(sourceData.fecha_creacion),
        Clasificación: sourceData.titulo,
        Prioridad: sourceData.prioridad,
        Estatus: sourceData.estado,
        "Fecha de vencimiento": formatDate(sourceData.fecha_vencimiento),
      },
      rightColumn: {
        Cliente: sourceData.nombre_cliente,
        Área: sourceData.nombre_area,
        Usuario: sourceData.nombre_usuario,
        Dirección: sourceData.direccion || sourceData.direccion_completa,
        Coordenadas:
          sourceData.latitud && sourceData.longitud ? sourceData.latitud + ", " + sourceData.longitud : "",
      },
      bottomSection: {
        Descripción: sourceData.descripcion,
        "Información adicional":
          "Municipio: " +
          (sourceData.municipio || "") +
          ", Colonia: " +
          (sourceData.colonia || "") +
          ", CP: " +
          (sourceData.codigo_postal || ""),
      },
    }
  }

  // Renderizar contenido multimedia
  const renderMediaContent = () => {
    if (!currentMedia) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <HiCamera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <div className="text-sm text-gray-500 dark:text-gray-400"></div>
          </div>
        </div>
      )
    }

    switch (currentMedia.type) {
      case "image":
        return (
          <div className="relative">
            <img
              src={currentMedia.url || "/placeholder.svg"}
              alt={currentMedia.description}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                console.error("Error loading image:", currentMedia.url)
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3C/svg%3E"
              }}
            />
            {/* Navigation arrows */}
            {mediaFiles.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-colors"
                >
                  <HiChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-colors"
                >
                  <HiChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}
          </div>
        )

      case "video":
        return (
          <div className="relative">
            <video
              ref={videoRef}
              src={currentMedia.url}
              className="w-full h-64 object-cover rounded-lg"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              muted={isMuted}
            />

            {/* Video controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={togglePlayPause}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <HiPause className="w-4 h-4 text-white" />
                  ) : (
                    <HiPlay className="w-4 h-4 text-white ml-0.5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <HiSpeakerXMark className="w-4 h-4 text-white" />
                  ) : (
                    <HiSpeakerWave className="w-4 h-4 text-white" />
                  )}
                </button>

                <div className="flex-1 mx-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <span className="text-white text-xs">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Navigation arrows */}
            {mediaFiles.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-colors"
                >
                  <HiChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-colors"
                >
                  <HiChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}
          </div>
        )

      case "audio":
        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <audio
              ref={audioRef}
              src={currentMedia.url}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              muted={isMuted}
            />

            <div className="text-center mb-4">
              <HiSpeakerWave className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentMedia.description}</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 bg-lime-600 hover:bg-lime-700 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <HiPause className="w-6 h-6 text-white" />
                  ) : (
                    <HiPlay className="w-6 h-6 text-white ml-1" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-8 h-8 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <HiSpeakerXMark className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <HiSpeakerWave className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Navigation arrows for audio */}
            {mediaFiles.length > 1 && (
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={goToPrevious}
                  className="w-8 h-8 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <HiChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-8 h-8 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <HiChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const renderTabContent = () => {
    const detailedViewData = getDetailedViewData()

    switch (activeTab) {
      case "details":
        return (
          <div>
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4 pt-4 px-6 pb-4 bg-gray-100 border-2 border-gray-100 rounded-lg">
                {Object.entries(detailedViewData.leftColumn).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-lime-600 dark:text-lime-400 font-medium text-sm">{key}:</div>
                    <div className="text-sm text-gray-800 dark:text-gray-200">{value}</div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4 pt-4 px-6 pb-4 bg-gray-100 border-2 border-gray-100 rounded-lg">
                {Object.entries(detailedViewData.rightColumn).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-lime-600 dark:text-lime-400 font-medium text-sm">{key}:</div>
                    <div className="text-sm text-gray-800 dark:text-gray-200">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-4 pt-4 px-6 pb-4 bg-gray-100 border-2 border-gray-100 rounded-lg">
                <div className="text-lime-600 dark:text-lime-400 font-medium text-sm">Observaciones (Operador):</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">
                  {(detailedViewData.bottomSection as Record<string, string>)?.["Observaciones (Operador)"] ||
                    ""}
                </div>
              </div>

              <div className="space-y-4 pt-4 px-6 pb-4 bg-gray-100 border-2 border-gray-100 rounded-lg">
                <div className="text-lime-600 dark:text-lime-400 font-medium text-sm">
                  Comentarios (Área Responsable):
                </div>
                <div className="text-sm text-gray-800 dark:text-gray-200">
                  {(detailedViewData.bottomSection as Record<string, string>)?.["Comentarios (Área Responsable)"] ||
                    ""}
                </div>
              </div>
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
                  <div className="text-lime-600 dark:text-lime-400 font-medium text-sm">{activity.time}</div>
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
            {mediaFiles.length > 0 ? (
              <>
                {renderMediaContent()}

                {/* Media info and counter */}
                <div className="space-y-2">
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {`${currentMediaIndex + 1} de ${mediaFiles.length}`}
                    {currentMedia && (
                      <span className="ml-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                        {currentMedia.type.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {currentMedia && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-1">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Descripción:</strong> {currentMedia.description}
                      </div>
                      {currentMedia.size && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Tamaño:</strong> {formatFileSize(currentMedia.size)}
                        </div>
                      )}
                      {currentMedia.uploadDate && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Fecha:</strong> {formatDate(currentMedia.uploadDate)}
                        </div>
                      )}
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Tipo:</strong> {currentMedia.mimeType}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <HiCamera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-500 dark:text-gray-400"></div>
                </div>
              </div>
            )}
          </div>
        )

      case "edit":
        return (
          <div>
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                {Object.entries(detailedViewData.leftColumn).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-lime-600 dark:text-lime-400 font-medium text-sm">{key}:</div>
                    <div className={classNames("text-sm", "text-gray-800 dark:text-gray-200")}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {Object.entries(detailedViewData.rightColumn).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-lime-600 dark:text-lime-400 font-medium text-sm">{key}:</div>
                    <div className={classNames("text-sm", "text-gray-800 dark:text-gray-200")}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const simpleData = getSimpleViewData()
  const detailedViewData = getDetailedViewData()

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
              ID Ticket: {detailedViewData.ticketId}
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
            <h2 className={classNames("text-xl font-semibold", "text-gray-800 dark:text-white")}>
              {data?.titulo}
            </h2>
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
                <HiTicket className="w-4 h-4 text-gray-600 dark:text-gray-300" />
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
                {mediaFiles.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{mediaFiles.length}</span>
                  </div>
                )}
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
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              setShowDetailedView(true)
              setActiveTab("details")
            }}
            className="w-8 h-8 bg-[#cee4b8] hover:bg-gray-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-full flex items-center justify-center transition-colors"
          >
            <HiArrowUpRight className="w-4 h-4 text-lime-600 dark:text-lime-400" />
          </button>

          {/* Close button - preserved original functionality */}
          <button
            onClick={() => {
              popup.close();
              root.unmount()
            }}
            className="w-8 h-8 bg-[#cee4b8] hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
          >
            <BiX className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 pt-4">
        <h2 className={classNames("text-xl font-semibold mb-6", "text-gray-800 dark:text-white")}>
          {data?.titulo}
        </h2>

        {data ? (
          <div className="space-y-4">
            {Object.entries(simpleData).map(([key, value]) => (
              <div key={key}>
                <span className="text-lime-600 dark:text-lime-400 font-medium text-sm">{key}:</span>
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
