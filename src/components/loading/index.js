import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
    return (
        <Center mu={20}>
            <Spinner />
        </Center>
    )
}

export default Loading;