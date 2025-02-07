import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  firstName: string;
  secondName?: string;
  email?: string;
  phone?: string;
  partnership?: boolean;
  needHelp?: boolean;
  text?: string;
  helpType?: string;
  aim?: string;
}

export const Email = ({
  firstName = 'Zeno',
  partnership = true,
  secondName,
  email,
  phone,
  needHelp,
  text,
  helpType,
  aim,
}: EmailProps) => (
  <Html>
    <Head />
    <Preview>Благотворительный фонд Дело Чести</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://astroclick.ru/logo.svg"
          width="100"
          height="100"
          alt="Благотворительный фонд Дело Чести"
          style={logo}
        />
        <Text style={paragraph}>Заявка на помощь</Text>
        <Text style={paragraph}>Нужна помощь для: {aim}</Text>
        <Text style={paragraph}>Меня зовут {firstName}</Text>

        <Text style={paragraph}>Моя электронная почта: {email}</Text>
        <Text style={paragraph}>Мой телефонный номер: {phone}</Text>
        <Text style={paragraph}>{text}</Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://astroclick.ru">
            Фонд
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>Благотворительный фонд Дело чести</Text>
      </Container>
    </Body>
  </Html>
);

export default Email;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  padding: '12px',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};
