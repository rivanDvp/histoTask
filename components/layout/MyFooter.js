import style from './MyFooter.module.css'
export default function MyFooter() {
    return (
        <footer className={style['footer']}>
            <p>Autor:{" "}Ramón Iván Aquino Calderón</p>
            <p>Email:{" "}<a href="mailto:rivan.dvp@gmail.com">rivan.dvp@gmail.com</a></p>
            <p>Repositorio:{" "} 
                <a href="https://github.com/rivanDvp/histoTask">https://github.com/rivanDvp/histoTask</a>
                </p>
             <p>Año 2022</p>   
        </footer>
    )
}
