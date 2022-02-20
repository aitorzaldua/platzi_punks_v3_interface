import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import usePlatziPunks from "../../hooks/usePlatzi";
const Home = () => {

    const { active } = useWeb3React();
    const [maxSupply, setMaxSupply] = useState();

    const platziPunks = usePlatziPunks();

    const getMaxSupply = useCallback(async () => {
        if (platziPunks) {
            const result = await platziPunks.methods.maxSupply().call();
            setMaxSupply(result);
        }
    }, [platziPunks]);

    useEffect(() => {
        getMaxSupply();
    }, [getMaxSupply]);

    if (!active) return "Please, connect your wallet";


    return (
        <>
            <p>The maximum of NFTs is: {maxSupply}</p>
        </>
    );
}

export default Home;


