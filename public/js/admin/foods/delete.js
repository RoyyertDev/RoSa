function deleteFood(id) {
  const confirm = window.confirm(
    "¿Desea eliminar el menu? Esta acción es irreversible y tambien eliminara los registros relacionados"
  );
  if (confirm) {
    fetch(`/api/foods/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          alert(data.message);
          return;
        } else if (data.status === "success") {
          alert(data.message);
          window.location.href = "/admin/foods";
          return;
        }
      })
      .catch((err) => console.log(err));
  } else if (!confirm) {
    window.alert("Operación cancelada");
  }
}
