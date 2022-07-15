import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Coinlist = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid white;
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
  a {
    transition: color 0.2s ease-in;
    display: flex;
    padding: 5px;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  transition: color 0.2s ease-in;
`;

const Loader = styled.span`
  font-size: 48px;
  align-items: center;
  justify-content: center;
  display: block;
  text-align: center;
`;

const ButtonTab = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 10px;
`;

const Button = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;

  width: 30%;
  background-color: rgba(0, 0, 0, 0);

  border-radius: 10px;
  padding: 7px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
      transition: color 0.2s ease-in;
    }
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface Icoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const BtnSt = styled.button`
  border: 0px;
  color: ${(props) => props.theme.textColor};
  background-color: rgba(0, 0, 0, 0);
  text-align: end;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    transition: color 0.2s ease-in;
  }
`;

function Coins() {
  const { isLoading, data } = useQuery<Icoin[]>("allCoins", fetchCoins);
  const setterFn = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      <ButtonTab>
        <Button isActive={true}>
          <Link to={`/`}>Back</Link>
        </Button>
        <BtnSt onClick={() => setterFn((current) => !current)}>
          Dark Mode {isDark ? "on" : "off"}
        </BtnSt>
      </ButtonTab>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Coinlist>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name
                    .toLowerCase()
                    .split(" ")
                    .join("-")}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </Coinlist>
      )}
    </Container>
  );
}
export default Coins;
