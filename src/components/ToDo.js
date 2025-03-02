import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid2';
import { toastContext } from '../contexts/toastContext';

// ICONS
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useToast } from "../contexts/toastContext";



export default function ToDo({ todo ,showDeleteFun,showUpdateFun}) {

    const {todoValue,dispatch}=useContext(TodoContext)
    // this is custom usecontext made by me
    const {showHideToast}=useToast()

    function handleCheckBtn() {
        dispatch({type:"check",payload:todo})
        showHideToast("تم انجاز المهمه")

    }
    function showDel(){
        showDeleteFun(todo);
    }
    function showUpdate(){
        showUpdateFun(todo);
    }
    
    return (
        <Card className="cardHover" sx={{ minWidth: 275, background: "#283593", marginTop: "20px", color: "white" }}>
        

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
                            <ModeEditOutlineOutlinedIcon onClick={showUpdate}  />
                        </IconButton>

                        <IconButton className="iconButton"
                            style={{ background: "white", padding: "5px", borderRadius: "50%", border: "2px solid #b23c17", color: "#b23c17" }}
                            aria-label="delete" color="primary">
                            <DeleteOutlineOutlinedIcon onClick={() => {
                            showDel()
                            }} />
                        </IconButton>

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}