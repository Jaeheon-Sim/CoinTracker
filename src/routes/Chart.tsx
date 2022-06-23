import { useParams } from "react-router-dom";

function Chart() {
  const params = useParams();
  console.log(params);
  return <h1>chart</h1>;
}
export default Chart;
