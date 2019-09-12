import React, { PureComponent } from 'react';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Dashboard.module.css';

export default class Dashboard extends PureComponent {
  constructor() {
    super();

    this.state = {
      transactions: [],
      balance: 0,
    };
  }

  handleTransaction = transaction => {
    this.setState(prevState => {
      return {
        transactions: [...prevState.transactions, transaction],
        balance:
          transaction.type === 'withdrawal'
            ? prevState.balance - transaction.amount
            : prevState.balance + transaction.amount,
      };
    });
  };

  render() {
    const { transactions, balance } = this.state;

    return (
      <div className={styles.dashboard}>
        <Controls
          handleTransaction={this.handleTransaction}
          balance={balance}
        />
        <Balance transactions={transactions} balance={balance} />
        <TransactionHistory transactions={transactions} balance={balance} />
      </div>
    );
  }
}
