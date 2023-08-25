import { Icon, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  show: boolean,
  handleShow:() => void
}
export const ShowPasswordIcon = ({show, handleShow}:Props) => {
  
  return (
    <Pressable onPress={handleShow}>
      <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'}/>} size={5}
            mr="2"
            color="muted.400"/>
    </Pressable>
  );
};
