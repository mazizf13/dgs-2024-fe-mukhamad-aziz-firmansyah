export const getWallets = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/wallets", {
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

export const addWallet = async (wallet) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/wallets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wallet),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteWallet = async (id) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + `/wallets/${id}`, {
      method: "DELETE",
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

export const updateWallet = async (wallet) => {
  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL + `/wallets/${wallet.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wallet),
      },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};
