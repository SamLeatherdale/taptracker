import React, { Component } from "react";
import { styled } from "baseui";
import TransactionPage from "./TransactionPage";
import colors from "material-colors";
import {} from "baseui";
import { HeadingSmall } from "baseui/typography";
import { TransactionType } from "./types";
import "./styles.css";

const KEY_TRANSACTIONS = "taptrack.transactions";
type PropsType = {};
type StateType = {
  items: TransactionType[];
};
export default class App extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      items: this.getItems()
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
    return (
      <Page>
        <header>
          <HeadingSmall>Tap Tracker</HeadingSmall>
        </header>
        <TransactionPage
          items={this.state.items}
          updateItems={this.updateItems}
        />
        <footer />
      </Page>
    );
  }
}
const Page = styled("main", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  backgroundColor: $theme.colors.backgroundPrimary
}));
