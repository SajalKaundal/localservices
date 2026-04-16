import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Text,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Bookings", path: "/bookings" },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      px={4}
      position="sticky"
      top="0"
      zIndex="1000"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* LEFT */}
        <HStack spacing={4} alignItems="center">
          {/* Mobile Menu Button */}
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={onOpen}
          />

          {/* Logo */}
          <Text fontSize="xl" fontWeight="bold" color="blue.500">
            🔧 QuickServe
          </Text>

          {/* Location */}
          <Box display={{ base: "none", md: "block" }}>
            <Text fontSize="sm" color="gray.500">
              Location
            </Text>
            <Text fontWeight="medium"> Your Area</Text>
          </Box>
        </HStack>

        {/* CENTER - SEARCH */}
        <Box flex={1} mx={4} display={{ base: "none", md: "block" }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search for services (e.g. AC Repair)"
              bg={useColorModeValue("gray.100", "gray.700")}
            />
          </InputGroup>
        </Box>

        {/* RIGHT */}
        <Flex alignItems="center">
          {/* Desktop Links */}
          <HStack spacing={6} display={{ base: "none", md: "flex" }} mr={4}>
            {Links.map((link, index) => (
              <Button
                key={index}
                onClick={() => navigate(link.path)}
                variant="ghost"
              >
                {link.name}
              </Button>
            ))}
          </HStack>

          {/* Notifications */}
          <IconButton
            icon={<BellIcon />}
            variant="ghost"
            aria-label="Notifications"
            mr={2}
          />

          {/* Profile Menu */}
          <Menu>
            <MenuButton>
              <HStack>
                <Avatar size="sm" />
                <ChevronDownIcon />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My Bookings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* MOBILE DRAWER */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">QuickServe</DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              {Links.map((link,index) => (
                <Button key={index} onClick={()=>navigate(link.path)} variant="ghost" w="full">
                  {link.name}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
