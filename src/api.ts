const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinID: String | undefined) {
  return await fetch(`${BASE_URL}/coins/${coinID}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinTickers(coinID: String | undefined) {
  return await fetch(`${BASE_URL}/tickers/${coinID}`).then((response) =>
    response.json()
  );
}
