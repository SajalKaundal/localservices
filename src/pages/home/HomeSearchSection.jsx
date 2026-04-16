import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import CategoryCard from "../../components/CategoryCard";

const categories = [
  { title: "Salon", icon: "💇" },
  { title: "Cleaning", icon: "🧹" },
  { title: "AC Repair", icon: "❄️" },
  { title: "Plumbing", icon: "🔧" },
  { title: "Electrician", icon: "💡" },
  { title: "Painting", icon: "🎨" },
  { title: "Appliance", icon: "📺" },
  { title: "Carpenter", icon: "🪚" },
];

export default function HomeSearchSection() {
  return (
    <Box p={4}>
      {/* SEARCH BAR */}
      <InputGroup mb={6}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search for services (e.g. AC Repair)"
          bg={useColorModeValue("gray.100", "gray.700")}
          borderRadius="full"
        />
      </InputGroup>

      {/* TITLE */}
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        What are you looking for?
      </Text>

      {/* CATEGORY GRID */}
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {categories.map((cat) => (
          <CategoryCard key={cat.title} {...cat} />
        ))}
      </Grid>
    </Box>
  );
}
