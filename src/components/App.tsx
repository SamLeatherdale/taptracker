import autoBind from "auto-bind";
import {styled} from "baseui";
import {HeadingSmall} from "baseui/typography";
import { Menu as IconMenu } from 'baseui/icon';
import moment from "moment";
import React, {Component, useState} from "react";
import { pickBy } from "lodash";
import "../styles.css";
import {getSavedSettings, getSavedTransactions, storeSettings, storeTransactions} from "../helpers/storage";
import {SettingsType, TransactionList, TransactionType} from "../types";
import SettingsModal from "./SettingsModal";
import TransactionPage from "./TransactionPage";


type PropsType = {};
type StateType = {
  items: TransactionList;
  settings: SettingsType;
  themeLight: boolean;
};
export default function App() {
  const [items, setItems] = useState(getSavedTransactions());
  const [settings, setSettings] = useState(getSavedSettings());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const startDate = moment().set({ date: settings.rolloverDay });
  const now = moment();
  if (startDate.isAfter(now)) {
    startDate.subtract(1, "month");
  }

  const updateItems = (items: TransactionList) => {
    setItems(items);
    storeTransactions(items);
  };
  const updateSettings = (settings: SettingsType) => {
    setSettings(settings);
    storeSettings(settings);
    closeSettings();
  }
  const closeSettings = () => setSettingsOpen(false);

  const pageItems = pickBy(items, (val) => moment(val.date).isSameOrAfter(startDate, "day"));

  return (
    <Page>
      <Header>
        <MenuWrap onClick={() => setSettingsOpen(true)}>
          <IconMenu color="contentPrimary" size={32} />
        </MenuWrap>
        <HeadingSmall $style={{ margin: '8px', textAlign: 'center' }}>Tap Tracker</HeadingSmall>
      </Header>
      <SettingsModal
          settings={settings}
          isOpen={settingsOpen}
          onSave={updateSettings}
          onCancel={closeSettings}
          onClearTransactions={() => updateItems({})}
      />
      <TransactionPage
          numItems={settings.transactionCount}
        items={pageItems}
        updateItems={updateItems}
        startDate={moment(startDate)}
      />
      <footer />
    </Page>
  );
}
const Page = styled("main", ({ $theme }) => {
  return {
    display: "flex",
        flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: "100%",
      padding: "12px 12px",
      backgroundColor: $theme.colors.backgroundPrimary
  }
});
const Header = styled("header", {
  width: '100%',
  justifyContent: 'center'
})
const MenuWrap = styled("div", {
  float: 'right'
})
