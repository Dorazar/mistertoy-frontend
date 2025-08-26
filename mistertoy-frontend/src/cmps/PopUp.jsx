import { useEffect } from "react"



export function PopUp({children,isOpen,onCloseChat}) {

   

    useEffect(()=>{
       document.body.addEventListener('keydown',(ev)=>{
        if (ev.key==='Escape') {
            onCloseChat()
        }
        
       })
       return ()=>{document.body.removeEventListener('keydown', (ev)=>{
        if (ev.key==='Escape') {
            onCloseChat()
        }
       
        
       })
     console.log('Clean up function running');
    } 
    },[])

    useEffect(() => {
        console.log('current isOpen:',isOpen);
        
        return () => {
            console.log('last isOpen', isOpen)
        }
    }, [isOpen])

 if (!isOpen) return

    return (
      <section className='popUp-container'>
        <header>header</header>
        <main>{children}</main>
        <footer>footer</footer>
      </section>
    )
  
}