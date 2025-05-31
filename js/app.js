let formulario = document.getElementById("formulario")
let contenedorBoton = document.getElementById("contenedorBoton")
let btnAgregar = document.getElementById("btnAgregar")
let ul = document.getElementById("ul")
let btnBorrarTodo = document.createElement("button")

cargarDOM()

btnAgregar.addEventListener("click", (e)=>{
    e.preventDefault()
    Swal.fire({
        title: "Item agregado a la lista",
        icon: "success"
    });
    let itemId = crypto.randomUUID()
    let input = document.getElementById("input").value
    const li = document.createElement("li")
    li.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between")
    li.textContent = input
    ul.appendChild(li)
    
    guardar(input, itemId)

    const btnEliminar = document.createElement("button")
    btnEliminar.classList.add("btn", "btn-outline-danger")
    btnEliminar.textContent = "Eliminar"

    li.appendChild(btnEliminar)

    formulario.reset()

    btnEliminar.addEventListener("click", ()=>{
        
        li.remove()
        let lista = JSON.parse(localStorage.getItem('miLista')) || []
        const posicionContactoBuscado = lista.findIndex((item) => item.id === itemId)
        lista.splice(posicionContactoBuscado, 1)
        localStorage.setItem('miLista', JSON.stringify(lista))
        Swal.fire({
            icon: "error",
            title: "Item eliminado de la lista",
        });
    })

    
    btnBorrarTodo.classList.add("btn", "btn-danger")
    btnBorrarTodo.textContent = "Borrar Lista"
    btnBorrarTodo.addEventListener("click", ()=>{
        localStorage.removeItem('miLista')
    })
    contenedorBoton.appendChild(btnBorrarTodo)
    
    
})

function guardar(input, itemId){
    let lista = JSON.parse(localStorage.getItem('miLista')) || []
    lista.push({valor: input, id: itemId})
    localStorage.setItem('miLista', JSON.stringify(lista) )
}

function cargarDOM(){
    let lista = JSON.parse(localStorage.getItem('miLista')) || []
    lista.forEach(itemLista => {
        const li = document.createElement("li")
        li.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between")
        li.textContent = itemLista.valor
        ul.appendChild(li)

        const btnEliminar = document.createElement("button")
        btnEliminar.classList.add("btn", "btn-outline-danger")
        btnEliminar.textContent = "Eliminar"

        li.appendChild(btnEliminar)


        btnEliminar.addEventListener("click", ()=>{
        
        li.remove()
        let lista = JSON.parse(localStorage.getItem('miLista')) || []
        const posicionContactoBuscado = lista.findIndex((item) => item.id === itemLista)
        lista.splice(posicionContactoBuscado, 1)
        localStorage.setItem('miLista', JSON.stringify(lista))
        Swal.fire({
            icon: "error",
            title: "Item eliminado de la lista",
        });
    })

        
        btnBorrarTodo.classList.add("btn", "btn-danger")
        btnBorrarTodo.textContent = "Borrar Lista"
        btnBorrarTodo.addEventListener("click", ()=>{
            localStorage.removeItem('miLista')
        })
        contenedorBoton.appendChild(btnBorrarTodo)
        
    });

}

