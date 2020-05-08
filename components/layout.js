import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main role="main">{this.props.children}</main>
        <Footer />
      </>
    );
  }
}

export default Layout;
