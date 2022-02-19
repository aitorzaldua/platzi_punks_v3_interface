import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { UnsupportedChainIdError } from "@web3-react/core";
import { connector } from "../../../config/web3";
import { useCallback, useEffect, useState } from "react";
import useTruncatedAddress from "../../../hooks/useTruncatedAddress";


const WalletData = () => { 

  const [balance, setBalance] = useState(0);

  const { active, activate, deactivate, account, error, library } = useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  }

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  //Account but shorted:
  const truncatedAddress = useTruncatedAddress(account);

  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    setBalance((toSet / 1e18).toFixed(2));
  }, [library?.eth, account]);

  useEffect(() => { 
    if (active) getBalance();
  }, [active, getBalance]);

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;


  return (
    <Flex alignItems={"center"}>
      {active ? (
        <Tag colorScheme="green" borderRadius="full">
          <TagLabel>
            <Link to="/punks">{truncatedAddress}</Link>
          </TagLabel>
          <Badge
            d={{
              base: "none",
              md: "block",
            }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}
          >
            ~ {balance} ETH
          </Badge>
          <TagCloseButton 
            onClick={disconnect}
          />
        </Tag>
      ) : (
        <Button
          variant={"solid"}
          colorScheme={"green"}
          size={"sm"}
          leftIcon={<AddIcon />}
          onClick={connect}  
        >
          {isUnsupportedChain ? "Not supported chain" : "Conectar wallet"}
        </Button>
      )}
    </Flex>
  );
};

export default WalletData;
