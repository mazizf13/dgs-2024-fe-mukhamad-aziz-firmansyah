export const getItems = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/expense-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const addItems = async (item) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/expense-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteItem = async (id) => {
  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL + `/expense-items/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const updateItem = async (item) => {
  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL + `/expense-items/${item.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};
