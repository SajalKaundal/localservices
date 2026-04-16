import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FaTools, FaBroom, FaBolt, FaPaintRoller } from "react-icons/fa";

const services = [
  {
    title: "Home Cleaning",
    description: "Professional cleaning services for your home.",
    icon: FaBroom,
  },
  {
    title: "Electrician",
    description: "Expert electricians for all your electrical needs.",
    icon: FaBolt,
  },
  {
    title: "Plumbing",
    description: "Quick and reliable plumbing solutions.",
    icon: FaTools,
  },
  {
    title: "Painting",
    description: "Give your home a fresh new look.",
    icon: FaPaintRoller,
  },
];

export default function Services() {
  return (
    <Box p={6}>
      {/* Hero Section */}
      <VStack spacing={4} textAlign="center" mb={10}>
        <Heading size="2xl">Our Services</Heading>
        <Text fontSize="lg" color="gray.500">
          Book trusted professionals for all your home needs
        </Text>
      </VStack>

      {/* Services Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {services.map((service, index) => (
          <Box
            key={index}
            p={6}
            borderRadius="2xl"
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
            textAlign="center"
          >
            <VStack spacing={4}>
              <Icon as={service.icon} boxSize={10} color="blue.400" />
              <Heading size="md">{service.title}</Heading>
              <Text color="gray.500">{service.description}</Text>
              <Button colorScheme="blue" size="sm">
                Book Now
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}