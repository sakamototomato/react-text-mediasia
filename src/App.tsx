import { ConfigProvider } from "antd";
import "./App.scss";
import Header from "./components/Header";
import MainWorld from "./pages/MainWorld";
import { Provider } from "react-redux";
import { store } from "./store";

const bg_dark = "#191A29";
const bg_dark_100 = "#1A1C31";
const transparent = "transparent";
const white = "white";
const gray = "#9499C3";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bg_dark,
        },
        components: {
          Table: {
            colorBgBase: transparent,
            headerBg: transparent,
            footerBg: transparent,
            colorBgLayout: transparent,
            colorBgContainer: transparent,
            headerColor: white,
            colorText: gray,
          },
          Modal: {
            titleColor: white,
            colorBgBase: bg_dark,
            footerBg: bg_dark,
            contentBg: bg_dark,
            borderRadius: 16,
            headerBg: bg_dark,
          },
          Select: {
            colorBgContainer: bg_dark,
            colorBgLayout: bg_dark_100,
            colorText: white,
            colorBorder: bg_dark_100,
            colorBgElevated: bg_dark_100,
          },
          Input: {
            colorBgContainer: bg_dark_100,
            colorText: white,
            colorBgLayout: bg_dark_100,
            colorBorder: bg_dark_100,
          },
          InputNumber: {
            colorBgContainer: bg_dark_100,
            colorText: white,
            colorBgLayout: bg_dark_100,
            colorBorder: bg_dark_100,
          },
        },
      }}
    >
      <Provider store={store}>
        <Header />
        <MainWorld />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
