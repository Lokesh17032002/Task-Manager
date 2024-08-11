import React from 'react'
import { createPortal } from 'react-dom'
import { forwardRef, useImperativeHandle } from 'react'
import Button from './Button.jsx';
import { useRef } from 'react';

const Modal = forwardRef(({ children }, ref) => {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className='backdrop:bg-stone-900/90 p-4 rounded-md shawdow-md '>
            {children}
            <form method='dialog' className='mt-4 text-right'>
                <Button>Close</Button>
            </form>
        </dialog>, document.getElementById('modal-root')
    )
})

export default Modal