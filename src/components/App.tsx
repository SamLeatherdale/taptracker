import {styled} from "baseui";
import {HeadingSmall} from "baseui/typography";
import moment from "moment";
import React, {Component} from "react";
import "../styles.css";
import {TransactionType} from "../types";
import TransactionPage from "./TransactionPage";

const KEY_TRANSACTIONS = "taptrack.transactions";
type PropsType = {};
type StateType = {
  items: TransactionType[];
  themeLight: boolean;
};
export default class App extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      items: this.getItems(),
      themeLight: true,
    };
    this.updateItems = this.updateItems.bind(this);
  }
  getItems(): TransactionType[] {
    const savedItems: TransactionType[] = JSON.parse(
      localStorage.getItem(KEY_TRANSACTIONS) || "[]"
    );
    const items: TransactionType[] = Array(5)
      .fill(0)
      .map((o, i) => ({
        index: i,
        completed: false
      }));

    savedItems.forEach((item) => {
      items[item.index] = item;
    });
    return items;
  }
  updateItems(items: TransactionType[]) {
    this.setState({ items }, () => {
      localStorage.setItem(KEY_TRANSACTIONS, JSON.stringify(items));
    });
  }
  render() {
    const { themeLight } = this.state;
    return (
      <Page>
        <header>
          <HeadingSmall $style={{ margin: '8px' }}>Tap Tracker</HeadingSmall>
        </header>
        <TransactionPage
          items={this.state.items}
          updateItems={this.updateItems}
          startDate={(moment().set({ date: 1}))}
        />
        <footer />
      </Page>
    );
  }
}
const Page = styled("main", ({ $theme }) => {
  return {
    display: "flex",
        flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: "100%",
      padding: "24px 12px",
      backgroundColor: $theme.colors.backgroundPrimary
  }
});
