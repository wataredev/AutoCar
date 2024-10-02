import {useState, useEffect} from "react";
import "./App.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

const url = "http://localhost:3000/carros";

function App() {
  const [carros, setCarros] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    async function fetchData(url) {
      const resp = await fetch(url);
      const data = await resp.json();
      setCarros(data);
    }
    fetchData(url);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carros = {nome, preco: parseFloat(preco), ano: parseInt(ano), modelo};

    let responsivo;
  };
  

  return (
    <>
      <Header />
      <Body
        carros={carros}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        preco={preco}
        setNome={setNome}
        setPreco={setPreco}
        ano={ano}
        setAno={setAno}
        modelo={modelo}
        setModelo={setModelo}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </>
  );
}

export default App;
