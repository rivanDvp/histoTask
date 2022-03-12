import React from 'react'
import style from "./Help.module.css"
import Link from 'next/link'

export default function HelpNav() {
    return (
        <nav className={style["nav-bar"]}>
            <ul>

                <li>
                    <Link href='/help/home'>
                        <a>Inicio</a>
                    </Link>
                </li>
                <li>
                    <Link href='/help/task_manager'>
                        <a >Administrador de tareas</a>
                    </Link>
                </li>
                <li>
                    <Link href='/help/task_editor'>
                        <a >Editor de tareas</a>
                    </Link>
                </li>
                <li>
                    <Link href='/help/subtask_control'>
                        <a >Control de subtareas</a>
                    </Link>
                </li>
                <li>
                    <Link href='/help/tutorials'>
                        <a >Tutoriales</a>
                    </Link>
                </li>
            </ul>
           
        </nav>
    )
}
