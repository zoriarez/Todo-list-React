import { Button, TextField, Dialog, DialogActions, DialogContent,DialogContentText,DialogTitle,Box } from '@mui/material';
import { useRef } from 'react';
export default function TodoCreateDialog(props,todo,todoTitle, todoDescription){
  

return(<>
<div>
      <div className='text-center'></div>
<Button variant="outlined" onClick={props.handleClickOpen}>
        Create
</Button>
      <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Create Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Title
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="what do you want to do"
            type="text"
            fullWidth
            variant="standard"
           value={todo.title} 
          
           inputRef={props.todoTitle}
          onSubmit={e => props.setTodo({...todo, title: e.target.value})}
          />
       
          <DialogContentText>
           Description
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Describe what it is"
            type="text"
            fullWidth
            variant="standard"
           //value={todo.description}
           inputRef={props.todoDescription}
            //onSubmit={e => props.setTodo({...todo, description:e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={props.handleSumbmit}>Create</Button>
        </DialogActions>
      </Dialog>
      </div>    
      </>
)
    }