// @flow

import { getAppName } from './contentProviders';

function actionTypeCreator(
  module: string,
  constants: Array<string>,
): { [string]: string } {
  return constants.reduce((actions, constant) => {
    actions[constant] = `${getAppName()}/${module.toLowerCase()}/${constant}`;
    return actions;
  }, {});
}

export default actionTypeCreator;
