// @flow
import { createTransform } from 'redux-persist';

const transformsConfig = {
  session: {
    inbound: (inboundState) => ({
      ...inboundState,
      error: null,
      loading: false,
    }),
    outbound: (outboundState) => ({
      ...outboundState,
      error: null,
      loading: false,
    }),
    config: 'whitelist',
  },
  teams: {
    inbound: (inboundState) => ({
      ...inboundState,
    }),
    outbound: (outboundState) => ({
      ...outboundState,
    }),
    config: 'whitelist',
  },
};

const transforms: Object = Object.keys((transformsConfig: Object)).map((key) =>
  createTransform(
    (inboundState) => ({
      ...transformsConfig[key].inbound(inboundState),
    }),
    (outboundState) => ({
      ...transformsConfig[key].outbound(outboundState),
    }),
    {
      [transformsConfig[key].config]: [key],
    },
  ),
);

export default transforms;
