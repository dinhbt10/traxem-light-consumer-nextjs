import React from "react";
import { Box, BoxProps, Container as ContainerMUI, ContainerProps } from "@mui/material";

type Props = {
    children: React.ReactNode;
    wrapProps?: BoxProps;
    containerProps?: ContainerProps;
};

const Container: React.FC<Props> = ({ children, wrapProps, containerProps }) => {
    return (
        <Box {...wrapProps}>
            <ContainerMUI maxWidth="xl" {...containerProps}>
                {children}
            </ContainerMUI>
        </Box>
    );
};

export default Container;
