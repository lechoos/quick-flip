import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Font } from '@react-email/components';

const footerText = {
  fontSize: '12px',
  color: '#4d2f00',
  lineHeight: '15px',
  textAlign: 'left' as const,
};

const footer = {
  marginBottom: '20px',
};

const link = {
  color: '#4d2f00',
  fontWeight: 'bold',
  textDecoration: 'underline',
};

const main = {
  backgroundColor: '#ffb133',
  margin: '0 auto',
  fontFamily: "'Anonymous Pro', 'Segoe UI'," + " 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: '32px auto 0',
  padding: '0px 20px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '90px 0 30px',
  padding: '0',
  lineHeight: '42px',
  textAlign: 'center' as const,
};

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
};

const expireText = {
  ...heroText,
  textAlign: 'center' as const,
};

const codeBox = {
  background: '#ff9966',
  border: '5px solid #000',
  borderRadius: '16px',
  marginBottom: '30px',
  padding: '40px 10px',
};

const confirmationCodeText = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};

interface Props {
  validationCode: string;
}
const year = new Date().getFullYear();

const ResetPasswordEmail = ({ validationCode }: Props) => (
  <Html>
    <Head>
      <Font
        fontFamily="Anonymous Pro"
        webFont={{
          url: 'https://db.onlinewebfonts.com/t/1a728ab67ea9383bdb7ceb425d373ede.woff2',
          format: 'woff2',
        }}
        fallbackFontFamily="Verdana"
      />
    </Head>
    <Body style={main}>
      <Preview>Use a code to reset your password</Preview>
      <Container style={container}>
        <Heading style={h1}>Reset your password</Heading>
        <Text style={heroText}>Your confirmation code is below - enter it in the app, then you'll be able to make a new password.</Text>

        <Text style={expireText}>Code will expire in 5 minutes.</Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{validationCode}</Text>
        </Section>

        <Text style={text}>If you didn't request this email, you can safely ignore it.</Text>

        <Section style={footer}>
          <Text style={footerText}>
            &copy;{year} QuickFlip, owned by{' '}
            <Link
              style={link}
              href="https://lotusite.pl"
            >
              Lotusite
            </Link>{' '}
            <br /> <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

ResetPasswordEmail.PreviewProps = {
  validationCode: '123456',
} as Props;

export default ResetPasswordEmail;
