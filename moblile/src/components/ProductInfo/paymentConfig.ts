import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native';

export const PaymentConfig = {
  boleto: {
    icon: Barcode
  },
  pix: {
    icon: QrCode,
  },
  cash: {
    icon: Money,
  },
  deposit: {
    icon: Bank
  },
  card: {
    icon: CreditCard
  },
  
};
