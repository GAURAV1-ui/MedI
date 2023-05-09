import React from "react";
import { useUserAuth } from '../store/UserAuthContext';

  export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {userTranslateInput} = useUserAuth();
    return (
      <div ref={ref}>
        <h1 style={{textAlign:"center",marginTop:"1rem"}}>MedInclude</h1>
        <br/>
        <section style = {{paddingLeft:"1.2rem", paddingRight:"1rem"}}>

        {userTranslateInput}
        </section>
        </div>
    );
  });