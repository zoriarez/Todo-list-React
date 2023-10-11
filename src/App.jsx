import { useEffect, useState ,useRef} from 'react'
import { toast } from 'react-toastify'
import { TodoUpdateDialog } from './components/TodoUpdateDialog'
import TodoCard from './components/TodoCard';
import TodoCreateDialog from './components/TodoCreateDialog';
import { Button, TextField, Dialog, DialogActions, DialogContent,DialogContentText,DialogTitle,Box } from '@mui/material';


function App() { 
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("Todos")) ?? []
  })
  const [todo, setTodo] = useState({
    id:null,
    title:"",
    description:""
  })

  let todoTitle = useRef();
  let todoDescription = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos))
  }, [todos])
  
  const handleSumbmit = e =>{
    e.preventDefault()
    if(todo.title.length === 0 || todo.description.length === 0){
      toast.error('All fields are required!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    }else{
      
      setTodos(currentTodo => {
        return [
          ...currentTodo,
          {id: crypto.randomUUID(), title: todoTitle.current.value,description: todoDescription.current.value, isCompleted:false},
        ]
      })
      toast.success('Todo has been added!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTodo({
        id:null,
        title:"",
        description:""
      })
    }
    console.log( todoTitle.current.value,todoDescription.current.value)
    handleClose() 
  }
 
  const handleUpdateClick = id => {
    const tempTodos = [...todos]
    todos.map(todoArray => {
      if(todoArray.id === id){
        todoArray.title = todo.title
        todoArray.description = todo.description
      }
      return todo
    })
    setTodos(tempTodos)
    setTodo({
      id:null,
      title:"",
      description:""
    })
  }
    
  const handleDeleteClick = id => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }


  const handleToggleCompleted = id => {
    const tempTodos = [...todos]
    todos.map(todo => {
      if(todo.id === id){
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    setTodos(tempTodos)
  }

  const handleEditClick = props => {
    setTodo(props)
  }

  const handleDialogClose = () => {
    setTodo({
      id:null,
      title:"",
      description:""})
  }
  


  return (
    <>
    
    <TodoCreateDialog 
      open={open}
      todo={todo}
      todoTitle={todoTitle}
      todoDescription={todoDescription}
      handleClickOpen={handleClickOpen} 
      handleClose={handleClose} 
      setTodo={setTodo}
      handleSumbmit={handleSumbmit}
    
    />



    <TodoUpdateDialog 
      todo={todo}
      setTodo={setTodo}
      handleDialogClose={handleDialogClose}
      handleUpdateClick={handleUpdateClick}
    />
    <Box sx={{display:'flex', flexDirection: 'row',flexWrap: 'wrap', marginTop: 10,}}>
      {todos.map(todo => 
              <TodoCard
              key={todo.id}
              todo={todo}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              handleToggleCompleted={handleToggleCompleted}
            />
        
        
        )}</Box>



  
        
    </>
  )
}

export default App

