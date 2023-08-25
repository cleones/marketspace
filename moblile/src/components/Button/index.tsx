import { Button as NativeBaseButton, Heading, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  type?: 'BLACK' | "BLUE" | 'GRAY'
  
}
export const Button = ({title, variant = 'solid', type = "BLUE", ...rest}: Props) => {
  
  const bgColor = type === "BLACK" ? 'gray.100' : type === 'BLUE' ? 'blue.200' : 'gray.500';
  const pressBgColor = type === "BLACK" ? 'gray.400' : type === 'BLUE' ? 'blue.500' : 'gray.400';
  
  const textColor = type === "GRAY" ? 'gray.200' : 'gray.700';
  
  return (
    <NativeBaseButton
      w="full"
      h={12}
      bg={bgColor}
      
      rounded="md"
      _pressed={{
        bg: pressBgColor,
      }}
      
      {...rest}
    >
      <Heading
        color={textColor}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Heading>
    </NativeBaseButton>
  );
};
