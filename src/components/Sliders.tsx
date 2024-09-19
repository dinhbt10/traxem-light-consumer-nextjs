"use client";

import React from "react";
import DefaultImageSlider from "../../public/default-product-image.jpg";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
type Props = {
    data: any;
};

const Sliders = ({ data }: Props) => {
    const imageSlide = data.map((item: any) => item.imageUrl);

    const settings: Settings = {
        speed: 3500,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        autoplaySpeed: 3500,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        fade: true,
        adaptiveHeight: true
    };

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.currentTarget;
        target.onerror = null;
        target.src = String(DefaultImageSlider);
    };

    return (
        <Slider {...settings}>
            {data.length > 0 &&
                imageSlide.map((item: any, index: number) => {
                    return (
                        <Box key={`Slide-${index}`} onError={handleError}>
                            <Stack
                                alignItems="center"
                                justifyContent="flex-start"
                                sx={{
                                    display: "flex",
                                    height: "254px"
                                }}
                            >
                                <Image
                                    src={item}
                                    alt={`Image ${index + 1}`}
                                    width={394}
                                    height={254}
                                    style={{
                                        cursor: "pointer",
                                        objectFit: "cover"
                                    }}
                                    onError={handleError}
                                />
                            </Stack>
                        </Box>
                    );
                })}
            {data.length === 0 && <Image alt="default" src={DefaultImageSlider} width={100} height={274} />}
        </Slider>
    );
};

export default Sliders;
