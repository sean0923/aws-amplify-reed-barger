import React from 'react';
// import { Loading, Tabs, Icon } from "element-react";
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  marketId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const MarketsPage: React.FC<Props> = ({ match }) => {
  console.log('match: ', match.params.marketId);
  console.log('match.params.marketId: ', typeof match.params.marketId);
  return (
    <div>
      <div>MarketPage</div>
    </div>
  );
};
export default MarketsPage;
