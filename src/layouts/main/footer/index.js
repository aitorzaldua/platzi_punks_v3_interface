import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center"}}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © {new Date().getFullYear()} Draft Digital Punks was made with 💚 by MG 
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
