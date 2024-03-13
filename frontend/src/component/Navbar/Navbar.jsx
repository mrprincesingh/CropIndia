import { Box, Button, CloseButton, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, IconButton, Image, Text, chakra, useColorModeValue, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import ToggleColorMode from '../../theme/ToggleColorMode';
import logo1 from "../../asset/BharatGhar.png"

const options1 = {
  items: ["Home", "Services", "About Us", "Blog", "Contact Us"],
  links: ["/", "/services", "/aboutus", "/blog", "/contactus"]
};
const Navbar = () => {
    const bg = useColorModeValue("white", "gray.800");
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
         <div>
      <Fragment>
        <chakra.header
         bg="white"
         _dark="white"
          w="full"
          px={{
            base: 2,
            sm: 6,
          }}
          py={2}
          shadow="md"
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Flex  >
            
                       <Image h="45px" w="100%" src={logo1} alt="log" /> 
             
            </Flex>
            <HStack display="flex" alignItems="center" spacing={1}>
              <HStack
                spacing={1}
                mr={1}
                color="brand.500"
                display={{
                  base: "none",
                  md: "inline-flex",
                }}
              >
               

              </HStack>
              <Box
                display={{
                  base: "inline-flex",
                  md: "none",
                }}
              >
                <IconButton
                  display={{
                    base: "flex",
                    md: "none",
                  }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.800"
                  _dark={{
                    color: "inherit",
                  }}
                  variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={onOpen}
                />
                <Drawer isOpen={isOpen} onClose={onClose} placement="right">
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>  Bharat Ghar</DrawerHeader>
                    <DrawerBody>
                      {/* {options1.items.map((el, index) => (
                        <Box key={index} m="25px auto" fontSize={18} fontWeight={"500"}>

                          <Link to={options1.links[index]} onClick={onClose}>
                            <Text
                              cursor="pointer"
                              color="black"
                              fontFamily="Serif"
                            >
                            prince
                            </Text>
                          </Link>
                        </Box>
                      ))} */}

                    
                      <Box m="25px auto"></Box>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Box>
            </HStack>
          </Flex>
        </chakra.header>
      </Fragment>
    </div> 
    </div>
  )
}

export default Navbar