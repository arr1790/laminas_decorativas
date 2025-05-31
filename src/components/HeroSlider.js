"use client";
import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    { src: "/lamina1.png", alt: "Portada 1" },
    { src: "/port5.webp", alt: "Portada 2" }, //imagen 2
    
];

export default function HeroSlider() {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        afterChange: (current) => setActiveSlide(current),
    };

    return (
        <div className="relative w-full  md:h-[85vh] overflow-hidden">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={1920}
                            height={1080}
                            priority={index === 0}
                            quality={100}
                           className="object-cover absolute top-2 left-0 w-full h-full" // Agregamos un margen superior de 16px
                        />

                        {index === activeSlide && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute bottom-0 left-0 right-0 flex flex-col justify-end items-center text-center text-white bg-transparent"
                            >
                                <motion.h2
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="text-3xl md:text-5xl font-bold drop-shadow-lg text-white"
                                >
                                    EL REGALO PERFECTO
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="mt-2 text-lg md:text-xl text-white"
                                >
                                    Láminas Decorativas 🖤
                                </motion.p>

                                <motion.a
                                    href="/categorias/Decorativas"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="mt-4 mb-1.5 px-6 py-2 bg-black text-white text-sm uppercase tracking-wide hover:bg-white hover:text-black border border-white transition"
                                >
                                    Comprar ahora
                                </motion.a>
                            </motion.div>
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
}