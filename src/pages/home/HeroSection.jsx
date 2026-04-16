import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function HeroSection() {
  return (
    <Box
      bgGradient="linear(to-r, blue.500, purple.500)"
      color="white"
      py={{ base: 12, md: 20 }}
      px={6}
      borderBottomRadius="3xl"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={10}
      >
        {/* LEFT CONTENT */}
        <Stack spacing={6} maxW="500px">
          <Heading size="2xl" lineHeight="1.2">
            Home services,{" "}
            <Text as="span" color="yellow.300">
              on demand
            </Text>
          </Heading>

          <Text fontSize="lg" opacity={0.9}>
            Book trusted professionals for cleaning, repair, salon & more — all at your doorstep.
          </Text>

          {/* SEARCH BAR */}
          <InputGroup size="lg" bg="white" borderRadius="full">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search for services (e.g. AC Repair)"
              color="black"
              borderRadius="full"
            />
          </InputGroup>

          {/* CTA BUTTON */}
          <Button
            size="lg"
            colorScheme="blackAlpha"
            bg="black"
            _hover={{ bg: "gray.800" }}
            borderRadius="full"
          >
            Explore Services
          </Button>
        </Stack>

        {/* RIGHT CONTENT (IMAGE / ILLUSTRATION) */}
        <Box
          w={{ base: "100%", md: "400px" }}
          h="300px"
          bg="whiteAlpha.300"
          borderRadius="2xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontWeight="bold">
            🛠️ Illustration Here
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}