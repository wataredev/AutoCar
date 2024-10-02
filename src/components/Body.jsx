/* eslint react/prop-types: 0 */
function Body({
  handleSubmit,
  handleEdit,
  handleDelete,
  carros,
  marca,
  setMarca,
  modelo,
  setModelo,
  ano,
  setAno,
  preco,
  setPreco,
}) {
  return (
    <main className="body">
      <div className="container">
        <div className="veiculos-card">
          <h2>Veículos cadastrados</h2>
          <ul className="veiculos-list">
            {carros.map((carro) => (
              <li key={carro.id} className="carro-item">
                <div className="carro-detalhes">
                  <h3>{carro.marca} | {carro.modelo}</h3>
                  <p>Ano: {carro.ano}</p>
                  <p>Preço: {carro.preco}</p>
                </div>

                <div className="carro-acoes">
                  <button onClick={() => handleEdit(carro)}>Editar</button>
                  <button onClick={() => handleDelete(carro.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-card">
          <h2>Cadastro de veículos</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Marca:
              <input
                type="text"
                name="marca"
                onChange={(e) => setMarca(e.target.value)}
                value={marca}
                placeholder="Insira a marca do veículo"
                minLength="2"
                required
              />
            </label>
            <label>
              Modelo:
              <input
                type="text"
                name="modelo"
                onChange={(e) => setModelo(e.target.value)}
                value={modelo}
                placeholder="Insira o modelo do veículo"
                minLength="2"
                required
              />
            </label>
            <label>
              Ano:
              <input
                type="number"
                name="ano"
                onChange={(e) => setAno(e.target.value)}
                value={ano}
                placeholder="Insira o ano do veículo"
                min="1900"
                max="2024"
                required
              />
            </label>
            <label>
              Preço:
              <input
                type="number"
                name="preco"
                onChange={(e) => setPreco(e.target.value)}
                value={preco}
                placeholder="Insira o preço do veículo"
                min="0.01"
                step="0.01"
                required
              />
            </label>
            <input type="submit" value="Cadastrar" />
          </form>
        </div>
      </div>
    </main>
  );
}

export default Body;
