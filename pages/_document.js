import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "../components/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
