import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";
import { Gallery } from "react-photoswipe-gallery";
import Slider from "react-slick";
import { Box } from "@mui/material";
import AutoSizedItem from "./AutoSizedItem";

interface ImageSliderProps {
    images: { src: string }[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const settings = {
        speed: 1500,
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        autoplaySpeed: 1500,
        slidesToScroll: 1,
        dots: images.length > 1 ? true : false,
        arrows: false,
        fade: true,
        adaptiveHeight: true,
        customPaging: (_: number) => (
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "gray",
                    margin: "5px",
                    display: "inline-block"
                }}
            />
        ),
        dotsClass: "slick-dots slick-thumb"
    };

    return (
        <>
            {images.length > 1 ? (
                <Box>
                    <Gallery
                        options={{
                            wheelToZoom: true,
                            zoom: true
                        }}
                    >
                        <Box
                            className="slider-container"
                            my="8px"
                            sx={{
                                "& .slick-dots": {
                                    position: "unset"
                                }
                            }}
                        >
                            <Slider {...settings}>
                                {images.map((url, index) => {
                                    return <AutoSizedItem src={url.src} key={index + 1} autoSize={false} />;
                                })}
                            </Slider>
                        </Box>
                    </Gallery>
                </Box>
            ) : (
                <>
                    <Box my="8px">
                        <Gallery
                            options={{
                                wheelToZoom: true,
                                zoom: true
                            }}
                        >
                            <AutoSizedItem src={images[0]?.src} autoSize={true} />
                        </Gallery>
                    </Box>
                </>
            )}
        </>
    );
};

export default ImageSlider;
