import Carousel from 'react-bootstrap/Carousel'

import Image from "next/image"
import image1 from "./editor_de_tareas.png"
import image2 from "./vista_de_tareas.png"
import image3 from "./estadisticas.png"
import style from "./CarouselIndex.module.css"

export default function CarouselIndex() {
  const images=[image1,image2,image3]
  const titles=[
    "Edita tus tareas",
     "Lleva una bitácora de tus actividades",
     "Analiza tus sesiones de trabajo"
    ]
  const subtitles=[
    "Y crea subdivisiones para llevar un control más preciso",
    "Organizala en base a un sistema de categorías y etiquetas.",
    "Busca maneras de mejorar continuamente"
  ]
  return (
  <div className={style["container"]}>
    <Carousel  variant="dark" interval={6000} >
      {images.map((img,index)=>(
      <Carousel.Item key={"carousel-item"+index } >
      <div className={style["image-boundary"]}>
      <Image
        src={img}
        alt={titles[index]}
        
      />
      </div>
      
      <Carousel.Caption>
        <div className={style["caption"]}>
        <h3>{titles[index]}</h3>
        <p>{subtitles[index]}</p>
        </div>
       
      </Carousel.Caption>
    </Carousel.Item>  
      ))}
    </Carousel>
  </div>
    
  )
}
