import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
    { src: "/image/principal/galeria/image01.jpeg", alt: "Galería imagen 1" },
    { src: "/image/principal/galeria/image02.jpeg", alt: "Galería imagen 2" },
    { src: "/image/principal/galeria/image03.jpeg", alt: "Galería imagen 3" },
    { src: "/image/principal/galeria/image04.jpeg", alt: "Galería imagen 4" },
    { src: "/image/principal/galeria/image05.jpeg", alt: "Galería imagen 5" },
    { src: "/image/principal/galeria/image06.jpeg", alt: "Galería imagen 6" },
];

export default function GalleryInteractive() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openModal = (index: number) => setSelectedIndex(index);
    const closeModal = () => setSelectedIndex(null);

    const prevImage = useCallback(() => {
        setSelectedIndex((prev) =>
            prev === null ? null : (prev - 1 + images.length) % images.length
        );
    }, []);

    const nextImage = useCallback(() => {
        setSelectedIndex((prev) =>
            prev === null ? null : (prev + 1) % images.length
        );
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, prevImage, nextImage]);

    return (
        <div className="container mx-auto px-4">
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer"
                        onClick={() => openModal(index)}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedIndex !== null && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10"
                        onClick={closeModal}
                    >
                        <X className="w-8 h-8" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/10 hidden md:flex h-12 w-12"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </Button>

                    <div className="relative max-w-5xl max-h-[85vh] w-full flex justify-center pointer-events-none">
                        <img
                            src={images[selectedIndex].src}
                            alt={images[selectedIndex].alt}
                            className="max-h-[85vh] max-w-full object-contain rounded-md shadow-2xl pointer-events-auto"
                        />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/10 hidden md:flex h-12 w-12"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </Button>

                    {/* Mobile Controls placed below image */}
                    <div className="absolute bottom-8 left-0 w-full flex justify-center gap-8 md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            <ChevronRight className="w-8 h-8" />
                        </Button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
