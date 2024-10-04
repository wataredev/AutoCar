import { useState, useEffect } from "react";
import "./App.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

const url = "http://localhost:3000/carros";

function App() {
  const [carros, setCarros] = useState([]);
  const [preco, setPreco] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [marca, setMarca] = useState("");
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
  
    const carro = {
      preco: parseFloat(preco),
      ano: parseInt(ano),
      modelo,
      marca,
    };
  
    try {
      let res;
  
      if (editId) {
        res = await fetch(`${url}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carro),
        });
      } else {
        res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carro),
        });
      }
  
      if (res.ok) {
        await fetchList();
      }
  
      setModelo("");
      setMarca("");
      setPreco("");
      setAno("");
      setEditId(null);
    } catch (error) {
      console.error("Erro ao salvar o carro:", error);
    }
  };
  
  const handleEdit = (carro) => {
    setModelo(carro.modelo);
    setMarca(carro.marca);
    setPreco(carro.preco);
    setAno(carro.ano);
    setEditId(carro.id);
  
   };
  
   const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este veículo?");
    
      if (!confirmDelete) {
        return;
      }
    
      try {
        let res = await fetch(`${url}/${id}`, {
          method: "DELETE",
        });
    
        if (res.ok) {
          await fetchList(); 
        }
      } catch (error) {
        console.error("Erro ao excluir o carro:", error);
      }
    };
  
  const fetchList = async () => {
    try {
      let res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setCarros(data);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de carros:", error);
    }
  };

  return (
    <>
      <Header />
      <Body
        carros={carros}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        preco={preco}
        setPreco={setPreco}
        ano={ano}
        setAno={setAno}
        modelo={modelo}
        setModelo={setModelo}
        marca={marca}
        setMarca={setMarca}
        handleSubmit={handleSubmit}
        editId={editId}
      />
      <Footer />
    </>
  );
}

export default App;
