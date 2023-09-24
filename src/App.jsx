import { useState, useRef,useEffect } from 'react'



function App() {
  const [Todo, setTodo] = useState([])

let todoTitle = useRef();
let todoDescription = useRef();

let modalref = useRef();

// Events
function handleSumbmit(e){
  e.preventDefault()
 const next = [...Todo, {id: crypto.randomUUID(), title: todoTitle.current.value,description: todoDescription.current.value, isCompleted:false},]
 setTodo(next);
// localStorage.setItem('todos', JSON.stringify(next)); //<--localstorage
}

// localstorage
// useEffect(() => {
//   const existingTodos = localStorage.getItem('todos');
//   setTodo(existingTodos ? JSON.parse(existingTodos) : []);
// }, []);




function handleDeleteClick(id){
  setTodo(currentTodos => {
    return currentTodos.filter(todo => todo.id !== id)
  })
}

function handleToggleCompleted(id){
  const todos = [...Todo]
  todos.map(todo => {
    if(todo.id === id){
      todo.isCompleted = !todo.isCompleted
    }
    return todo
  })
  setTodo(todos)
}
  
 

  function modal(e){
    e.preventDefault()
      const mod = modalref.current
      
     if(!mod.open){
      mod.showModal()
     }else if(mod.open){
      mod.close()
     }
   }

function ModalAdd(){
   return(
    <>
    <dialog  className='border-2 px-5 rounded-md border-violet-500 ' ref={modalref}>
        <form onSubmit={handleSumbmit} className='container border my-3 p-4 rounded-md shadow-md w-80 '>
          <div className='flex gap-1 justify-center flex-col m-5'>
            <input type="text" placeholder="Title"  ref={todoTitle}/>
            <input type="text" placeholder="Description"  ref={todoDescription}  />
          </div>
          <div className='flex gap-1 justify-center m-5'>
            <button className=' border-2 px-5 rounded-md border-red-500  hover:bg-red-300 ' onClick={modal} >Cancel</button>
            <button className=' border-2 px-5 rounded-md border-green-300 hover:bg-green-300' type='submit' >Create</button>      
          </div>
        </form>
      </dialog>
    </>
   )



}
function Todolist(){
  return(
    <>
    <h3 className='text-center mt-5 pb-10 text-cyan-400 font-bold' >Todo List</h3>
    <div className='lg:grid lg:grid-cols-5 lg:place-items-center  flex gap-2 flex-wrap justify-center'>
          {Todo.map(todo =>{
            return(
              <div key={todo.id} className='static container border my-3 p-4 rounded-md shadow-md w-80 sm:w-72'>
                <div  className='text-center'>
                  <div>
                    {todo.title}
                  </div>
                  <div>
                    {todo.description}
                  </div>
                </div>
                <div className='flex gap-1 justify-center'>
                  <button className=' border-2 px-5 rounded-md border-yellow-400'>Edit</button>
                  <button className=' border-2 px-5 rounded-md border-red-500' onClick={() => handleDeleteClick(todo.id)}>Delete</button>
                  <button className={todo.isCompleted ? ' border-2 px-5 rounded-md bg-green-500' : 'border border-2 px-5 rounded-md bg-red-500'} onClick={() => handleToggleCompleted(todo.id)}>{todo.isCompleted ? "Completed" : "Incomplete"}</button>
                </div>
              </div>
            )
            
          })}
    </div>
    </>
  )
}


  return (
    <>
  
  <div className='text-center'>
    <button className='rounded-2xl p-2 bg-gradient-to-l from-blue-500 to-green-500 text-white' onClick={modal}>
     Create 
    </button>
  </div>
      <div>
        <Todolist></Todolist>
      </div>

      <ModalAdd></ModalAdd>
      
    </>
  )
}

export default App
