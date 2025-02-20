import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// ICONS
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useState } from "react";
export default function ToDo({ todo }) {

    const { todoValue, setTodo } = useContext(TodoContext);
    const [showDelAlert, setDelAlert] = useState(false);
    const [updatedTodo,setUpdatedTodo]=useState({title:todo.title,details:todo.details})
    const [showUpdateAlert,setUpdateAlert]=useState(false);
    function handleUpdateClose(){
        setUpdateAlert(false);
    }
    function handleUpdateValues(){
        const updatedTodoArr=todoValue.map((t)=>{
            if(t.id===todo.id){
                return {...t,title:updatedTodo.title,details:updatedTodo.details};
            }
            else{
                return t;
            }
        })
        setTodo(updatedTodoArr);
        localStorage.setItem("todos",JSON.stringify(updatedTodoArr));
        handleUpdateClose();
    }
    function handleCheckBtn() {
        const newTodo = todoValue.map((to) => {
            if (to.id === todo.id)
                to.flag = !to.flag;
            return to
        })
        setTodo(newTodo);
        localStorage.setItem("todos",JSON.stringify(newTodo));

    }
    function handleDelete() {
        let newArr = todoValue.filter((to) => {
            return to.id !== todo.id;
        })
        setTodo(newArr);
        localStorage.setItem("todos",JSON.stringify(newArr))

    }
    function handleClose() {
        setDelAlert(false)
    }
    
    return (
        <Card className="cardHover" sx={{ minWidth: 275, background: "#283593", marginTop: "20px", color: "white" }}>
            <Dialog
                onClose={handleClose}
                style={{ direction: "rtl" }}
                open={showDelAlert}
                keepMounted
                aria-describedby="alert-dialog-slide-description" >

                <DialogTitle>{" هل أنت متأكد من رغبتك في حذف المهمة؟"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        لا يمكنك التراجع عن الحذف اذا اخترت زر حذف
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>إغلاق</Button>
                    <Button onClick={handleDelete}>نعم قم بالحذف</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                onClose={handleUpdateClose}
                style={{ direction: "rtl" }}
                open={showUpdateAlert}
                keepMounted
                aria-describedby="alert-dialog-slide-description" >

                <DialogTitle>تعديل المهمه</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="العنوان"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.title}
                        onChange={(e)=>{
                            setUpdatedTodo({...updatedTodo,title:e.target.value})
                        }}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="تفاصيل"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.details}
                        onChange={(e)=>{
                            setUpdatedTodo({...updatedTodo,details:e.target.value})
                        }}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>إلغاء</Button>
                    <Button onClick={handleUpdateValues} type="submit">تعديل</Button>
                </DialogActions>
            </Dialog>

            <CardContent >
                <Grid container spacing={2}>
                    <Grid size={8}>
                        <Typography style={{ textAlign: "right", textDecoration: todo.flag ? "line-through" : "none" }} variant="h4">{todo.title} </Typography>
                        <Typography style={{ textAlign: "right" }} variant="h6"> {todo.details} </Typography>
                    </Grid>
                    <Grid display="flex" justifyContent="space-around" alignItems="center" size={4}>

                        <IconButton
                            className="iconButton" style={{ background: todo.flag ? "green" : "white", padding: "5px", borderRadius: "50%", border: "2px solid green", color: todo.flag ? "white" : "green" }}
                            aria-label="delete" color="primary">
                            <CheckIcon onClick={() => {
                                handleCheckBtn();
                            }} />
                        </IconButton>

                        <IconButton
                            className="iconButton" style={{ background: "white", padding: "5px", borderRadius: "50%", border: "2px solid #2979ff", color: " #2979ff" }}
                            aria-label="delete" color="primary">
                            <ModeEditOutlineOutlinedIcon onClick={()=>{
                                setUpdateAlert(true);
                            }} />
                        </IconButton>

                        <IconButton className="iconButton"
                            style={{ background: "white", padding: "5px", borderRadius: "50%", border: "2px solid #b23c17", color: "#b23c17" }}
                            aria-label="delete" color="primary">
                            <DeleteOutlineOutlinedIcon onClick={() => {
                                setDelAlert(true)
                            }} />
                        </IconButton>

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}