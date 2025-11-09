import React, { useState, useEffect } from 'react';

const images = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop', // Students on campus lawn
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', // Graduation caps in air
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop', // Student writing in notebook
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop', // Lecture hall from back
    'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2048&auto=format&fit=crop', // University building exterior
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop', // Library interior
    'https://images.unsplash.com/photo-1627556704290-2b1f58500c8a?q=80&w=1974&auto=format&fit=crop', // Students with backpacks walking
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop', // Science lab work
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop', // Students in a classroom
    'https://images.unsplash.com/photo-1543321269-9d86d3680e92?q=80&w=2069&auto=format&fit=crop', // Sports team huddle
];

const DashboardBanner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="relative w-full h-56 md:h-80 rounded-lg shadow-lg overflow-hidden">
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img src={src} alt={`College banner ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-center">
                         <h2 className="text-white text-3xl md:text-5xl font-bold tracking-wider px-4">Your Gateway to Success</h2>
                    </div>
                </div>
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default DashboardBanner;