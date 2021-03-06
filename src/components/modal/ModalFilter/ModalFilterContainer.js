import { connect } from 'react-redux'
import { initialState as filterInit, actions as filterActions } from '../../core/modules/FilterModules'
import { initialState as modalInit } from '../../core/modules/ModalModules'

import ModalFilter from './ModalFilter'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFilter: (filter) => dispatch(filterActions.addFilter(filter, ownProps.id)),
    removeFilter: (filterID) => dispatch(filterActions.removeFilter(filterID, ownProps.id)),
    updateFilterAll: (filters) => dispatch(filterActions.updateFilterAll(filters, ownProps.id))
  }
}

const mapStateToProps = (state, ownProps) => {
  const filterObj = state.filter.find((x) => x.id === ownProps.id) || filterInit
  const modalObj = state.modal.find((x) => x.id === ownProps.id) || modalInit
  return {
    filters: filterObj.filters,
    isShow: modalObj.isShow,
    errorOverall: modalObj.errorOverall
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFilter)
