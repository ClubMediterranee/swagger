if (window) {
  const valueGM = window.localStorage.getItem("client_id_Bearer_gm (connection as a customer)");

  if (valueGM) {
    window.localStorage.setItem("client_id_bearer_gm", valueGM);
    window.localStorage.removeItem("client_id_Bearer_gm (connection as a customer)");
  }

  const valueGO = window.localStorage.getItem("client_id_Bearer_go (connection as a Clubmed employee)");

  if (valueGO) {
    window.localStorage.setItem("client_id_bearer_go", valueGO);
    window.localStorage.removeItem("client_id_Bearer_go (connection as a Clubmed employee)");
  }
}
