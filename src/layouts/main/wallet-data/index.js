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


const WalletData = () => {
  return (
    <Flex alignItems={"center"}>
      {true ? (
        <Tag colorScheme="green" borderRadius="full">
          <TagLabel>
            <Link to="/punks">0x0000...0000</Link>
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
            ~0 Ξ
          </Badge>
          <TagCloseButton />
        </Tag>
      ) : (
        <Button
          variant={"solid"}
          colorScheme={"green"}
          size={"sm"}
          leftIcon={<AddIcon />}  
        >
          Conectar wallet
        </Button>
      )}
    </Flex>
  );
};

export default WalletData;
