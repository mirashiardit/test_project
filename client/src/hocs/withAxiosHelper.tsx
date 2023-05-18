import AxiosHelper from "@/helpers/axios.helper";
import { FunctionComponent } from "react";

export default function withAxiosHelper<PROPS>(
  ChildComponent: FunctionComponent<PROPS>
) {
  const axiosHelper = new AxiosHelper(
    process.env.sBACKEND_URL || "http://localhost:4000"
  );

  return function (props: PROPS) {
    return <ChildComponent {...props} axiosHelper={axiosHelper} />;
  };
}
