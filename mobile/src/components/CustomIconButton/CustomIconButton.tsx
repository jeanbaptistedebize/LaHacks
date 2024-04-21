import { Box } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface Props {
  onPress?: () => void;
  children: JSX.Element;
}

function CustomIconButton({ onPress, children }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box backgroundColor="transparent" p={5}>
        {children}
      </Box>
    </TouchableOpacity>
  );
}

export default CustomIconButton;
