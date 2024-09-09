const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const { createOfficeVisitStudent } = require("./officeVisitStudentAPI");

const initialState = {
    loading: false,
    isError: false,
    error: "",
    success:false
  };

  // create thunk 

  export const addOfficeVisitedStudent = createAsyncThunk("offceVisitStudent/addOfficeVisitedStudent", async(data)=>{
    const response = createOfficeVisitStudent(data)
    return response;
  })

  // create slice 
  const officeVisitStudentSlice = createSlice({
    name:"officeVisitStudent",
    initialState,
    extraReducers: (builder) =>{
             builder
              .addCase(addOfficeVisitedStudent.pending, (state)=>{
                state.loading = true;
                state.isError = false;
                state.success = false
              })
              .addCase(addOfficeVisitedStudent.fulfilled, (state,action)=>{
                state.loading = false;
                state.success =true
              })
              .addCase(addOfficeVisitedStudent.rejected,(state,action)=>{
                state.success = false 
                state.isError = false ;
                state.error = action?.error?.message;
              })
    }
  })



  export default officeVisitStudentSlice.reducer;