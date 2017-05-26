import _ from 'lodash'

export default (a) => {
  return _.isArray(a) ? _.invokeMap(a, 'toJSON') : a.toJSON()
}
