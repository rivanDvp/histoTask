//import styles from '../styles/Home.module.css'
import Layout from "../components/layout/Layout"
import CarouselIndex from "../components/index/CarouselIndex"



export default function Home() {
  

  
  

  return (
    <Layout >

      <h1 className="text-primary">histoTask</h1>
      
      <p>
        histoTask es una aplicación web que tiene como finalidad el ser una herramienta para llevar bitácoras de trabajo y el registro de tiempos de diversas actividades.
      </p>
      <hr />
     <CarouselIndex/>
      

    </Layout>
  )
}
