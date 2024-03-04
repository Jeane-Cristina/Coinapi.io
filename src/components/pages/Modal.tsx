import styles from './Modal.module.css'
import { AssetService } from '../services/asset-service';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactNode } from 'react';

type ModalProps = {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal ({ children, onClose } : ModalProps ){


    
    function handleCloseModal(){
        onClose();
    }

    return (
        <div className={styles.content} onClick={handleCloseModal}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    )
 
}