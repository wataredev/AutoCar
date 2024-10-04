import { useState, useEffect } from "react"; // Importação de hooks do React
import "./App.css"; // Importação do arquivo de estilos CSS
import Body from "./components/Body"; // Importação do componente Body
import Footer from "./components/Footer"; // Importação do componente Footer
import Header from "./components/Header"; // Importação do componente Header

const url = "http://localhost:3000/carros"; // URL da API local que gerencia os carros


function App() {

  // Definição dos estados para os atributos dos carros e controle de edição
  const [carros, setCarros] = useState([]); // Estado para armazenar os carros
  const [preco, setPreco] = useState(""); // Estado para o preço do carro
  const [modelo, setModelo] = useState(""); // Estado para o modelo do carro
  const [ano, setAno] = useState(""); // Estado para o ano do carro
  const [marca, setMarca] = useState(""); // Estado para a marca do carro
  const [editId, setEditId] = useState(null); // Estado para controlar o ID do carro em edição

  // Hook useEffect para buscar os dados da API quando o componente carrega
  useEffect(() => {
    async function fetchData(url) {
      const resp = await fetch(url); // Requisição para a API
      const data = await resp.json(); // Conversão da resposta para JSON
      setCarros(data); // Atualiza o estado dos carros com os dados obtidos
    }
    fetchData(url); // Chamada da função
  }, []); // Executa apenas na montagem do componente

  // Função para lidar com o submit do formulário (adicionar ou editar carro)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do submit
    
    const carro = {
      preco: parseFloat(preco), // Converte o preço para float
      ano: parseInt(ano), // Converte o ano para inteiro
      modelo, // Atribui o modelo
      marca, // Atribui a marca
    };
  
    try {
      let res;
  
      if (editId) {
        // Se houver um ID de edição, faz um PUT para atualizar o carro existente
        res = await fetch(`${url}/${editId}`, {
          method: "PUT", // Método PUT para editar
          headers: {
            "Content-Type": "application/json", // Cabeçalho indicando o tipo de conteúdo
          },
          body: JSON.stringify(carro), // Corpo da requisição com os dados do carro
        });
      } else {
        // Se não houver ID de edição, faz um POST para adicionar um novo carro
        res = await fetch(url, {
          method: "POST", // Método POST para criar novo
          headers: {
            "Content-Type": "application/json", // Cabeçalho indicando o tipo de conteúdo
          },
          body: JSON.stringify(carro), // Corpo da requisição com os dados do carro
        });
      }
  
      if (res.ok) {
        await fetchList(); // Atualiza a lista de carros após a operação
      }
  
      // Limpa os campos do formulário
      setModelo("");
      setMarca("");
      setPreco("");
      setAno("");
      setEditId(null); // Reseta o ID de edição
    } catch (error) {
      console.error("Erro ao salvar o carro:", error); // Exibe erro no console
    }
  };
  
  // Função para preencher o formulário com os dados do carro a ser editado
  const handleEdit = (carro) => {
    setModelo(carro.modelo); // Define o modelo no estado
    setMarca(carro.marca); // Define a marca no estado
    setPreco(carro.preco); // Define o preço no estado
    setAno(carro.ano); // Define o ano no estado
    setEditId(carro.id); // Define o ID do carro em edição
  };
  
  // Função para excluir um carro da lista
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este veículo?"); // Confirmação antes de excluir
    
    if (!confirmDelete) {
      return; // Se o usuário cancelar, a função termina
    }
    
    try {
      let res = await fetch(`${url}/${id}`, {
        method: "DELETE", // Método DELETE para excluir o carro
      });
    
      if (res.ok) {
        await fetchList(); // Atualiza a lista de carros após a exclusão
      }
    } catch (error) {
      console.error("Erro ao excluir o carro:", error); // Exibe erro no console
    }
  };

  // Função para buscar a lista de carros atualizada
  const fetchList = async () => {
    try {
      let res = await fetch(url); // Faz a requisição GET para buscar os carros
      if (res.ok) {
        const data = await res.json(); // Converte a resposta para JSON
        setCarros(data); // Atualiza o estado com a lista de carros
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de carros:", error); // Exibe erro no console
    }
  };

  return (
    <>
      {/* Renderiza o componente Header */}
      <Header />
      {/* Renderiza o componente Body e passa as props necessárias */}
      <Body
        carros={carros} // Lista de carros
        handleEdit={handleEdit} // Função para editar carro
        handleDelete={handleDelete} // Função para excluir carro
        preco={preco} // Valor do preço
        setPreco={setPreco} // Função para definir preço
        ano={ano} // Valor do ano
        setAno={setAno} // Função para definir ano
        modelo={modelo} // Valor do modelo
        setModelo={setModelo} // Função para definir modelo
        marca={marca} // Valor da marca
        setMarca={setMarca} // Função para definir marca
        handleSubmit={handleSubmit} // Função para submit do formulário
        editId={editId} // ID do carro em edição
      />

      {/* Renderiza o componente Footer */}
      <Footer />
    </>
  );
}

export default App;
