import React, { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';
import { ModalLargeType } from './modal';

export type CustomModalRef = {
    open: () => void;
    close: () => void;
};

interface CustomModalProps {
    children: React.ReactNode;
    className?: string;
    largeType?: ModalLargeType;
    showOverlay?: boolean;
}

const CustomModal: React.ForwardRefRenderFunction<CustomModalRef, CustomModalProps> = (props, ref: Ref<CustomModalRef>) => {
    const { children, className = '', largeType = 'default', showOverlay = true } = props;
    const [display, setDisplay] = useState<'none' | 'block'>('none');

    const open = () => {
        setDisplay('block');
    };

    const close = () => {
        setDisplay('none');
    };

    useImperativeHandle(ref, () => ({
        open,
        close
    }));

    let modalSize = 'none';

    switch (largeType) {
        case 'small':
            modalSize = 'sm';
            break;
        case 'large':
            modalSize = 'lg';
            break;
        case 'extra-large':
            modalSize = 'xl';
            break;
        case 'fullscreen':
            modalSize = 'fullscreen';
            break;
        default:
            break;
    }

    const modal = (
        <div
            className={`custom-modal fade ${className} ${display === 'block' ? 'show' : ''}`}
            style={{
                backgroundColor: showOverlay
                    ? 'rgba(0, 0, 0, 0.55)'
                    : 'rgba(0, 0, 0, 0)'
            }}
        >
            <div className={`custom-modal-dialog custom-modal-dialog-centered custom-modal-${modalSize}`}>
                <div className="custom-modal-content">
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modal, document.body);
};

export default forwardRef(CustomModal);