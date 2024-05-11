import { ConfigProvider } from 'antd'
import './App.scss'
import Header from './components/Header'
import MainWorld from './pages/MainWorld'

const bg_dark = "#191A29"
const transparent = "transparent"
const white = "white"
const gray = "#9499C3"
function App() {

  return (
    <ConfigProvider theme={{
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
          headerColor:white,
          colorText: gray
        },
        Modal: {
          titleColor: white,
          colorBgBase: bg_dark,
          footerBg: bg_dark,
          contentBg:bg_dark,
          borderRadius: 16,
          headerBg:bg_dark
        }
      }
    }}>
    <Header />
    <MainWorld />
    </ConfigProvider>
  )
}

export default App
