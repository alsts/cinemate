"use client"

import { useState, useEffect } from "react" ;  

export const Voting = () => {
    // const [documents, setDocuments] = useState<DocumentType[]>([]) ;

    // useEffect(() => {
    //     const socket = io(import.meta.env.VITE_SERVER_URL) ;

    //     socket.emit("get-all-documents") ;

    //     socket.on("all-documents", (allDocuments) => {
    //         setDocuments(allDocuments) ;
    //     });
        
    //     return () => {
    //         socket.disconnect() ;
    //     }
    // }, []) ;

    return(
        <div className="LandingPage">
            {/* <Topbar /> */}
            <div className="Docs-container-1">
                <div className="title-1"> Start a new document </div>
                <div> </div>
            </div>
        </div>
    )
}