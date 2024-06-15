// HomePage.js
import Link from 'next/link';
import Image from "next/image";
import banner from "./banner.png";
import pizzam from "./pizzam.png";
import pizzap from "./pizzap.jpg";
import pizza4 from "./pizza4.jpg";
import "./index.css";
import Footer from "./footer"; // Importe o componente Footer

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Nona</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/pizza">Cadastrar Pizza</Link>
          <Link href="/lista">Lista de Pizzas</Link>
        </nav>
      </header>

      <section className="banner">
        <Image src={banner} alt="Banner" />
      </section>
      
      <section className="menu">
        <h2 className="menu-title">Nosso Cardápio</h2>
        <div className="menu-items">
          <div className="menu-item">
            <Image src={pizzam} alt="Pizza Margherita"/>
            <p>Deliciosa pizza com molho de tomate, queijo mozzarella e manjericão.</p>
          </div>
          <div className="menu-item">
            <Image src={pizzap} alt="Pizza Pepperoni"  />
            <h3>Pizza Pepperoni</h3>
            <p>Clássica pizza com queijo mozzarella e pepperoni crocante.</p>
          </div>
          <div className="menu-item">
            <Image src={pizza4} alt="Pizza Quatro Queijos"/>
            <h3>Pizza Quatro Queijos</h3>
            <p>Uma combinação perfeita de quatro queijos especiais.</p>
          </div>
        </div>
      </section>

      <Footer /> {/* Inclua o componente Footer aqui */}
    </div>
  );
};

export default HomePage;
