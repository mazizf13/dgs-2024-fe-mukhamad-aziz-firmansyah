export const getCategory = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/categories", {
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

export const addCategory = async (category) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL + `/categories/${id}`,
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

export const updateCategory = async (category) => {
  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL + `/categories/${category.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};
