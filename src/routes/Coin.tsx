import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Route, useMatch } from "react-router-dom";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Loader = styled.span`
  font-size: 48px;
  align-items: center;
  justify-content: center;
  display: block;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 30px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 15px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const OverviewItemtwo = styled(OverviewItem)`
  padding-left: 56px;
`;

const Tabs = styled.div`
  display: grid;
  margin: 25px 0px;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 7px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const Button = styled(Tab)`
  color: ${(props) => props.theme.textColor};
  width: 30%;
  background-color: rgba(0, 0, 0, 0);
`;

interface RouteState {
  state: { name: string };
}

interface RouteParams {
  coinID: string;
}
interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinID } = useParams();
  const { state } = useLocation() as RouteState;

  const setterFn = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);

  const priceMatch = useMatch("/:coinID/price");
  const chartMatch = useMatch("/:coinID/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinID!],
    () => fetchCoinInfo(coinID)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinID!],
    () => fetchCoinTickers(coinID),
    {
      refetchInterval: 5000,
    }
  );
  // const [info, setInfo] = useState<InfoData>();
  // const [loading, setLoading] = useState(true);
  // const [priceinfo, setPriceInfo] = useState<PriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)
  //     ).json();

  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
  //     ).json();

  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinID]);
  return (
    <Container>
      <Helmet>
        <title>{infoLoading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{infoLoading ? "Loading..." : infoData?.name}</Title>
        <button onClick={() => setterFn((current) => !current)}>
          Dark Mode {isDark ? "on" : "off"}
        </button>
      </Header>

      <Tabs>
        <Button isActive={true}>
          <Link to={`/`}>Back</Link>
        </Button>
      </Tabs>

      {tickersLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{tickersData?.rank}</span>
            </OverviewItem>
            <OverviewItemtwo>
              <span>Symbol</span>
              <span>{infoData?.symbol}</span>
            </OverviewItemtwo>
            <OverviewItem>
              <span>Open Source</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>price</span>
              <span>${tickersData?.quotes.USD.ath_price.toFixed(2)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAx supply</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinID}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinID}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
    </Container>
  );
}
export default Coin;
