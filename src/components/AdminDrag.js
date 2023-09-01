import React from "react";
import { Grid, Drawer,Button} from "@material-ui/core";
import Files from "./Files";
function AdminDrag({ open, Close, doddle,setStatus}) {
  console.log(doddle);
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={open}
      onClose={Close}
      style={{}}
    >
      
      <Grid
        container
        xs="12"
        justify="center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
        
        <Grid
          item
          xs="12"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
          <Files />
          
          
        </Grid>
        <Button onClick={()=>{setStatus(!open)}}>Close</Button>
      </Grid>
      
    </Drawer>
  );
}
export default AdminDrag;
