import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from './ToDo';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useContext,useEffect,useMemo,useReducer } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toastContext } from '../contexts/toastContext';
import { TodoContext } from '../contexts/TodoContext';


export default function ToDoList() {
    const {todoValue,dispatch}=useContext(TodoContext)
    const [inputValue,setInputValue]=useState("");
    const [handleTasks,setHandleTasks]=useState("all");
    const [showDelAlert, setDelAlert] = useState(false);
    const [updatedTodo,setUpdatedTodo]=useState({})
    const [showUpdateAlert,setUpdateAlert]=useState(false);
    const [todo,setTodoObj]=useState()
    const {showHideToast}=useContext(toastContext)
    function handleClose() {
        setDelAlert(false)
    }
    function showDeleteDialog(todopara){
        setTodoObj(todopara);
        setDelAlert(true)
    }
    function handleDelete() {
        dispatch({type:"deleted",payload:todo})
        handleClose();
        showHideToast("تم الحذف بنجاح");
    }

    function showUpdateDialoge(todopara){
        setUpdatedTodo(todopara);
        setUpdateAlert(true)
    }
    function handleUpdateClose(){
        setUpdateAlert(false);
    }
    function handleUpdateValues(){
        dispatch({type:"updated",payload:updatedTodo})
        handleUpdateClose();
        showHideToast("تم التعديل بنجاح");
    }


    useEffect(()=>{
        dispatch({type:"get"})
    },[])
    function handleRenderTasks(e){
        setHandleTasks(e.target.value);
    }
    function handleAddClick(){
        dispatch({type:"added",payload:{
            title:inputValue
        }})
        setInputValue("");
    }


    const compoletedFiltering=useMemo(()=>{
        return todoValue.filter((t)=>{
            return t.flag
        })
    },[todoValue]);
    
    const notCompoletedFiltering= useMemo(()=>{

        return todoValue.filter((t)=>{
                return !t.flag })
    },[todoValue]);

    let choseingRenderList=todoValue;
    if(handleTasks=="notCompoleted"){
        choseingRenderList=notCompoletedFiltering;
    }
    else if(handleTasks=="compoleted"){
        choseingRenderList=compoletedFiltering;
    }
    const ToDosMaping=choseingRenderList.map((t)=>{
        return <ToDo key={t.id} todo={t} showDeleteFun={showDeleteDialog} showUpdateFun={showUpdateDialoge}/>
    })

    return (
        <>
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
        <Container maxWidth="sm">
            <Card 
                sx={{ 
                    minWidth: 275,
                    maxHeight: "80vh", 
                    overflowY: "auto",
                    scrollbarWidth: "none",
                }}
            >
                <CardContent>
                    <Typography variant="h1" style={{fontWeight:"bold"}}>مهامي</Typography>
                    <Divider style={{ marginTop: "-14px" }} />

                    {/* filter buttons */}
                    <ToggleButtonGroup
                        exclusive
                        aria-label="text alignment"
                        style={{direction:"ltr", marginTop:"25px"}}
                        value={handleTasks}
                        onChange={handleRenderTasks}
                    >
                        <ToggleButton value="notCompoleted">
                            غير منجز
                        </ToggleButton>
                        <ToggleButton value="compoleted" >
                            منجز
                        </ToggleButton>
                        <ToggleButton value="all" >
                            الكل
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {/* filter buttons */}

                    {/*All Todos*/}
                    {ToDosMaping}
                    {/*All Todos*/}

                    {/* input button */}
                    <Grid style={{marginTop:"15px"}} container spacing={2}>
                        <Grid size={8}>
                            <TextField 
                                value={inputValue} 
                                onChange={(e) => setInputValue(e.target.value)}
                                style={{width:"100%"}} 
                                id="outlined-basic" 
                                label="إضافه مهمه" 
                                variant="outlined" 
                            />
                        </Grid>
                        <Grid size={4}>
                            <Button 
                                onClick={handleAddClick}
                                style={{width:"100%", height:"100%"}}
                                disabled={inputValue.length < 3} 
                                variant="contained"
                            >
                                إضافه
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </>
    );
}
