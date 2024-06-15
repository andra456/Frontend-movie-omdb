

const toast = ()=> alert()
export const snackbar = (type,msg) => {
    let set = {
        position: "top-right",
        autoClose: 500000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }

        switch (type) {
            case 'errors':
                //toast.error(msg, {...set});
                break;
            case "success" :
                //toast.success(msg, {...set})
            break;
            case "warning" :
                //toast.warn(msg, {...set})
            break;
            default:
                //toast(msg, {...set})
                break;
        }
    
}