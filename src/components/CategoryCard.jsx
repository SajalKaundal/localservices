import { Box, Text, VStack } from "@chakra-ui/react";

export default function CategoryCard({ title, icon }) {
  return (
    <VStack
      p={4}
      bg="white"
      borderRadius="xl"
      shadow="sm"
      cursor="pointer"
      transition="0.2s"
      _hover={{ transform: "scale(1.05)", shadow: "md" }}
    >
      <Text fontSize="2xl">{icon}</Text>
      <Text fontSize="sm" fontWeight="medium">
        {title}
      </Text>
    </VStack>
  );
}
