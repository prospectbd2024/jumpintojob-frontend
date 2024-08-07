
import Header from "@/Layout/Header/Header"
import Footer from "@/Layout/Footer/Footer" 

export const metadata = {
  title: 'Jump Into Job',
  description: 'Powerd by Prospect BD',
}

export default function RootLayout({ children }) {
  return (
      <div>
        <Header/>
        {children}
        <Footer/>
        </div>
  )
}
