// @flow
import React from 'react';
import ListPage from '../ListPage';
import Carriers, {sortKeys} from '../../store/Carriers';
import type {Carrier} from '../../store/Carriers';

type State = {
  data: Array<Carrier>,
  loading: boolean,
};

export default class CarrierHome extends React.Component {
  state: State = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    Carriers.getAll().then(data => {
      this.setState({data, loading: false});
    });
  }

  getList() {
    return this.state.data.map((carrier, i) => ({
      url: `/carriers/${i}`,
      title: carrier.short_name || carrier.name,
      stats: Array.isArray(carrier.covered_countries) ?
          carrier.covered_countries : [carrier.covered_countries]
        .concat(carrier.cellular_networks || []),
      spec: carrier,
    }));
  }

  render() {
    return (
      <ListPage
        title="Carriers"
        links={this.getList()}
        loading={this.state.loading}
        sortKeys={sortKeys} />
      );
  }
}
