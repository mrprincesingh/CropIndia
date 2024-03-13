import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    
    <Button
      onClick={() => toggleColorMode()}
      _dark={{bg:'gray.900'}}
      box-shadow="rgba(0, 0, 0, 0.4) 0px 30px 90px"
    >
      {colorMode === "dark" ? (
        <SunIcon   color="white"/>
      ) : (
        <MoonIcon color="blue.700" />
      )}
    </Button>
  );
};

export default ToggleColorMode;