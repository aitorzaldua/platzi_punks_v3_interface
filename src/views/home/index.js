import {
    Stack,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    Badge,
    useToast,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import usePlatziPunks from "../../hooks/usePlatzi";
import { useCallback, useEffect, useState } from "react";
import useTruncatedAddress from  "../../hooks/useTruncatedAddress";

const Home = () => {
    const [imageSrc, setImageSrc] = useState("");
    const [isMinting, setIsMinting] = useState(false);
    const { active, account } = useWeb3React();
    const platziPunks = usePlatziPunks();
    const toast = useToast();

    const getPlatziPunksData = useCallback(async () => {
        if (platziPunks) {
            const totalSupply = await platziPunks.methods.totalSupply().call();
            const dnaPreview = await platziPunks.methods
            .deterministicPseudoRandomDNA(totalSupply, account)
            .call();
                const image = await platziPunks.methods.imageByDNA(dnaPreview).call();
                setImageSrc(image);
              }
    }, [platziPunks, account]);

    useEffect(() => {
        getPlatziPunksData();
    }, [getPlatziPunksData]);

    const mint = () => {
        setIsMinting(true);
        platziPunks.methods.mint().send({
          from: account,
          //value: 1e18,
        })
        .on("transactionhash", () => {
          toast({
            title: 'Transacción enviada',
            description: 'txHash',   //de la documentación de send().on(transactionhash)
            status: 'info',
          })
          setIsMinting(false);
        })
        .on("receipt", () => {
          setIsMinting(false);
          toast({
            title: 'transacción confirmada',
            description: 'Beautiful NFT!',
            status: 'success',
          })
        })
        .on("error", (error) => {
          setIsMinting(false);
          toast({
            title: "transacción fallida",
            description: error.message,
            status: "error",
          })
        })
    }

    //Reminder Supply
    const [maxSupply, setMaxSupply] = useState();
    const [remSupply, setRemSupply] = useState();
    const [totalSupply, setTotalSupply] = useState();

    const getMaxSupply = useCallback(async () => {
        if (platziPunks) {
            const result = await platziPunks.methods.maxSupply().call();
            const totalSupply = await platziPunks.methods.totalSupply().call();

          const remainigSupply = result - totalSupply + 1;

            setMaxSupply(result);
            setRemSupply(remainigSupply);
            setTotalSupply (totalSupply);
        } 
    }, [platziPunks]);

    useEffect(() => {
        getMaxSupply();
    }, [getMaxSupply]);

     //End of reminder supply
    //address
    const truncatedAddress = useTruncatedAddress(account);

    if (!active) return "Please, connect your wallet";
   

    return (
        <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            Create your NFT
          </Text>
          <br />
          <Text as={"span"} color={"green.400"}>
            Based on the original designs by Pablo Stanley
          </Text>
        </Heading>
        <Text color={"gray.500"}>
        Draft Digital Punks is a collection of randomized Avatars whose metadata is stored on-chain. Each Punk is generated sequentially based on your address and current id, so it is unique, exclusive to you.
        </Text>
        <Text color={"green.500"}>
        There are only {maxSupply} in existence and {remSupply} remains to minted. Check your collection at https://testnets.opensea.io/
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"green"}
            bg={"green.400"}
            _hover={{ bg: "green.500" }}
            disabled={!platziPunks}
            onClick={mint}
            isLoading = {isMinting}
          >
            Mint Now!
          </Button>
          <Link to="/punks">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Gallery
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src= {active ? imageSrc : "https://avataaars.io/" } />
        {active ? (
          <>
            <Flex mt={2}>
              <Badge>
                Next ID: {totalSupply}
                <Badge ml={1} colorScheme="green">
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address: 
                <Badge ml={1} colorScheme="green">
                  {truncatedAddress}
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getPlatziPunksData}
              mt={4}
              size="xs"
              colorScheme="green"
            >
              Visualize
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet disconnected</Badge>
        )}
      </Flex>
    </Stack>
  );
}

export default Home;


