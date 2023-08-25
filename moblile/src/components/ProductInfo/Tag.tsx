import { Box, Text } from 'native-base';

type Props = {
  isNew?: boolean
}
export const Tag = ({isNew}: Props) => {
  return (
    <Box
      mt={2}
      px={4}
      py={1}
      justifyContent="center"
      alignItems="center"
      bg="gray.500"
      rounded="full"
      w={20}
    >
      <Text
        color="gray.200"
        textTransform="uppercase"
        fontSize="xs"
        fontFamily="heading"
      >
        {isNew ? 'Novo' : 'Usado'}
      </Text>
    </Box>
  )
}
