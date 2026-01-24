import { useOutletContext, useRouteError } from "react-router";

function error() {
    const { createError } = useOutletContext<any>();
    let error =  useRouteError();
    
    
    createError();



}

export default error;