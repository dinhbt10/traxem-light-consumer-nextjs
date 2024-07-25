import { ReactNode } from "react";
import { NextPage } from "next";
import Container from "components/Container";

const DashboardLayout: NextPage<{ children: ReactNode }> = ({ children }) => {
    return <Container wrapProps={{ sx: { maxWidth: "430px", width: "100%", margin: "auto" } }}>{children}</Container>;
};

export default DashboardLayout;
