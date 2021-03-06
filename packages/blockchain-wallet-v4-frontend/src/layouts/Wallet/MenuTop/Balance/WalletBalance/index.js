import { actions, selectors } from 'data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { prop } from 'ramda'
import React from 'react'
import Template from './template'

const key = 'wallet'

class WalletBalanceContainer extends React.PureComponent {
  render () {
    const {
      preferencesActions,
      totalBalancesDropdown,
      supportedCoins
    } = this.props
    const isActive = prop(key, totalBalancesDropdown)
    return (
      <Template
        isActive={isActive}
        supportedCoins={supportedCoins}
        handleToggle={() =>
          preferencesActions.setTotalBalancesDropdown({
            key,
            val: !isActive
          })
        }
      />
    )
  }
}

const mapStateToProps = state => ({
  totalBalancesDropdown: selectors.preferences.getTotalBalancesDropdown(state),
  supportedCoins: selectors.core.walletOptions
    .getSupportedCoins(state)
    .getOrFail()
})

const mapDispatchToProps = dispatch => ({
  preferencesActions: bindActionCreators(actions.preferences, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletBalanceContainer)
