import { MessageContext } from "@/context/MessageContext";
import { useContext } from 'react'

const useMessage = () => {
    return useContext(MessageContext)
}
export default useMessage;